import React from 'react';
import { CloudSun } from 'lucide-react';

/**
 * Top Navigation bar with project branding and temperature unit toggle (°C / °F).
 */
export default function Navbar({ unit, onToggleUnit }) {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <div className="brand-icon-wrapper">
          <CloudSun size={26} className="brand-icon" />
        </div>
        <div>
          <h1 className="brand-title">SkyPulse</h1>
          <p className="brand-subtitle">Simple Weather Dashboard</p>
        </div>
      </div>

      <div className="navbar-actions">
        {/* Unit Toggle Button */}
        <div className="unit-toggle-group" role="group" aria-label="Temperature unit selection">
          <button
            type="button"
            className={`unit-btn ${unit === 'C' ? 'active' : ''}`}
            onClick={() => onToggleUnit('C')}
            title="Switch to Celsius"
          >
            °C
          </button>
          <button
            type="button"
            className={`unit-btn ${unit === 'F' ? 'active' : ''}`}
            onClick={() => onToggleUnit('F')}
            title="Switch to Fahrenheit"
          >
            °F
          </button>
        </div>

        {/* GitHub link / Group Project tag */}
        <span className="project-badge">Group Project</span>
      </div>
    </header>
  );
}
