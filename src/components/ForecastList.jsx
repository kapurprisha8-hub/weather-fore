import React from 'react';
import ForecastCard from './ForecastCard';
import { CalendarDays } from 'lucide-react';

/**
 * 5-Day Weather Forecast section with responsive horizontal / grid cards.
 */
export default function ForecastList({ dailyData, unit }) {
  if (!dailyData || !dailyData.time) return null;

  // Take the first 5 days from the forecast
  const days = dailyData.time.slice(0, 5);

  return (
    <section className="forecast-section">
      <div className="forecast-section-header">
        <div className="section-title-wrapper">
          <CalendarDays size={20} className="section-icon" />
          <h3 className="section-title">5-Day Forecast</h3>
        </div>
        <span className="forecast-subtitle">Daily outlook & temperature trends</span>
      </div>

      <div className="forecast-grid">
        {days.map((dateStr, index) => (
          <ForecastCard
            key={dateStr}
            dateStr={dateStr}
            weatherCode={dailyData.weather_code[index]}
            maxTemp={dailyData.temperature_2m_max[index]}
            minTemp={dailyData.temperature_2m_min[index]}
            rainChance={dailyData.precipitation_probability_max?.[index] ?? 0}
            unit={unit}
            isToday={index === 0}
          />
        ))}
      </div>
    </section>
  );
}
