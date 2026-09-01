import React from "react";

interface IHSSymbolProps {
  className?: string;
}

/**
 * IHS Christogram — the classic Jesuit emblem.
 * Letters I, H, S with a cross rising from the center of the H,
 * three nails below, enclosed in a sunburst radiance.
 * Rendered as an inline SVG for zero-dependency usage.
 */
export default function IHSSymbol({ className = "" }: IHSSymbolProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="IHS Christogram — Emblem of the Society of Jesus"
      role="img"
    >
      {/* Outer sunburst circle */}
      <circle
        cx="100"
        cy="100"
        r="90"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.3"
      />

      {/* Inner circle */}
      <circle
        cx="100"
        cy="100"
        r="72"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.2"
      />

      {/* Sunburst rays */}
      {Array.from({ length: 32 }).map((_, i) => {
        const angle = (i * 360) / 32;
        const rad = (angle * Math.PI) / 180;
        const inner = 74;
        const outer = i % 2 === 0 ? 92 : 84;
        return (
          <line
            key={i}
            x1={100 + inner * Math.cos(rad)}
            y1={100 + inner * Math.sin(rad)}
            x2={100 + outer * Math.cos(rad)}
            y2={100 + outer * Math.sin(rad)}
            stroke="currentColor"
            strokeWidth={i % 2 === 0 ? "1.5" : "0.8"}
            opacity="0.2"
          />
        );
      })}

      {/* Cross rising from H */}
      <line
        x1="100"
        y1="30"
        x2="100"
        y2="62"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.6"
      />
      <line
        x1="88"
        y1="42"
        x2="112"
        y2="42"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* IHS letters */}
      <text
        x="100"
        y="112"
        textAnchor="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="52"
        fontWeight="700"
        fill="currentColor"
        opacity="0.5"
        letterSpacing="-1"
      >
        IHS
      </text>

      {/* Three nails below */}
      <g opacity="0.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        {/* Center nail */}
        <line x1="100" y1="126" x2="100" y2="152" />
        <line x1="96" y1="126" x2="104" y2="126" />
        {/* Left nail */}
        <line x1="85" y1="130" x2="80" y2="155" />
        <line x1="81.5" y1="129" x2="88.5" y2="131" />
        {/* Right nail */}
        <line x1="115" y1="130" x2="120" y2="155" />
        <line x1="111.5" y1="131" x2="118.5" y2="129" />
      </g>
    </svg>
  );
}
