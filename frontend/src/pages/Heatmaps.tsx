import { useState, useEffect } from 'react';
import { Layers, Eye } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Heatmaps = () => {
  const [activeLayer, setActiveLayer] = useState('wind');
  const [mapUrl, setMapUrl] = useState(
    "https://earth.nullschool.net/#current/wind/surface/level/orthographic=-288.91,19.87,4139/loc=71.264,19.628"
  );

  const [locationData, setLocationData] = useState({
    longitude: 69.969,
    latitude: 21.5137,
    location: "Unknown"
  });

  const layers = [
    { 
      id: 'wind', 
      name: 'Wind', 
      color: 'bg-red-500', 
      description: 'Real-time wind tracking',
      url: "https://earth.nullschool.net/#current/wind/surface/level/orthographic=-288.91,19.87,4139/loc=71.264,19.628"
    },
    { 
      id: 'tide', 
      name: 'Tide Levels', 
      color: 'bg-blue-500', 
      description: 'Current ocean wave patterns',
      url: "https://earth.nullschool.net/#current/ocean/primary/waves/overlay=significant_wave_height/orthographic=70,20,2698/loc=69.969,21.5137"
    },
    { 
      id: 'erosion', 
      name: 'Erosion Risk', 
      color: 'bg-yellow-500', 
      description: 'CO2 concentration + wind overlay',
      url: "https://earth.nullschool.net/#current/chem/surface/level/overlay=co2sc/orthographic=-288.91,19.87,4139/loc=71.264,19.628"
    }
  ];

  const toggleLayer = (layerId: string, url: string) => {
    if (activeLayer === layerId) {
      // already selected → do nothing
      return;
    }
    setActiveLayer(layerId);
    setMapUrl(url);
  };

  useEffect(() => {
    const iframe = document.getElementById("earth-map") as HTMLIFrameElement;

    if (!iframe) return;

    const interval = setInterval(() => {
      try {
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
    }, 1000);

    return () => clearInterval(interval);
  }, [mapUrl]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Impact Zone Heatmaps</h1>
          <p className="text-muted-foreground">Interactive threat visualization and risk assessment mapping</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
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
                      {activeLayer === layer.id && (
                        <Badge variant="secondary" className="text-xs">Active</Badge>
                      )}
                      <Eye className={`h-4 w-4 ${
                        activeLayer === layer.id ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Clicked Location Info */}
            <Card className="mt-6 p-4 bg-background/80 border border-muted-foreground rounded-xl shadow-sm">
              <h3 className="font-semibold text-lg mb-4 text-foreground">Clicked Location Info</h3>
              <div className="space-y-3">
                {/* <div className="p-3 bg-primary/10 rounded-lg flex justify-between">
                  <span className="text-sm text-muted-foreground">Longitude</span>
                  <span className="text-lg font-semibold">{locationData.longitude.toFixed(3)}</span>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg flex justify-between">
                  <span className="text-sm text-muted-foreground">Latitude</span>
                  <span className="text-lg font-semibold">{locationData.latitude.toFixed(3)}</span>
                </div> */}
                <div className="p-3 bg-primary/10 rounded-lg flex justify-between">
                  <span className="text-sm text-muted-foreground">Overall</span>
                  <span className="text-lg font-semibold">Arabian Sea</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Map */}
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
