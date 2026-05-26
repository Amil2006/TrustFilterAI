import os
import pandas as pd
from PIL import Image
import random

import torch
from torch.utils.data import Dataset, DataLoader
from torchvision import transforms
from sklearn.model_selection import train_test_split


# Load DataFrame
def load_dataframe(dataset_path):
    classes = ["genuine", "fake"]
    data = []

    for brand in os.listdir(dataset_path):
        brand_path = os.path.join(dataset_path, brand)

        if not os.path.isdir(brand_path):
            continue

        for label in classes:
            label_path = os.path.join(brand_path, label)

            if not os.path.exists(label_path):
                continue

            for img_name in os.listdir(label_path):
                img_path = os.path.join(label_path, img_name)

                data.append({
                    "image_path": img_path,
                    "label": 0 if label == "genuine" else 1,
                    "brand": brand
                })

    df = pd.DataFrame(data)

    df["brand_id"] = df["brand"].astype("category").cat.codes

    return df

# Dataset Class
class WatchDataset(Dataset):
    def __init__(self, dataframe, transform=None):
        self.df = dataframe.reset_index(drop=True)
        self.transform = transform

    def __len__(self):
        return len(self.df)

    def __getitem__(self, idx):
        img_path = self.df.iloc[idx]["image_path"]
        label = torch.tensor(self.df.iloc[idx]["label"], dtype=torch.long)
        brand_id = torch.tensor(self.df.iloc[idx]["brand_id"], dtype=torch.long)

        try:
            image = Image.open(img_path).convert("RGB")
        except:
            return self.__getitem__(random.randint(0, len(self.df) - 1))

        if self.transform:
            image = self.transform(image)

        return image, label, brand_id

# DataLoader Factory
def get_dataloaders(dataset_path, batch_size=32):

    df = load_dataframe(dataset_path)

    print("Dataset size:", len(df))
    print("Class distribution:\n", df["label"].value_counts())
    print("Brands:", df["brand"].nunique())

    train_df, val_df = train_test_split(
        df,
        test_size=0.2,
        stratify=df["label"],
        random_state=42
    )

    train_transform = transforms.Compose([
        transforms.Resize((300, 300)),
        transforms.RandomHorizontalFlip(),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[0.485, 0.456, 0.406],
            std=[0.229, 0.224, 0.225]
        )
    ])

    val_transform = transforms.Compose([
        transforms.Resize((300, 300)),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[0.485, 0.456, 0.406],
            std=[0.229, 0.224, 0.225]
        )
    ])

    train_dataset = WatchDataset(train_df, transform=train_transform)
    val_dataset = WatchDataset(val_df, transform=val_transform)

    train_loader = DataLoader(
        train_dataset,
        batch_size=batch_size,
        shuffle=True,
        num_workers=2,
        pin_memory=True
    )

    val_loader = DataLoader(
        val_dataset,
        batch_size=batch_size,
        shuffle=False,
        num_workers=2,
        pin_memory=True
    )

    num_brands = df["brand_id"].nunique()
    return train_loader, val_loader, num_brands