import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Waves, Satellite, Users, MapPin, AlertTriangle, TrendingUp, MessageCircle } from 'lucide-react';

const LandingPage = ({ onGetStarted }) => {

  const features = [
    {
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      title: "AI-Powered Threat Detection",
      description: "Advanced machine learning models predict cyclones, tsunamis, high tides, and pollution events with unprecedented accuracy."
    },
    {
      icon: <Satellite className="h-8 w-8 text-green-500" />,
      title: "Data Integration",
      description: "Real-time analysis of data to detect illegal dumping, algal blooms, and coastal erosion patterns."
    },
    {
      icon: <Users className="h-8 w-8 text-purple-500" />,
      title: "Community Reporting",
      description: "Crowdsourced threat reporting with AI verification to ensure authentic, actionable intelligence from local communities."
    },
    {
      icon: <MapPin className="h-8 w-8 text-red-500" />,
      title: "Impact Zone Mapping",
      description: "Dynamic heatmaps showing real-time risk zones with color-coded severity indicators for quick decision-making."
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-orange-500" />,
      title: "Multilingual Alerts",
      description: "Automated notifications in local languages with offline SMS capability for remote coastal communities."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-teal-500" />,
      title: "Climate Projections",
      description: "Long-term scenario modeling for sea-level rise, ocean acidification, and mangrove loss up to 2100."
    }
  ];

  const risks = [
    { name: "Cyclones", color: "bg-red-100 text-red-800" },
    { name: "Tsunamis", color: "bg-purple-100 text-purple-800" },
    { name: "High Tides", color: "bg-blue-100 text-blue-800" },
    { name: "Pollution Events", color: "bg-yellow-100 text-yellow-800" },
    { name: "Sea Level Rise", color: "bg-indigo-100 text-indigo-800" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Waves className="h-16 w-16 text-blue-600 animate-pulse" />
                <Shield className="h-8 w-8 text-cyan-600 absolute -top-2 -right-2" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Coastal Threat
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                Alert System
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              AI-powered disaster preparedness platform protecting vulnerable coastal communities through 
              real-time threat detection, early warning systems, and climate resilience planning.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                onClick={onGetStarted}
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Get Started
                <Shield className="ml-2 h-5 w-5" />
              </Button>
              
             
            </div>

            {/* Risk Tags */}
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {risks.map((risk, index) => (
                <span 
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${risk.color} shadow-sm hover:shadow-md transition-shadow duration-200`}
                >
                  {risk.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Coastal Protection
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-driven platform combines satellite data, community intelligence, and predictive modeling 
              to provide unprecedented coastal threat awareness and response capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-md">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="p-3 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Continuous Monitoring</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">6+</div>
              <div className="text-blue-100">Threat Types Detected</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2100</div>
              <div className="text-blue-100">Climate Projections</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">∞</div>
              <div className="text-blue-100">Lives Protected</div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple, powerful, and designed for rapid response
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Data Collection", desc: "Govt sites, sensors, and community reports" },
              { step: "02", title: "AI Analysis", desc: "Machine learning detects anomalies and validates reports" },
              { step: "03", title: "Risk Assessment", desc: "Automated scoring categorizes threats by severity" },
              { step: "04", title: "Alert & Response", desc: "Instant notifications and action playbooks delivered" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Protect Your Coast?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join the next generation of coastal disaster preparedness with AI-powered threat detection 
            and community-driven resilience planning.
          </p>
          
          <Button 
            onClick={onGetStarted}
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-12 py-4 text-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Launch Dashboard
            <Waves className="ml-3 h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="py-8 bg-gray-900 text-white text-center">
        <p className="text-gray-400">
          © 2025 Coastal Threat Alert System. Protecting communities through AI-powered early warning systems.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;