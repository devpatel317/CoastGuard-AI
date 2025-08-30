import { useState, useEffect } from 'react';
import { Filter, Eye, CheckCircle, XCircle, Clock, MapPin, Plus, X, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CommunityReports = () => {
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [locationError, setLocationError] = useState('');

  // Initial reports data
  const [reports, setReports] = useState([
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
  ]);

  // Form state for new complaint
  const [newComplaint, setNewComplaint] = useState({
    type: '',
    title: '',
    location: '',
    description: '',
    coordinates: '',
    priority: 'medium'
  });

  // Auto-detect user location when form opens
  useEffect(() => {
    if (showSubmitForm) {
      setLocationError('');
      
      if (!navigator.geolocation) {
        setLocationError("Geolocation is not supported by your browser");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(4);
          const lng = position.coords.longitude.toFixed(4);
          setNewComplaint(prev => ({
            ...prev,
            coordinates: `${lat}°N, ${lng}°E`
          }));
        },
        (err) => {
          setLocationError("Unable to retrieve your location. You can enter coordinates manually.");
          console.error(err);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    }
  }, [showSubmitForm]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  // Calculate dynamic statistics
  const totalReports = reports.length;
  const pendingReports = reports.filter(r => r.status === 'pending').length;
  const verifiedReports = reports.filter(r => r.status === 'verified').length;
  const verificationRate = totalReports > 0 ? Math.round((verifiedReports / totalReports) * 100) : 0;
  const uniqueContributors = [...new Set(reports.map(r => r.reporterId))].length;

  const filteredReports = reports.filter(report => {
    const typeMatch = filterType === 'all' || report.type.toLowerCase() === filterType;
    const statusMatch = filterStatus === 'all' || report.status === filterStatus;
    const searchMatch = searchTerm === '' || 
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase());
    return typeMatch && statusMatch && searchMatch;
  });

  const handleSubmitComplaint = () => {
    
    // Validate form
    if (!newComplaint.type || !newComplaint.title || !newComplaint.location || !newComplaint.description) {
      alert('Please fill in all required fields');
      return;
    }

    // Generate new complaint ID
    const newId = `CR-${String(reports.length + 1).padStart(3, '0')}`;
    
    // Create new complaint object
    const complaint = {
      id: newId,
      type: newComplaint.type,
      title: newComplaint.title,
      location: newComplaint.location,
      reporterId: `User_${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
      status: 'pending',
      priority: newComplaint.priority,
      description: newComplaint.description,
      coordinates: newComplaint.coordinates || 'Coordinates not provided'
    };

    // Add to reports
    setReports([complaint, ...reports]);
    
    // Reset form
    setNewComplaint({
      type: '',
      title: '',
      location: '',
      description: '',
      coordinates: '',
      priority: 'medium'
    });
    
    // Close form
    setShowSubmitForm(false);
    
    // Show success message
    alert('Complaint submitted successfully! It will be reviewed by our team.');
  };

  const resetForm = () => {
    setNewComplaint({
      type: '',
      title: '',
      location: '',
      description: '',
      coordinates: '',
      priority: 'medium'
    });
    setShowSubmitForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Reports</h1>
            <p className="text-gray-600">Crowdsourced environmental monitoring and incident reporting</p>
          </div>
          <Button 
            onClick={() => setShowSubmitForm(true)}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Submit Report
          </Button>
        </div>

        {/* Submit Complaint Modal */}
        {showSubmitForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Submit New Complaint</h2>
                  <Button variant="ghost" size="sm" onClick={resetForm}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Report Type <span className="text-red-500">*</span>
                      </label>
                      <Select value={newComplaint.type} onValueChange={(value) => setNewComplaint({...newComplaint, type: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pollution">Pollution</SelectItem>
                          <SelectItem value="Illegal Dumping">Illegal Dumping</SelectItem>
                          <SelectItem value="Erosion">Erosion</SelectItem>
                          <SelectItem value="Flooding">Flooding</SelectItem>
                          <SelectItem value="Wildlife Disturbance">Wildlife Disturbance</SelectItem>
                          <SelectItem value="Infrastructure Damage">Infrastructure Damage</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Priority Level
                      </label>
                      <Select value={newComplaint.priority} onValueChange={(value) => setNewComplaint({...newComplaint, priority: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low Priority</SelectItem>
                          <SelectItem value="medium">Medium Priority</SelectItem>
                          <SelectItem value="high">High Priority</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={newComplaint.title}
                      onChange={(e) => setNewComplaint({...newComplaint, title: e.target.value})}
                      placeholder="Brief description of the issue"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={newComplaint.location}
                      onChange={(e) => setNewComplaint({...newComplaint, location: e.target.value})}
                      placeholder="Area or landmark name"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Coordinates
                    </label>
                    <Input
                      value={newComplaint.coordinates}
                      onChange={(e) => setNewComplaint({...newComplaint, coordinates: e.target.value})}
                      placeholder="Auto-detecting location..."
                      className="w-full"
                    />
                    {locationError && (
                      <p className="text-xs text-red-600 mt-1">{locationError}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Location will be auto-detected. You can modify if needed.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={newComplaint.description}
                      onChange={(e) => setNewComplaint({...newComplaint, description: e.target.value})}
                      placeholder="Detailed description of the environmental issue..."
                      className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <div className="flex items-center space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <p className="text-sm text-yellow-800">
                      Please ensure your report is accurate and factual. False reports may result in account suspension.
                    </p>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Button onClick={handleSubmitComplaint} className="flex-1 bg-blue-600 text-white hover:bg-blue-700">
                      Submit Complaint
                    </Button>
                    <Button variant="outline" onClick={resetForm} className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Dynamic Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="text-2xl font-bold text-gray-900">{totalReports}</div>
            <div className="text-sm text-gray-600">Total Reports</div>
            <div className="text-xs text-green-600 mt-1">↑ {Math.round((totalReports / 50) * 100)}% this month</div>
          </Card>
          <Card className="p-6">
            <div className="text-2xl font-bold text-yellow-600">{pendingReports}</div>
            <div className="text-sm text-gray-600">Pending Review</div>
            <div className="text-xs text-gray-500 mt-1">Avg. review: 4.2 hours</div>
          </Card>
          <Card className="p-6">
            <div className="text-2xl font-bold text-green-600">{verificationRate}%</div>
            <div className="text-sm text-gray-600">Verification Rate</div>
            <div className="text-xs text-gray-500 mt-1">Last 30 days</div>
          </Card>
          <Card className="p-6">
            <div className="text-2xl font-bold text-blue-600">{uniqueContributors}</div>
            <div className="text-sm text-gray-600">Active Contributors</div>
            <div className="text-xs text-gray-500 mt-1">This month</div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-5 w-5 text-blue-600" />
            <h2 className="font-semibold">Filter Reports</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Search</label>
              <Input 
                placeholder="Search reports..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Report Type</label>
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
                  <SelectItem value="wildlife disturbance">Wildlife Disturbance</SelectItem>
                  <SelectItem value="infrastructure damage">Infrastructure Damage</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Status</label>
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
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setFilterType('all');
                  setFilterStatus('all');
                  setSearchTerm('');
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </Card>

        {/* Reports Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">ID / Type</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Reporter</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Timestamp</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredReports.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      No reports found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredReports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{report.id}</div>
                          <div className="text-sm text-gray-600">{report.type}</div>
                          <div className={`text-xs font-medium ${getPriorityColor(report.priority)}`}>
                            {report.priority.toUpperCase()} PRIORITY
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start space-x-2">
                          <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{report.location}</div>
                            <div className="text-xs text-gray-500">{report.coordinates}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{report.reporterId}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{report.timestamp}</div>
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
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-500">
          Showing {filteredReports.length} of {reports.length} reports
        </div>
      </div>
    </div>
  );
};

export default CommunityReports;