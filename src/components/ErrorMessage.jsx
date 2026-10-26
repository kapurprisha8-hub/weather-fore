import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

/**
 * Friendly Error notification card with a retry button.
 */
export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-card" role="alert">
      <div className="error-icon-wrapper">
        <AlertCircle size={24} className="error-icon" />
      </div>
      <div className="error-content">
        <h4 className="error-title">Oops! Weather query failed</h4>
        <p className="error-message">{message || 'Unable to load weather data. Please try another city.'}</p>
      </div>
      {onRetry && (
        <button type="button" className="retry-btn" onClick={onRetry}>
          <RotateCcw size={16} />
          <span>Retry</span>
        </button>
      )}
    </div>
  );
}
