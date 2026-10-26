import React from 'react';
import WeatherIcon from './WeatherIcon';
import { getWeatherInfo, toFahrenheit } from '../services/weatherApi';
import { Calendar, ArrowUp, ArrowDown } from 'lucide-react';

/**
 * Formats a date string (YYYY-MM-DD) into a readable weekday and month string.
 */
function formatTodayDate(dateString) {
  if (!dateString) return 'Today';
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Current Weather hero card displaying primary temperature, condition, and location details.
 */
export default function CurrentWeather({ location, weatherData, unit }) {
  if (!weatherData || !weatherData.current) return null;

  const { current, daily } = weatherData;
  const weatherInfo = getWeatherInfo(current.weather_code);

  const displayTemp = (tempC) => {
    if (tempC == null) return '--';
    return unit === 'F' ? `${toFahrenheit(tempC)}°F` : `${Math.round(tempC)}°C`;
  };

  const todayDate = formatTodayDate(daily?.time?.[0]);
  const highTemp = daily?.temperature_2m_max?.[0];
  const lowTemp = daily?.temperature_2m_min?.[0];

  return (
    <article className="current-weather-card">
      <div className="current-top">
        <div className="location-info">
          <h2 className="city-name">{location.name}</h2>
          <p className="city-details">
            {[location.admin1, location.country].filter(Boolean).join(', ')}
          </p>
          <div className="date-badge">
            <Calendar size={14} />
            <span>{todayDate}</span>
          </div>
        </div>

        <div className="weather-badge">
          <div className="weather-icon-bubble">
            <WeatherIcon name={weatherInfo.icon} size={48} className="weather-icon-primary" />
          </div>
          <span className="weather-condition-text">{weatherInfo.label}</span>
        </div>
      </div>

      <div className="current-bottom">
        <div className="temp-hero">
          <span className="temp-value">{displayTemp(current.temperature_2m)}</span>
          <span className="feels-like">
            Feels like {displayTemp(current.apparent_temperature)}
          </span>
        </div>

        {highTemp != null && lowTemp != null && (
          <div className="high-low-pills">
            <span className="high-pill" title="Today's high">
              <ArrowUp size={14} /> {displayTemp(highTemp)}
            </span>
            <span className="low-pill" title="Today's low">
              <ArrowDown size={14} /> {displayTemp(lowTemp)}
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
