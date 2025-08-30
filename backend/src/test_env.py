# src/test_env.py
import tensorflow as tf
import numpy as np
from huggingface_hub import hf_hub_download, list_repo_files

def test_tensorflow():
    print("TensorFlow version:", tf.__version__)
    gpus = tf.config.list_physical_devices("GPU")
    print("GPUs detected:", len(gpus))
    if gpus:
        for gpu in gpus:
            print(" -", gpu)

def test_hf():
    # list files in the MITCriticalData repo (simple connectivity test)
    repo_id = "MITCriticalData/Sentinel-2_ViT_Autoencoder_12Bands"
    try:
        files = list_repo_files(repo_id)
        print(f"HuggingFace repo '{repo_id}' reachable. Files (sample):", files[:10])
    except Exception as e:
        print("HuggingFace access test failed:", e)

if __name__ == "__main__":
    test_tensorflow()
    test_hf()
    # quick numpy test
    a = np.arange(6).reshape(2,3)
    print("NumPy test:", a)
