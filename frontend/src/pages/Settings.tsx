import { Bell, Shield, Database, Globe, User, Smartphone } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const Settings = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">System Settings</h1>
          <p className="text-muted-foreground">Configure your coastal threat monitoring preferences and system behavior</p>
        </div>

        <Tabs defaultValue="alerts" className="space-y-6">
          <TabsList className="grid grid-cols-6 w-full">
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="alerts">
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Bell className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Alert Preferences</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Threat Notifications</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Cyclone Alerts', description: 'Receive notifications for tropical cyclone formations and warnings' },
                      { label: 'Tsunami Warnings', description: 'Immediate alerts for seismic activity and tsunami risks' },
                      { label: 'High Tide Alerts', description: 'Notifications for extreme tidal events and coastal flooding' },
                      { label: 'Pollution Events', description: 'Alerts for water quality issues and contamination events' },
                      { label: 'Community Reports', description: 'Updates on verified community-submitted reports' }
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium text-foreground">{item.label}</div>
                          <div className="text-sm text-muted-foreground">{item.description}</div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-4">Alert Delivery</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Email Notifications</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">SMS Alerts</span>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Push Notifications</span>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Sound Alerts</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Desktop Notifications</span>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Emergency Override</span>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring">
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Globe className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Monitoring Configuration</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Geographic Focus</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">Primary Location</label>
                      <Input placeholder="Chennai, Tamil Nadu" />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">Monitoring Radius (km)</label>
                      <Input placeholder="50" type="number" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Data Refresh Intervals</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: 'Weather Data', value: '5 minutes' },
                      { label: 'Ocean Conditions', value: '15 minutes' },
                      { label: 'Satellite Imagery', value: '1 hour' },
                      { label: 'Community Reports', value: 'Real-time' }
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">{item.label}</span>
                        <span className="text-sm font-medium text-primary">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Risk Thresholds</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Auto-generate SitReps at risk level</span>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Emergency alert threshold</span>
                      <span className="text-sm font-medium">90%</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="data">
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Database className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Data Management</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Data Sources</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'NOAA Weather Service', status: 'Connected', uptime: '99.8%' },
                      { name: 'Indian Meteorological Dept', status: 'Connected', uptime: '98.5%' },
                      { name: 'Ocean Buoy Network', status: 'Connected', uptime: '97.2%' },
                      { name: 'Satellite Imagery', status: 'Connected', uptime: '99.1%' },
                      { name: 'Community Reports API', status: 'Connected', uptime: '99.9%' }
                    ].map((source) => (
                      <div key={source.name} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium text-foreground">{source.name}</div>
                          <div className="text-sm text-muted-foreground">Uptime: {source.uptime}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-success rounded-full" />
                          <span className="text-sm text-success">{source.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-4">Data Retention</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Historical weather data</span>
                      <span className="text-sm font-medium">5 years</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Community reports</span>
                      <span className="text-sm font-medium">2 years</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">System logs</span>
                      <span className="text-sm font-medium">90 days</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button variant="outline">Export Data</Button>
                  <Button variant="outline">Data Backup</Button>
                  <Button variant="outline">Privacy Settings</Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="api">
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Shield className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">API Configuration</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">API Keys</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">Primary API Key</label>
                      <div className="flex space-x-2">
                        <Input value="sk-••••••••••••••••••••••••••••••••" readOnly />
                        <Button variant="outline" size="sm">Regenerate</Button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">Webhook URL</label>
                      <Input placeholder="https://your-app.com/webhook" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">API Limits</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 border rounded-lg">
                      <div className="text-2xl font-bold text-foreground">2,847</div>
                      <div className="text-sm text-muted-foreground">Requests this month</div>
                      <div className="text-xs text-success mt-1">28% of limit</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="text-2xl font-bold text-foreground">156ms</div>
                      <div className="text-sm text-muted-foreground">Avg response time</div>
                      <div className="text-xs text-success mt-1">Excellent</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Webhook Events</h3>
                  <div className="space-y-3">
                    {[
                      'threat.created',
                      'alert.triggered',
                      'report.verified',
                      'system.maintenance'
                    ].map((event) => (
                      <div key={event} className="flex items-center justify-between">
                        <span className="text-sm font-mono">{event}</span>
                        <Switch defaultChecked />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <User className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Account Settings</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Profile Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">Organization</label>
                      <Input value="Chennai Port Authority" />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">Department</label>
                      <Input value="Emergency Management" />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">Contact Email</label>
                      <Input value="admin@coastguard.gov.in" />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">Emergency Phone</label>
                      <Input value="+91 98765 43210" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-4">Security</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Two-factor authentication</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Login notifications</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Session timeout (hours)</span>
                      <span className="text-sm font-medium">8</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button>Save Changes</Button>
                  <Button variant="outline">Change Password</Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Smartphone className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">System Information</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">System Status</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 border rounded-lg">
                      <div className="text-lg font-bold text-success">Operational</div>
                      <div className="text-sm text-muted-foreground">System Status</div>
                      <div className="text-xs text-muted-foreground mt-1">All services running</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="text-lg font-bold text-foreground">v2.1.4</div>
                      <div className="text-sm text-muted-foreground">Version</div>
                      <div className="text-xs text-primary mt-1">Update available</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Performance Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 border rounded-lg text-center">
                      <div className="text-2xl font-bold text-success">99.8%</div>
                      <div className="text-sm text-muted-foreground">Uptime</div>
                    </div>
                    <div className="p-3 border rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary">347ms</div>
                      <div className="text-sm text-muted-foreground">Response Time</div>
                    </div>
                    <div className="p-3 border rounded-lg text-center">
                      <div className="text-2xl font-bold text-warning">68%</div>
                      <div className="text-sm text-muted-foreground">Resource Usage</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Maintenance</h3>
                  <div className="space-y-3">
                    <div className="flex space-x-3">
                      <Button variant="outline">Run Diagnostics</Button>
                      <Button variant="outline">Clear Cache</Button>
                      <Button variant="outline">Export Logs</Button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Last maintenance: January 12, 2024 at 02:00 UTC
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;