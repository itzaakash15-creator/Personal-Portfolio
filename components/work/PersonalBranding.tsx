import React from 'react';

interface PersonalBrandingProps {
  onOpenDrawer?: (drawerId: string) => void;
  onOpenProof?: (proofKey: string) => void;
}

export default function PersonalBranding({ onOpenDrawer, onOpenProof }: PersonalBrandingProps) {
  return (
    <section className="editorial-chapter" id="branding" data-alias="creator">
      <span id="creator" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} aria-hidden="true"></span>
      <div className="editorial-bg-glow glow-alt" aria-hidden="true"></div>

      <div className="editorial-container">
        {/* Hook Viewport */}
        <div className="editorial-chapter-hook">
          <span className="hook-kicker">02 // POSITIONING &amp; NARRATIVE</span>
          <h2 className="hook-headline">
            ATTENTION<br />
            <span className="text-muted-strike">ISN'T THE GOAL.</span><br />
            <span className="text-gold">TRUST IS.</span>
          </h2>
        </div>

        {/* Identity Title Lockup */}
        <div className="editorial-title-row">
          <h3 className="editorial-chapter-title">
            PERSONAL BRANDING<br />STRATEGIST
          </h3>
          <p className="editorial-chapter-tagline">POSITIONING · CONTENT · TRUST · IDENTITY</p>
        </div>

        {/* First Viewport Split */}
        <div className="editorial-viewport-split">
          <div className="viewport-content-pane">
            <p className="supporting-narrative">
              Turning individuals into trusted category authorities. It is not social-media posting—it is narrative architecture, audience alignment, and sustained reputational equity.
            </p>
            <div className="credibility-signal">
              <span className="signal-dot"></span>
              <span className="signal-text">10K–15K+ ORGANIC RETENTION · NON-PAID CAMPAIGNS</span>
            </div>
            <div className="editorial-chapter-actions">
              <button
                type="button"
                className="btn-editorial open-drawer-btn"
                data-drawer="drawer-branding"
                onClick={() => onOpenDrawer?.('drawer-branding')}
              >
                EXPLORE STRATEGY →
              </button>
              <button
                type="button"
                className="btn-editorial-outline open-proof-trigger"
                data-proof="personal-branding-video"
                onClick={() => onOpenProof?.('personal-branding-video')}
              >
                WATCH CLIENT VIDEO REEL ↗
              </button>
            </div>
          </div>

          <div
            className="editorial-single-visual-frame open-proof-trigger"
            data-proof="chinnadurai-retention"
            data-cursor="ANALYZE"
            title="Click to inspect audience retention analytics"
            onClick={() => onOpenProof?.('chinnadurai-retention')}
          >
            <img
              src="/assets/proofs_optimized/chinnadurai_retention.jpg"
              alt="Chinnadurai Textiles High Audience Retention Graph"
              loading="lazy"
            />
            <div className="visual-frame-overlay-badge">
              <span>EVIDENCE // AUDIENCE RETENTION GRAPH</span>
              <span>INSPECT ↗</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
