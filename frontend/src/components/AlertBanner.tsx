import { useState } from 'react';
import { AlertTriangle, X, Info, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Alert {
  id: string;
  type: 'danger' | 'warning' | 'info';
  message: string;
}

const AlertBanner = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    { id: '1', type: 'danger', message: 'Cyclone Alert: High risk detected!' },
    { id: '2', type: 'warning', message: 'High Tide Warning expected today.' }
  ]);

  const removeAlert = (id: string) => setAlerts(alerts.filter(alert => alert.id !== id));

  const getIcon = (type: string) => {
    switch (type) {
      case 'danger': return <AlertTriangle className="h-4 w-4" />;
      case 'warning': return <AlertCircle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getClasses = (type: string) => {
    switch (type) {
      case 'danger': return 'bg-red-600 text-white';
      case 'warning': return 'bg-yellow-500 text-black';
      default: return 'bg-blue-600 text-white';
    }
  };

  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50 w-72">
      {alerts.map(alert => (
        <div
          key={alert.id}
          className={`flex items-center justify-between px-3 py-2 rounded shadow ${getClasses(alert.type)}`}
        >
          <div className="flex items-center space-x-2 text-sm font-medium">
            {getIcon(alert.type)}
            <span>{alert.message}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeAlert(alert.id)}
            className="p-0 h-4 w-4"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default AlertBanner;
