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
        gsap.fromTo(
          videoFrameRef.current,
          {
            scale: 0.9,
            y: 45,
            opacity: 0.35,
          },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 1.25,
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
      x: x * 8,
      y: y * 6,
      rotateY: x * 4,
      rotateX: -y * 4,
      duration: 0.4,
      ease: 'power1.out',
      transformPerspective: 1200,
    });

    if (depthLayerRef.current) {
      gsap.to(depthLayerRef.current, {
        x: x * -10,
        y: y * -8,
        duration: 0.5,
        ease: 'power1.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (!videoFrameRef.current) return;
    gsap.to(videoFrameRef.current, {
      x: 0,
      y: 0,
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'power2.out',
    });
    if (depthLayerRef.current) {
      gsap.to(depthLayerRef.current, { x: 0, y: 0, duration: 0.6, ease: 'power2.out' });
    }
  };

  return (
    <section className="pro-section pro-chapter-card" id="speaking" ref={sectionRef}>
      <div className="pro-container">
        <div className="pro-chapter-grid">
          {/* Left Column: Title + One-Line Impact + 3 Chips + CTAs */}
          <div className="pro-chapter-content">
            <div className="pro-kicker-row">
              <span className="pro-kicker-dot" aria-hidden="true"></span>
              <span className="pro-kicker-text">CASE STUDY // 04</span>
            </div>

            <h3 className="pro-chapter-title">
              LIFE WITH<br />
              <span style={{ color: '#d4af37' }}>AAKASH</span>
            </h3>

            <p className="pro-chapter-impact">
              A spoken-word motivational platform engineered around human connection, reaching 59K+ organic peak viewership with zero paid advertising.
            </p>

            {/* 3 Compact Supporting Details/Chips */}
            <div className="pro-chapter-chips">
              <span className="pro-chip">59.1K+ ORGANIC PEAK</span>
              <span className="pro-chip">ZERO PAID ADS</span>
              <span className="pro-chip">AUTHENTIC COMMUNITY</span>
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

          {/* Right Column: Dominant Vertical Video Canvas with 3D Tilt */}
          <div
            className="pro-chapter-media-wrap"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Background supporting video layer */}
            <div
              className="pro-media-depth-peek"
              ref={depthLayerRef}
              style={{ backgroundImage: 'url(/assets/proofs_optimized/lwa_organic_views.jpg)' }}
              aria-hidden="true"
            ></div>

            {/* Dominant Real Vertical Video Frame */}
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
            >
              <img
                src="/assets/proofs_optimized/lwa_page.jpg"
                alt="Life With Aakash Spoken-Word Video and Platform Profile"
                loading="lazy"
                decoding="async"
              />

              {/* Play Badge */}
              <div className="pro-video-play-badge" aria-hidden="true">
                ▶
              </div>

              {/* Bottom Badge */}
              <div className="pro-video-bar-bottom">
                <span>@LIFE.WITH_AAKASH</span>
                <span style={{ color: '#ffffff', fontWeight: 700 }}>PLAY ↗</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
