import React from 'react';
import {
  Sun,
  SunMedium,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
} from 'lucide-react';

const iconMap = {
  Sun,
  SunMedium,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
};

/**
 * Reusable Weather Icon component that maps icon names to Lucide icon components.
 */
export default function WeatherIcon({ name, size = 28, className = '' }) {
  const IconComponent = iconMap[name] || CloudSun;
  return <IconComponent size={size} className={className} />;
}
