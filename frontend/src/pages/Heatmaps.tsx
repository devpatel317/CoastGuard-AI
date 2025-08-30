import { useState } from 'react';
import { MapPin, Layers, Eye, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Heatmaps = () => {
  const [selectedLayers, setSelectedLayers] = useState(['cyclone', 'pollution']);

  const layers = [
    { 
      id: 'cyclone', 
      name: 'Cyclone Risk', 
      color: 'bg-danger', 
      active: true,
      description: 'Real-time cyclone formation and intensity tracking'
    },
    { 
      id: 'tide', 
      name: 'Tide Levels', 
      color: 'bg-primary', 
      active: false,
      description: 'Current and predicted tidal patterns'
    },
    { 
      id: 'erosion', 
      name: 'Erosion Risk', 
      color: 'bg-warning', 
      active: false,
      description: 'Coastal erosion monitoring and prediction'
    },
    { 
      id: 'pollution', 
      name: 'Pollution Events', 
      color: 'bg-accent', 
      active: true,
      description: 'Water quality and contamination tracking'
    }
  ];

  const toggleLayer = (layerId: string) => {
    setSelectedLayers(prev => 
      prev.includes(layerId) 
        ? prev.filter(id => id !== layerId)
        : [...prev, layerId]
    );
  };

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
                    onClick={() => toggleLayer(layer.id)}
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

              <div className="mt-6 pt-4 border-t">
                <h3 className="font-medium mb-3">Risk Legend</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-success rounded" />
                    <span className="text-sm">Low Risk</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-warning rounded" />
                    <span className="text-sm">Moderate Risk</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-danger rounded" />
                    <span className="text-sm">High Risk</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 mt-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <MapPin className="h-4 w-4 mr-2" />
                  Find My Location
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Map Settings
                </Button>
              </div>
            </Card>
          </div>

          {/* Map Container */}
          <div className="lg:col-span-3">
            <Card className="map-container h-[600px] lg:h-[700px]">
              <div className="w-full h-full bg-gradient-to-br from-primary/5 to-primary-glow/10 rounded-xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Interactive Map Loading
                    </h3>
                    <p className="text-muted-foreground max-w-md">
                      This is a placeholder for the interactive Leaflet/Mapbox map component. 
                      The map will show real-time threat heatmaps with the selected layers.
                    </p>
                  </div>
                  <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                    <span>Lat: 13.0827° N</span>
                    <span>Lng: 80.2707° E</span>
                    <span>Zoom: 8</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Map Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card className="p-4">
                <div className="text-sm text-muted-foreground">Current View</div>
                <div className="text-lg font-semibold">Bay of Bengal</div>
                <div className="text-xs text-muted-foreground mt-1">Eastern Coastal Region</div>
              </Card>
              <Card className="p-4">
                <div className="text-sm text-muted-foreground">Active Threats</div>
                <div className="text-lg font-semibold text-danger">2 High Risk</div>
                <div className="text-xs text-muted-foreground mt-1">Cyclone + Pollution</div>
              </Card>
              <Card className="p-4">
                <div className="text-sm text-muted-foreground">Last Updated</div>
                <div className="text-lg font-semibold">3 min ago</div>
                <div className="text-xs text-muted-foreground mt-1">Auto-refresh enabled</div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heatmaps;