import os
import ee
import json
import geemap
from shapely.geometry import shape, mapping

PROJECT_ID = "telangana-0999"
GEOJSON_PATH = "../backend/assets/indiaStates.geo.json"
STATE_NAME = "Telangana"
OUTPUT_DIR = "telangana_full_state"
SCALE = 10 

def load_telangana_boundary():
    if not os.path.exists(GEOJSON_PATH):
        raise RuntimeError(f"File not found: {GEOJSON_PATH}")

    with open(GEOJSON_PATH, "r") as f:
        data = json.load(f)

    feature = next((f for f in data["features"] if f["properties"].get("ST_NM") == STATE_NAME), None)
    
    if feature is None:
        raise RuntimeError(f"State {STATE_NAME} not found in GeoJSON")

    return ee.Geometry(mapping(shape(feature["geometry"])))

def download_sentinel2(geom):
    print(f"Downloading Sentinel-2 mosaic for {STATE_NAME}...")
    
    image = (
        ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
        .filterDate("2024-01-01", "2024-03-30")
        .filterBounds(geom)
        .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 10))
        .median()
        .clip(geom)
        .select(["B1","B2","B3","B4","B5","B6","B7","B8","B8A","B9","B11","B12"])
    )

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    out_tif = os.path.join(OUTPUT_DIR, "telangana_s2.tif")

    geemap.download_ee_image(
        image=image,
        filename=out_tif,
        region=geom,
        crs="EPSG:4326",
        scale=SCALE,
        dtype="float32"
    )

def main():
    ee.Initialize(project=PROJECT_ID)
    geom = load_telangana_boundary()
    download_sentinel2(geom)
    print("Done.")

if __name__ == "__main__":
    main()