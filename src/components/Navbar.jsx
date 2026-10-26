import React from 'react';
import { CloudSun, User, LogOut } from 'lucide-react';

/**
 * Top Navigation bar with project branding, temperature unit toggle (°C / °F),
 * and User Authentication (Sign In / User Profile / Sign Out).
 */
export default function Navbar({ unit, onToggleUnit, user, onOpenAuth, onLogout }) {
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

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

        {/* User Authentication Status */}
        {user ? (
          <div className="user-profile-menu">
            <div className="user-avatar" title={`Logged in as ${user.name}`}>
              {getInitials(user.name)}
            </div>
            <span className="user-name">{user.name}</span>
            <button
              type="button"
              className="logout-btn"
              onClick={onLogout}
              title="Sign Out"
              aria-label="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="signin-nav-btn"
            onClick={onOpenAuth}
          >
            <User size={16} />
            <span>Sign In</span>
          </button>
        )}

        {/* GitHub link / Group Project tag */}
        <span className="project-badge">Group Project</span>
      </div>
    </header>
  );
}
