import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, confusion_matrix
import joblib

# 1) Load dataset
df = pd.read_csv("cyclone_data_numerical.csv")

# 2) Drop unnecessary columns (dates, times)
drop_cols = ["DATE & TIME", "date_x", "time_x", "date_y", "time_y"]
df = df.drop(columns=drop_cols)

# 3) Features (X) and Target (y)
X = df.drop(columns=["Cyclone"])
y = df["Cyclone"]

# 4) Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# 5) Train model
model = RandomForestClassifier(n_estimators=200, random_state=42, class_weight="balanced")
model.fit(X_train, y_train)

# 6) Predictions
y_pred = model.predict(X_test)
y_prob = model.predict_proba(X_test)[:,1]

# 7) Evaluation
print("✅ Model Evaluation:")
print("Accuracy:", accuracy_score(y_test, y_pred))
print("Precision:", precision_score(y_test, y_pred))
print("Recall:", recall_score(y_test, y_pred))
print("F1 Score:", f1_score(y_test, y_pred))
print("ROC AUC:", roc_auc_score(y_test, y_prob))
print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred))

# 8) Save model
joblib.dump(model, "cyclone_prediction_model.joblib")
print("✅ Model saved as cyclone_prediction_model.joblib")
