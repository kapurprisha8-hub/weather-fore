import React, { useState } from 'react';
import { TrendingUp, Clock } from 'lucide-react';
import { toFahrenheit } from '../services/weatherApi';

/**
 * Computes smooth SVG cubic bezier path string from an array of coordinates.
 */
function createSmoothSpline(points) {
  if (points.length < 2) return '';
  let path = `M ${points[0].x},${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i];
    const next = points[i + 1];
    const prev = points[i - 1] || current;
    const nextNext = points[i + 2] || next;

    // Catmull-Rom to Cubic Bezier control points calculation
    const cp1x = current.x + (next.x - prev.x) / 6;
    const cp1y = current.y + (next.y - prev.y) / 6;
    const cp2x = next.x - (nextNext.x - current.x) / 6;
    const cp2y = next.y - (nextNext.y - current.y) / 6;

    path += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${next.x.toFixed(1)},${next.y.toFixed(1)}`;
  }

  return path;
}

/**
 * Pure helper function to extract 8 evenly-spaced hourly data points from API data.
 */
function getSampledPoints(hourlyData) {
  if (!hourlyData || !hourlyData.time || !hourlyData.temperature_2m) return [];
  const maxSamples = 8;
  const step = 3;
  const sampled = [];

  for (let i = 0; i < maxSamples; i++) {
    const index = i * step;
    if (index >= hourlyData.time.length) break;
    const timeStr = hourlyData.time[index];
    const tempC = hourlyData.temperature_2m[index];

    // Format ISO "2026-10-26T08:00" string cleanly without impure Date() calls
    const timePart = timeStr.split('T')[1] || '00:00';
    const [hStr, mStr] = timePart.split(':');
    const h = parseInt(hStr, 10);
    const suffix = h >= 12 ? 'PM' : 'AM';
    const displayHour = h % 12 || 12;
    const formattedTime = `${String(displayHour).padStart(2, '0')}:${mStr || '00'} ${suffix}`;

    sampled.push({
      time: formattedTime,
      isoTime: timeStr,
      tempC,
    });
  }
  return sampled;
}

/**
 * Hourly temperature curve chart (Graphical Representation)
 * Styled exactly like modern weather analytics dashboards.
 */
export default function HourlyChart({ hourlyData, unit }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const sampledPoints = getSampledPoints(hourlyData);
  if (sampledPoints.length === 0) return null;

  // Calculate temperatures based on active unit (°C or °F)
  const temps = sampledPoints.map((p) =>
    unit === 'F' ? toFahrenheit(p.tempC) : Math.round(p.tempC)
  );

  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  const tempRange = Math.max(maxTemp - minTemp, 4); // Avoid zero division

  // SVG dimensions
  const svgWidth = 860;
  const svgHeight = 220;
  const paddingX = 70;
  const paddingTop = 45;
  const paddingBottom = 45;
  const chartHeight = svgHeight - paddingTop - paddingBottom;
  const chartWidth = svgWidth - paddingX * 2;

  // Compute (x, y) coordinates for each point
  const points = sampledPoints.map((item, i) => {
    const x = paddingX + (i / (sampledPoints.length - 1)) * chartWidth;
    const tempVal = temps[i];
    // Invert Y so highest temp is at top
    const y = paddingTop + chartHeight - ((tempVal - minTemp) / tempRange) * chartHeight;
    return {
      x,
      y,
      tempDisplay: `${tempVal}°${unit}`,
      time: item.time,
      tempVal,
    };
  });

  const splinePath = createSmoothSpline(points);
  const areaPath = `${splinePath} L ${points[points.length - 1].x},${svgHeight - paddingBottom + 10} L ${points[0].x},${svgHeight - paddingBottom + 10} Z`;

  // Left Y-axis values
  const yTicks = [maxTemp, Math.round((maxTemp + minTemp) / 2), minTemp];

  return (
    <section className="hourly-trend-card">
      <div className="trend-header">
        <div className="trend-title-wrapper">
          <TrendingUp size={20} className="trend-icon" />
          <h3 className="trend-title">Hourly Temperature Trend</h3>
        </div>
        <div className="trend-badge">
          <Clock size={14} />
          <span>Next 24 Hours</span>
        </div>
      </div>

      <div className="chart-container">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="trend-svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Area gradient under the curve */}
            <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#0284c7" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
            </linearGradient>

            {/* Glowing line filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#38bdf8" floodOpacity="0.6" />
            </filter>
          </defs>

          {/* Horizontal grid lines & Y-axis labels */}
          {yTicks.map((tickVal, idx) => {
            const yPos =
              paddingTop + chartHeight - ((tickVal - minTemp) / tempRange) * chartHeight;
            return (
              <g key={`ytick-${idx}`} className="chart-grid-line">
                <line
                  x1={paddingX - 10}
                  y1={yPos}
                  x2={svgWidth - paddingX + 10}
                  y2={yPos}
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingX - 22}
                  y={yPos + 4}
                  textAnchor="end"
                  fill="rgba(255, 255, 255, 0.4)"
                  fontSize="11"
                  fontWeight="600"
                >
                  {tickVal}°
                </text>
              </g>
            );
          })}

          {/* Area fill under curve */}
          <path d={areaPath} fill="url(#curveGradient)" />

          {/* Spline Curve Line */}
          <path
            d={splinePath}
            fill="none"
            stroke="#ffffff"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#glow)"
            className="trend-spline"
          />

          {/* Data Points, Temperature Labels & Time Labels */}
          {points.map((p, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <g
                key={`point-${idx}`}
                className="chart-point-group"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Temperature label above point */}
                <text
                  x={p.x}
                  y={p.y - 12}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize={isHovered ? '14' : '13'}
                  fontWeight="700"
                  className="point-temp-text"
                >
                  {p.tempDisplay}
                </text>

                {/* Point dot outer glow */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? 8 : 6}
                  fill="#ffffff"
                  stroke="#38bdf8"
                  strokeWidth="3"
                  className="point-circle"
                />

                {/* Time label below chart */}
                <text
                  x={p.x}
                  y={svgHeight - 12}
                  textAnchor="middle"
                  fill={isHovered ? '#38bdf8' : 'rgba(255, 255, 255, 0.7)'}
                  fontSize="11"
                  fontWeight={isHovered ? '700' : '500'}
                  className="point-time-text"
                >
                  {p.time}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </section>
  );
}
