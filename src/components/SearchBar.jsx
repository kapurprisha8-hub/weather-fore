import React, { useState } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';

const QUICK_CITIES = ['London', 'New York', 'Tokyo', 'Paris', 'Mumbai', 'Sydney'];

/**
 * SearchBar component with text input, submit button, and quick-pick popular city chips.
 */
export default function SearchBar({ onSearch, isLoading }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;
    onSearch(query.trim());
  };

  const handleQuickCityClick = (city) => {
    setQuery(city);
    onSearch(city);
  };

  return (
    <section className="search-section">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <MapPin size={20} className="search-icon-left" />
          <input
            id="city-search-input"
            type="text"
            className="search-input"
            placeholder="Search city (e.g. London, Tokyo, New York)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
            autoComplete="off"
          />
        </div>
        <button
          id="search-submit-btn"
          type="submit"
          className="search-btn"
          disabled={!query.trim() || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="spinner" />
              <span>Searching...</span>
            </>
          ) : (
            <>
              <Search size={18} />
              <span>Search</span>
            </>
          )}
        </button>
      </form>

      {/* Quick City suggestions */}
      <div className="quick-cities">
        <span className="quick-label">Popular:</span>
        <div className="quick-chips">
          {QUICK_CITIES.map((city) => (
            <button
              key={city}
              type="button"
              className="quick-chip"
              onClick={() => handleQuickCityClick(city)}
              disabled={isLoading}
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
