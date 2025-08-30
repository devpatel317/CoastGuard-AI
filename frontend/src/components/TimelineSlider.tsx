import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';

const TimelineSlider = () => {
  const [selectedYear, setSelectedYear] = useState([2024]);
  
  const timePoints = [
    { year: 2024, label: 'Now', color: 'text-primary' },
    { year: 2030, label: '2030', color: 'text-warning' },
    { year: 2050, label: '2050', color: 'text-warning' },
    { year: 2100, label: '2100', color: 'text-danger' }
  ];

  const getYearInfo = (year: number) => {
    if (year <= 2025) return { 
      period: 'Current Conditions',
      description: 'Real-time threat analysis based on current environmental data',
      color: 'text-primary'
    };
    if (year <= 2035) return { 
      period: 'Short-term Projections (2030)',
      description: 'Climate models show moderate sea level rise and increased storm intensity',
      color: 'text-warning'
    };
    if (year <= 2055) return { 
      period: 'Medium-term Projections (2050)',
      description: 'Significant coastal changes expected with 30-50cm sea level rise',
      color: 'text-warning'
    };
    return { 
      period: 'Long-term Projections (2100)',
      description: 'Dramatic coastline changes with up to 1m sea level rise possible',
      color: 'text-danger'
    };
  };

  const currentInfo = getYearInfo(selectedYear[0]);

  return (
    <Card className="p-6 bg-coastal-gradient">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Climate Timeline</h3>
        <p className="text-sm text-muted-foreground">
          Explore how coastal threats evolve over time with climate change projections
        </p>
      </div>

      <div className="space-y-6">
        {/* Timeline Slider */}
        <div className="px-3">
          <Slider
            value={selectedYear}
            onValueChange={setSelectedYear}
            max={2100}
            min={2024}
            step={1}
            className="w-full"
          />
          
          {/* Year markers */}
          <div className="flex justify-between mt-2 px-1">
            {timePoints.map((point) => (
              <div key={point.year} className="flex flex-col items-center">
                <div className={`text-xs font-medium ${
                  Math.abs(selectedYear[0] - point.year) <= 5 ? point.color : 'text-muted-foreground'
                }`}>
                  {point.label}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {point.year}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current selection info */}
        <div className="bg-card/50 rounded-lg p-4 animate-fade-in-scale">
          <div className="flex items-center justify-between mb-2">
            <h4 className={`font-semibold ${currentInfo.color}`}>
              {currentInfo.period}
            </h4>
            <span className="text-sm text-muted-foreground">
              Year: {selectedYear[0]}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {currentInfo.description}
          </p>
        </div>

        {/* Risk indicators for selected timeframe */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="text-center p-3 bg-card/30 rounded-lg">
            <div className="text-lg font-bold text-foreground">
              {selectedYear[0] <= 2025 ? '15%' : 
               selectedYear[0] <= 2035 ? '25%' :
               selectedYear[0] <= 2055 ? '45%' : '75%'}
            </div>
            <div className="text-xs text-muted-foreground">Storm Risk</div>
          </div>
          <div className="text-center p-3 bg-card/30 rounded-lg">
            <div className="text-lg font-bold text-foreground">
              {selectedYear[0] <= 2025 ? '10cm' : 
               selectedYear[0] <= 2035 ? '15cm' :
               selectedYear[0] <= 2055 ? '35cm' : '85cm'}
            </div>
            <div className="text-xs text-muted-foreground">Sea Level</div>
          </div>
          <div className="text-center p-3 bg-card/30 rounded-lg">
            <div className="text-lg font-bold text-foreground">
              {selectedYear[0] <= 2025 ? '8.1' : 
               selectedYear[0] <= 2035 ? '7.9' :
               selectedYear[0] <= 2055 ? '7.7' : '7.3'}
            </div>
            <div className="text-xs text-muted-foreground">Ocean pH</div>
          </div>
          <div className="text-center p-3 bg-card/30 rounded-lg">
            <div className="text-lg font-bold text-foreground">
              {selectedYear[0] <= 2025 ? '2°C' : 
               selectedYear[0] <= 2035 ? '2.5°C' :
               selectedYear[0] <= 2055 ? '3.2°C' : '4.1°C'}
            </div>
            <div className="text-xs text-muted-foreground">Temp Rise</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TimelineSlider;