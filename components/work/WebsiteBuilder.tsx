import React from 'react';

interface WebsiteBuilderProps {
  onOpenDrawer?: (drawerId: string) => void;
  onOpenProof?: (proofKey: string) => void;
}

export default function WebsiteBuilder({ onOpenDrawer, onOpenProof }: WebsiteBuilderProps) {
  return (
    <section className="editorial-chapter" id="web" data-alias="about">
      <span id="about" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} aria-hidden="true"></span>
      <div className="editorial-bg-glow" aria-hidden="true"></div>

      <div className="editorial-container">
        {/* Hook Viewport */}
        <div className="editorial-chapter-hook">
          <span className="hook-kicker">03 // FUNCTIONAL CODE &amp; INTERFACES</span>
          <h2 className="hook-headline">
            SOME IDEAS<br />
            NEED MORE THAN CONTENT.<br />
            <span className="text-gold">THEY NEED SOMETHING<br />PEOPLE CAN USE.</span>
          </h2>
        </div>

        {/* Identity Title Lockup */}
        <div className="editorial-title-row">
          <h3 className="editorial-chapter-title">
            WEBSITE<br />BUILDER
          </h3>
          <p className="editorial-chapter-tagline">DESIGN · BUILD · DEPLOY</p>
        </div>

        {/* First Viewport Split: Real Jayashakthi Tours & Travels Website */}
        <div className="editorial-viewport-split">
          <div className="viewport-content-pane">
            <p className="supporting-narrative">
              Converting an idea into an actual working digital experience. Fast, accessible, and conversion-focused web architecture built to power real business revenue.
            </p>
            <div className="credibility-signal">
              <span className="signal-dot"></span>
              <span className="signal-text">LIVE PRODUCTION DEPLOYMENT · ACTIVE BUSINESS CONVERSIONS</span>
            </div>
            <div className="editorial-chapter-actions">
              <a
                href="https://jayashakthitoursandtravels.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial"
              >
                VIEW LIVE WEBSITE →
              </a>
              <button
                type="button"
                className="btn-editorial-outline open-drawer-btn"
                data-drawer="drawer-web"
                onClick={() => onOpenDrawer?.('drawer-web')}
              >
                EXPLORE ARCHITECTURE ↗
              </button>
            </div>
          </div>

          <div
            className="browser-mockup-frame open-proof-trigger"
            data-proof="jayashakthi-site"
            data-cursor="VIEW"
            title="Click to inspect Jayashakthi Tours & Travels website"
            onClick={() => onOpenProof?.('jayashakthi-site')}
          >
            <div className="browser-mockup-bar">
              <div className="browser-dots">
                <span className="browser-dot"></span>
                <span className="browser-dot"></span>
                <span className="browser-dot"></span>
              </div>
              <div className="browser-url-pill">https://jayashakthitoursandtravels.com</div>
            </div>
            <div className="browser-mockup-body">
              <img
                src="/assets/proofs_optimized/jayashakthi_website.jpg"
                alt="Jayashakthi Tours & Travels Official Live Website"
                loading="lazy"
              />
            </div>
            <div className="visual-frame-overlay-badge">
              <span>JAYASHAKTHI TOURS &amp; TRAVELS // LIVE PRODUCTION PORTAL</span>
              <span>INSPECT ↗</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
