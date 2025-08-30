# ocean_acidification.py

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error
import numpy as np
import joblib

# ===============================
# 1. Load Dataset
# ===============================
df = pd.read_csv("oceanData.csv")

# Features (X) and Target (y)
X = df.drop(columns=["Ocean_acidification(in_PH)"])
y = df["Ocean_acidification(in_PH)"]

# ===============================
# 2. Train/Test Split
# ===============================
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# ===============================
# 3. Train Model
# ===============================
model = LinearRegression()
model.fit(X_train, y_train)

# ===============================
# 4. Evaluate Model
# ===============================
y_pred = model.predict(X_test)

print("Model Performance:")
print("R²:", r2_score(y_test, y_pred))
print("MAE:", mean_absolute_error(y_test, y_pred))
print("RMSE:", np.sqrt(mean_squared_error(y_test, y_pred)))

# ===============================
# 5. Save Model
# ===============================
joblib.dump(model, "ocean_acidification_model.pkl")

# ===============================
# 6. Forecast Next 5 Years
# ===============================
last_row = df.iloc[-1].copy()  # take last year's data
future_years = []

for i in range(1, 6):  # next 5 years
    new_row = last_row.copy()
    new_row["year"] += i
    # (Optional) Apply small growth trend to emissions/fossil fuel consumption
    new_row["Annual_GHG_emision_(in_billion_tons)"] *= 1.01  # +1% yearly
    new_row["Global_warming_contribution_from_fossil_fuels"] *= 1.01
    new_row["Co2_emissions_from_fossil_fuels(in billion tons)"] *= 1.01
    new_row["total_consumption of fossil fuel(Annually)"] *= 1.01

    ph_prediction = model.predict([new_row.drop("Ocean_acidification(in_PH)")])[0]
    future_years.append({"year": int(new_row["year"]), "predicted_pH": ph_prediction})

print("\nForecast for Next 5 Years:")
for item in future_years:
    print(item)
