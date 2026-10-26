// Weather code mapping according to WMO (World Meteorological Organization) standards
// used by the Open-Meteo API.
export const WEATHER_INTERPRETATION = {
  0: { label: 'Clear Sky', icon: 'Sun' },
  1: { label: 'Mainly Clear', icon: 'SunMedium' },
  2: { label: 'Partly Cloudy', icon: 'CloudSun' },
  3: { label: 'Overcast', icon: 'Cloud' },
  45: { label: 'Foggy', icon: 'CloudFog' },
  48: { label: 'Rime Fog', icon: 'CloudFog' },
  51: { label: 'Light Drizzle', icon: 'CloudDrizzle' },
  53: { label: 'Moderate Drizzle', icon: 'CloudDrizzle' },
  55: { label: 'Dense Drizzle', icon: 'CloudDrizzle' },
  61: { label: 'Slight Rain', icon: 'CloudRain' },
  63: { label: 'Moderate Rain', icon: 'CloudRain' },
  65: { label: 'Heavy Rain', icon: 'CloudRain' },
  71: { label: 'Slight Snow', icon: 'CloudSnow' },
  73: { label: 'Moderate Snow', icon: 'CloudSnow' },
  75: { label: 'Heavy Snow', icon: 'CloudSnow' },
  77: { label: 'Snow Grains', icon: 'CloudSnow' },
  80: { label: 'Slight Rain Showers', icon: 'CloudRain' },
  81: { label: 'Moderate Rain Showers', icon: 'CloudRain' },
  82: { label: 'Violent Rain Showers', icon: 'CloudRain' },
  85: { label: 'Slight Snow Showers', icon: 'CloudSnow' },
  86: { label: 'Heavy Snow Showers', icon: 'CloudSnow' },
  95: { label: 'Thunderstorm', icon: 'CloudLightning' },
  96: { label: 'Thunderstorm with Hail', icon: 'CloudLightning' },
  99: { label: 'Heavy Thunderstorm with Hail', icon: 'CloudLightning' },
};

/**
 * Returns user-friendly weather info from WMO code.
 */
export function getWeatherInfo(code) {
  return WEATHER_INTERPRETATION[code] || { label: 'Partly Cloudy', icon: 'CloudSun' };
}

/**
 * Converts Celsius to Fahrenheit.
 */
export function toFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

/**
 * Formats time string (ISO 8601 e.g. "2026-10-26T06:43") into 12-hour or 24-hour readable string.
 */
export function formatTime(isoString) {
  if (!isoString) return '--:--';
  const timePart = isoString.split('T')[1];
  if (!timePart) return isoString;
  const [hour, minute] = timePart.split(':');
  const h = parseInt(hour, 10);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const displayHour = h % 12 || 12;
  return `${String(displayHour).padStart(2, '0')}:${minute} ${suffix}`;
}

/**
 * Fetches geographical coordinates for a given city name using Open-Meteo Geocoding.
 * No API key required!
 */
export async function getCoordinatesByCity(cityName) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    cityName.trim()
  )}&count=1&language=en&format=json`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Unable to connect to the geocoding service.');
  }

  const data = await response.json();
  if (!data.results || data.results.length === 0) {
    throw new Error(`City "${cityName}" not found. Please verify the spelling.`);
  }

  const location = data.results[0];
  return {
    name: location.name,
    country: location.country || '',
    admin1: location.admin1 || '',
    latitude: location.latitude,
    longitude: location.longitude,
  };
}

/**
 * Fetches weather data (current, hourly trend, and 5-day daily forecast with sunrise/sunset).
 * No API key required!
 */
export async function getWeatherForecast(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,surface_pressure&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset&timezone=auto`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to retrieve weather data from Open-Meteo.');
  }

  const data = await response.json();
  return data;
}
