import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const OceanErosionCard = () => {
  const sampleData = {
    Year: 2025,
    Land_area: 5000,
    Coastal_length: 300,
    Temperature: 29,
    Annual_balance: 200,
    Sea_level: 0.5,
    Continent: "Asia",
  };

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sampleData),
      });
      const data = await res.json();
      setPrediction(data.predicted_land_impact);
    } catch (err) {
      console.error(err);
      alert("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-xl shadow p-4 bg-white w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <h3 className="font-semibold text-lg">Ocean Erosion Prediction</h3>
        </div>
        <Button
          onClick={handleUpdate}
          className="bg-blue-600 text-white"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </Button>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-700">
          Using latest ocean erosion sample data to predict land impact.
        </p>

        {prediction !== null && (
          <div className="mt-2 p-2 bg-gray-100 rounded text-sm font-medium">
            Predicted Land Impact: {prediction.toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
};

export default OceanErosionCard;
