import React from 'react';

export default function HeroProjectPreview() {
  return (
    <div className="hero-hover-preview-stage" id="hero-hover-preview" aria-hidden="true">
      <div className="hover-preview-inner" id="hover-preview-inner">
        <div className="hover-preview-media">
          <img
            src="/assets/proofs_optimized/digi_marketrix_office.jpg"
            alt=""
            className="hover-preview-img"
            id="hover-preview-img"
          />
          <div className="hover-preview-overlay"></div>
        </div>
        <div className="hover-preview-meta">
          <span className="hover-preview-kicker" id="hover-preview-kicker">SELECTED WORK / 01</span>
          <h4 className="hover-preview-title" id="hover-preview-title">DIGI MARKETRIX</h4>
          <p className="hover-preview-sub" id="hover-preview-sub">Marketing the Digital Presence</p>
        </div>
      </div>
    </div>
  );
}
