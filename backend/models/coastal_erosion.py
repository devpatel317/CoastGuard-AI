import pandas as pd
import joblib
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error
from sklearn.ensemble import RandomForestRegressor

# 1) Load the cleaned dataset (use the file we created earlier)
df = pd.read_csv("cleaned_coastal_dataset.csv")

# 2) Define features and target
features = ["Year", "Land area", "Coastal length", "Temperature",
            "Annual balance", "Sea level", "Continent"]
target = "Land Impact"

X = df[features]
y = df[target]

# 3) Train/test split (random split)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 4) Preprocessing
numeric_features = ["Year", "Land area", "Coastal length", "Temperature",
                    "Annual balance", "Sea level"]
categorical_features = ["Continent"]

numeric_transformer = Pipeline(steps=[
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler", StandardScaler())
])

categorical_transformer = Pipeline(steps=[
    ("imputer", SimpleImputer(strategy="most_frequent")),
    ("onehot", OneHotEncoder(handle_unknown="ignore"))
])

preprocessor = ColumnTransformer(
    transformers=[
        ("num", numeric_transformer, numeric_features),
        ("cat", categorical_transformer, categorical_features)
    ]
)

# 5) Model
model = RandomForestRegressor(n_estimators=200, random_state=42)

# 6) Build pipeline
pipe = Pipeline(steps=[("preprocessor", preprocessor),
                       ("regressor", model)])

# 7) Train
pipe.fit(X_train, y_train)

# 8) Evaluate
y_pred = pipe.predict(X_test)

r2 = r2_score(y_test, y_pred)
mae = mean_absolute_error(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))  # <-- fixed RMSE calculation

print("R²:", r2)
print("MAE:", mae)
print("RMSE:", rmse)

# 9) Save model
joblib.dump(pipe, "coastal_erosion_model.joblib")
print("✅ Model saved to coastal_erosion_model.joblib")
