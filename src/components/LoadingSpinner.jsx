import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Animated loading state indicator with pulse animation.
 */
export default function LoadingSpinner({ city }) {
  return (
    <div className="loading-container" aria-live="polite">
      <div className="spinner-halo">
        <Loader2 size={36} className="spinner-spin" />
      </div>
      <p className="loading-text">
        Fetching live weather data {city ? `for ${city}` : ''}...
      </p>
    </div>
  );
}
