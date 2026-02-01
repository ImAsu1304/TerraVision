import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
import numpy as np
import os
from model import UNet12Band

# CONFIGURATION
EPOCHS = 30  # We can do fewer epochs now that we are fine-tuning
BATCH_SIZE = 4
LEARNING_RATE = 0.0005 # Lower learning rate for fine-tuning
DATA_DIR = "state_training_dataset"
MODEL_SAVE_PATH = "telangana_state_balanced.pth"

# 1. DEFINE WEIGHTS (The Secret Sauce)
# We give higher weights to Nature classes to stop the "Urban Overkill"
# [Water, Trees, Grass, Flood, Crops, Scrub, Built, Bare, Snow]
# We lower 'Built' (index 6) to 0.5 so the model stops obsessing over it.
# We raise 'Bare Ground' (index 7) and 'Scrub' (index 5) to 2.0.
CLASS_WEIGHTS = [1.0, 2.0, 1.0, 1.0, 2.0, 3.0, 0.5, 3.0, 0.0]

class ChipDataset(Dataset):
    def __init__(self, root_dir):
        self.img_dir = os.path.join(root_dir, "images")
        self.mask_dir = os.path.join(root_dir, "masks")
        self.files = [f for f in os.listdir(self.img_dir) if f.endswith('.npy')]

    def __len__(self):
        return len(self.files)

    def __getitem__(self, idx):
        img_name = self.files[idx]
        img_path = os.path.join(self.img_dir, img_name)
        mask_path = os.path.join(self.mask_dir, img_name)
        
        image = np.load(img_path).astype(np.float32) / 10000.0
        image = np.clip(image, 0.0, 1.0)
        mask = np.load(mask_path).astype(np.int64)
        return torch.from_numpy(image), torch.from_numpy(mask)

def train_balanced():
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"--- STARTING BALANCED TRAINING ON {device} ---")
    
    # Load Data
    dataset = ChipDataset(DATA_DIR)
    dataloader = DataLoader(dataset, batch_size=BATCH_SIZE, shuffle=True)
    
    # Load Model (Optional: Load your previous state model to continue learning)
    model = UNet12Band(n_channels=12, n_classes=9).to(device)
    # model.load_state_dict(torch.load("telangana_state_model.pth")) # Uncomment to continue
    
    # 2. APPLY WEIGHTS TO LOSS
    weights_tensor = torch.tensor(CLASS_WEIGHTS).float().to(device)
    criterion = nn.CrossEntropyLoss(weight=weights_tensor)
    
    optimizer = optim.Adam(model.parameters(), lr=LEARNING_RATE)
    
    best_loss = float('inf')
    
    for epoch in range(EPOCHS):
        model.train()
        running_loss = 0.0
        
        for images, masks in dataloader:
            images = images.to(device)
            masks = masks.to(device)
            
            optimizer.zero_grad()
            outputs = model(images)
            loss = criterion(outputs, masks)
            loss.backward()
            optimizer.step()
            
            running_loss += loss.item()
            
        epoch_loss = running_loss / len(dataloader)
        print(f"Epoch {epoch+1}/{EPOCHS} | Balanced Loss: {epoch_loss:.4f}")
        
        if epoch_loss < best_loss:
            best_loss = epoch_loss
            torch.save(model.state_dict(), MODEL_SAVE_PATH)
            print(f"  >>> Saved Balanced Model!")

    print("Training Complete. Model: telangana_state_balanced.pth")

if __name__ == "__main__":
    train_balanced()