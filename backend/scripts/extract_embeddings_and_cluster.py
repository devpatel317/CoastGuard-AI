import os
import numpy as np
import pandas as pd
from tqdm import tqdm
from sklearn.cluster import KMeans
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2, preprocess_input
from tensorflow.keras.models import Model

# --------- Config ----------
IMG_DIR = os.path.join("..", "data", "unlabeled")
CSV_OUT = os.path.join("..", "outputs", "clustered_images.csv")
PREVIEW_DIR = os.path.join("..", "outputs", "cluster_previews")
IMG_SIZE = (224, 224)
N_CLUSTERS = 2  # 2 = (dumping vs clean). Change if you want more clusters.
BATCH_SIZE = 32
# ---------------------------

os.makedirs(os.path.dirname(CSV_OUT), exist_ok=True)
os.makedirs(PREVIEW_DIR, exist_ok=True)

# Collect all image files (recursive)
VALID_EXT = {".jpg", ".jpeg", ".png", ".bmp", ".webp"}
img_files = []
for root, _, files in os.walk(IMG_DIR):
    for f in files:
        if os.path.splitext(f.lower())[1] in VALID_EXT:
            img_files.append(os.path.join(root, f))
if not img_files:
    raise SystemExit(f"No images found under {IMG_DIR}")

# Load base model for embeddings
base = MobileNetV2(weights="imagenet", include_top=False, pooling="avg", input_shape=(224,224,3))
embed_model = Model(inputs=base.input, outputs=base.output)

def load_and_embed(paths):
    feats = []
    for p in paths:
        img = image.load_img(p, target_size=IMG_SIZE)
        arr = image.img_to_array(img)
        arr = np.expand_dims(arr, axis=0)
        arr = preprocess_input(arr)
        feat = embed_model.predict(arr, verbose=0)
        feats.append(feat[0])
    return np.array(feats, dtype=np.float32)

# Embed all images
features = load_and_embed(img_files)

# KMeans clustering
kmeans = KMeans(n_clusters=N_CLUSTERS, random_state=42, n_init=10)
labels = kmeans.fit_predict(features)

# Save mapping
df = pd.DataFrame({"image_path": img_files, "cluster": labels})
df.to_csv(CSV_OUT, index=False)
print(f"✅ Saved clusters to {CSV_OUT}")

# Save a few preview images per cluster to help you pick which is 'dumping'
from shutil import copy2
SAMPLES_PER_CLUSTER = 20
for c in range(N_CLUSTERS):
    subdir = os.path.join(PREVIEW_DIR, f"cluster_{c}")
    os.makedirs(subdir, exist_ok=True)
    subset = df[df["cluster"] == c]["image_path"].head(SAMPLES_PER_CLUSTER)
    for src in subset:
        try:
            copy2(src, os.path.join(subdir, os.path.basename(src)))
        except Exception:
            pass
print(f"✅ Saved previews under {PREVIEW_DIR} (inspect to decide which cluster is 'dumping').")
