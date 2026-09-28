'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface PersonalBrandingProps {
  onOpenDrawer?: (drawerId: string) => void;
  onOpenProof?: (proofKey: string) => void;
}

export default function PersonalBranding({ onOpenDrawer, onOpenProof }: PersonalBrandingProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const [activeWordIdx, setActiveWordIdx] = useState(0);

  const triadTerms = ['POSITION', 'CONTENT', 'TRUST'];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (stackRef.current) {
        gsap.fromTo(
          stackRef.current,
          { opacity: 0.2, scale: 0.9, y: 50 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stackRef.current,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    const interval = setInterval(() => {
      setActiveWordIdx((prev) => (prev + 1) % triadTerms.length);
    }, 2400);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, [triadTerms.length]);

  // Differential 3-layer pointer parallax: front moves slightly, background moves less
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stackRef.current || window.innerWidth < 960) return;
    const rect = stackRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    if (layer1Ref.current) {
      gsap.to(layer1Ref.current, { x: x * 12, y: y * 10, duration: 0.4, ease: 'power1.out' });
    }
    if (layer2Ref.current) {
      gsap.to(layer2Ref.current, { x: 30 + x * 6, y: -12 + y * 5, duration: 0.5, ease: 'power1.out' });
    }
    if (layer3Ref.current) {
      gsap.to(layer3Ref.current, { x: -30 + x * -4, y: 20 + y * -3, duration: 0.6, ease: 'power1.out' });
    }
  };

  const handleMouseLeave = () => {
    if (layer1Ref.current) gsap.to(layer1Ref.current, { x: 0, y: 0, duration: 0.6, ease: 'power2.out' });
    if (layer2Ref.current) gsap.to(layer2Ref.current, { x: 30, y: -12, duration: 0.6, ease: 'power2.out' });
    if (layer3Ref.current) gsap.to(layer3Ref.current, { x: -30, y: 20, duration: 0.6, ease: 'power2.out' });
  };

  return (
    <section className="pro-section pro-chapter-card" id="branding" data-alias="creator" ref={sectionRef}>
      <span id="creator" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} aria-hidden="true"></span>

      <div className="pro-container">
        <div className="pro-chapter-grid">
          {/* Left Column: Title + One-Line Impact + 3 Chips + CTAs */}
          <div className="pro-chapter-content">
            <div className="pro-kicker-row">
              <span className="pro-kicker-dot" aria-hidden="true"></span>
              <span className="pro-kicker-text">CASE STUDY // 02</span>
            </div>

            <h3 className="pro-chapter-title">
              PERSONAL BRANDING<br />
              <span style={{ color: '#d4af37' }}>STRATEGIST</span>
            </h3>

            <p className="pro-chapter-impact">
              Architecting founder authority and converting passive attention into long-term trust through high-retention cinematic storytelling.
            </p>

            {/* 3 Compact Supporting Details/Chips */}
            <div className="pro-chapter-chips">
              <span className="pro-chip">POSITIONING ARCHITECTURE</span>
              <span className="pro-chip">HIGH-RETENTION REELS</span>
              <span className="pro-chip">FOUNDER TRUST SYSTEMS</span>
            </div>

            {/* Triad Cycle Accent */}
            <div className="pro-triad-pills" style={{ display: 'flex', gap: '0.6rem', marginBlock: '1.25rem' }}>
              {triadTerms.map((term, idx) => (
                <span
                  key={term}
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.12em',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '4px',
                    border: '1px solid',
                    borderColor: activeWordIdx === idx ? '#d4af37' : 'rgba(255, 255, 255, 0.1)',
                    color: activeWordIdx === idx ? '#d4af37' : '#71717a',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {term}
                </span>
              ))}
            </div>

            <div className="pro-btn-cluster">
              <button
                type="button"
                className="pro-btn-primary"
                onClick={() => onOpenDrawer?.('drawer-branding')}
              >
                VIEW BRAND WORK ↗
              </button>
              <button
                type="button"
                className="pro-btn-outline"
                onClick={() => onOpenProof?.('chinnadurai-retention')}
              >
                RETENTION PROOF ↗
              </button>
            </div>
          </div>

          {/* Right Column: Layered Real Media Canvas (Tilt + Parallax) */}
          <div
            className="pro-chapter-media-wrap"
            ref={stackRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Deep layer 3 (Left edge) */}
            <div className="pro-reel-layer pro-reel-layer-3" ref={layer3Ref} aria-hidden="true">
              <img
                src="/assets/proofs_optimized/chinnadurai_scripting.jpg"
                alt="Chinnadurai Scripting Documentation"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Layer 2 (Behind right) */}
            <div className="pro-reel-layer pro-reel-layer-2" ref={layer2Ref} aria-hidden="true">
              <img
                src="/assets/proofs_optimized/chinnadurai_retention.jpg"
                alt="Chinnadurai 15k+ Retention Graph"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Main Active Layer 1 (Front center) */}
            <div
              className="pro-reel-layer pro-reel-layer-1"
              ref={layer1Ref}
              onClick={() => onOpenProof?.('purple-bts')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onOpenProof?.('purple-bts');
                }
              }}
              aria-label="Inspect Purple Collection On-Location Creative Direction"
            >
              <img
                src="/assets/proofs_optimized/purple_collection_bts.jpg"
                alt="Purple Collection On-Location Creative Direction"
                loading="lazy"
                decoding="async"
              />
              <div className="pro-media-badge">
                <span>VIEW REEL</span>
                <span style={{ color: '#d4af37' }}>↗</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
