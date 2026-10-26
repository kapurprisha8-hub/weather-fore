import React from 'react';
import WeatherIcon from './WeatherIcon';
import { getWeatherInfo, toFahrenheit } from '../services/weatherApi';
import { Umbrella } from 'lucide-react';

/**
 * Single day forecast card for the multi-day forecast strip.
 */
export default function ForecastCard({ dateStr, weatherCode, maxTemp, minTemp, rainChance, unit, isToday }) {
  const weatherInfo = getWeatherInfo(weatherCode);

  const displayTemp = (tempC) => {
    if (tempC == null) return '--';
    return unit === 'F' ? `${toFahrenheit(tempC)}°` : `${Math.round(tempC)}°`;
  };

  // Format date to weekday
  const dateObj = new Date(dateStr + 'T00:00:00');
  const dayName = isToday
    ? 'Today'
    : dateObj.toLocaleDateString(undefined, { weekday: 'short' });
  const formattedDate = dateObj.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className={`forecast-card ${isToday ? 'is-today' : ''}`}>
      <div className="forecast-day-header">
        <span className="forecast-day-name">{dayName}</span>
        <span className="forecast-date">{formattedDate}</span>
      </div>

      <div className="forecast-icon-wrapper" title={weatherInfo.label}>
        <WeatherIcon name={weatherInfo.icon} size={32} />
      </div>

      <span className="forecast-condition">{weatherInfo.label}</span>

      <div className="forecast-temps">
        <span className="forecast-temp-max" title="High temperature">
          {displayTemp(maxTemp)}
        </span>
        <span className="forecast-temp-divider">/</span>
        <span className="forecast-temp-min" title="Low temperature">
          {displayTemp(minTemp)}
        </span>
      </div>

      {rainChance > 0 && (
        <div className="forecast-rain" title="Precipitation chance">
          <Umbrella size={12} />
          <span>{rainChance}%</span>
        </div>
      )}
    </div>
  );
}
