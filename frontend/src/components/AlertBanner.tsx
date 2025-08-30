import { useState } from 'react';
import { AlertTriangle, X, Info, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Alert {
  id: string;
  type: 'danger' | 'warning' | 'info';
  message: string;
  location?: string;
}

const AlertBanner = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'danger',
      message: 'Cyclone Alert: High risk detected in Bay of Bengal. Immediate evacuation recommended for coastal areas.',
      location: 'Bay of Bengal'
    },
    {
      id: '2', 
      type: 'warning',
      message: 'High Tide Warning: Unusual tidal patterns expected between 2:00 PM - 6:00 PM today.',
      location: 'Eastern Coastline'
    }
  ]);

  const removeAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'danger':
        return <AlertTriangle className="h-5 w-5" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getAlertClasses = (type: string) => {
    switch (type) {
      case 'danger':
        return 'bg-danger text-danger-foreground border-danger/20 animate-alert-pulse';
      case 'warning':
        return 'bg-warning text-warning-foreground border-warning/20';
      default:
        return 'bg-primary text-primary-foreground border-primary/20';
    }
  };

  if (alerts.length === 0) return null;

  return (
    <div className="space-y-1">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`px-4 py-3 border-b ${getAlertClasses(alert.type)} animate-slide-in`}
        >
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-3">
              {getAlertIcon(alert.type)}
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {alert.message}
                </p>
                {alert.location && (
                  <p className="text-xs opacity-90 mt-1">
                    Location: {alert.location}
                  </p>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeAlert(alert.id)}
              className="text-current hover:bg-white/20 ml-4"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertBanner;