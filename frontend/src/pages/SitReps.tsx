import React, { useState, useEffect } from 'react';
import { Download, Calendar, MapPin, TrendingUp, RefreshCw, AlertTriangle, CheckCircle, Clock, Search, Filter, Plus, X, Navigation, Thermometer, Wind, Eye, Droplets, BarChart3, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadialBarChart, RadialBar, Legend } from 'recharts';

const SitReps = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [generatingNew, setGeneratingNew] = useState(false);
  const [showNewReportModal, setShowNewReportModal] = useState(false);
  const [newReportData, setNewReportData] = useState({
    location: '',
    coordinates: { lat: null, lng: null },
    wave_direction: '',
    wave_height: '',
    sea_surface_temperature: '',
    ocean_current_velocity: '',
    temperature_2m: '',
    relative_humidity_2m: '',
    surface_pressure: '',
    cloud_cover: '',
    wind_speed_100m: '',
    wind_direction_100m: '',
    // Sea level data
    year: new Date().getFullYear(),
    land_area: '',
    coastal_length: '',
    temperature: '',
    annual_balance: '',
    sea_level: '',
    continent: '',
    // Ocean emissions data
    ghg_emission: '',
    warming_from_fossil: '',
    co2_emission: '',
    fossil_consumption: ''
  });

  // Environmental data ranges for realistic values
  const dataRanges = {
    wave_direction: { min: 0, max: 360, unit: '°' },
    wave_height: { min: 0.5, max: 15, unit: 'm' },
    sea_surface_temperature: { min: 20, max: 32, unit: '°C' },
    ocean_current_velocity: { min: 0.1, max: 2.5, unit: 'm/s' },
    temperature_2m: { min: 18, max: 45, unit: '°C' },
    relative_humidity_2m: { min: 30, max: 95, unit: '%' },
    surface_pressure: { min: 980, max: 1030, unit: 'hPa' },
    cloud_cover: { min: 0, max: 100, unit: '%' },
    wind_speed_100m: { min: 2, max: 180, unit: 'km/h' },
    wind_direction_100m: { min: 0, max: 360, unit: '°' },
    // Additional ranges
    land_area: { min: 100, max: 50000, unit: 'km²' },
    coastal_length: { min: 50, max: 5000, unit: 'km' },
    temperature: { min: 15, max: 40, unit: '°C' },
    annual_balance: { min: -5, max: 5, unit: 'm' },
    sea_level: { min: -2, max: 2, unit: 'm' },
    ghg_emission: { min: 0.1, max: 50, unit: 'Gt' },
    warming_from_fossil: { min: 0.1, max: 2.5, unit: '°C' },
    co2_emission: { min: 0.1, max: 40, unit: 'Gt' },
    fossil_consumption: { min: 1, max: 100, unit: 'EJ' }
  };

  const continents = ['Asia', 'Africa', 'North America', 'South America', 'Europe', 'Oceania', 'Antarctica'];

  // Multi-threat AI prediction function
  const predictThreats = (data) => {
    const predictions = {};

    // Cyclone Risk Prediction
    const cycloneConditions = {
      highWindSpeed: parseFloat(data.wind_speed_100m) > 100,
      lowPressure: parseFloat(data.surface_pressure) < 995,
      highHumidity: parseFloat(data.relative_humidity_2m) > 80,
      highWaveHeight: parseFloat(data.wave_height) > 8,
      highTemp: parseFloat(data.sea_surface_temperature) > 28
    };
    const cycloneRiskFactors = Object.values(cycloneConditions).filter(Boolean).length;
    predictions.cyclone = {
      prediction: cycloneRiskFactors >= 3 ? 1 : 0,
      confidence: Math.min(cycloneRiskFactors * 0.2 + 0.3, 0.95),
      riskFactors: cycloneRiskFactors,
      conditions: cycloneConditions
    };

    // Sea Level Rise Risk
    const seaLevelConditions = {
      highSeaLevel: parseFloat(data.sea_level) > 0.5,
      negativeBalance: parseFloat(data.annual_balance) < -1,
      highTemp: parseFloat(data.temperature) > 30,
      longCoastline: parseFloat(data.coastal_length) > 1000
    };
    const seaLevelRiskFactors = Object.values(seaLevelConditions).filter(Boolean).length;
    predictions.seaLevel = {
      prediction: seaLevelRiskFactors >= 2 ? 1 : 0,
      confidence: Math.min(seaLevelRiskFactors * 0.25 + 0.4, 0.9),
      riskFactors: seaLevelRiskFactors,
      conditions: seaLevelConditions
    };

    // Climate Change/Emissions Risk
    const climateConditions = {
      highGHG: parseFloat(data.ghg_emission) > 10,
      highWarming: parseFloat(data.warming_from_fossil) > 1.0,
      highCO2: parseFloat(data.co2_emission) > 8,
      highConsumption: parseFloat(data.fossil_consumption) > 50
    };
    const climateRiskFactors = Object.values(climateConditions).filter(Boolean).length;
    predictions.climate = {
      prediction: climateRiskFactors >= 2 ? 1 : 0,
      confidence: Math.min(climateRiskFactors * 0.25 + 0.35, 0.92),
      riskFactors: climateRiskFactors,
      conditions: climateConditions
    };

    // Overall threat assessment
    const totalThreats = [predictions.cyclone.prediction, predictions.seaLevel.prediction, predictions.climate.prediction].filter(p => p === 1).length;
    const overallSeverity = totalThreats >= 2 ? 'high' : totalThreats === 1 ? 'medium' : 'low';

    return { ...predictions, overallSeverity, totalThreats };
  };

  // Get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setNewReportData(prev => ({
            ...prev,
            coordinates: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get current location. Please enter coordinates manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  // Generate realistic environmental data
  const generateEnvironmentalData = (severity = 'medium') => {
    const multiplier = severity === 'high' ? 1.3 : severity === 'low' ? 0.7 : 1;
    
    return {
      wave_direction: Math.random() * 360,
      wave_height: Math.random() * 10 * multiplier + 1,
      sea_surface_temperature: Math.random() * 8 + 24,
      ocean_current_velocity: Math.random() * 2 + 0.5,
      temperature_2m: Math.random() * 15 + 25,
      relative_humidity_2m: Math.random() * 40 + 50,
      surface_pressure: (Math.random() * 40 + 990) / multiplier,
      cloud_cover: Math.random() * 100,
      wind_speed_100m: Math.random() * 120 * multiplier + 10,
      wind_direction_100m: Math.random() * 360,
      // Sea level data
      year: new Date().getFullYear(),
      land_area: Math.random() * 10000 + 500,
      coastal_length: Math.random() * 2000 + 100,
      temperature: Math.random() * 10 + 25,
      annual_balance: (Math.random() - 0.5) * 4,
      sea_level: (Math.random() - 0.3) * 2,
      continent: continents[Math.floor(Math.random() * continents.length)],
      // Emissions data
      ghg_emission: Math.random() * 20 * multiplier + 2,
      warming_from_fossil: Math.random() * 1.5 * multiplier + 0.3,
      co2_emission: Math.random() * 15 * multiplier + 1,
      fossil_consumption: Math.random() * 60 * multiplier + 10
    };
  };

  const fetchReports = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockReports = generateMockReports();
      setReports(mockReports);
      setError(null);
    } catch (err) {
      setError('Failed to fetch reports. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateMockReports = () => {
    const locations = [
      { name: 'Bay of Bengal Region', lat: 16.5, lng: 88.0 },
      { name: 'Chennai Metropolitan Area', lat: 13.0827, lng: 80.2707 },
      { name: 'Indian Ocean Network', lat: 6.0, lng: 80.0 },
      { name: 'Tamil Nadu Coastline', lat: 11.1271, lng: 78.6569 },
      { name: 'Andaman Sea Zone', lat: 12.0, lng: 93.0 },
      { name: 'Krishna Delta Region', lat: 16.2160, lng: 81.1498 },
      { name: 'Puducherry Coastal Area', lat: 11.9416, lng: 79.8083 },
      { name: 'Coromandel Coast', lat: 12.5, lng: 80.0 },
      { name: 'Gulf of Mannar', lat: 9.0, lng: 79.0 }
    ];

    const threatTypes = [
      { type: 'Multi-Threat', severity: 'high', icon: '⚠️' },
      { type: 'Cyclone', severity: 'high', icon: '🌪️' },
      { type: 'Sea Level', severity: 'medium', icon: '🌊' },
      { type: 'Climate', severity: 'medium', icon: '🌡️' },
      { type: 'Tsunami', severity: 'low', icon: '🌊' },
      { type: 'Pollution', severity: 'medium', icon: '🏭' },
      { type: 'Flooding', severity: 'high', icon: '💧' },
      { type: 'Emissions', severity: 'medium', icon: '🏗️' }
    ];

    return Array.from({ length: 8 }, (_, i) => {
      const threat = threatTypes[i % threatTypes.length];
      const location = locations[i % locations.length];
      const date = new Date();
      date.setHours(date.getHours() - Math.random() * 72);
      
      const environmentalData = generateEnvironmentalData(threat.severity);
      const aiPredictions = predictThreats(environmentalData);

      return {
        id: `SITREP-2024-${String(i + 1).padStart(3, '0')}`,
        title: `${threat.type} Analysis - ${location.name}`,
        generatedAt: date.toLocaleString(),
        location: location.name,
        coordinates: { lat: location.lat, lng: location.lng },
        severity: aiPredictions.overallSeverity,
        icon: threat.icon,
        summary: generateSummary(aiPredictions, location.name),
        environmentalData,
        aiPredictions,
        tags: [threat.type, aiPredictions.overallSeverity === 'high' ? 'Emergency' : 'Monitoring', 'AI Analysis'],
        lastUpdated: Math.floor(Math.random() * 120) + 1,
        chartData: generateChartData(environmentalData, aiPredictions)
      };
    });
  };

  const generateSummary = (predictions, location) => {
    const activeThreats = [];
    if (predictions.cyclone.prediction === 1) activeThreats.push('cyclone formation');
    if (predictions.seaLevel.prediction === 1) activeThreats.push('sea level rise');
    if (predictions.climate.prediction === 1) activeThreats.push('climate deterioration');

    if (activeThreats.length === 0) {
      return `Environmental monitoring for ${location} shows normal conditions across all threat categories. Continued surveillance recommended with regular data updates.`;
    }

    return `AI analysis detected ${activeThreats.length} active threat(s) in ${location}: ${activeThreats.join(', ')}. ${predictions.overallSeverity === 'high' ? 'Immediate response protocols activated.' : 'Enhanced monitoring and preparedness measures recommended.'}`;
  };

  const generateChartData = (data, predictions) => {
    // Environmental parameters chart data
    const environmentalChart = Object.entries(data).slice(0, 10).map(([key, value]) => ({
      parameter: key.replace(/_/g, ' '),
      value: typeof value === 'number' ? parseFloat(value.toFixed(1)) : 0,
      normal: dataRanges[key] ? (dataRanges[key].max * 0.5) : 50,
      unit: dataRanges[key]?.unit || ''
    }));

    // Risk assessment pie chart
    const riskData = [
      { name: 'Cyclone Risk', value: predictions.cyclone.prediction, color: '#ef4444' },
      { name: 'Sea Level Risk', value: predictions.seaLevel.prediction, color: '#3b82f6' },
      { name: 'Climate Risk', value: predictions.climate.prediction, color: '#f59e0b' },
      { name: 'Low Risk Areas', value: 3 - predictions.totalThreats, color: '#10b981' }
    ];

    // Confidence levels
    const confidenceData = [
      { threat: 'Cyclone', confidence: (predictions.cyclone.confidence * 100).toFixed(0) },
      { threat: 'Sea Level', confidence: (predictions.seaLevel.confidence * 100).toFixed(0) },
      { threat: 'Climate', confidence: (predictions.climate.confidence * 100).toFixed(0) }
    ];

    return { environmentalChart, riskData, confidenceData };
  };

  const createNewReport = async () => {
    if (!newReportData.location || !newReportData.coordinates.lat || !newReportData.coordinates.lng) {
      alert('Please provide location information');
      return;
    }

    // Check required environmental fields
    const requiredFields = [
      'wave_direction', 'wave_height', 'sea_surface_temperature', 'ocean_current_velocity',
      'temperature_2m', 'relative_humidity_2m', 'surface_pressure', 'cloud_cover',
      'wind_speed_100m', 'wind_direction_100m', 'land_area', 'coastal_length',
      'temperature', 'annual_balance', 'sea_level', 'ghg_emission',
      'warming_from_fossil', 'co2_emission', 'fossil_consumption'
    ];
    
    const missingFields = requiredFields.filter(field => !newReportData[field] && newReportData[field] !== 0);
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    setGeneratingNew(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const environmentalData = {};
      requiredFields.forEach(field => {
        environmentalData[field] = field === 'continent' ? newReportData[field] : parseFloat(newReportData[field]);
      });
      environmentalData.year = parseInt(newReportData.year);
      environmentalData.continent = newReportData.continent;

      const aiPredictions = predictThreats(environmentalData);
      
      const newReport = {
        id: `SITREP-2024-${String(reports.length + 1).padStart(3, '0')}`,
        title: `Multi-Threat Assessment - ${newReportData.location}`,
        generatedAt: new Date().toLocaleString(),
        location: newReportData.location,
        coordinates: newReportData.coordinates,
        severity: aiPredictions.overallSeverity,
        icon: aiPredictions.totalThreats >= 2 ? '⚠️' : aiPredictions.totalThreats === 1 ? '🔍' : '✅',
        summary: generateSummary(aiPredictions, newReportData.location),
        environmentalData,
        aiPredictions,
        tags: ['User Generated', aiPredictions.overallSeverity === 'high' ? 'Emergency' : 'Assessment', 'Multi-Threat'],
        lastUpdated: 0,
        chartData: generateChartData(environmentalData, aiPredictions)
      };

      setReports(prev => [newReport, ...prev]);
      setShowNewReportModal(false);
      setNewReportData({
        location: '',
        coordinates: { lat: null, lng: null },
        wave_direction: '', wave_height: '', sea_surface_temperature: '', ocean_current_velocity: '',
        temperature_2m: '', relative_humidity_2m: '', surface_pressure: '', cloud_cover: '',
        wind_speed_100m: '', wind_direction_100m: '', year: new Date().getFullYear(),
        land_area: '', coastal_length: '', temperature: '', annual_balance: '', sea_level: '',
        continent: '', ghg_emission: '', warming_from_fossil: '', co2_emission: '', fossil_consumption: ''
      });
    } catch (err) {
      setError('Failed to generate new report.');
    } finally {
      setGeneratingNew(false);
    }
  };

  const renderEnvironmentalDataCard = (data, predictions) => {
    return (
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between">
            Environmental Analysis
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                predictions.totalThreats >= 2 ? 'bg-red-100 text-red-800' : 
                predictions.totalThreats === 1 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
              }`}>
                {predictions.totalThreats} Threat(s) Detected
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(data).slice(0, 12).map(([key, value]) => {
              const range = dataRanges[key];
              if (!range) return null;
              
              const isHigh = value > (range.max * 0.7);
              const isLow = value < (range.min + (range.max - range.min) * 0.3);
              
              return (
                <div key={key} className="bg-gray-50 rounded-lg p-2">
                  <div className="text-xs text-gray-600 uppercase mb-1">
                    {key.replace(/_/g, ' ').substring(0, 12)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-semibold ${isHigh ? 'text-red-600' : isLow ? 'text-blue-600' : 'text-gray-900'}`}>
                      {typeof value === 'number' ? value.toFixed(1) : value}{range.unit}
                    </span>
                    {getEnvironmentalIcon(key)}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                    <div 
                      className={`h-1 rounded-full ${isHigh ? 'bg-red-500' : isLow ? 'bg-blue-500' : 'bg-green-500'}`}
                      style={{ width: `${Math.min((value / range.max) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderStatisticalCharts = (chartData) => {
    const COLORS = ['#ef4444', '#3b82f6', '#f59e0b', '#10b981'];
    
    return (
      <div className="space-y-4">
        {/* Environmental Parameters Bar Chart */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              Environmental Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData.environmentalChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="parameter" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
                <Bar dataKey="normal" fill="#e5e7eb" opacity={0.5} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    );
  };

  const getEnvironmentalIcon = (key) => {
    const icons = {
      wave_direction: <Navigation className="h-3 w-3 text-blue-500" />,
      wave_height: <TrendingUp className="h-3 w-3 text-blue-500" />,
      sea_surface_temperature: <Thermometer className="h-3 w-3 text-red-500" />,
      ocean_current_velocity: <Wind className="h-3 w-3 text-blue-500" />,
      temperature_2m: <Thermometer className="h-3 w-3 text-orange-500" />,
      relative_humidity_2m: <Droplets className="h-3 w-3 text-blue-500" />,
      surface_pressure: <Eye className="h-3 w-3 text-gray-500" />,
      cloud_cover: <Eye className="h-3 w-3 text-gray-400" />,
      wind_speed_100m: <Wind className="h-3 w-3 text-green-500" />,
      wind_direction_100m: <Navigation className="h-3 w-3 text-green-500" />,
      land_area: <MapPin className="h-3 w-3 text-brown-500" />,
      coastal_length: <TrendingUp className="h-3 w-3 text-blue-600" />,
      temperature: <Thermometer className="h-3 w-3 text-red-600" />,
      sea_level: <TrendingUp className="h-3 w-3 text-blue-700" />,
      ghg_emission: <Wind className="h-3 w-3 text-gray-600" />,
      co2_emission: <Wind className="h-3 w-3 text-red-700" />
    };
    return icons[key] || <Eye className="h-3 w-3 text-gray-400" />;
  };

  const renderInteractiveMap = (coordinates, location) => {
    return (
      <div className="bg-blue-50 rounded-lg p-4 border-2 border-dashed border-blue-200">
        <div className="text-center">
          <MapPin className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <div className="text-sm font-medium text-blue-900 mb-1">{location}</div>
          <div className="text-xs text-blue-600">
            Lat: {coordinates.lat?.toFixed(4)}, Lng: {coordinates.lng?.toFixed(4)}
          </div>
          <div className="text-xs text-blue-500 mt-2">
            Interactive map with threat overlays
          </div>
          <div className="mt-3 bg-white rounded p-2 text-xs text-gray-600">
            🗺️ Satellite • Weather • Risk Zones • Evacuation Routes
          </div>
        </div>
      </div>
    );
  };

  const downloadReport = (report, format) => {
    const threatSummary = `Cyclone: ${report.aiPredictions.cyclone.prediction === 1 ? 'YES' : 'NO'} (${(report.aiPredictions.cyclone.confidence * 100).toFixed(1)}%)\nSea Level: ${report.aiPredictions.seaLevel.prediction === 1 ? 'YES' : 'NO'} (${(report.aiPredictions.seaLevel.confidence * 100).toFixed(1)}%)\nClimate: ${report.aiPredictions.climate.prediction === 1 ? 'YES' : 'NO'} (${(report.aiPredictions.climate.confidence * 100).toFixed(1)}%)`;
    
    const content = `${report.title}\nGenerated: ${report.generatedAt}\nLocation: ${report.location}\nCoordinates: ${report.coordinates.lat}, ${report.coordinates.lng}\nOverall Severity: ${report.severity.toUpperCase()}\n\nSummary:\n${report.summary}\n\nThreat Predictions:\n${threatSummary}\n\nEnvironmental Data:\n${Object.entries(report.environmentalData).map(([key, value]) => `${key}: ${value}${dataRanges[key]?.unit || ''}`).join('\n')}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.id}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'medium': return <Clock className="h-4 w-4" />;
      case 'low': return <CheckCircle className="h-4 w-4" />;
      default: return <Eye className="h-4 w-4" />;
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = selectedSeverity === 'all' || report.severity === selectedSeverity;
    return matchesSearch && matchesSeverity;
  });

  useEffect(() => {
    fetchReports();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading situation reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Situation Reports</h1>
            <p className="text-gray-600">AI-powered environmental threat analysis and monitoring</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <Button onClick={fetchReports} disabled={loading} className="flex items-center space-x-2">
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </Button>
            <Button 
              onClick={() => setShowNewReportModal(true)} 
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
            >
              <Plus className="h-4 w-4" />
              <span>New Report</span>
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search reports by title or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Severities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Reports Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          {filteredReports.map((report) => (
            <Card key={report.id} className="overflow-hidden hover:shadow-lg transition-shadow w-fullduration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl">{report.icon}</span>
                    <CardTitle className="text-lg leading-tight">{report.title}</CardTitle>

                      <div className={`px-2 py-1 flex flex-row rounded-full text-xs font-medium border ${getSeverityColor(report.severity)}`}>
                        {getSeverityIcon(report.severity)}
                        <span className="ml-1">{report.severity.toUpperCase()}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-2 space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {report.generatedAt}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {report.lastUpdated}m ago
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => downloadReport(report, 'txt')}
                      className="flex items-center space-x-1"
                    >
                      <Download className="h-3 w-3" />
                      <span>Export</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Location Map */}
                <div className="mb-4">
                  {renderInteractiveMap(report.coordinates, report.location)}
                </div>

                {/* Summary */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Analysis Summary</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">{report.summary}</p>
                </div>

                {/* Environmental Data */}
                {renderEnvironmentalDataCard(report.environmentalData, report.aiPredictions)}

                {/* Statistical Charts */}
                {renderStatisticalCharts(report.chartData)}

                {/* AI Predictions Detail */}
                <Card className="mt-4 bg-blue-50 border-blue-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center text-blue-900">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      AI Threat Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {/* Cyclone Prediction */}
                      <div className="flex items-center justify-between p-2 bg-white rounded">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">🌪️ Cyclone Risk</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            report.aiPredictions.cyclone.prediction === 1 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {report.aiPredictions.cyclone.prediction === 1 ? 'RISK DETECTED' : 'NO RISK'}
                          </span>
                          <span className="text-xs text-gray-600">
                            {(report.aiPredictions.cyclone.confidence * 100).toFixed(0)}% confidence
                          </span>
                        </div>
                      </div>

                      {/* Sea Level Prediction */}
                      <div className="flex items-center justify-between p-2 bg-white rounded">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">🌊 Sea Level Risk</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            report.aiPredictions.seaLevel.prediction === 1 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {report.aiPredictions.seaLevel.prediction === 1 ? 'RISK DETECTED' : 'NO RISK'}
                          </span>
                          <span className="text-xs text-gray-600">
                            {(report.aiPredictions.seaLevel.confidence * 100).toFixed(0)}% confidence
                          </span>
                        </div>
                      </div>

                      {/* Climate Prediction */}
                      <div className="flex items-center justify-between p-2 bg-white rounded">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">🌡️ Climate Risk</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            report.aiPredictions.climate.prediction === 1 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {report.aiPredictions.climate.prediction === 1 ? 'RISK DETECTED' : 'NO RISK'}
                          </span>
                          <span className="text-xs text-gray-600">
                            {(report.aiPredictions.climate.confidence * 100).toFixed(0)}% confidence
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {report.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* New Report Modal */}
        {showNewReportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Generate New Situation Report</h2>
                  <Button variant="outline" onClick={() => setShowNewReportModal(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Location Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location Name</label>
                      <input
                        type="text"
                        value={newReportData.location}
                        onChange={(e) => setNewReportData(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="e.g., Bay of Bengal Region"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button onClick={getCurrentLocation} variant="outline" className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>Get Current Location</span>
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
                      <input
                        type="number"
                        step="any"
                        value={newReportData.coordinates.lat || ''}
                        onChange={(e) => setNewReportData(prev => ({ 
                          ...prev, 
                          coordinates: { ...prev.coordinates, lat: parseFloat(e.target.value) || null }
                        }))}
                        placeholder="e.g., 13.0827"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
                      <input
                        type="number"
                        step="any"
                        value={newReportData.coordinates.lng || ''}
                        onChange={(e) => setNewReportData(prev => ({ 
                          ...prev, 
                          coordinates: { ...prev.coordinates, lng: parseFloat(e.target.value) || null }
                        }))}
                        placeholder="e.g., 80.2707"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Environmental Data */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Environmental Parameters</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {Object.entries(dataRanges).slice(0, 12).map(([key, range]) => (
                        <div key={key}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {key.replace(/_/g, ' ').toUpperCase()} ({range.unit})
                          </label>
                          <input
                            type="number"
                            step="any"
                            value={newReportData[key] || ''}
                            onChange={(e) => setNewReportData(prev => ({ ...prev, [key]: e.target.value }))}
                            placeholder={`${range.min} - ${range.max}`}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Additional Data */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Additional Parameters</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {Object.entries(dataRanges).slice(12).map(([key, range]) => (
                        <div key={key}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {key.replace(/_/g, ' ').toUpperCase()} ({range.unit})
                          </label>
                          <input
                            type="number"
                            step="any"
                            value={newReportData[key] || ''}
                            onChange={(e) => setNewReportData(prev => ({ ...prev, [key]: e.target.value }))}
                            placeholder={`${range.min} - ${range.max}`}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Continent Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Continent</label>
                    <select
                      value={newReportData.continent}
                      onChange={(e) => setNewReportData(prev => ({ ...prev, continent: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Continent</option>
                      {continents.map(continent => (
                        <option key={continent} value={continent}>{continent}</option>
                      ))}
                    </select>
                  </div>

                  {/* Generate Button */}
                  <div className="flex justify-end space-x-4 pt-6 border-t">
                    <Button variant="outline" onClick={() => setShowNewReportModal(false)}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={createNewReport} 
                      disabled={generatingNew}
                      className="flex items-center space-x-2"
                    >
                      {generatingNew ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>Generating...</span>
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4" />
                          <span>Generate Report</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredReports.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <BarChart3 className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedSeverity !== 'all' 
                ? 'Try adjusting your search criteria or filters.'
                : 'Create your first situation report to get started.'
              }
            </p>
            <Button onClick={() => setShowNewReportModal(true)} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Create New Report</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SitReps;