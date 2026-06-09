import React from "react";

interface MascotSvgProps {
  className?: string;
  expression?: "happy" | "goofy" | "intense";
}

export default function MascotSvg({ className = "w-10 h-10" }: MascotSvgProps) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={`${className} transition-all duration-300`}
      id="mascot-svg"
    >
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff9c4" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#fbc02d" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Face */}
      <circle cx="50" cy="50" r="42" fill="#FFD54F" stroke="#1c1917" strokeWidth="3" />
      
      {/* Glasses Rim */}
      <circle cx="34" cy="42" r="16" fill="none" stroke="#1c1917" strokeWidth="5" />
      <circle cx="66" cy="42" r="16" fill="none" stroke="#1c1917" strokeWidth="5" />
      <path d="M42 42 h16" stroke="#1c1917" strokeWidth="5" />
      <path d="M10 42 h8" stroke="#1c1917" strokeWidth="4" />
      <path d="M82 42 h8" stroke="#1c1917" strokeWidth="4" />

      {/* Eyes */}
      <circle cx="34" cy="42" r="11" fill="#FFF" />
      <circle cx="66" cy="42" r="11" fill="#FFF" />
      
      {/* Pupils (Goofy green looking sideways) */}
      <circle cx="38" cy="40" r="5" fill="#4CAF50" />
      <circle cx="38" cy="40" r="2.5" fill="#000" />
      <circle cx="70" cy="40" r="5" fill="#4CAF50" />
      <circle cx="70" cy="40" r="2.5" fill="#000" />

      {/* Cheeks */}
      <circle cx="21" cy="56" r="4" fill="#FF8A80" opacity="0.6" />
      <circle cx="79" cy="56" r="4" fill="#FF8A80" opacity="0.6" />

      {/* Goofy smile with two buck teeth */}
      <path 
        d="M32 58 Q50 78 68 58" 
        fill="#3d2723" 
        stroke="#1c1917" 
        strokeWidth="3" 
        strokeLinecap="round" />
      <rect x="44" y="64" width="5.5" height="7.5" fill="#FFF" stroke="#1c1917" strokeWidth="1.5" rx="1" />
      <rect x="50.5" y="64" width="5.5" height="7.5" fill="#FFF" stroke="#1c1917" strokeWidth="1.5" rx="1" />
    </svg>
  );
}
