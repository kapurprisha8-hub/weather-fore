import React from 'react';
import { Heart } from 'lucide-react';

/**
 * Footer component with team attribution, tech stack info, and Open-Meteo attribution.
 */
export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p className="footer-credits">
          Built with <Heart size={14} className="heart-icon" /> by the Frontend Team • React + Vite
        </p>
        <p className="footer-api-note">
          Weather data powered by{' '}
          <a
            href="https://open-meteo.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Open-Meteo Free API
          </a>{' '}
          (No API key required)
        </p>
      </div>
    </footer>
  );
}
