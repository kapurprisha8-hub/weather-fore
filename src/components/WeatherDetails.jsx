import React from 'react';
import { Droplets, Wind, Gauge, Umbrella, Sunrise, Sunset } from 'lucide-react';
import { formatTime } from '../services/weatherApi';

/**
 * Grid of weather metrics including Humidity, Wind, Pressure, Rain, Sunrise, and Sunset.
 */
export default function WeatherDetails({ weatherData }) {
  if (!weatherData || !weatherData.current) return null;

  const { current, daily } = weatherData;
  const precipChance = daily?.precipitation_probability_max?.[0] ?? current.precipitation ?? 0;
  const sunriseDisplay = daily?.sunrise?.[0] ? formatTime(daily.sunrise[0]) : '06:30 AM';
  const sunsetDisplay = daily?.sunset?.[0] ? formatTime(daily.sunset[0]) : '06:45 PM';

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
      iconColor: '#38bdf8',
    },
    {
      id: 'sunrise',
      label: 'Sunrise',
      value: sunriseDisplay,
      subtext: 'Morning dawn',
      icon: Sunrise,
      iconColor: '#fb923c',
    },
    {
      id: 'sunset',
      label: 'Sunset',
      value: sunsetDisplay,
      subtext: 'Evening dusk',
      icon: Sunset,
      iconColor: '#f43f5e',
    },
  ];

  return (
    <section className="weather-details-section">
      <h3 className="section-title">Today's Highlights</h3>
      <div className="details-grid details-grid-6">
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
