import React from 'react';

interface CredibilityTrustProps {
  onOpenDrawer?: (drawerId: string) => void;
  onOpenProof?: (proofKey: string) => void;
}

export default function CredibilityTrust({ onOpenDrawer, onOpenProof }: CredibilityTrustProps) {
  return (
    <section className="editorial-chapter" id="proof">
      <div className="editorial-bg-glow" aria-hidden="true"></div>

      <div className="editorial-container">
        {/* Hook Viewport */}
        <div className="editorial-chapter-hook">
          <span className="hook-kicker">SUPPORTING CREDIBILITY // VERIFIED EVIDENCE</span>
          <h2 className="hook-headline">
            DON'T BELIEVE<br />
            THE HEADLINES.<br />
            <span className="text-gold">CHECK THE EVIDENCE.</span>
          </h2>
        </div>

        {/* Identity Title Lockup */}
        <div className="editorial-title-row">
          <h3 className="editorial-chapter-title">
            VERIFIED<br />CREDIBILITY
          </h3>
          <p className="editorial-chapter-tagline">AWARDS · STAGE RECOGNITION · OFFICIAL RECORDS</p>
        </div>

        {/* Editorial Proof Quad: The 4 Strongest Pillars of Proof */}
        <div className="editorial-proof-quad">
          {/* Item 1: Business Excellence Award */}
          <div
            className="proof-quad-item open-proof-trigger"
            data-proof="award-business-excellence"
            data-cursor="VERIFY"
            onClick={() => onOpenProof?.('award-business-excellence')}
          >
            <div className="quad-item-meta">
              <span className="quad-category">HONORARY STAGE RECOGNITION</span>
              <span className="quad-year">STAGE HONORS</span>
            </div>
            <h4 className="quad-item-title">TWIN HEART BUSINESS EXCELLENCE AWARD</h4>
            <p className="quad-item-desc">
              On-stage trophy presentation and honors for outstanding contributions in digital marketing, commercial brand elevation, and creative direction.
            </p>
            <div className="quad-item-footer">
              <span>VIEW STAGE PROOF</span>
              <span>↗</span>
            </div>
          </div>

          {/* Item 2: State Level Talent Competition */}
          <div
            className="proof-quad-item open-proof-trigger"
            data-proof="award-talent-competition"
            data-cursor="VERIFY"
            onClick={() => onOpenProof?.('award-talent-competition')}
          >
            <div className="quad-item-meta">
              <span className="quad-category">STATE HONORS</span>
              <span className="quad-year">2025</span>
            </div>
            <h4 className="quad-item-title">STATE LEVEL TALENT COMPETITION 2025</h4>
            <p className="quad-item-desc">
              State-level trophy and ceremony honor recognizing public speaking ability, spoken-word stage delivery, and impactful communication.
            </p>
            <div className="quad-item-footer">
              <span>VIEW AWARD &amp; CEREMONY</span>
              <span>↗</span>
            </div>
          </div>

          {/* Item 3: Certified Agency Internship */}
          <div
            className="proof-quad-item open-proof-trigger"
            data-proof="digi-cert"
            data-cursor="VERIFY"
            onClick={() => onOpenProof?.('digi-cert')}
          >
            <div className="quad-item-meta">
              <span className="quad-category">OFFICIAL CREDENTIAL</span>
              <span className="quad-year">DIGI MARKETRIX</span>
            </div>
            <h4 className="quad-item-title">CERTIFIED AGENCY INTERNSHIP</h4>
            <p className="quad-item-desc">
              Official certificate issued and signed by Antony Joyson Fernando, CEO of Digi Marketrix, verifying full-time production and digital marketing responsibilities.
            </p>
            <div className="quad-item-footer">
              <span>INSPECT CERTIFICATE</span>
              <span>↗</span>
            </div>
          </div>

          {/* Item 4: Real Retention Analytics Proof */}
          <div
            className="proof-quad-item open-proof-trigger"
            data-proof="chinnadurai-retention"
            data-cursor="VERIFY"
            onClick={() => onOpenProof?.('chinnadurai-retention')}
          >
            <div className="quad-item-meta">
              <span className="quad-category">AUDIENCE RETENTION</span>
              <span className="quad-year">10K–15K+ ORGANIC</span>
            </div>
            <h4 className="quad-item-title">VERIFIED CLIENT RETENTION METRICS</h4>
            <p className="quad-item-desc">
              Authentic audience watch-time and organic retention analytics for Chinnadurai video campaigns, proving that engagement was earned without paid ad spend.
            </p>
            <div className="quad-item-footer">
              <span>VIEW ANALYTICS GRAPH</span>
              <span>↗</span>
            </div>
          </div>
        </div>

        {/* Option to Explore Deeper: View All Proof */}
        <div className="editorial-proof-actions">
          <button
            type="button"
            className="btn-editorial open-drawer-btn"
            data-drawer="drawer-proof-vault"
            onClick={() => onOpenDrawer?.('drawer-proof-vault')}
          >
            VIEW ALL PROOF →
          </button>
        </div>
      </div>
    </section>
  );
}
