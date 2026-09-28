import React from 'react';

export default function HeroLighting() {
  return (
    <div className="hero-lighting-stage" aria-hidden="true">
      {/* Primary soft warm backlight behind head & shoulders */}
      <div className="hero-poster-backlight" id="hero-radial-light"></div>
      {/* Subtle directional side illumination */}
      <div className="hero-poster-side-light"></div>
      {/* Soft rim light creating silhouette edge separation */}
      <div className="hero-poster-rim-light"></div>
      {/* Focused Orbit Spotlight for Identity Experience */}
      <div className="hero-orbit-spotlight" id="orbit-spotlight"></div>
    </div>
  );
}
