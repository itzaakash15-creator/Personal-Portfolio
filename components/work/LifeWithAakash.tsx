'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface LifeWithAakashProps {
  onOpenProof?: (proofKey: string) => void;
}

export default function LifeWithAakash({ onOpenProof }: LifeWithAakashProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoFrameRef = useRef<HTMLDivElement>(null);
  const depthLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (videoFrameRef.current) {
        // Thumbnail begins out of focus & deeper in space, then sharpens as it enters viewport
        gsap.fromTo(
          videoFrameRef.current,
          {
            scale: 0.88,
            y: 60,
            filter: 'blur(10px)',
            opacity: 0.3,
          },
          {
            scale: 1,
            y: 0,
            filter: 'blur(0px)',
            opacity: 1,
            duration: 1.35,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: videoFrameRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Subtle pointer depth response
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoFrameRef.current || window.innerWidth < 960) return;
    const rect = videoFrameRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(videoFrameRef.current, {
      x: x * 10,
      y: y * 8,
      duration: 0.45,
      ease: 'power1.out',
    });

    if (depthLayerRef.current) {
      gsap.to(depthLayerRef.current, {
        x: x * -14,
        y: y * -12,
        duration: 0.55,
        ease: 'power1.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (!videoFrameRef.current) return;
    gsap.to(videoFrameRef.current, { x: 0, y: 0, duration: 0.6, ease: 'power2.out' });
    if (depthLayerRef.current) {
      gsap.to(depthLayerRef.current, { x: 0, y: 0, duration: 0.6, ease: 'power2.out' });
    }
  };

  return (
    <section className="pro-section" id="speaking" ref={sectionRef}>
      <div className="pro-bg-radial" style={{ top: '25%', left: '5%' }} aria-hidden="true"></div>

      <div className="pro-container">
        <div className="pro-lwa-grid">
          {/* Left Column: Minimal Typography & Emotion */}
          <div className="pro-lwa-content">
            <div className="pro-kicker-row">
              <span className="pro-kicker-dot" aria-hidden="true"></span>
              <span className="pro-kicker-text">04 // VOICE · PURPOSE · INFLUENCE</span>
            </div>

            <h2 className="pro-hook-headline" style={{ marginBottom: '1.2rem' }}>
              LIFE WITH<br />
              <span style={{ color: '#d4af37' }}>AAKASH</span>
            </h2>

            <p className="pro-kicker-text" style={{ color: '#a1a1aa', letterSpacing: '0.2em', marginBottom: '1.5rem' }}>
              LIFE · REFLECTION · MOTIVATION
            </p>

            <p className="pro-hook-sub" style={{ marginBottom: '2rem' }}>
              Spoken-word perspectives on discipline, mindset, and authentic self-mastery. Real engagement earned through conviction, not algorithms.
            </p>

            {/* Credibility Signal */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#d4af37', boxShadow: '0 0 12px #d4af37' }}></span>
              <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.78rem', color: '#f4f4f5', letterSpacing: '0.12em', fontWeight: 600 }}>
                59.1K+ ORGANIC PEAK VIEWERSHIP · ZERO PAID ADS
              </span>
            </div>

            <div className="pro-btn-cluster">
              <a
                href="https://www.instagram.com/life.with_aakash?stkn=MXcwa2ZraGllYXBuOA=="
                target="_blank"
                rel="noopener noreferrer"
                className="pro-btn-primary"
              >
                EXPLORE REELS ↗
              </a>
              <button
                type="button"
                className="pro-btn-outline"
                onClick={() => onOpenProof?.('lwa-views')}
              >
                VIEW METRICS PROOF ↗
              </button>
            </div>
          </div>

          {/* Right Column: One Vertical Video Stage with Depth Peek */}
          <div
            className="pro-video-stage"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Subtle secondary depth layer behind */}
            <div
              ref={depthLayerRef}
              style={{
                position: 'absolute',
                top: '20px',
                right: '-20px',
                width: '92%',
                height: '92%',
                borderRadius: '16px',
                backgroundImage: 'url(/assets/proofs_optimized/lwa_organic_views.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.28,
                filter: 'blur(3px)',
                zIndex: 1,
                border: '1px solid rgba(212, 175, 55, 0.2)',
                pointerEvents: 'none',
                transition: 'transform 0.5s ease',
              }}
              aria-hidden="true"
            ></div>

            {/* Main Vertical Video Frame */}
            <div
              className="pro-video-frame"
              ref={videoFrameRef}
              onClick={() => onOpenProof?.('lwa-profile')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onOpenProof?.('lwa-profile');
                }
              }}
              aria-label="View Life With Aakash profile and video proof"
              style={{ zIndex: 2 }}
            >
              <img
                src="/assets/proofs_optimized/lwa_page.jpg"
                alt="Life With Aakash Spoken-Word Video and Platform Profile"
                loading="lazy"
              />

              {/* Play / Inspect Badge */}
              <div className="pro-video-play-badge" aria-hidden="true">
                ▶
              </div>

              {/* Bottom Badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '1rem',
                  right: '1rem',
                  background: 'rgba(8, 8, 10, 0.85)',
                  backdropFilter: 'blur(10px)',
                  padding: '0.6rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.72rem',
                  color: '#d4af37',
                  letterSpacing: '0.08em',
                }}
              >
                <span>@LIFE.WITH_AAKASH</span>
                <span style={{ color: '#ffffff', fontWeight: 700 }}>PLAY ↗</span>
              </div>
            </div>
          </div>
        </div>

        {/* Transition: Video frame shrinks into gallery object */}
        <div className="pro-trans-video-to-artifact" aria-hidden="true">
          <div className="pro-trans-artifact-spot"></div>
        </div>
      </div>
    </section>
  );
}
