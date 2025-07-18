import React from 'react';

export default function SkillIcon({ icon }) {
  return (
    <div style={{ width: 140, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      {/* Dodecahedron-like polygon background */}
      <svg width="130" height="130" viewBox="0 0 100 100" style={{ position: 'absolute', left: 5, top: 5, zIndex: 1 }}>
        <polygon
          points="50,10 81,25 95,55 81,85 50,90 19,85 5,55 19,25"
          fill="#23233b"
          stroke="#44446a"
          strokeWidth="3"
        />
      </svg>
      {/* Skill logo */}
      <img
        src={icon}
        alt="skill icon"
        style={{ width: 74, height: 74, objectFit: 'contain', zIndex: 2, position: 'relative', filter: 'drop-shadow(0 2px 6px #0008)' }}
        draggable={false}
      />
    </div>
  );
} 