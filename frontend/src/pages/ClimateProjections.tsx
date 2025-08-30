import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, Droplets, Thermometer, TreePine } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ClimateProjections = () => {
  const seaLevelData = [
    { year: 2024, current: 0, low: 0, medium: 0, high: 0 },
    { year: 2030, current: 8, low: 12, medium: 18, high: 25 },
    { year: 2040, current: 15, low: 25, medium: 35, high: 50 },
    { year: 2050, current: 22, low: 35, medium: 55, high: 80 },
    { year: 2060, current: 30, low: 50, medium: 75, high: 110 },
    { year: 2070, current: 38, low: 65, medium: 95, high: 140 },
    { year: 2080, current: 47, low: 80, medium: 120, high: 170 },
    { year: 2090, current: 56, low: 95, medium: 145, high: 200 },
    { year: 2100, current: 65, low: 110, medium: 170, high: 230 }
  ];

  const oceanAcidityData = [
    { year: 2024, pH: 8.1, temperature: 28.5 },
    { year: 2030, pH: 7.95, temperature: 29.2 },
    { year: 2040, pH: 7.85, temperature: 30.1 },
    { year: 2050, pH: 7.75, temperature: 30.8 },
    { year: 2060, pH: 7.65, temperature: 31.5 },
    { year: 2070, pH: 7.55, temperature: 32.2 },
    { year: 2080, pH: 7.45, temperature: 32.9 },
    { year: 2090, pH: 7.35, temperature: 33.6 },
    { year: 2100, pH: 7.25, temperature: 34.3 }
  ];

  const mangroveLossData = [
    { period: '2020-2025', loss: 12, restoration: 5 },
    { period: '2025-2030', loss: 18, restoration: 8 },
    { period: '2030-2035', loss: 25, restoration: 12 },
    { period: '2035-2040', loss: 35, restoration: 18 },
    { period: '2040-2045', loss: 45, restoration: 25 },
    { period: '2045-2050', loss: 60, restoration: 35 }
  ];

  const ecosystemData = [
    { habitat: 'Coral Reefs', current: 65, projected2030: 45, projected2050: 25, projected2100: 10 },
    { habitat: 'Mangroves', current: 78, projected2030: 68, projected2050: 52, projected2100: 35 },
    { habitat: 'Coastal Wetlands', current: 42, projected2030: 35, projected2050: 25, projected2100: 15 },
    { habitat: 'Seagrass Beds', current: 58, projected2030: 48, projected2050: 35, projected2100: 20 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Climate Projections</h1>
          <p className="text-muted-foreground">Long-term climate change impacts and coastal adaptation planning</p>
        </div>

        {/* Key Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Droplets className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">+65cm</div>
                <div className="text-sm text-muted-foreground">Sea Level by 2100</div>
                <div className="text-xs text-danger mt-1">Current trajectory</div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Thermometer className="h-6 w-6 text-warning" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">+3.2°C</div>
                <div className="text-sm text-muted-foreground">Ocean Temp Rise</div>
                <div className="text-xs text-warning mt-1">By 2080</div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-danger/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-danger" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">7.25</div>
                <div className="text-sm text-muted-foreground">Ocean pH by 2100</div>
                <div className="text-xs text-danger mt-1">Acidification</div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <TreePine className="h-6 w-6 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">35%</div>
                <div className="text-sm text-muted-foreground">Mangroves Left</div>
                <div className="text-xs text-success mt-1">With restoration</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="sea-level" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="sea-level">Sea Level Rise</TabsTrigger>
            <TabsTrigger value="ocean-health">Ocean Health</TabsTrigger>
            <TabsTrigger value="mangroves">Mangrove Loss</TabsTrigger>
            <TabsTrigger value="ecosystems">Ecosystems</TabsTrigger>
          </TabsList>

          <TabsContent value="sea-level">
            <Card className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Sea Level Rise Projections</h3>
                <p className="text-sm text-muted-foreground">
                  Projected sea level rise under different climate scenarios (cm above 2024 baseline)
                </p>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={seaLevelData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.5rem'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="high" 
                      stackId="1" 
                      stroke="hsl(var(--danger))" 
                      fill="hsl(var(--danger) / 0.2)" 
                      name="High Scenario"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="medium" 
                      stackId="2" 
                      stroke="hsl(var(--warning))" 
                      fill="hsl(var(--warning) / 0.3)" 
                      name="Medium Scenario"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="current" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      name="Current Trajectory"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="ocean-health">
            <Card className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Ocean Acidification & Temperature</h3>
                <p className="text-sm text-muted-foreground">
                  Projected changes in ocean pH levels and surface temperature
                </p>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={oceanAcidityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
                    <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" />
                    <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.5rem'
                      }}
                    />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="pH" 
                      stroke="hsl(var(--danger))" 
                      strokeWidth={3}
                      name="Ocean pH"
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="temperature" 
                      stroke="hsl(var(--warning))" 
                      strokeWidth={3}
                      name="Temperature (°C)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="mangroves">
            <Card className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Mangrove Forest Changes</h3>
                <p className="text-sm text-muted-foreground">
                  Projected mangrove loss vs restoration efforts (hectares per 5-year period)
                </p>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mangroveLossData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="period" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.5rem'
                      }}
                    />
                    <Bar dataKey="loss" fill="hsl(var(--danger))" name="Forest Loss" />
                    <Bar dataKey="restoration" fill="hsl(var(--success))" name="Restoration" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="ecosystems">
            <Card className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Coastal Ecosystem Health</h3>
                <p className="text-sm text-muted-foreground">
                  Projected habitat coverage (% of current area) under climate change scenarios
                </p>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart 
                    data={ecosystemData} 
                    layout="horizontal"
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                    <YAxis dataKey="habitat" type="category" stroke="hsl(var(--muted-foreground))" width={100} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.5rem'
                      }}
                    />
                    <Area dataKey="current" stackId="1" fill="hsl(var(--success))" name="Current" />
                    <Area dataKey="projected2030" stackId="2" fill="hsl(var(--warning))" name="2030" />
                    <Area dataKey="projected2050" stackId="3" fill="hsl(var(--danger))" name="2050" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Items */}
        <Card className="p-6 mt-8 bg-coastal-gradient">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recommended Adaptation Measures</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Short-term (2024-2030)</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Enhance early warning systems</li>
                <li>• Strengthen coastal defenses</li>
                <li>• Begin mangrove restoration</li>
                <li>• Improve drainage infrastructure</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Long-term (2030-2050)</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Planned retreat from high-risk areas</li>
                <li>• Floating infrastructure development</li>
                <li>• Ecosystem-based adaptation</li>
                <li>• Community relocation planning</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ClimateProjections;