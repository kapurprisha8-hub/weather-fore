import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import WeatherDetails from './components/WeatherDetails';
import HourlyChart from './components/HourlyChart';
import ForecastList from './components/ForecastList';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import { getCoordinatesByCity, getWeatherForecast } from './services/weatherApi';
import './App.css';

/**
 * Main Application Component for the Weather Dashboard.
 * Manages state for selected city, weather data, units (°C/°F), user authentication, and modals.
 */
export default function App() {
  // Current search query / active city
  const [city, setCity] = useState('London');
  // Geocoded location data (name, country, coordinates)
  const [location, setLocation] = useState(null);
  // Full weather data from Open-Meteo
  const [weatherData, setWeatherData] = useState(null);
  // Temperature unit ('C' or 'F')
  const [unit, setUnit] = useState('C');
  // Loading & Error states - starts true for initial data fetch
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Authentication State
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('skypulse_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  /**
   * Fetches weather information for a specified city (used by SearchBar and retry).
   */
  const fetchWeather = async (targetCity) => {
    setIsLoading(true);
    setError(null);

    try {
      // Step 1: Geocode city name to coordinates
      const loc = await getCoordinatesByCity(targetCity);
      setLocation(loc);

      // Step 2: Fetch weather forecast using coordinates
      const data = await getWeatherForecast(loc.latitude, loc.longitude);
      setWeatherData(data);
      setCity(targetCity);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('skypulse_user');
    setUser(null);
  };

  // Load default city on initial mount with cleanup cancellation
  useEffect(() => {
    let isCancelled = false;

    async function loadInitialWeather() {
      try {
        const loc = await getCoordinatesByCity('London');
        if (isCancelled) return;
        setLocation(loc);

        const data = await getWeatherForecast(loc.latitude, loc.longitude);
        if (isCancelled) return;
        setWeatherData(data);
      } catch (err) {
        if (!isCancelled) {
          setError(err.message || 'Failed to fetch weather data. Please try again.');
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    loadInitialWeather();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className="app-container">
      {/* Navigation Header with unit toggle & authentication */}
      <Navbar
        unit={unit}
        onToggleUnit={setUnit}
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      <main className="main-content">
        <div className="content-wrapper">
          {/* Search Bar & Quick Cities */}
          <SearchBar onSearch={fetchWeather} isLoading={isLoading} />

          {/* Error Banner */}
          {error && (
            <ErrorMessage
              message={error}
              onRetry={() => fetchWeather(city || 'London')}
            />
          )}

          {/* Loading Indicator */}
          {isLoading && <LoadingSpinner city={city} />}

          {/* Weather Content when data is available */}
          {!isLoading && weatherData && location && (
            <div className="weather-dashboard-view">
              {/* Primary hero card: current temperature & condition */}
              <CurrentWeather
                location={location}
                weatherData={weatherData}
                unit={unit}
              />

              {/* Highlights grid: Humidity, Wind, Pressure, Rain, Sunrise, Sunset */}
              <WeatherDetails weatherData={weatherData} />

              {/* Hourly Temperature Trend (Graphical Representation) */}
              <HourlyChart hourlyData={weatherData.hourly} unit={unit} />

              {/* 5-day daily forecast */}
              <ForecastList dailyData={weatherData.daily} unit={unit} />
            </div>
          )}
        </div>
      </main>

      {/* Login & Sign Up Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={(loggedInUser) => setUser(loggedInUser)}
      />

      {/* Footer with credits and API notes */}
      <Footer />
    </div>
  );
}
