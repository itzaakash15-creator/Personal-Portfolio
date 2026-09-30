import React from 'react';

export default function HeroPortrait() {
  return (
    <div className="hero-center-subject" id="character-scene">
      <div className="character-scene-stage" id="character-stage">
        {/* Contact shadow beneath & behind Aakash for environmental depth integration */}
        <div className="aakash-contact-shadow" id="aakash-contact-shadow" aria-hidden="true"></div>

        {/* High-resolution authentic cutout portrait with folded arms */}
        <img
          src="/assets/aakash_authentic_portrait.png"
          alt="AAKASH — Creative Director, Marketer and Builder"
          className="hero-poster-portrait"
          id="character-portrait"
        />

        {/* Reserved 3D mount architecture for future model */}
        <div className="character-3d-mount" id="character-3d-mount"></div>
      </div>
    </div>
  );
}
