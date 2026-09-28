import React from 'react';

export default function FutureDirection() {
  return (
    <section className="editorial-chapter" id="future" data-alias="vision">
      <span id="vision" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} aria-hidden="true"></span>
      <div className="editorial-bg-glow glow-alt" aria-hidden="true"></div>

      <div className="editorial-container">
        {/* Hook Viewport */}
        <div className="editorial-chapter-hook">
          <span className="hook-kicker">THE ROAD AHEAD // NEXT HORIZONS</span>
          <h2 className="hook-headline">
            EVERYTHING<br />
            I'M LEARNING<br />
            <span className="text-gold">IS POINTING SOMEWHERE.</span>
          </h2>
        </div>

        {/* Identity Title Lockup */}
        <div className="editorial-title-row">
          <h3 className="editorial-chapter-title">
            FUTURE HORIZONS
          </h3>
          <p className="editorial-chapter-tagline">NEAR-TERM ACCELERATION &amp; LONG-TERM VISION</p>
        </div>

        {/* Dual Pillar Grid: Clear distinction between ambition and existing work */}
        <div className="future-dual-grid">
          {/* Pillar 1: Near-Term Personal Branding Agency */}
          <div className="future-pillar-card">
            <div>
              <span className="future-horizon-tag">NEAR-TERM MILESTONE // SPECIALIZED PRACTICE</span>
              <h4 className="future-pillar-title">PERSONAL BRANDING AGENCY</h4>
              <div className="status-pill-group">
                <span className="status-pill">RESEARCHING</span>
                <span className="status-pill">DESIGNING</span>
                <span className="status-pill">DEVELOPING</span>
              </div>
              <p className="future-pillar-desc">
                A dedicated strategic firm built exclusively to architect personal authority for founders, C-suite executives, and specialized professionals. Providing narrative strategy, content systems, high-trust video assets, and reputation management.
              </p>
            </div>
          </div>

          {/* Pillar 2: Long-Term Broader Marketing Company */}
          <div className="future-pillar-card">
            <div>
              <span className="future-horizon-tag">LONG-TERM HORIZON // FULL-SPECTRUM ENTERPRISE</span>
              <h4 className="future-pillar-title">BROADER MARKETING COMPANY</h4>
              <div className="status-pill-group">
                <span className="status-pill">VISION &amp; ARCHITECTURE</span>
              </div>
              <p className="future-pillar-desc">
                An integrated, full-spectrum marketing enterprise uniting creative brand storytelling, video cinematography, software development, and performance media under a single institutional roof.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
