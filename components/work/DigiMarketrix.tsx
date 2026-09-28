import React from 'react';

interface DigiMarketrixProps {
  onOpenDrawer?: (drawerId: string) => void;
  onOpenProof?: (proofKey: string) => void;
}

export default function DigiMarketrix({ onOpenDrawer, onOpenProof }: DigiMarketrixProps) {
  return (
    <section className="editorial-chapter" id="work" data-alias="experience">
      <span id="experience" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} aria-hidden="true"></span>
      <div className="editorial-bg-glow" aria-hidden="true"></div>

      <div className="editorial-container">
        {/* Hook Viewport */}
        <div className="editorial-chapter-hook">
          <span className="hook-kicker">01 // THE PRIMARY FOUNDATION</span>
          <h2 className="hook-headline">
            THREE YEARS.<br />
            <span className="text-gold">ONE PLACE THAT</span><br />
            CHANGED HOW I WORK.
          </h2>
        </div>

        {/* Identity Title Lockup */}
        <div className="editorial-title-row">
          <h3 className="editorial-chapter-title">
            DIGI<br />MARKETRIX
          </h3>
          <p className="editorial-chapter-tagline">MARKETING THE DIGITAL PRESENCE</p>
        </div>

        {/* First Viewport Split: One Strong Visual + Narrative & Credibility */}
        <div className="editorial-viewport-split">
          <div className="viewport-content-pane">
            <p className="supporting-narrative">
              Agency-level execution across 3 years of digital marketing, video production, and commercial brand campaigns. Where creative intuition transformed into systematic, metric-driven client execution.
            </p>
            <div className="credibility-signal">
              <span className="signal-dot"></span>
              <span className="signal-text">3-YEAR ASSOCIATION · FULL-TIME AGENCY INTERNSHIP</span>
            </div>
            <div className="editorial-chapter-actions">
              <button
                type="button"
                className="btn-editorial open-drawer-btn"
                data-drawer="drawer-digi"
                onClick={() => onOpenDrawer?.('drawer-digi')}
              >
                EXPLORE CASE STUDY →
              </button>
              <button
                type="button"
                className="btn-editorial-outline open-proof-trigger"
                data-proof="digi-cert"
                onClick={() => onOpenProof?.('digi-cert')}
              >
                VIEW OFFICIAL CERTIFICATE ↗
              </button>
            </div>
          </div>

          <div
            className="editorial-single-visual-frame open-proof-trigger"
            data-proof="digi-office"
            data-cursor="EXPLORE"
            title="Click to view full-resolution workplace"
            onClick={() => onOpenProof?.('digi-office')}
          >
            <img
              src="/assets/proofs_optimized/digi_marketrix_office.jpg"
              alt="Digi Marketrix Agency Studio Workplace and 3D Logo Wall"
              loading="lazy"
            />
            <div className="visual-frame-overlay-badge">
              <span>AGENCY ENVIRONMENT // THOOTHUKUDI STUDIO</span>
              <span>INSPECT ↗</span>
            </div>
          </div>
        </div>

        {/* Digi Ownership Story Block */}
        <div className="editorial-ownership-block">
          <div className="ownership-hook">
            I DIDN'T JUST<br />
            <span className="text-muted-strike">WORK THERE.</span><br />
            <span className="text-gold">I GREW INSIDE IT.</span>
          </div>

          {/* Sequential Trio Reveal */}
          <div className="ownership-trio-sequence">
            <div className="trio-item">
              <span className="trio-num">01</span>
              <h4 className="trio-title">3 YEARS</h4>
              <p className="trio-desc">
                Continuous active association inside the agency. Evolving across digital marketing strategy, commercial scriptwriting, and direct business account management.
              </p>
            </div>

            <div className="trio-item">
              <span className="trio-num">02</span>
              <h4 className="trio-title">INTERNSHIP</h4>
              <p className="trio-desc">
                Completed formal full-time agency internship certified by CEO Antony Joyson Fernando. Mastered on-location camera setups, gimbal movement, and Premiere Pro post-production.
              </p>
            </div>

            <div className="trio-item trio-highlight">
              <span className="trio-num">03</span>
              <h4 className="trio-title">TALENTRIX</h4>
              <p className="trio-desc">
                Started and directed the dedicated influencer-marketing arm within the Digi Marketrix ecosystem, connecting regional brands with digital creators.
              </p>
            </div>
          </div>

          {/* Dedicated Talentrix Sub-Moment */}
          <div className="talentrix-submoment">
            <div className="talentrix-submoment-content">
              <span className="submoment-badge">IN-HOUSE VENTURE // BORN AT DIGI MARKETRIX</span>
              <h4 className="talentrix-big-name">TALENT<br />RIX<span className="text-gold">.</span></h4>
              <div className="talentrix-manifesto">STARTED. LED. BUILT.</div>
              <p className="talentrix-desc">
                Conceptualized and spearheaded by Aakash to bridge retail clients with high-affinity influencers. Orchestrated talent discovery, commercial negotiations, storyboard direction, and production delivery.
              </p>
              <div className="talentrix-actions">
                <button
                  type="button"
                  className="btn-editorial open-drawer-btn"
                  data-drawer="drawer-digi"
                  onClick={() => onOpenDrawer?.('drawer-digi')}
                >
                  EXPLORE CASE STUDY →
                </button>
                <button
                  type="button"
                  className="btn-editorial-outline open-proof-trigger"
                  data-proof="digi-gimbal"
                  onClick={() => onOpenProof?.('digi-gimbal')}
                >
                  VIEW FIELD PRODUCTION ↗
                </button>
              </div>
            </div>

            <div
              className="talentrix-visual-card open-proof-trigger"
              data-proof="digi-gimbal"
              data-cursor="INSPECT"
              title="Click to view 3-axis gimbal production"
              onClick={() => onOpenProof?.('digi-gimbal')}
            >
              <img
                src="/assets/proofs_optimized/digi_marketrix_gimbal_shoot.jpg"
                alt="Aakash operating 3-axis motorized gimbal during commercial production"
                loading="lazy"
              />
              <div className="visual-card-caption">
                <span>TALENTRIX FIELD PRODUCTION // GIMBAL SHOOT</span>
                <span>↗</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
