import { useState, useEffect, useCallback } from "react";
import {
  Waves,
  Wind,
  AlertTriangle,
  Droplets,
  Fish,
  MapPin,
  X,
  Info,
  AlertCircle,
  Clock,
  Thermometer,
  Eye,
  Activity,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import OceanErosionCard from "@/components/Erosion";
import TimelineSlider from "@/components/TimelineSlider";

// Alert interface
interface Alert {
  id: string;
  type: "danger" | "warning" | "info";
  message: string;
  location?: string;
  timestamp: Date;
}

// Cyclone Monitoring Component
const CycloneMonitor = ({ onRiskUpdate }) => {
  const [sensorData, setSensorData] = useState({
    wave_direction: 20,
    wave_height: 12,
    sea_surface_temperature: 30,
    ocean_current_velocity: 7.8,
    temperature_2m: 28,
    relative_humidity_2m: 85,
    surface_pressure: 980,
    cloud_cover: 100,
    wind_speed_100m: 200,
    wind_direction_100m: 180,
  });

  const [riskScore, setRiskScore] = useState(10);
  const [riskLevel, setRiskLevel] = useState("success");
  const [status, setStatus] = useState("System Initializing...");
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [nextUpdate, setNextUpdate] = useState(300);
  const [alerts, setAlerts] = useState([]);
  const [isActive, setIsActive] = useState(true);

  const getRiskClasses = (level) => {
    switch (level) {
      case "danger":
        return "bg-red-100 text-red-800 border-red-200";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "safe":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-green-100 text-green-800 border-green-200";
    }
  };

  const getStatusMessage = (level, score) => {
    switch (level) {
      case "danger":
        return "🚨 CRITICAL: Immediate action required! Cyclone conditions detected.";
      case "warning":
        return "⚠️ MODERATE: Weather conditions are concerning. Stay alert and monitor updates.";
      case "safe":
        return "💙 SAFE: Conditions are stable but continue monitoring for changes.";
      default:
        return "✅ ALL CLEAR: Weather conditions are normal. Systems operating normally.";
    }
  };

  const calculateRisk = (prediction, windSpeed) => {
    const randomWindSpeed = windSpeed + (Math.random() - 0.5) * 20;

    if (prediction === 0 && randomWindSpeed < 60)
      return { score: 10, level: "success", status: "No Cyclone Detected" };
    if (randomWindSpeed > 100)
      return {
        score: 90,
        level: "danger",
        status: "High Alert - Severe Cyclone",
      };
    if (randomWindSpeed > 85)
      return {
        score: 70,
        level: "warning",
        status: "Moderate Alert - Strong Winds",
      };
    if (randomWindSpeed > 60)
      return {
        score: 50,
        level: "safe",
        status: "Low Alert - Monitor Conditions",
      };
    return { score: 30, level: "safe", status: "Low Risk - Stable Conditions" };
  };

  const addAlert = (type, message, location) => {
    // Prevent duplicate cyclone danger alerts
    if (type === "danger" && alerts.some(a => a.type === "danger" && a.message === message)) {
      return;
    }
    const newAlert = {
      id: Date.now().toString(),
      type,
      message,
      location,
      timestamp: new Date(),
    };
    setAlerts((prev) => [newAlert, ...prev].slice(0, 5));
  };

  const handleUpdate = useCallback(async () => {
    setLoading(true);
    try {
      console.log("Sending data to API:", sensorData);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch("http://127.0.0.1:8000/predict_cyclone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(sensorData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `API Error ${response.status}: ${errorText || response.statusText}`
        );
      }

      const data = await response.json();
      console.log("API Response:", data);

      const prediction =
        data.prediction !== undefined
          ? data.prediction
          : data.result !== undefined
          ? data.result
          : 0;

      const currentWindSpeed = sensorData.wind_speed_100m;
      const { score, level, status } = calculateRisk(
        prediction,
        currentWindSpeed
      );

      setRiskScore(score);
      setRiskLevel(level);
      setStatus(status);
      setLastUpdated(new Date());

      // Update parent dashboard
      onRiskUpdate({
        riskScore: score,
        level,
        status,
        prediction,
        windSpeed: currentWindSpeed,
      });

      if (prediction === 1 && level === "danger" && score > 80) {
        addAlert(
          "danger",
          `🚨 CYCLONE DETECTED: API confirms high cyclone risk! Wind speeds: ${currentWindSpeed}km/h. Immediate evacuation recommended.`,
          "Bay of Bengal"
        );
      } else if (prediction === 1 && level === "warning" && score > 60) {
        addAlert(
          "warning",
          `⚠️ CYCLONE WARNING: API detected moderate cyclone formation. Wind speeds: ${currentWindSpeed}km/h. Stay alert and monitor updates.`,
          "Coastal Areas"
        );
      }

      setNextUpdate(300);
    } catch (err) {
      console.error("API Error Details:", err);

      let errorMessage = "API connection failed";
      if (err.name === "AbortError") {
        errorMessage = "API request timed out";
      } else if (err instanceof TypeError && err.message.includes("fetch")) {
        errorMessage = "Cannot connect to API server";
      }

      setRiskScore(0);
      setRiskLevel("success");
      setStatus("API Connection Error");
      addAlert("warning", `🔧 ${errorMessage}`, "System");
    } finally {
      setLoading(false);
    }
  }, [sensorData, onRiskUpdate]);

  // Auto-update every 5 minutes
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setNextUpdate((prev) => {
        if (prev <= 1) {
          handleUpdate();
          return 300;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [handleUpdate, isActive]);

  useEffect(() => {
    handleUpdate();
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const getRiskColor = (level) => {
    switch (level) {
      case "danger":
        return "text-red-600";
      case "warning":
        return "text-yellow-600";
      case "safe":
        return "text-blue-600";
      default:
        return "text-green-600";
    }
  };

  return {
    riskScore,
    riskLevel,
    status,
    loading,
    isActive,
    nextUpdate,
    lastUpdated,
    alerts,
    sensorData,
    handleUpdate,
    setIsActive,
    formatTime,
    getRiskColor,
    getRiskClasses,
    getStatusMessage,
  };
};

// Alert Banner Component
const AlertBanner = ({ alerts, onRemoveAlert }) => {
  const getAlertIcon = (type) => {
    switch (type) {
      case "danger":
        return <AlertTriangle className="h-5 w-5" />;
      case "warning":
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getAlertClasses = (type) => {
    switch (type) {
      case "danger":
        return "bg-red-50 text-red-800 border-red-200 animate-pulse";
      case "warning":
        return "bg-yellow-50 text-yellow-800 border-yellow-200";
      default:
        return "bg-blue-50 text-blue-800 border-blue-200";
    }
  };

  if (alerts.length === 0) return null;

  return (
    <div className="space-y-2 mb-6">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`px-4 py-3 border rounded-lg ${getAlertClasses(
            alert.type
          )} transition-all duration-300`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getAlertIcon(alert.type)}
              <div className="flex-1">
                <p className="text-sm font-medium">{alert.message}</p>
                <div className="flex items-center space-x-4 mt-1">
                  {alert.location && (
                    <p className="text-xs opacity-75 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {alert.location}
                    </p>
                  )}
                  <p className="text-xs opacity-75 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {alert.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemoveAlert(alert.id)}
              className="text-current hover:bg-white/20 ml-4"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [cycloneData, setCycloneData] = useState({
    riskScore: 10,
    level: "success",
    status: "Initializing...",
    prediction: 0,
    windSpeed: 85,
  });

  const [alerts, setAlerts] = useState([]);

  const handleCycloneRiskUpdate = (data) => {
    setCycloneData(data);
  };

  const removeAlert = (id) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  // Initialize cyclone monitor
  const cycloneMonitor = CycloneMonitor({
    onRiskUpdate: handleCycloneRiskUpdate,
  });

  // Update alerts from cyclone monitor
  useEffect(() => {
    setAlerts(cycloneMonitor.alerts);
  }, [cycloneMonitor.alerts]);

  const threats = [
    {
      title: "Cyclone Risk",
      riskScore: cycloneData.riskScore,
      status: cycloneData.status,
      description:
        cycloneData.level === "danger"
          ? `CRITICAL: ${cycloneMonitor.getStatusMessage(
              cycloneData.level,
              cycloneData.riskScore
            )}`
          : cycloneData.level === "warning"
          ? `MODERATE: Weather conditions are concerning with wind speeds at ${cycloneData.windSpeed}km/h`
          : "AI-powered cyclone detection system monitoring Bay of Bengal conditions",
      icon: Wind,
      lastUpdated: cycloneMonitor.lastUpdated.toLocaleTimeString(),
      level: cycloneData.level,
      isLive: true,
    },
    // Add more threat types here if needed
  ];

  const getActiveWarnings = () => {
    return threats.filter((t) => t.level === "danger" || t.level === "warning")
      .length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-blue-600/10 to-blue-400/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-blue-400/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-4">
              Coastal Threat Dashboard
            </h1>
            <p className="text-xl opacity-90 max-w-2xl">
              AI-powered real-time monitoring and early warning system for
              coastal and marine threats
            </p>
            <div className="mt-4 flex items-center space-x-4 text-sm opacity-80">
              <div className="flex items-center space-x-1">
                <div
                  className={`w-2 h-2 rounded-full animate-pulse ${
                    cycloneMonitor.isActive ? "bg-green-400" : "bg-gray-400"
                  }`}
                />
                <span>
                  {cycloneMonitor.isActive ? "System Active" : "System Paused"}
                </span>
              </div>
              <div>
                Last Updated: {cycloneMonitor.lastUpdated.toLocaleTimeString()}
              </div>
              <div>6 Monitoring Stations</div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TimelineSlider />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alert Banner */}
        <AlertBanner alerts={alerts} onRemoveAlert={removeAlert} />

        {/* Cyclone Monitoring Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Cyclone Monitoring System
              </h2>
              <p className="text-gray-600">
                Real-time AI-powered cyclone detection and risk assessment
              </p>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div>
                Next Update:{" "}
                {cycloneMonitor.formatTime(cycloneMonitor.nextUpdate)}
              </div>
              <Button
                onClick={() =>
                  cycloneMonitor.setIsActive(!cycloneMonitor.isActive)
                }
                variant={cycloneMonitor.isActive ? "outline" : "default"}
                size="sm"
              >
                {cycloneMonitor.isActive ? "Pause" : "Resume"}
              </Button>
            </div>
          </div>

          {/* Main Cyclone Card */}
          {/* ...existing code... */}

          {/* ...existing code... */}

          <Card className="p-8 shadow-lg border-2 hover:shadow-xl transition-all duration-300 my-5">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div
                  className={`p-4 rounded-2xl border-2 ${cycloneMonitor.getRiskClasses(
                    cycloneData.level
                  )} transition-all duration-300`}
                >
                  <Wind className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Cyclone Risk Assessment
                  </h1>
                  <p
                    className={`text-lg font-semibold ${cycloneMonitor.getRiskColor(
                      cycloneData.level
                    )}`}
                  >
                    {cycloneData.status}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {cycloneMonitor.getStatusMessage(
                      cycloneData.level,
                      cycloneData.riskScore
                    )}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div
                  className={`text-4xl font-bold ${cycloneMonitor.getRiskColor(
                    cycloneData.level
                  )}`}
                >
                  {cycloneData.riskScore}
                </div>
                <div className="text-sm text-gray-500">Risk Score</div>
                <div className="flex items-center justify-end space-x-1 mt-1">
                  <Activity
                    className={`h-3 w-3 ${
                      cycloneMonitor.isActive
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                  />
                  <span className="text-xs text-gray-500">
                    {cycloneMonitor.isActive ? "Active" : "Paused"}
                  </span>
                </div>
              </div>
            </div>

            {/* Sensor Data Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Thermometer className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Temperature
                  </span>
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {cycloneMonitor.sensorData.temperature_2m}°C
                </div>
                <div className="text-xs text-gray-500">Air Temperature</div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Waves className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Wave Height
                  </span>
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {cycloneMonitor.sensorData.wave_height}m
                </div>
                <div className="text-xs text-gray-500">Current Waves</div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Wind className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Wind Speed
                  </span>
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {cycloneData.windSpeed}km/h
                </div>
                <div className="text-xs text-gray-500">Current Wind</div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        cycloneData.level === "danger"
                          ? "bg-red-500 animate-pulse"
                          : cycloneData.level === "warning"
                          ? "bg-yellow-500"
                          : cycloneData.level === "safe"
                          ? "bg-blue-500"
                          : "bg-green-500"
                      }`}
                    />
                    <span className="text-sm text-gray-600 capitalize font-medium">
                      {cycloneData.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Last updated:{" "}
                    {cycloneMonitor.lastUpdated.toLocaleTimeString()}
                  </div>
                </div>

                <Button
                  onClick={cycloneMonitor.handleUpdate}
                  disabled={cycloneMonitor.loading}
                  className="min-w-[100px]"
                >
                  {cycloneMonitor.loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Updating...</span>
                    </div>
                  ) : (
                    "Update Now"
                  )}
                </Button>
              </div>
            </div>
          </Card>
          <Card className="p-8 shadow-lg border-2 hover:shadow-xl transition-all duration-300 my-5">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="p-4 rounded-2xl border-2 bg-yellow-100 text-yellow-800 border-yellow-200 transition-all duration-300">
                  <Waves className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Coastal Erosion Monitoring
                  </h1>
                  <p className="text-lg font-semibold text-yellow-600">
                    Erosion Rate: 2.3 m/year
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Affected Area: 5.2 km²<br />Last Update: 2025-08-31
                  </p>
                </div>
              </div>
            </div>
            <OceanErosionCard />
          </Card>

          {/* Ocean Acidification Forecast Card */}
          <Card className="p-8 shadow-lg border-2 hover:shadow-xl transition-all duration-300 my-5">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="p-4 rounded-2xl border-2 bg-blue-100 text-blue-800 border-blue-200 transition-all duration-300">
                  <Droplets className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Ocean Acidification Forecast
                  </h1>
                  <p className="text-lg font-semibold text-blue-600">
                    Next 5 Years (Sample Data)
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Projected ocean pH values for the years 2101-2105 based on model predictions.
                  </p>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Predicted pH</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">2101</td>
                    <td className="px-6 py-4 whitespace-nowrap">7.7217</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">2102</td>
                    <td className="px-6 py-4 whitespace-nowrap">7.7216</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">2103</td>
                    <td className="px-6 py-4 whitespace-nowrap">7.7215</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">2104</td>
                    <td className="px-6 py-4 whitespace-nowrap">7.7214</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">2105</td>
                    <td className="px-6 py-4 whitespace-nowrap">7.7213</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          
          
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <div className="text-2xl font-bold text-blue-600">6</div>
            <div className="text-sm text-gray-500">Active Monitors</div>
          </div>
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <div className="text-2xl font-bold text-yellow-600">
              {getActiveWarnings()}
            </div>
            <div className="text-sm text-gray-500">Active Warnings</div>
          </div>
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <div className="text-2xl font-bold text-green-600">847</div>
            <div className="text-sm text-gray-500">Community Reports</div>
          </div>
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <div className="text-2xl font-bold text-gray-900">
              {cycloneMonitor.isActive ? "99.2%" : "0%"}
            </div>
            <div className="text-sm text-gray-500">System Uptime</div>
          </div>
        </div>

        {/* Additional Threat Cards */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Current Threats
              </h2>
              <p className="text-gray-600">
                Real-time analysis of coastal and marine risks
              </p>
            </div>
            <div className="text-sm text-gray-500">Auto-refresh: 5 minutes</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {threats.map((threat) => (
              <ThreatCard key={threat.title} threat={threat} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Threat Card Component
const ThreatCard = ({ threat }) => {
  const getRiskColor = (level) => {
    switch (level) {
      case "danger":
        return "text-red-600 bg-red-50 border-red-200";
      case "warning":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "safe":
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-green-600 bg-green-50 border-green-200";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4 mb-4">
        <div
          className={`p-3 rounded-full ${
            getRiskColor(threat.level).split(" ")[1]
          } ${getRiskColor(threat.level).split(" ")[2]}`}
        >
          <threat.icon
            className={`w-6 h-6 ${getRiskColor(threat.level).split(" ")[0]}`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold truncate">{threat.title}</h3>
            {threat.isLive && (
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            )}
          </div>
          <p className="text-sm text-gray-600 truncate">{threat.description}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 text-xs">
        <div className={`rounded-full px-3 py-1 ${getRiskColor(threat.level)}`}>
          Risk Score: {threat.riskScore}
        </div>
        <div className="bg-gray-100 text-gray-800 rounded-full px-3 py-1">
          {threat.status}
        </div>
        <div className="bg-blue-100 text-blue-800 rounded-full px-3 py-1">
          Updated: {threat.lastUpdated}
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
