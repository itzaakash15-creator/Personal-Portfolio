'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import Talentrix from './Talentrix';

interface DigiMarketrixProps {
  onOpenDrawer?: (drawerId: string) => void;
  onOpenProof?: (proofKey: string) => void;
}

export default function DigiMarketrix({ onOpenDrawer, onOpenProof }: DigiMarketrixProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const depthLayerRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const mainVisual = mediaRef.current;
      if (mainVisual) {
        gsap.fromTo(
          mainVisual,
          { scale: 0.92, y: 40, opacity: 0.3 },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power2.out',
            force3D: true,
            scrollTrigger: {
              trigger: mainVisual,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    rectRef.current = e.currentTarget.getBoundingClientRect();
  };

  // Subtle 3D tilt on hover (cached rect, transform only, no layout shifts)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mediaRef.current || window.innerWidth < 960) return;
    const rect = rectRef.current || e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(mediaRef.current, {
      rotateY: x * 6,
      rotateX: -y * 6,
      scale3d: 1.015,
      duration: 0.35,
      ease: 'power1.out',
      transformPerspective: 1200,
      force3D: true,
    });

    if (depthLayerRef.current) {
      gsap.to(depthLayerRef.current, {
        x: x * -10,
        y: y * -8,
        duration: 0.45,
        ease: 'power1.out',
        force3D: true,
      });
    }
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    if (!mediaRef.current) return;
    gsap.to(mediaRef.current, {
      rotateY: 0,
      rotateX: 0,
      scale3d: 1,
      duration: 0.5,
      ease: 'power2.out',
      force3D: true,
    });
    if (depthLayerRef.current) {
      gsap.to(depthLayerRef.current, { x: 0, y: 0, duration: 0.5, ease: 'power2.out', force3D: true });
    }
  };

  return (
    <section className="pro-section pro-chapter-card" id="experience" ref={sectionRef}>
      <div className="pro-container">
        <div className="pro-chapter-grid">
          {/* Left Column: Strong Title + One-Line Impact + 3 Chips + CTAs */}
          <div className="pro-chapter-content">
            <div className="pro-kicker-row">
              <span className="pro-kicker-dot" aria-hidden="true"></span>
              <span className="pro-kicker-text">CASE STUDY // 01</span>
            </div>

            <h3 className="pro-chapter-title">
              DIGI<br />
              <span style={{ color: '#d4af37' }}>MARKETRIX</span>
            </h3>

            <p className="pro-chapter-impact">
              Three years of hands-on agency responsibility directing digital campaigns, commercial video post-production, and the Talentrix influencer initiative.
            </p>

            {/* 3 Compact Supporting Details/Chips */}
            <div className="pro-chapter-chips">
              <span className="pro-chip">03 YEARS AGENCY LEAD</span>
              <span className="pro-chip">TALENTRIX INITIATIVE</span>
              <span className="pro-chip">FULL-SPECTRUM MARKETING</span>
            </div>

            <div className="pro-btn-cluster">
              <button
                type="button"
                className="pro-btn-primary"
                onClick={() => onOpenDrawer?.('drawer-digi')}
              >
                EXPLORE CASE STUDY →
              </button>
              <button
                type="button"
                className="pro-btn-outline"
                onClick={() => onOpenProof?.('digi-cert')}
              >
                VIEW CERTIFICATE ↗
              </button>
            </div>
          </div>

          {/* Right Column: Dominant Real Visual with Subtle 3D Tilt */}
          <div
            className="pro-chapter-media-wrap"
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Background ambient depth card */}
            <div
              className="pro-media-depth-peek"
              ref={depthLayerRef}
              style={{ backgroundImage: 'url(/assets/proofs_optimized/digi_marketrix_gimbal_shoot.jpg)' }}
              aria-hidden="true"
            ></div>

            {/* Main Authentic Agency Visual */}
            <div
              className="pro-chapter-main-frame"
              ref={mediaRef}
              onClick={() => onOpenProof?.('digi-office')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onOpenProof?.('digi-office');
                }
              }}
              aria-label="Inspect Digi Marketrix agency studio"
            >
              <img
                src="/assets/proofs_optimized/digi_marketrix_office.jpg"
                alt="Digi Marketrix Agency Studio Workplace and 3D Logo Wall"
                loading="lazy"
                decoding="async"
              />
              <div className="pro-media-badge">
                <span>AGENCY STUDIO</span>
                <span style={{ color: '#d4af37' }}>↗</span>
              </div>
            </div>
          </div>
        </div>

        {/* Talentrix Sub-Hook Feature */}
        <div className="pro-sweep-divider" aria-hidden="true"></div>
        <Talentrix onOpenDrawer={onOpenDrawer} onOpenProof={onOpenProof} />
      </div>
    </section>
  );
}
