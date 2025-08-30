import sys, os, json
import numpy as np
from PIL import Image
import tensorflow as tf

MODEL_PATH = os.path.join("..", "models", "illegal_dumping_classifier.h5")
CLASSMAP_PATH = os.path.join("..", "models", "class_indices.json")
IMG_SIZE = (224, 224)

def load_model_and_map():
    model = tf.keras.models.load_model(MODEL_PATH)
    with open(CLASSMAP_PATH, "r") as f:
        class_indices = json.load(f)
    # find index for "dumping"
    if "dumping" not in class_indices:
        raise SystemExit('Your class names must include "dumping". Check pseudolabeled folders.')
    dumping_idx = class_indices["dumping"]
    return model, dumping_idx

def predict(path):
    img = Image.open(path).convert("RGB").resize(IMG_SIZE)
    arr = np.array(img, dtype=np.float32) / 255.0
    arr = np.expand_dims(arr, axis=0)
    pred = model.predict(arr, verbose=0)[0][0]  # sigmoid output
    # If dumping class index is 1, pred is P(dumping). If 0, invert.
    p_dumping = pred if dumping_idx == 1 else (1.0 - pred)
    label = "dumping" if p_dumping >= 0.5 else "clean"
    return label, float(p_dumping)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python predict_one.py path/to/image.jpg")
        sys.exit(1)
    model, dumping_idx = load_model_and_map()
    label, prob = predict(sys.argv[1])
    print(f"Prediction: {label} (P_dumping={prob:.3f})")
