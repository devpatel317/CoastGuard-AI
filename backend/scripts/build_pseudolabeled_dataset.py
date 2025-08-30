import os
import pandas as pd
from sklearn.model_selection import train_test_split
from shutil import copy2

# --------- Config ----------
CSV_IN = os.path.join("..", "outputs", "clustered_images.csv")
OUT_ROOT = os.path.join("..", "data", "pseudolabeled")
TRAIN_DIR = os.path.join(OUT_ROOT, "train")
VAL_DIR = os.path.join(OUT_ROOT, "val")
VAL_RATIO = 0.2
RANDOM_STATE = 42

# IMPORTANT: decide which cluster id is "dumping" vs "clean"
# After inspecting previews, change this as needed:
CLUSTER_TO_NAME = {
    0: "clean",    # e.g., change to "dumping" if cluster_0 looks like dumping
    1: "dumping"
}
# ---------------------------

df = pd.read_csv(CSV_IN)
if "cluster" not in df.columns or "image_path" not in df.columns:
    raise SystemExit("CSV must contain columns: image_path, cluster")

# Map cluster -> label name
df["label"] = df["cluster"].map(CLUSTER_TO_NAME)
if df["label"].isna().any():
    raise SystemExit("CLUSTER_TO_NAME mapping missing for some cluster ids.")

# Train/val split per label to keep balance
train_rows, val_rows = [], []
for label in df["label"].unique():
    sub = df[df["label"] == label]
    tr, va = train_test_split(sub, test_size=VAL_RATIO, random_state=RANDOM_STATE, shuffle=True)
    train_rows.append(tr)
    val_rows.append(va)

train_df = pd.concat(train_rows).sample(frac=1, random_state=RANDOM_STATE)
val_df = pd.concat(val_rows).sample(frac=1, random_state=RANDOM_STATE)

# Prepare directories
for split, split_df in [("train", train_df), ("val", val_df)]:
    base = TRAIN_DIR if split == "train" else VAL_DIR
    for label in df["label"].unique():
        os.makedirs(os.path.join(base, label), exist_ok=True)
    # Copy images
    for _, row in split_df.iterrows():
        src = row["image_path"]
        dst = os.path.join(base, row["label"], os.path.basename(src))
        try:
            copy2(src, dst)
        except Exception as e:
            print("Copy failed:", src, "->", dst, "|", e)

print("✅ Pseudo-labeled dataset built under:", OUT_ROOT)
print("   Train:", TRAIN_DIR)
print("   Val:  ", VAL_DIR)
