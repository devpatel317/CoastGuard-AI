import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ThreatCardProps {
  title: string;
  riskScore: number;
  status: string;
  description: string;
  icon: LucideIcon;
  lastUpdated?: string;
}

const ThreatCard = ({ 
  title, 
  riskScore, 
  status, 
  description, 
  icon: Icon, 
  lastUpdated 
}: ThreatCardProps) => {
  const getRiskLevel = (score: number) => {
    if (score >= 80) return 'danger';
    if (score >= 60) return 'warning';
    if (score >= 30) return 'safe';
    return 'success';
  };

  const getRiskClasses = (level: string) => {
    switch (level) {
      case 'danger':
        return 'threat-danger';
      case 'warning':
        return 'threat-warning';
      case 'safe':
        return 'threat-safe';
      default:
        return 'threat-success';
    }
  };

  const riskLevel = getRiskLevel(riskScore);

  return (
    <Card className="p-6 hover:shadow-elevated transition-smooth animate-fade-in-scale">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-xl ${getRiskClasses(riskLevel)}`}>
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{status}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-foreground">{riskScore}</div>
          <div className="text-xs text-muted-foreground">Risk Score</div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4">{description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            riskLevel === 'danger' ? 'bg-danger' :
            riskLevel === 'warning' ? 'bg-warning' :
            riskLevel === 'safe' ? 'bg-success' : 'bg-success'
          }`} />
          <span className="text-xs text-muted-foreground capitalize">
            {riskLevel === 'safe' ? 'Low Risk' : 
             riskLevel === 'success' ? 'Very Low Risk' :
             riskLevel === 'warning' ? 'Moderate Risk' : 'High Risk'}
          </span>
        </div>
        {lastUpdated && (
          <span className="text-xs text-muted-foreground">
            Updated {lastUpdated}
          </span>
        )}
      </div>
    </Card>
  );
};

export default ThreatCard;