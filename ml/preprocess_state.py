import rasterio
import numpy as np
import os
from rasterio.windows import Window

# ----------------CONFIGURATION----------------
INPUT_ROOT = "training_data"
OUTPUT_DIR = "state_training_dataset"
CHIP_SIZE = 256
# ---------------------------------------------

def create_chips():
    # 1. Setup Output Folders
    img_dir = os.path.join(OUTPUT_DIR, "images")
    mask_dir = os.path.join(OUTPUT_DIR, "masks")
    os.makedirs(img_dir, exist_ok=True)
    os.makedirs(mask_dir, exist_ok=True)

    # 2. Find all subfolders (Adilabad, Nalgonda, etc.)
    locations = [d for d in os.listdir(INPUT_ROOT) if os.path.isdir(os.path.join(INPUT_ROOT, d))]

    total_chips = 0

    print(f"Found {len(locations)} locations: {locations}")

    for loc_name in locations:
        print(f"\nProcessing: {loc_name}...")
        
        # Construct paths
        feature_path = os.path.join(INPUT_ROOT, loc_name, "features.tif")
        label_path = os.path.join(INPUT_ROOT, loc_name, "labels.tif")
        
        # Skip if files don't exist
        if not os.path.exists(feature_path) or not os.path.exists(label_path):
            print(f"  [SKIP] Missing files in {loc_name}")
            continue

        with rasterio.open(feature_path) as src_img, rasterio.open(label_path) as src_lbl:
            width = src_img.width
            height = src_img.height
            
            # Local counter for this district
            loc_count = 0
            
            # Loop through grid
            for col in range(0, width, CHIP_SIZE):
                for row in range(0, height, CHIP_SIZE):
                    
                    w = min(CHIP_SIZE, width - col)
                    h = min(CHIP_SIZE, height - row)
                    window = Window(col, row, w, h)
                    
                    # Read Data
                    img_data = src_img.read(window=window)
                    lbl_data = src_lbl.read(1, window=window)
                    
                    # Filter Bad Chips (Must be 256x256 and not empty)
                    if w != CHIP_SIZE or h != CHIP_SIZE:
                        continue
                    if np.max(img_data) == 0:
                        continue

                    # Save with UNIQUE name (District + Number)
                    # Example: Adilabad_Forest_chip_5.npy
                    filename = f"{loc_name}_chip_{loc_count}.npy"
                    
                    np.save(os.path.join(img_dir, filename), img_data)
                    np.save(os.path.join(mask_dir, filename), lbl_data)
                    
                    loc_count += 1
                    total_chips += 1
            
            print(f"  > Extracted {loc_count} chips.")

    print(f"\n--- STATE PROCESSING COMPLETE ---")
    print(f"Total Training Chips Created: {total_chips}")
    print(f"Data saved in '{OUTPUT_DIR}'")

if __name__ == "__main__":
    create_chips()