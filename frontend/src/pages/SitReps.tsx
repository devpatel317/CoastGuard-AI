import { Download, Calendar, MapPin, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SitReps = () => {
  const reports = [
    {
      id: 'SITREP-2024-001',
      title: 'Bay of Bengal Cyclone Threat Assessment',
      generatedAt: '2024-01-15 15:30',
      location: 'Eastern Coastal Region',
      severity: 'high',
      summary: 'Tropical cyclone formation detected with projected landfall in 48-72 hours. Wind speeds expected to reach Category 3 intensity. Immediate evacuation recommended for low-lying coastal areas.',
      keyMetrics: {
        affectedPopulation: '2.3M',
        riskLevel: '85%',
        evacuationZones: '12',
        emergencyResponse: 'Active'
      },
      tags: ['Cyclone', 'Emergency', 'Evacuation']
    },
    {
      id: 'SITREP-2024-002',
      title: 'Weekly Coastal Pollution Monitoring Report',
      generatedAt: '2024-01-14 10:00',
      location: 'Chennai Metropolitan Area',
      severity: 'medium',
      summary: 'Water quality analysis shows moderate pollution levels in 3 monitoring zones. Industrial discharge compliance requires attention. No immediate health risks identified.',
      keyMetrics: {
        waterQualityIndex: '64/100',
        pollutionSources: '8',
        complianceRate: '78%',
        remediation: 'Ongoing'
      },
      tags: ['Pollution', 'Water Quality', 'Monitoring']
    },
    {
      id: 'SITREP-2024-003',
      title: 'Tsunami Early Warning System Status',
      generatedAt: '2024-01-13 08:15',
      location: 'Indian Ocean Network',
      severity: 'low',
      summary: 'All tsunami detection buoys operational. No seismic activity of concern detected. Ocean monitoring systems functioning within normal parameters.',
      keyMetrics: {
        buoyStatus: '24/24',
        seismicActivity: 'Normal',
        systemUptime: '99.8%',
        lastTest: '48 hours'
      },
      tags: ['Tsunami', 'Monitoring', 'Systems Check']
    },
    {
      id: 'SITREP-2024-004',
      title: 'Climate Change Impact Assessment - Q1 2024',
      generatedAt: '2024-01-12 14:45',
      location: 'Tamil Nadu Coastline',
      severity: 'medium',
      summary: 'Sea level rise measurements show 3.2mm increase this quarter. Accelerated erosion observed at 5 monitoring stations. Mangrove restoration projects showing positive results.',
      keyMetrics: {
        seaLevelRise: '3.2mm',
        erosionRate: '+15%',
        mangroveRecovery: '23%',
        temperatureIncrease: '+0.8°C'
      },
      tags: ['Climate Change', 'Sea Level', 'Erosion', 'Mangroves']
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-danger text-danger-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Situation Reports (SitReps)</h1>
            <p className="text-muted-foreground">AI-generated comprehensive threat analysis and emergency briefings</p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Download className="h-4 w-4 mr-2" />
            Generate New Report
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="text-2xl font-bold text-foreground">47</div>
            <div className="text-sm text-muted-foreground">Reports Generated</div>
            <div className="text-xs text-success mt-1">This month</div>
          </Card>
          <Card className="p-6">
            <div className="text-2xl font-bold text-danger">3</div>
            <div className="text-sm text-muted-foreground">High Severity</div>
            <div className="text-xs text-muted-foreground mt-1">Active alerts</div>
          </Card>
          <Card className="p-6">
            <div className="text-2xl font-bold text-primary">15min</div>
            <div className="text-sm text-muted-foreground">Avg. Generation Time</div>
            <div className="text-xs text-muted-foreground mt-1">AI processing</div>
          </Card>
          <Card className="p-6">
            <div className="text-2xl font-bold text-success">2.1K</div>
            <div className="text-sm text-muted-foreground">Total Downloads</div>
            <div className="text-xs text-muted-foreground mt-1">PDF exports</div>
          </Card>
        </div>

        {/* Reports Grid */}
        <div className="space-y-6">
          {reports.map((report) => (
            <Card key={report.id} className="p-6 hover:shadow-elevated transition-smooth">
              {/* Report Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{report.title}</h3>
                    <Badge className={getSeverityColor(report.severity)}>
                      {report.severity.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{report.generatedAt}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{report.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="font-medium">ID:</span>
                      <span>{report.id}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Report Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Summary */}
                <div className="lg:col-span-2">
                  <h4 className="font-medium text-foreground mb-2">Executive Summary</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {report.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {report.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Key Metrics */}
                <div>
                  <h4 className="font-medium text-foreground mb-2">Key Metrics</h4>
                  <div className="space-y-3">
                    {Object.entries(report.keyMetrics).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="text-sm font-medium text-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Map and Chart Placeholders */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-muted/30 rounded-lg p-4 h-32 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                    <div className="text-sm text-muted-foreground">Location Map</div>
                  </div>
                </div>
                <div className="bg-muted/30 rounded-lg p-4 h-32 flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                    <div className="text-sm text-muted-foreground">Risk Trend Chart</div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-xs text-muted-foreground">
                  Auto-generated by AI • Based on real-time sensor data
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    PDF
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    CSV
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline">
            Load More Reports
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SitReps;