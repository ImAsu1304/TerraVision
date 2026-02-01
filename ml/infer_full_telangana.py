import os
import json
import torch
import rasterio
import numpy as np
from rasterio.windows import Window
from rasterio.features import geometry_mask
from shapely.geometry import shape, mapping
from model import UNet12Band

# ======================
# CONFIG
# ======================
S2_TIF = "telangana_full_state/telangana_s2.tif"
OUT_TIF = "telangana_full_state/telangana_classified_rgb.tif"
GEOJSON_PATH = "../backend/assets/indiaStates.geo.json"

MODEL_PATH = "telangana_state_balanced.pth"
CHIP_SIZE = 256

PALETTE = {
    0: [65, 155, 223],   # Water
    1: [57, 125, 73],    # Trees
    2: [136, 176, 83],   # Grass
    3: [122, 135, 198],  # Flooded Veg
    4: [228, 150, 53],   # Crops
    5: [223, 195, 90],   # Shrub
    6: [196, 40, 27],    # Built
    7: [165, 155, 143],  # Bare
    8: [178, 178, 178]   # Snow
}

# ======================
def load_telangana_polygon():
    with open(GEOJSON_PATH, "r") as f:
        data = json.load(f)

    feat = next(f for f in data["features"] if f["properties"]["ST_NM"] == "Telangana")
    return shape(feat["geometry"])

# ======================
def main():
    print("🧠 FULL-STATE INFERENCE WITH MASKING")

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"⚙️ Device: {device}")

    telangana_poly = load_telangana_polygon()
    print("✅ Telangana polygon loaded")

    model = UNet12Band(n_channels=12, n_classes=9).to(device)
    model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
    model.eval()
    print("✅ Model loaded")

    with rasterio.open(S2_TIF) as src:
        H, W = src.height, src.width
        print(f"📐 Image size: {H} × {W}")

        # --- OUTPUT PROFILE (🔥 FIXED)
        profile = src.profile.copy()
        profile.update(
            count=3,
            dtype=rasterio.uint8,
            nodata=0,
            compress="lzw",
            tiled=True,
            blockxsize=256,
            blockysize=256
        )
        profile.pop("indexes", None)

        # --- Telangana mask (True = keep)
        state_mask = geometry_mask(
            [mapping(telangana_poly)],
            transform=src.transform,
            invert=True,
            out_shape=(H, W)
        )

        os.makedirs(os.path.dirname(OUT_TIF), exist_ok=True)

        with rasterio.open(OUT_TIF, "w", **profile) as dst:
            with torch.no_grad():
                for y in range(0, H, CHIP_SIZE):
                    for x in range(0, W, CHIP_SIZE):
                        h = min(CHIP_SIZE, H - y)
                        w = min(CHIP_SIZE, W - x)

                        window = Window(x, y, w, h)
                        chip = src.read(window=window).astype(np.float32) / 10000.0
                        chip = np.clip(chip, 0, 1)

                        padded = np.zeros((12, CHIP_SIZE, CHIP_SIZE), dtype=np.float32)
                        padded[:, :h, :w] = chip

                        inp = torch.from_numpy(padded).unsqueeze(0).to(device)
                        pred = torch.argmax(model(inp), dim=1).squeeze().cpu().numpy()

                        rgb = np.zeros((3, h, w), dtype=np.uint8)
                        for k, c in PALETTE.items():
                            m = pred[:h, :w] == k
                            rgb[0][m] = c[0]
                            rgb[1][m] = c[1]
                            rgb[2][m] = c[2]

                        # 🔥 APPLY TELANGANA MASK
                        local_mask = state_mask[y:y+h, x:x+w]
                        # Outside Telangana → force to Bare Ground (class 7)
                        outside = ~local_mask
                        rgb[0][outside] = PALETTE[7][0]
                        rgb[1][outside] = PALETTE[7][1]
                        rgb[2][outside] = PALETTE[7][2]


                        dst.write(rgb, window=window)

                    if y % 2048 == 0:
                        print(f"✔ Processed {y}/{H} rows")

    print("\n🎉 INFERENCE COMPLETE")
    print(f"📁 Output: {OUT_TIF}")
    print("➡ Next: gdal2tiles.py -z 13-14")

# ======================
if __name__ == "__main__":
    main()
