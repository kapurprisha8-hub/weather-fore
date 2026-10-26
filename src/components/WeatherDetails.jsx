import React from 'react';
import { Droplets, Wind, Gauge, Umbrella } from 'lucide-react';

/**
 * Grid of secondary weather metrics: Humidity, Wind Speed, Pressure, and Precipitation chance.
 */
export default function WeatherDetails({ weatherData }) {
  if (!weatherData || !weatherData.current) return null;

  const { current, daily } = weatherData;
  const precipChance = daily?.precipitation_probability_max?.[0] ?? current.precipitation ?? 0;

  const metrics = [
    {
      id: 'humidity',
      label: 'Humidity',
      value: `${current.relative_humidity_2m}%`,
      subtext: current.relative_humidity_2m > 65 ? 'High moisture' : 'Comfortable',
      icon: Droplets,
      iconColor: '#38bdf8',
    },
    {
      id: 'wind',
      label: 'Wind Speed',
      value: `${current.wind_speed_10m} km/h`,
      subtext: current.wind_speed_10m > 20 ? 'Breezy' : 'Gentle breeze',
      icon: Wind,
      iconColor: '#a78bfa',
    },
    {
      id: 'pressure',
      label: 'Pressure',
      value: `${Math.round(current.surface_pressure || 1013)} hPa`,
      subtext: 'Barometric',
      icon: Gauge,
      iconColor: '#34d399',
    },
    {
      id: 'precipitation',
      label: 'Rain Chance',
      value: `${precipChance}%`,
      subtext: precipChance > 50 ? 'Rain expected' : 'Low probability',
      icon: Umbrella,
      iconColor: '#fbbf24',
    },
  ];

  return (
    <section className="weather-details-section">
      <h3 className="section-title">Today's Highlights</h3>
      <div className="details-grid">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.id} className="detail-card">
              <div className="detail-header">
                <span className="detail-label">{metric.label}</span>
                <div className="detail-icon" style={{ color: metric.iconColor }}>
                  <Icon size={20} />
                </div>
              </div>
              <div className="detail-value">{metric.value}</div>
              <div className="detail-subtext">{metric.subtext}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
