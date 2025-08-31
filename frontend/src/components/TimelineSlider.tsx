import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';

const TimelineSlider = () => {
  const [selectedYear, setSelectedYear] = useState([2024]);

  const timePoints = [
    { year: 2024, label: 'Now', color: 'text-primary' },
    { year: 2030, label: '2030', color: 'text-warning' },
    { year: 2050, label: '2050', color: 'text-warning' },
    { year: 2100, label: '2100', color: 'text-danger' },
  ];

  // Updated, more realistic dataset
  const climateData = {
    stormRisk: { 2024: 15, 2030: 25, 2050: 45, 2100: 75 },
    seaLevel: { 2024: 10, 2030: 15, 2050: 30, 2100: 70 }, // realistic
    oceanPH: { 2024: 8.1, 2030: 7.9, 2050: 7.7, 2100: 7.3 },
    tempRise: { 2024: 2.0, 2030: 2.5, 2050: 3.2, 2100: 4.1 },
  };

  // Linear interpolation helper
  const interpolate = (dataset: Record<number, number>, year: number) => {
    const years = Object.keys(dataset).map(Number).sort((a, b) => a - b);
    if (year <= years[0]) return dataset[years[0]];
    if (year >= years[years.length - 1]) return dataset[years[years.length - 1]];

    for (let i = 0; i < years.length - 1; i++) {
      const y1 = years[i], y2 = years[i + 1];
      if (year >= y1 && year <= y2) {
        const v1 = dataset[y1], v2 = dataset[y2];
        return v1 + ((v2 - v1) * (year - y1)) / (y2 - y1);
      }
    }
    return dataset[years[0]];
  };

  const getYearInfo = (year: number) => {
    if (year <= 2025) return {
      period: 'Current Conditions',
      description: 'Real-time threat analysis based on current environmental data',
      color: 'text-primary',
    };
    if (year <= 2035) return {
      period: 'Short-term Projections',
      description: 'Moderate sea level rise and increased storm intensity',
      color: 'text-warning',
    };
    if (year <= 2055) return {
      period: 'Medium-term Projections',
      description: 'Significant coastal changes expected (~30cm sea level rise)',
      color: 'text-warning',
    };
    return {
      period: 'Long-term Projections',
      description: 'Dramatic coastline changes with up to 70cm rise possible',
      color: 'text-danger',
    };
  };

  const year = selectedYear[0];
  const currentInfo = getYearInfo(year);

  const stormRisk = interpolate(climateData.stormRisk, year).toFixed(0) + '%';
  const seaLevel = interpolate(climateData.seaLevel, year).toFixed(1) + ' cm';
  const oceanPH = interpolate(climateData.oceanPH, year).toFixed(2);
  const tempRise = interpolate(climateData.tempRise, year).toFixed(1) + '°C';

  return (
    <Card className="relative p-6 bg-coastal-gradient">
      {/* Side Label */}
      <div className="absolute top-4 right-4 bg-card/70 text-sm px-3 py-1 rounded-full shadow-md">
        🌍 Region: Gujarat, India
      </div>

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
                <div
                  className={`text-xs font-medium ${
                    Math.abs(year - point.year) <= 5 ? point.color : 'text-muted-foreground'
                  }`}
                >
                  {point.label}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{point.year}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Current selection info */}
        <div className="bg-card/50 rounded-lg p-4 animate-fade-in-scale">
          <div className="flex items-center justify-between mb-2">
            <h4 className={`font-semibold ${currentInfo.color}`}>{currentInfo.period}</h4>
            <span className="text-sm text-muted-foreground">Year: {year}</span>
          </div>
          <p className="text-sm text-muted-foreground">{currentInfo.description}</p>
        </div>

        {/* Risk indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="text-center p-3 bg-card/30 rounded-lg">
            <div className="text-lg font-bold text-foreground">{stormRisk}</div>
            <div className="text-xs text-muted-foreground">Storm Risk</div>
          </div>
          <div className="text-center p-3 bg-card/30 rounded-lg">
            <div className="text-lg font-bold text-foreground">{seaLevel}</div>
            <div className="text-xs text-muted-foreground">Sea Level</div>
          </div>
          <div className="text-center p-3 bg-card/30 rounded-lg">
            <div className="text-lg font-bold text-foreground">{oceanPH}</div>
            <div className="text-xs text-muted-foreground">Ocean pH</div>
          </div>
          <div className="text-center p-3 bg-card/30 rounded-lg">
            <div className="text-lg font-bold text-foreground">{tempRise}</div>
            <div className="text-xs text-muted-foreground">Temp Rise</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TimelineSlider;
