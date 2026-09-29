'use client';

import React, { useEffect } from 'react';

interface CaseDrawersProps {
  activeDrawerId: string | null;
  onClose: () => void;
  onOpenProof: (proofKey: string) => void;
}

export default function CaseDrawers({ activeDrawerId, onClose, onOpenProof }: CaseDrawersProps) {
  useEffect(() => {
    if (!activeDrawerId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeDrawerId, onClose]);

  if (!activeDrawerId) return null;

  return (
    <>
      {/* Drawer 01: Digi Marketrix & Talentrix Full Case Study */}
      <div
        className={`editorial-drawer-overlay ${activeDrawerId === 'drawer-digi' ? 'active' : ''}`}
        id="drawer-digi"
        role="dialog"
        aria-modal="true"
        aria-hidden={activeDrawerId !== 'drawer-digi'}
      >
        <div className="editorial-drawer-backdrop" onClick={onClose}></div>
        <div className="editorial-drawer-panel">
          <div className="editorial-drawer-header">
            <div className="drawer-header-meta">
              <span className="drawer-tag">CASE STUDY // 01</span>
              <h3 className="drawer-title">DIGI MARKETRIX &amp; TALENTRIX</h3>
            </div>
            <button
              type="button"
              className="drawer-close-btn"
              onClick={onClose}
              aria-label="Close drawer"
            >
              ✕
            </button>
          </div>
          <div className="editorial-drawer-body">
            <div className="drawer-article-section">
              <h4 className="drawer-section-title">OVERVIEW &amp; THREE-YEAR IMMERSION</h4>
              <p className="drawer-prose">
                Digi Marketrix served as the foundational launchpad for Aakash&apos;s commercial marketing capabilities. Over approximately three years of continuous association and a formal full-time agency internship certified by CEO Antony Joyson Fernando, Aakash worked at the front lines of digital marketing strategy, field videography, and commercial client retention.
              </p>
              <div className="drawer-stats-row">
                <div className="drawer-stat-box">
                  <span className="drawer-stat-number">3+</span>
                  <span className="drawer-stat-label">Years Association</span>
                </div>
                <div className="drawer-stat-box">
                  <span className="drawer-stat-number">100%</span>
                  <span className="drawer-stat-label">Agency Certified</span>
                </div>
                <div className="drawer-stat-box">
                  <span className="drawer-stat-number">Talentrix</span>
                  <span className="drawer-stat-label">In-House Arm Founded</span>
                </div>
              </div>
            </div>

            <div className="drawer-article-section">
              <h4 className="drawer-section-title">THE BIRTH OF TALENTRIX</h4>
              <p className="drawer-prose">
                Recognizing that regional brands needed authentic human voices rather than static billboard advertising, Aakash conceptualized, founded, and directed <strong>Talentrix</strong> as an internal venture within Digi Marketrix. He managed the creator pipeline from discovery to contract negotiation, storyboard scripting, and multi-platform distribution.
              </p>
            </div>

            <div className="drawer-article-section">
              <h4 className="drawer-section-title">VERIFIED VISUAL ASSETS</h4>
              <div className="drawer-media-grid">
                <div
                  className="drawer-media-thumb open-proof-trigger"
                  data-proof="digi-cert"
                  data-cursor="INSPECT"
                  onClick={() => onOpenProof('digi-cert')}
                >
                  <img src="/assets/proofs_optimized/digi_marketrix_certificate.jpg" alt="Official Digi Marketrix Certificate" />
                </div>
                <div
                  className="drawer-media-thumb open-proof-trigger"
                  data-proof="digi-office"
                  data-cursor="INSPECT"
                  onClick={() => onOpenProof('digi-office')}
                >
                  <img src="/assets/proofs_optimized/digi_marketrix_office.jpg" alt="Digi Marketrix Agency Office" />
                </div>
                <div
                  className="drawer-media-thumb open-proof-trigger"
                  data-proof="digi-gimbal"
                  data-cursor="INSPECT"
                  onClick={() => onOpenProof('digi-gimbal')}
                >
                  <img src="/assets/proofs_optimized/digi_marketrix_gimbal_shoot.jpg" alt="Gimbal Field Production" />
                </div>
                <div
                  className="drawer-media-thumb open-proof-trigger"
                  data-proof="digi-working"
                  data-cursor="INSPECT"
                  onClick={() => onOpenProof('digi-working')}
                >
                  <img src="/assets/proofs_optimized/digi_marketrix_working.jpg" alt="Premiere Pro Video Editing" />
                </div>
              </div>
            </div>

            <div className="drawer-article-section">
              <button
                type="button"
                className="btn-editorial open-proof-trigger"
                data-proof="digi-video-shooting"
                onClick={() => onOpenProof('digi-video-shooting')}
              >
                WATCH FULL PRODUCTION REEL ↗
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer 02: Personal Branding Strategist Deep Dive */}
      <div
        className={`editorial-drawer-overlay ${activeDrawerId === 'drawer-branding' ? 'active' : ''}`}
        id="drawer-branding"
        role="dialog"
        aria-modal="true"
        aria-hidden={activeDrawerId !== 'drawer-branding'}
      >
        <div className="editorial-drawer-backdrop" onClick={onClose}></div>
        <div className="editorial-drawer-panel">
          <div className="editorial-drawer-header">
            <div className="drawer-header-meta">
              <span className="drawer-tag">STRATEGY DOSSIER // 02</span>
              <h3 className="drawer-title">PERSONAL BRANDING STRATEGY</h3>
            </div>
            <button
              type="button"
              className="drawer-close-btn"
              onClick={onClose}
              aria-label="Close drawer"
            >
              ✕
            </button>
          </div>
          <div className="editorial-drawer-body">
            <div className="drawer-article-section">
              <h4 className="drawer-section-title">POSITIONING VS. SOCIAL MEDIA POSTING</h4>
              <p className="drawer-prose">
                Most individuals treat personal branding as social media posting. Aakash approaches it as category positioning. By dissecting an individual&apos;s unique domain expertise, defining polarizing viewpoints, and packaging insights into high-retention video formats, Aakash builds reputational equity that drives enterprise deals and speaking opportunities.
              </p>
            </div>

            <div className="drawer-article-section">
              <h4 className="drawer-section-title">CHINNADURAI TEXTILES CASE STUDY</h4>
              <p className="drawer-prose">
                For Chinnadurai Textiles, Aakash crafted the full narrative script and camera delivery framework. The result was sustained 10K–15K+ non-paid organic views with retention curves that held viewers all the way through the closing call to action.
              </p>
              <div className="drawer-media-grid">
                <div
                  className="drawer-media-thumb open-proof-trigger"
                  data-proof="chinnadurai-retention"
                  data-cursor="INSPECT"
                  onClick={() => onOpenProof('chinnadurai-retention')}
                >
                  <img src="/assets/proofs_optimized/chinnadurai_retention.jpg" alt="Audience Retention Metrics" />
                </div>
                <div
                  className="drawer-media-thumb open-proof-trigger"
                  data-proof="chinnadurai-scripting"
                  data-cursor="INSPECT"
                  onClick={() => onOpenProof('chinnadurai-scripting')}
                >
                  <img src="/assets/proofs_optimized/chinnadurai_scripting.jpg" alt="Scripting Notes" />
                </div>
              </div>
            </div>

            <div className="drawer-article-section">
              <button
                type="button"
                className="btn-editorial open-proof-trigger"
                data-proof="personal-branding-video"
                onClick={() => onOpenProof('personal-branding-video')}
              >
                WATCH CLIENT VIDEO REEL ↗
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer 03: Website Builder & Jayashakthi Deep Dive */}
      <div
        className={`editorial-drawer-overlay ${activeDrawerId === 'drawer-web' ? 'active' : ''}`}
        id="drawer-web"
        role="dialog"
        aria-modal="true"
        aria-hidden={activeDrawerId !== 'drawer-web'}
      >
        <div className="editorial-drawer-backdrop" onClick={onClose}></div>
        <div className="editorial-drawer-panel">
          <div className="editorial-drawer-header">
            <div className="drawer-header-meta">
              <span className="drawer-tag">DIGITAL ARCHITECTURE // 03</span>
              <h3 className="drawer-title">WEBSITE BUILDER — JAYASHAKTHI</h3>
            </div>
            <button
              type="button"
              className="drawer-close-btn"
              onClick={onClose}
              aria-label="Close drawer"
            >
              ✕
            </button>
          </div>
          <div className="editorial-drawer-body">
            <div className="drawer-article-section">
              <h4 className="drawer-section-title">FROM CONCEPT TO WORKING SOFTWARE</h4>
              <p className="drawer-prose">
                Aakash bridges design and functional code. When Jayashakthi Tours &amp; Travels required a digital transformation, Aakash built their live web platform from scratch, architecting an intuitive booking workflow, clean typography, mobile responsiveness, and zero layout shift.
              </p>
              <div
                className="drawer-media-thumb open-proof-trigger"
                data-proof="jayashakthi-site"
                style={{ marginBlock: '1.5rem' }}
                data-cursor="INSPECT"
                onClick={() => onOpenProof('jayashakthi-site')}
              >
                <img src="/assets/proofs_optimized/jayashakthi_website.jpg" alt="Jayashakthi Live Site Mockup" />
              </div>
            </div>

            <div className="drawer-article-section">
              <a
                href="https://jayashakthitoursandtravels.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial"
              >
                OPEN LIVE WEBSITE →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer 04: Complete Proof Vault */}
      <div
        className={`editorial-drawer-overlay ${activeDrawerId === 'drawer-proof-vault' ? 'active' : ''}`}
        id="drawer-proof-vault"
        role="dialog"
        aria-modal="true"
        aria-hidden={activeDrawerId !== 'drawer-proof-vault'}
      >
        <div className="editorial-drawer-backdrop" onClick={onClose}></div>
        <div className="editorial-drawer-panel">
          <div className="editorial-drawer-header">
            <div className="drawer-header-meta">
              <span className="drawer-tag">VERIFIED ARCHIVE // FULL VAULT</span>
              <h3 className="drawer-title">CREDENTIALS &amp; EVIDENCE VAULT</h3>
            </div>
            <button
              type="button"
              className="drawer-close-btn"
              onClick={onClose}
              aria-label="Close drawer"
            >
              ✕
            </button>
          </div>
          <div className="editorial-drawer-body">
            <div className="drawer-article-section">
              <h4 className="drawer-section-title">OFFICIAL AWARDS &amp; STAGE HONORS</h4>
              <div className="drawer-media-grid">
                <div
                  className="drawer-media-thumb open-proof-trigger"
                  data-proof="award-business-excellence"
                  data-cursor="INSPECT"
                  onClick={() => onOpenProof('award-business-excellence')}
                >
                  <img src="/assets/proofs_optimized/award_1_business_excellence.jpg" alt="Business Excellence Award" />
                </div>
                <div
                  className="drawer-media-thumb open-proof-trigger"
                  data-proof="award-talent-competition"
                  data-cursor="INSPECT"
                  onClick={() => onOpenProof('award-talent-competition')}
                >
                  <img src="/assets/proofs_optimized/award_2_talent_competition.jpg" alt="Talent Competition Award" />
                </div>
              </div>
            </div>

            <div className="drawer-article-section">
              <h4 className="drawer-section-title">AGENCY &amp; CLIENT CREDENTIALS</h4>
              <div className="drawer-media-grid">
                <div
                  className="drawer-media-thumb open-proof-trigger"
                  data-proof="digi-cert"
                  data-cursor="INSPECT"
                  onClick={() => onOpenProof('digi-cert')}
                >
                  <img src="/assets/proofs_optimized/digi_marketrix_certificate.jpg" alt="Digi Marketrix Certificate" />
                </div>
                <div
                  className="drawer-media-thumb open-proof-trigger"
                  data-proof="chinnadurai-retention"
                  data-cursor="INSPECT"
                  onClick={() => onOpenProof('chinnadurai-retention')}
                >
                  <img src="/assets/proofs_optimized/chinnadurai_retention.jpg" alt="Chinnadurai Retention" />
                </div>
                <div
                  className="drawer-media-thumb open-proof-trigger"
                  data-proof="purple-bts"
                  data-cursor="INSPECT"
                  onClick={() => onOpenProof('purple-bts')}
                >
                  <img src="/assets/proofs_optimized/purple_collection_bts.jpg" alt="Purple Collection BTS" />
                </div>
                <div
                  className="drawer-media-thumb open-proof-trigger"
                  data-proof="lwa-views"
                  data-cursor="INSPECT"
                  onClick={() => onOpenProof('lwa-views')}
                >
                  <img src="/assets/proofs_optimized/lwa_organic_views.jpg" alt="LWA Organic Reach" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
