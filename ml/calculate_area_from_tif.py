import json
import rasterio
import numpy as np
from rasterio.windows import Window
from collections import defaultdict

# CONFIG
TIF_PATH = "telangana_full_state/telangana_classified_rgb.tif"
OUT_JSON = "../backend/data/telangana.stats.json"

CHUNK_SIZE = 1024  
PIXEL_AREA_KM2 = 0.0001  # 10m × 10m

# Same palette used during inference
PALETTE = {
    (65, 155, 223): "water",
    (57, 125, 73): "vegetation",
    (136, 176, 83): "vegetation",
    (122, 135, 198): "vegetation",
    (228, 150, 53): "vegetation",
    (223, 195, 90): "vegetation",
    (196, 40, 27): "build_area",
    (165, 155, 143): "bare_ground",
    (178, 178, 178): "snow"
}

def main():
    print("Calculating land-cover areas from GeoTIFF")

    counts = defaultdict(int)

    with rasterio.open(TIF_PATH) as src:
        H, W = src.height, src.width
        print(f"Image size: {H} x {W}")

        for y in range(0, H, CHUNK_SIZE):
            for x in range(0, W, CHUNK_SIZE):
                h = min(CHUNK_SIZE, H - y)
                w = min(CHUNK_SIZE, W - x)

                window = Window(x, y, w, h)
                rgb = src.read(window=window)  # (3, h, w)

                r = rgb[0].flatten()
                g = rgb[1].flatten()
                b = rgb[2].flatten()

                for i in range(len(r)):
                    key = (int(r[i]), int(g[i]), int(b[i]))
                    if key in PALETTE:
                        counts[PALETTE[key]] += 1

            if y % 4096 == 0:
                print(f"✔ Processed rows {y}/{H}")

    # Convert pixels → km²
    area = {
        cls: round(px * PIXEL_AREA_KM2, 2)
        for cls, px in counts.items()
    }

    total_area = round(sum(area.values()), 2)

    stats = {
        "state": "Telangana",
        "totalArea": total_area,
        "breakdown": area
    }

    # Save for backend
    with open(OUT_JSON, "w") as f:
        json.dump(stats, f, indent=2)

    print("\nAREA CALCULATION COMPLETE")
    print(json.dumps(stats, indent=2))
    print(f"\nSaved → {OUT_JSON}")


if __name__ == "__main__":
    main()