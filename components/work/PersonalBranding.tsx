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
      // Entrance animation for spatial reel stack
      if (stackRef.current) {
        gsap.fromTo(
          stackRef.current,
          { opacity: 0.2, scale: 0.88, y: 70 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.25,
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

    // Sequential subtle cycle for supporting terms
    const interval = setInterval(() => {
      setActiveWordIdx((prev) => (prev + 1) % triadTerms.length);
    }, 2200);

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

    // Front media moves slightly
    if (layer1Ref.current) {
      gsap.to(layer1Ref.current, { x: x * 14, y: y * 12, duration: 0.45, ease: 'power1.out' });
    }
    // Background media moves less
    if (layer2Ref.current) {
      gsap.to(layer2Ref.current, { x: 35 + x * 7, y: -15 + y * 6, duration: 0.55, ease: 'power1.out' });
    }
    if (layer3Ref.current) {
      gsap.to(layer3Ref.current, { x: -35 + x * -4, y: 25 + y * -3, duration: 0.65, ease: 'power1.out' });
    }
  };

  const handleMouseLeave = () => {
    if (layer1Ref.current) gsap.to(layer1Ref.current, { x: 0, y: 0, duration: 0.6, ease: 'power2.out' });
    if (layer2Ref.current) gsap.to(layer2Ref.current, { x: 35, y: -15, duration: 0.6, ease: 'power2.out' });
    if (layer3Ref.current) gsap.to(layer3Ref.current, { x: -35, y: 25, duration: 0.6, ease: 'power2.out' });
  };

  return (
    <section className="pro-section" id="branding" data-alias="creator" ref={sectionRef}>
      <span id="creator" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} aria-hidden="true"></span>
      <div className="pro-bg-radial" style={{ top: '20%', left: '-8%' }} aria-hidden="true"></div>

      <div className="pro-container">
        <div className="pro-branding-wrapper">
          {/* Left Column: Hook + Title + Supporting Terms + Action (Zero paragraphs) */}
          <div className="pro-branding-content">
            <div className="pro-kicker-row">
              <span className="pro-kicker-dot" aria-hidden="true"></span>
              <span className="pro-kicker-text">02 // STRATEGY &amp; POSITIONING</span>
            </div>

            <h2 className="pro-branding-hook-large">
              TRUST<br />
              <span style={{ color: '#d4af37' }}>&gt; ATTENTION</span>
            </h2>

            <p style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.82rem', color: '#ffffff', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.5rem', fontWeight: 700 }}>
              PERSONAL BRANDING STRATEGIST
            </p>

            {/* Small supporting terms only: POSITION · CONTENT · TRUST */}
            <div className="pro-branding-triad">
              {triadTerms.map((term, idx) => (
                <span
                  key={term}
                  className="pro-triad-word"
                  style={{
                    opacity: activeWordIdx === idx ? 1 : 0.45,
                    borderColor: activeWordIdx === idx ? '#d4af37' : 'rgba(212, 175, 55, 0.15)',
                    transform: activeWordIdx === idx ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.35s ease',
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

          {/* Right Column: Layered Media Canvas (3 Real Reels / Campaigns) */}
          <div
            className="pro-spatial-reel-stack"
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
              />
            </div>

            {/* Layer 2 (Behind right) */}
            <div className="pro-reel-layer pro-reel-layer-2" ref={layer2Ref} aria-hidden="true">
              <img
                src="/assets/proofs_optimized/chinnadurai_retention.jpg"
                alt="Chinnadurai 15k+ Retention Graph"
                loading="lazy"
              />
            </div>

            {/* Main Active Layer 1 (Front center) */}
            <div
              className="pro-reel-layer pro-reel-layer-1"
              ref={layer1Ref}
              onClick={() => onOpenProof?.('purple-bts')}
              title="Click to view full-resolution production evidence"
            >
              <img
                src="/assets/proofs_optimized/purple_collection_bts.jpg"
                alt="Purple Collection On-Location Creative Direction"
                loading="lazy"
              />
              <div className="pro-media-badge">
                <span>VIEW REEL</span>
                <span>↗</span>
              </div>
            </div>
          </div>
        </div>

        {/* Transition: Vertical reel stretches/widens into browser canvas */}
        <div className="pro-trans-reel-to-canvas" aria-hidden="true">
          <div className="pro-trans-reel-to-canvas-expand"></div>
        </div>
      </div>
    </section>
  );
}
