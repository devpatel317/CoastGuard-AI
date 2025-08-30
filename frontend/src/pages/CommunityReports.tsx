import { useState } from 'react';
import { Filter, Eye, CheckCircle, XCircle, Clock, MapPin, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CommunityReports = () => {
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const reports = [
    {
      id: 'CR-001',
      type: 'Pollution',
      title: 'Industrial waste discharge observed',
      location: 'Chennai Port Area',
      reporterId: 'User_847',
      timestamp: '2024-01-15 14:30',
      status: 'verified',
      priority: 'high',
      description: 'Dark colored discharge from industrial facility into coastal waters. Strong chemical odor reported.',
      coordinates: '13.0827°N, 80.2707°E'
    },
    {
      id: 'CR-002',
      type: 'Illegal Dumping',
      title: 'Plastic waste dumping on beach',
      location: 'Marina Beach South',
      reporterId: 'User_623',
      timestamp: '2024-01-15 11:45',
      status: 'pending',
      priority: 'medium',
      description: 'Large quantities of plastic bottles and containers dumped near fishing area.',
      coordinates: '13.0499°N, 80.2824°E'
    },
    {
      id: 'CR-003',
      type: 'Erosion',
      title: 'Accelerated shoreline erosion',
      location: 'Kovalam Beach',
      reporterId: 'User_291',
      timestamp: '2024-01-15 09:15',
      status: 'verified',
      priority: 'high',
      description: 'Significant beach erosion observed after recent storm. Several palm trees now at risk.',
      coordinates: '12.7833°N, 80.2500°E'
    },
    {
      id: 'CR-004',
      type: 'Flooding',
      title: 'Storm water flooding in residential area',
      location: 'Besant Nagar',
      reporterId: 'User_156',
      timestamp: '2024-01-14 18:20',
      status: 'rejected',
      priority: 'low',
      description: 'Street flooding during high tide. Water level approximately 30cm.',
      coordinates: '13.0067°N, 80.2669°E'
    },
    {
      id: 'CR-005',
      type: 'Pollution',
      title: 'Fish kill event reported',
      location: 'Pulicat Lake',
      reporterId: 'User_445',
      timestamp: '2024-01-14 16:10',
      status: 'pending',
      priority: 'high',
      description: 'Multiple dead fish observed floating. Possible water quality issue.',
      coordinates: '13.4167°N, 80.1833°E'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'rejected': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-danger';
      case 'medium': return 'text-warning';
      case 'low': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const filteredReports = reports.filter(report => {
    const typeMatch = filterType === 'all' || report.type.toLowerCase() === filterType;
    const statusMatch = filterStatus === 'all' || report.status === filterStatus;
    return typeMatch && statusMatch;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Community Reports</h1>
            <p className="text-muted-foreground">Crowdsourced environmental monitoring and incident reporting</p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Submit Report
          </Button>
        </div>

        {/* Filters and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="text-2xl font-bold text-foreground">847</div>
            <div className="text-sm text-muted-foreground">Total Reports</div>
            <div className="text-xs text-success mt-1">↑ 12% this month</div>
          </Card>
          <Card className="p-6">
            <div className="text-2xl font-bold text-warning">23</div>
            <div className="text-sm text-muted-foreground">Pending Review</div>
            <div className="text-xs text-muted-foreground mt-1">Avg. review: 4.2 hours</div>
          </Card>
          <Card className="p-6">
            <div className="text-2xl font-bold text-success">92%</div>
            <div className="text-sm text-muted-foreground">Verification Rate</div>
            <div className="text-xs text-muted-foreground mt-1">Last 30 days</div>
          </Card>
          <Card className="p-6">
            <div className="text-2xl font-bold text-primary">156</div>
            <div className="text-sm text-muted-foreground">Active Contributors</div>
            <div className="text-xs text-muted-foreground mt-1">This month</div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Filter Reports</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Search</label>
              <Input placeholder="Search reports..." />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Report Type</label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="pollution">Pollution</SelectItem>
                  <SelectItem value="illegal dumping">Illegal Dumping</SelectItem>
                  <SelectItem value="erosion">Erosion</SelectItem>
                  <SelectItem value="flooding">Flooding</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Status</label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" className="w-full">
                Apply Filters
              </Button>
            </div>
          </div>
        </Card>

        {/* Reports Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">ID / Type</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Reporter</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Timestamp</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-muted/30 transition-smooth">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-foreground">{report.id}</div>
                        <div className="text-sm text-muted-foreground">{report.type}</div>
                        <div className={`text-xs font-medium ${getPriorityColor(report.priority)}`}>
                          {report.priority.toUpperCase()} PRIORITY
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-foreground">{report.location}</div>
                          <div className="text-xs text-muted-foreground">{report.coordinates}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-foreground">{report.reporterId}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-foreground">{report.timestamp}</div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={getStatusColor(report.status)}>
                        {report.status === 'verified' && <CheckCircle className="h-3 w-3 mr-1" />}
                        {report.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                        {report.status === 'rejected' && <XCircle className="h-3 w-3 mr-1" />}
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Showing {filteredReports.length} of {reports.length} reports
        </div>
      </div>
    </div>
  );
};

export default CommunityReports;