'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from '../../lib/gsap';

interface ExecutiveHookProps {
  onOpenProof?: (proofKey: string) => void;
}

export default function ExecutiveHook({ onOpenProof }: ExecutiveHookProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', force3D: true },
          0
        );
      }

      if (cardRef.current) {
        tl.fromTo(
          cardRef.current,
          { scale: 0.92, y: 45, opacity: 0.3 },
          { scale: 1, y: 0, opacity: 1, duration: 1.0, ease: 'power2.out', force3D: true },
          0.1
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    rectRef.current = e.currentTarget.getBoundingClientRect();
  };

  // Subtle 3D tilt on hover (cached rect, transform only, no layout shift)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || window.innerWidth < 960) return;
    const rect = rectRef.current || e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(cardRef.current, {
      rotateY: x * 6,
      rotateX: -y * 6,
      scale3d: 1.015,
      duration: 0.35,
      ease: 'power1.out',
      transformPerspective: 1200,
      force3D: true,
    });
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      scale3d: 1,
      duration: 0.5,
      ease: 'power2.out',
      force3D: true,
    });
  };

  const highlightChips = [
    'BRAND STRATEGY & POSITIONING',
    'GROWTH & DIGITAL MARKETING',
    'HIGH-CONVERSION WEBSITES',
    'CONTENT & KEYNOTE SPEAKING',
  ];

  const statBadges = [
    { num: '03+', label: 'YEARS AGENCY LEAD' },
    { num: '500K+', label: 'ORGANIC REACH' },
    { num: '15+', label: 'CLIENT CAMPAIGNS' },
    { num: '100%', label: 'CLIENT RETENTION' },
  ];

  return (
    <section className="pro-section pro-executive-hook" id="work" ref={sectionRef}>
      {/* Background Marquee Keywords (Low-opacity subtle motion accent) */}
      <div className="pro-marquee-bg" aria-hidden="true">
        <div className="pro-marquee-track">
          <span>STRATEGY · BRAND GROWTH · WEB SYSTEMS · CREATIVE DIRECTION · TRUST · IMPACT · </span>
          <span>STRATEGY · BRAND GROWTH · WEB SYSTEMS · CREATIVE DIRECTION · TRUST · IMPACT · </span>
        </div>
      </div>

      <div className="pro-container">
        <div className="pro-hook-layout">
          {/* Left Column: Core Value Proposition */}
          <div className="pro-hook-left">
            <div className="pro-kicker-row">
              <span className="pro-kicker-dot" aria-hidden="true"></span>
              <span className="pro-kicker-text">01 // STRATEGIC DIRECTION &amp; EXECUTION</span>
            </div>

            <h2 className="pro-hook-headline" ref={headlineRef}>
              TURNING AMBITION INTO<br />
              <span style={{ color: '#d4af37' }}>TANGIBLE BRAND VALUE.</span>
            </h2>

            <p className="pro-hook-sub">
              A multidisciplinary creative partner building high-converting brands, scalable digital platforms, and authentic audience trust.
            </p>

            {/* 4 Compact Highlight Chips */}
            <div className="pro-chips-grid">
              {highlightChips.map((chip) => (
                <div key={chip} className="pro-highlight-chip">
                  <span className="chip-bullet"></span>
                  <span>{chip}</span>
                </div>
              ))}
            </div>

            {/* Compact Achievement Stats */}
            <div className="pro-stats-row">
              {statBadges.map((stat) => (
                <div key={stat.label} className="pro-stat-item">
                  <span className="pro-stat-num">{stat.num}</span>
                  <span className="pro-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Floating 3D Proof Card (Real Content Only) */}
          <div className="pro-hook-right">
            <div
              className="pro-proof-card-3d"
              ref={cardRef}
              onMouseEnter={handleMouseEnter}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => onOpenProof?.('digi-working')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onOpenProof?.('digi-working');
                }
              }}
              aria-label="Inspect Aakash Creative Direction and Editing Timeline"
            >
              <div className="pro-card-image-wrap">
                <img
                  src="/assets/proofs_optimized/digi_marketrix_working.jpg"
                  alt="Aakash in Agency Video Editing Suite at Digi Marketrix"
                  loading="lazy"
                  decoding="async"
                />
                <div className="pro-card-badge-top">
                  <span className="status-live-dot"></span>
                  <span>VERIFIED AGENCY PRACTICE</span>
                </div>
                <div className="pro-card-badge-bottom">
                  <span>POST-PRODUCTION &amp; STRATEGY</span>
                  <span style={{ color: '#d4af37' }}>INSPECT ↗</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
