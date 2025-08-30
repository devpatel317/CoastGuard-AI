import os
import json
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2
from tensorflow.keras.layers import GlobalAveragePooling2D, Dense, Dropout
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam

# --------- Config ----------
TRAIN_DIR = os.path.join("..", "data", "pseudolabeled", "train")
VAL_DIR = os.path.join("..", "data", "pseudolabeled", "val")
MODEL_OUT = os.path.join("..", "models", "illegal_dumping_classifier.h5")
CLASSMAP_OUT = os.path.join("..", "models", "class_indices.json")
IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS_STAGE1 = 5    # train top
EPOCHS_STAGE2 = 10   # fine-tune some base layers
LR_STAGE1 = 1e-3
LR_STAGE2 = 1e-4
# ---------------------------

os.makedirs(os.path.dirname(MODEL_OUT), exist_ok=True)

# Data generators
train_gen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=20,
    width_shift_range=0.05,
    height_shift_range=0.05,
    zoom_range=0.15,
    horizontal_flip=True
).flow_from_directory(
    TRAIN_DIR, target_size=IMG_SIZE, batch_size=BATCH_SIZE, class_mode="binary"
)

val_gen = ImageDataGenerator(rescale=1./255).flow_from_directory(
    VAL_DIR, target_size=IMG_SIZE, batch_size=BATCH_SIZE, class_mode="binary"
)

# Build model
base = MobileNetV2(weights="imagenet", include_top=False, input_shape=(IMG_SIZE[0], IMG_SIZE[1], 3))
base.trainable = False

x = base.output
x = GlobalAveragePooling2D()(x)
x = Dropout(0.3)(x)
output = Dense(1, activation="sigmoid")(x)  # binary

model = Model(inputs=base.input, outputs=output)
model.compile(optimizer=Adam(LR_STAGE1), loss="binary_crossentropy", metrics=["accuracy"])

# Stage 1: train top
model.fit(train_gen, validation_data=val_gen, epochs=EPOCHS_STAGE1)

# Stage 2: fine-tune last few layers
for layer in base.layers[-40:]:
    layer.trainable = True
model.compile(optimizer=Adam(LR_STAGE2), loss="binary_crossentropy", metrics=["accuracy"])
model.fit(train_gen, validation_data=val_gen, epochs=EPOCHS_STAGE2)

# Save model + class map for inference
model.save(MODEL_OUT)
with open(CLASSMAP_OUT, "w") as f:
    json.dump(train_gen.class_indices, f, indent=2)

print("✅ Saved model to:", MODEL_OUT)
print("✅ Saved class_indices to:", CLASSMAP_OUT)
print("Class indices:", train_gen.class_indices)
