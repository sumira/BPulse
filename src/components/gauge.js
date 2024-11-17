import React from 'react';

const Gauge = ({ value = 65, min = 0, max = 100 }) => {
  const radius = 120;
  const strokeWidth = 20;
  const normalizedValue = Math.min(Math.max(value, min), max);
  const percentage = ((normalizedValue - min) / (max - min)) * 100;
  
  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 180) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  };

  const describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
  };

  const backgroundArc = describeArc(150, 150, radius, -5, 185);
  const valueArc = describeArc(150, 150, radius, -5, ((190 * percentage) / 100) - 5);

  return (
    <div className="w-96 p-4 bg-slate-100 rounded-lg shadow">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Temperature</h2>
      </div>
      <div className="relative flex justify-center items-center">
        <svg width="300" height="200" viewBox="0 0 300 200">
          {/* Background arc */}
          <path
            d={backgroundArc}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Value arc */}
          <path
            d={valueArc}
            fill="none"
            stroke="#ef4444"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Min value (0) */}
          <text
            x="25"
            y="190"
            style={{ 
              fontSize: '16px',
              fill: '#666666'
            }}
          >
            {min}
          </text>
          {/* Max value (100) */}
          <text
            x="255"
            y="190"
            style={{ 
              fontSize: '16px',
              fill: '#666666'
            }}
          >
            {max}
          </text>
          {/* Current value */}
          <text
            x="150"
            y="130"
            textAnchor="middle"
            style={{ 
              fontSize: '36px',
              fontWeight: 'bold',
              fill: '#111827'
            }}
          >
            {value}
          </text>
          {/* Degree symbol */}
          <text
            x="190"
            y="115"
            style={{ 
              fontSize: '20px',
              fill: '#666666'
            }}
          >
            °C
          </text>
        </svg>
      </div>
    </div>
  );
};

export default Gauge;