import React from 'react';

export default function Contact3DIcon() {
  return (
    <div className="envelope-svg-3d-anim">
      <img
        src="/icons/envelope.svg"
        alt="Envelope Icon"
        style={{ width: '320px', height: '320px', filter: 'drop-shadow(0 8px 32px #a78bfa88)' }}
        draggable={false}
      />
    </div>
  );
} 