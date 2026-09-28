import React from 'react';

interface LifeWithAakashProps {
  onOpenProof?: (proofKey: string) => void;
}

export default function LifeWithAakash({ onOpenProof }: LifeWithAakashProps) {
  return (
    <section className="editorial-chapter" id="speaking">
      <div className="editorial-bg-glow glow-alt" aria-hidden="true"></div>

      <div className="editorial-container">
        {/* Hook Viewport */}
        <div className="editorial-chapter-hook">
          <span className="hook-kicker">04 // VOICE &amp; HUMAN CONNECTION</span>
          <h2 className="hook-headline">
            MARKETING TAUGHT ME<br />
            <span className="text-muted-strike">HOW TO REACH PEOPLE.</span><br />
            <span className="text-gold">SPEAKING TAUGHT ME<br />HOW TO CONNECT WITH THEM.</span>
          </h2>
        </div>

        {/* Identity Title Lockup */}
        <div className="editorial-title-row">
          <h3 className="editorial-chapter-title">
            LIFE WITH<br />AAKASH
          </h3>
          <p className="editorial-chapter-tagline">LIFE · REFLECTION · MOTIVATION</p>
        </div>

        {/* First Viewport Split: Real Vertical Video Content */}
        <div className="editorial-viewport-split">
          <div className="viewport-content-pane">
            <p className="supporting-narrative">
              Direct, unfiltered spoken-word perspectives on mental discipline, resilience, and personal evolution. Built without artificial hype—pure conviction and relatable human truth.
            </p>
            <div className="credibility-signal">
              <span className="signal-dot"></span>
              <span className="signal-text">59.1K+ PEAK ORGANIC VIEWERSHIP · ZERO AD SPEND</span>
            </div>
            <div className="editorial-chapter-actions">
              <a
                href="https://www.instagram.com/life.with_aakash?stkn=MXcwa2ZraGllYXBuOA=="
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial"
              >
                EXPLORE ON INSTAGRAM →
              </a>
              <button
                type="button"
                className="btn-editorial-outline open-proof-trigger"
                data-proof="lwa-views"
                onClick={() => onOpenProof?.('lwa-views')}
              >
                VIEW AUDIENCE METRICS ↗
              </button>
            </div>
          </div>

          <div
            className="vertical-story-frame open-proof-trigger"
            data-proof="lwa-profile"
            data-cursor="WATCH"
            title="Click to view Life With Aakash platform profile"
            onClick={() => onOpenProof?.('lwa-profile')}
          >
            <img
              src="/assets/proofs_optimized/lwa_page.jpg"
              alt="Life With Aakash Instagram Platform Profile and Video Content"
              loading="lazy"
            />
            <div className="visual-frame-overlay-badge">
              <span>@LIFE.WITH_AAKASH // MOTIVATIONAL VIDEO PLATFORM</span>
              <span>↗</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
