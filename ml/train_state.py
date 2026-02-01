import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
import numpy as np
import os
from model import UNet12Band

# ----------------CONFIGURATION----------------
EPOCHS = 50
BATCH_SIZE = 4      # Keep at 4 to be safe with RAM
LEARNING_RATE = 0.001
DATA_DIR = "state_training_dataset"  # Points to your NEW state data
MODEL_SAVE_PATH = "telangana_state_model.pth"
# ---------------------------------------------

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
        
        # Load and Normalize
        image = np.load(img_path).astype(np.float32)
        image = image / 10000.0 
        image = np.clip(image, 0.0, 1.0)
        
        mask = np.load(mask_path).astype(np.int64)

        return torch.from_numpy(image), torch.from_numpy(mask)

def train_model():
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"--- STARTING STATE-SCALE TRAINING ON {device} ---")
    
    dataset = ChipDataset(DATA_DIR)
    dataloader = DataLoader(dataset, batch_size=BATCH_SIZE, shuffle=True)
    print(f"Loaded {len(dataset)} training chips from 5 districts.")
    
    model = UNet12Band(n_channels=12, n_classes=9).to(device)
    
    criterion = nn.CrossEntropyLoss()
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
        print(f"Epoch {epoch+1}/{EPOCHS} | Loss: {epoch_loss:.4f}")
        
        if epoch_loss < best_loss:
            best_loss = epoch_loss
            torch.save(model.state_dict(), MODEL_SAVE_PATH)
            print(f"  >>> New Best State Model Saved! (Loss: {best_loss:.4f})")

    print("\n---------------------------------------")
    print(f"STATE TRAINING COMPLETE.")
    print(f"Best Model: {MODEL_SAVE_PATH}")

if __name__ == "__main__":
    train_model()