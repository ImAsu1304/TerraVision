import ee
import geemap
import os

# 1. Initialize
# Make sure to use your correct project ID here if it changed
ee.Initialize(project='terrav-484706')

# 2. Define Representative Locations (Lat, Lon)
# These capture the diversity of the entire state
LOCATIONS = {
    "Adilabad_Forest": [78.5320, 19.6641],
    "Nalgonda_Dry": [79.2684, 17.0575],
    "Warangal_Agri": [79.5926, 17.9689],
    "Godavari_River": [80.8500, 17.6500],
    "Hyderabad_City": [78.4867, 17.3850]
}

def download_sample(name, coords):
    print(f"Fetching data for: {name}...")

    # Create a 5km buffer (smaller area, but high variety)
    roi = ee.Geometry.Point([coords[0], coords[1]]).buffer(5000).bounds()

    # Fetch Sentinel-2 (12 Bands)
    s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED') \
           .filterDate('2024-01-01', '2024-03-01') \
           .filterBounds(roi) \
           .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10)) \
           .median() \
           .clip(roi)

    # Select 12 Bands
    bands = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B9', 'B11', 'B12']
    image = s2.select(bands)

    # Fetch Labels (Dynamic World)
    dw = ee.ImageCollection('GOOGLE/DYNAMICWORLD/V1') \
           .filterDate('2024-01-01', '2024-03-01') \
           .filterBounds(roi) \
           .mode() \
           .select('label')

    # Save Paths
    out_dir = os.path.join(os.getcwd(), 'training_data', name)
    if not os.path.exists(out_dir):
        os.makedirs(out_dir)

    # Download Image
    geemap.download_ee_image(
        image=image,
        filename=os.path.join(out_dir, "features.tif"),
        region=roi,
        crs='EPSG:4326',
        scale=10,
        dtype='float32'
    )

    # Download Label
    geemap.download_ee_image(
        image=dw,
        filename=os.path.join(out_dir, "labels.tif"),
        region=roi,
        crs='EPSG:4326',
        scale=10,
        dtype='uint8'
    )
    print(f"Completed: {name}\n")

if __name__ == "__main__":
    print("Starting State-Level Data Collection...")
    for name, coords in LOCATIONS.items():
        download_sample(name, coords)
    print("All samples downloaded. Ready for processing.")