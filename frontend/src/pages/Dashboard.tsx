import { 
  Waves, 
  Wind, 
  AlertTriangle, 
  Droplets, 
  Fish,
  MapPin
} from 'lucide-react';
import ThreatCard from '@/components/ThreatCard';
import TimelineSlider from '@/components/TimelineSlider';
import coastalHero from '@/assets/coastal-hero.jpg';

const Dashboard = () => {
  const threats = [
    {
      title: 'Cyclone Risk',
      riskScore: 85,
      status: 'High Alert',
      description: 'Tropical cyclone formation detected in Bay of Bengal. Wind speeds projected to reach 150+ km/h within 48 hours.',
      icon: Wind,
      lastUpdated: '5 min ago'
    },
    {
      title: 'High Tide Alert',
      riskScore: 65,
      status: 'Moderate Warning',
      description: 'Astronomical high tides combined with storm surge may cause coastal flooding in low-lying areas.',
      icon: Waves,
      lastUpdated: '12 min ago'
    },
    {
      title: 'Tsunami Alert',
      riskScore: 25,
      status: 'Low Risk',
      description: 'No significant seismic activity detected. Ocean buoys report normal wave patterns across monitoring network.',
      icon: AlertTriangle,
      lastUpdated: '1 hour ago'
    },
    {
      title: 'Pollution Events',
      riskScore: 45,
      status: 'Monitoring',
      description: 'Industrial discharge reported near Port Area. Water quality testing in progress, avoid swimming until clearance.',
      icon: Droplets,
      lastUpdated: '3 hours ago'
    },
    {
      title: 'Algal Bloom Detection',
      riskScore: 35,
      status: 'Advisory',
      description: 'Moderate algal bloom detected offshore. Some marine life disruption expected, commercial fishing advised to avoid area.',
      icon: Fish,
      lastUpdated: '6 hours ago'
    },
    {
      title: 'Coastal Erosion',
      riskScore: 55,
      status: 'Ongoing Concern',
      description: 'Accelerated erosion observed at 3 monitoring stations. Infrastructure assessment recommended for affected areas.',
      icon: MapPin,
      lastUpdated: '1 day ago'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-primary/10 to-primary-glow/10 overflow-hidden">
        <img 
          src={coastalHero} 
          alt="Coastal monitoring" 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary-glow/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-4">
              Coastal Threat Dashboard
            </h1>
            <p className="text-xl opacity-90 max-w-2xl">
              AI-powered real-time monitoring and early warning system for coastal and marine threats
            </p>
            <div className="mt-4 flex items-center space-x-4 text-sm opacity-80">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span>System Active</span>
              </div>
              <div>Last Updated: 2 minutes ago</div>
              <div>6 Monitoring Stations</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Timeline Slider */}
        <div className="mb-8">
          <TimelineSlider />
        </div>

        {/* Threat Cards Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Current Threats</h2>
              <p className="text-muted-foreground">Real-time analysis of coastal and marine risks</p>
            </div>
            <div className="text-sm text-muted-foreground">
              Auto-refresh: 30 seconds
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {threats.map((threat) => (
              <ThreatCard
                key={threat.title}
                title={threat.title}
                riskScore={threat.riskScore}
                status={threat.status}
                description={threat.description}
                icon={threat.icon}
                lastUpdated={threat.lastUpdated}
              />
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card p-6 rounded-xl border shadow-coastal">
            <div className="text-2xl font-bold text-primary">6</div>
            <div className="text-sm text-muted-foreground">Active Monitors</div>
          </div>
          <div className="bg-card p-6 rounded-xl border shadow-coastal">
            <div className="text-2xl font-bold text-warning">2</div>
            <div className="text-sm text-muted-foreground">Active Warnings</div>
          </div>
          <div className="bg-card p-6 rounded-xl border shadow-coastal">
            <div className="text-2xl font-bold text-success">847</div>
            <div className="text-sm text-muted-foreground">Community Reports</div>
          </div>
          <div className="bg-card p-6 rounded-xl border shadow-coastal">
            <div className="text-2xl font-bold text-foreground">99.2%</div>
            <div className="text-sm text-muted-foreground">System Uptime</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;