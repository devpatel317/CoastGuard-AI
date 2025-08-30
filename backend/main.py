from fastapi import FastAPI
from pydantic import BaseModel,Field
import joblib
import pandas as pd
import numpy as np
import os


# 1) Load the trained model
model1 = joblib.load("../backend/models/coastal_erosion_model.joblib")
model2 = joblib.load("../backend/models/CyclonePrediction/cyclone_prediction_model.joblib")
model3 = joblib.load("../backend/models/OceanAcidificaion/ocean_acidification_model.pkl")

# 2) Create FastAPI app
app = FastAPI(title="Coastal Erosion Prediction API")

# 3) Define request schema
class PredictionRequest(BaseModel):
    Year: int
    Land_area: float
    Coastal_length: float
    Temperature: float
    Annual_balance: float
    Sea_level: float
    Continent: str

class CycloneInput(BaseModel):
    wave_direction: float
    wave_height: float
    sea_surface_temperature: float
    ocean_current_velocity: float
    temperature_2m: float
    relative_humidity_2m: float
    surface_pressure: float
    cloud_cover: float
    wind_speed_100m: float
    wind_direction_100m: float

class OceanInput(BaseModel):
    year: int
    ghg_emission: float = Field(..., alias="Annual_GHG_emision_(in_billion_tons)")
    warming_from_fossil: float = Field(..., alias="Global_warming_contribution_from_fossil_fuels")
    co2_emission: float = Field(..., alias="Co2_emissions_from_fossil_fuels_in_billion_tons")
    fossil_consumption: float = Field(..., alias="total_consumption_of_fossil_fuel_Annually")

    class Config:
        allow_population_by_field_name = True  # allows using both names


@app.get("/")
def home():
    return {"message": "Welcome to the Coastal Erosion Prediction API"}

# 4) Prediction endpoint
@app.post("/predict")
def predict(data: PredictionRequest):
    # Convert input to DataFrame
    input_df = pd.DataFrame([{
        "Year": data.Year,
        "Land area": data.Land_area,
        "Coastal length": data.Coastal_length,
        "Temperature": data.Temperature,
        "Annual balance": data.Annual_balance,
        "Sea level": data.Sea_level,
        "Continent": data.Continent
    }])
    
    # Make prediction
    prediction = model1.predict(input_df)[0]
    return {"predicted_land_impact": float(prediction)}


@app.post("/predict_cyclone")
def predict_cyclone(features: CycloneInput):
    data = np.array([[
        features.wave_direction,
        features.wave_height,
        features.sea_surface_temperature,
        features.ocean_current_velocity,
        features.temperature_2m,
        features.relative_humidity_2m,
        features.surface_pressure,
        features.cloud_cover,
        features.wind_speed_100m,
        features.wind_direction_100m
    ]])

    prediction = model2.predict(data)[0]
    result = "Cyclone Detected" if prediction == 1 else "No Cyclone"
    return {"prediction": int(prediction), "message": result}

@app.post("/predict_acidification")
def predict_acidification(data: OceanInput):
    """Predict ocean pH for given inputs"""
    # Map to dataset's original column names
    df = pd.DataFrame([{
        "year": data.year,
        "Annual_GHG_emision_(in_billion_tons)": data.ghg_emission,
        "Global_warming_contribution_from_fossil_fuels": data.warming_from_fossil,
        "Co2_emissions_from_fossil_fuels(in billion tons)": data.co2_emission,  
        "total_consumption of fossil fuel(Annually)": data.fossil_consumption   
    }])


    prediction = model3.predict(df)[0]
    return {"predicted_pH": round(float(prediction), 4)}

@app.get("/forecast_next5years")
def forecast_next_5_years():
    """Predict ocean pH for next 5 years based on last row + trends"""
    
    # Get absolute path (safe way)
    file_path = os.path.join(os.path.dirname(__file__), "models", "OceanAcidificaion", "oceanData.csv")
    
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Dataset not found at {file_path}")
    
    df = pd.read_csv(file_path)

    last_row = df.iloc[-1].copy()
    results = []

    for i in range(1, 6):
        new_row = last_row.copy()
        new_row["year"] += i

        # Apply small growth to drivers (+1% yearly)
        new_row["Annual_GHG_emision_(in_billion_tons)"] *= 1.01
        new_row["Global_warming_contribution_from_fossil_fuels"] *= 1.01
        new_row["Co2_emissions_from_fossil_fuels(in billion tons)"] *= 1.01
        new_row["total_consumption of fossil fuel(Annually)"] *= 1.01

        # Drop target safely
        if "Ocean_acidification(in_PH)" in new_row:
            features = new_row.drop("Ocean_acidification(in_PH)")
        else:
            features = new_row

        ph_prediction = model3.predict(pd.DataFrame([features]))[0]

        results.append({
            "year": int(new_row["year"]),
            "predicted_pH": round(float(ph_prediction), 4)
        })

    return {"forecast": results}
