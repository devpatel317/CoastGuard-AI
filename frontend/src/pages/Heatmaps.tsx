import { useState, useEffect } from 'react';
import { MapPin, Layers, Eye, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Heatmaps = () => {
  const [selectedLayers, setSelectedLayers] = useState(['wind']);
  const [mapUrl, setMapUrl] = useState(
    "https://earth.nullschool.net/#current/ocean/wind/overlay=current/orthographic=-289.47,21.34,5089/loc=69.969,21.513"
  );

  // ✅ Location state
  const [locationData, setLocationData] = useState({
    longitude: 69.969,
    latitude: 21.5137,
    location: "Unknown"
  });

  const layers = [
    { 
      id: 'wind', 
      name: 'Wind', 
      color: 'bg-danger', 
      description: 'Real-time wind tracking',
      url: "https://earth.nullschool.net/#current/ocean/wind/overlay=current/orthographic=-293.25,20.93,2698/loc=69.969,21.5137"
    },
    { 
      id: 'tide', 
      name: 'Tide Levels', 
      color: 'bg-primary', 
      description: 'Current ocean wave patterns',
      url: "https://earth.nullschool.net/#current/ocean/primary/waves/overlay=significant_wave_height/orthographic=-293.25,20.93,2698/loc=69.969,21.5137"
    },
    { 
      id: 'erosion', 
      name: 'Erosion Risk', 
      color: 'bg-warning', 
      description: 'CO2 concentration + wind overlay',
      url: "https://earth.nullschool.net/#current/chem/co2sc/wind/overlay=current/orthographic=-293.25,20.93,2698/loc=69.969,21.5137"
    }
  ];

  const toggleLayer = (layerId: string, url: string) => {
    setSelectedLayers(prev => 
      prev.includes(layerId) 
        ? prev.filter(id => id !== layerId)
        : [...prev, layerId]
    );

    setMapUrl(url);
  };

  // ✅ Monitor map URL hash to detect click location
  useEffect(() => {
    const iframe = document.getElementById("earth-map") as HTMLIFrameElement;

    if (!iframe) return;

    const interval = setInterval(() => {
      try {
        // Read iframe URL hash
        const hash = new URL(iframe.src).hash;
        const locMatch = hash.match(/loc=([\d.-]+),([\d.-]+)/);
        if (locMatch) {
          const lon = parseFloat(locMatch[1]);
          const lat = parseFloat(locMatch[2]);
          setLocationData({
            longitude: lon,
            latitude: lat,
            location: `Lat ${lat.toFixed(3)}, Lon ${lon.toFixed(3)}`
          });
        }
      } catch (err) {
        console.warn("Cannot read iframe URL (cross-origin): ", err);
      }
    }, 1000); // check every second

    return () => clearInterval(interval);
  }, [mapUrl]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Impact Zone Heatmaps</h1>
          <p className="text-muted-foreground">Interactive threat visualization and risk assessment mapping</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Layer Controls */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Layers className="h-5 w-5 text-primary" />
                <h2 className="font-semibold">Map Layers</h2>
              </div>
              
              <div className="space-y-3">
                {layers.map((layer) => (
                  <div 
                    key={layer.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-smooth cursor-pointer"
                    onClick={() => toggleLayer(layer.id, layer.url)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded ${layer.color}`} />
                      <div>
                        <div className="text-sm font-medium">{layer.name}</div>
                        <div className="text-xs text-muted-foreground">{layer.description}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {selectedLayers.includes(layer.id) && (
                        <Badge variant="secondary" className="text-xs">Active</Badge>
                      )}
                      <Eye className={`h-4 w-4 ${
                        selectedLayers.includes(layer.id) ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
</Card>

              {/* Display clicked location */}
   {/* Clicked Location Info Card */}
<Card className="mt-6 p-4 bg-background/80 border border-muted-foreground rounded-xl shadow-sm">
  <h3 className="font-semibold text-lg mb-4 text-foreground">Clicked Location Info</h3>
  <div className="space-y-3">
    <div className="p-3 bg-primary/10 rounded-lg flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
      <span className="text-sm text-muted-foreground">Longitude</span>
      <span className="text-lg font-semibold text-foreground">{locationData.longitude.toFixed(3)}</span>
    </div>
    <div className="p-3 bg-primary/10 rounded-lg flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
      <span className="text-sm text-muted-foreground">Latitude</span>
      <span className="text-lg font-semibold text-foreground">{locationData.latitude.toFixed(3)}</span>
    </div>
    <div className="p-3 bg-primary/10 rounded-lg flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
      <span className="text-sm text-muted-foreground">Overall</span>
      <span className="text-lg font-semibold text-foreground">Arabian Sea</span>
    </div>
  </div>
</Card>


          </div>

          {/* Map Container */}
          <div className="lg:col-span-3"> 
            <Card className="map-container h-[600px] lg:h-[700px]">
              <div className="w-full h-full rounded-xl overflow-hidden">
                <iframe
                  id="earth-map"
                  src={mapUrl}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  title="Earth Nullschool Map"
                  sandbox="allow-scripts allow-same-origin" 
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heatmaps;
