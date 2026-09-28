'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface WebsiteBuilderProps {
  onOpenDrawer?: (drawerId: string) => void;
  onOpenProof?: (proofKey: string) => void;
}

export default function WebsiteBuilder({ onOpenDrawer, onOpenProof }: WebsiteBuilderProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const browserStageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (canvasRef.current) {
        // Perspective entrance: enters from perspective, settles to flat
        gsap.fromTo(
          canvasRef.current,
          {
            rotateX: 7,
            scale: 0.88,
            y: 80,
            opacity: 0.35,
          },
          {
            rotateX: 0,
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 1.35,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: canvasRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Subtle perspective response on cursor hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current || window.innerWidth < 960) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(canvasRef.current, {
      rotateY: x * 4,
      rotateX: -y * 3.5,
      y: -6 + y * 4,
      duration: 0.45,
      ease: 'power1.out',
      transformPerspective: 1400,
    });
  };

  const handleMouseLeave = () => {
    if (!canvasRef.current) return;
    gsap.to(canvasRef.current, {
      rotateY: 0,
      rotateX: 0,
      y: 0,
      duration: 0.65,
      ease: 'power2.out',
    });
  };

  return (
    <section className="pro-section" id="web" data-alias="about" ref={sectionRef}>
      <span id="about" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} aria-hidden="true"></span>
      <div className="pro-bg-radial" style={{ top: '10%', right: '10%' }} aria-hidden="true"></div>

      <div className="pro-container">
        {/* Minimal Central Hook */}
        <div className="pro-web-layout">
          <div className="pro-web-header">
            <div className="pro-kicker-row" style={{ justifyContent: 'center' }}>
              <span className="pro-kicker-dot" aria-hidden="true"></span>
              <span className="pro-kicker-text">03 // FUNCTIONAL CODE &amp; INTERFACES</span>
            </div>

            {/* Hook: IDEA → INTERFACE → LIVE. */}
            <h2 className="pro-hook-headline" style={{ marginBottom: '0.6rem', textAlign: 'center' }}>
              IDEA → INTERFACE →<br />
              <span style={{ color: '#d4af37' }}>LIVE.</span>
            </h2>

            <p style={{ fontFamily: 'var(--font-heading, "Syne", sans-serif)', fontSize: 'clamp(1.4rem, 2.8vw, 2.2rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.02em', color: '#ffffff', margin: '0 0 0.5rem 0' }}>
              WEBSITE BUILDER
            </p>

            <p style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.78rem', color: '#a1a1aa', letterSpacing: '0.18em', textTransform: 'uppercase', margin: 0 }}>
              DESIGN · BUILD · DEPLOY
            </p>
          </div>

          {/* Central Visual: Real Jayashakthi Tours & Travels Website in 3D Browser Canvas */}
          <div
            className="pro-browser-stage"
            ref={browserStageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="pro-browser-canvas"
              ref={canvasRef}
              onClick={() => onOpenProof?.('jayashakthi-site')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onOpenProof?.('jayashakthi-site');
                }
              }}
              aria-label="Inspect Jayashakthi Tours & Travels website proof"
            >
              {/* Browser Chrome Bar */}
              <div className="pro-browser-chrome">
                <div className="pro-browser-dots" aria-hidden="true">
                  <span className="pro-browser-dot" style={{ background: '#ff5f56' }}></span>
                  <span className="pro-browser-dot" style={{ background: '#ffbd2e' }}></span>
                  <span className="pro-browser-dot" style={{ background: '#27c93f' }}></span>
                </div>
                <div className="pro-browser-url">
                  <span style={{ color: '#27c93f', fontSize: '0.65rem' }}>●</span>
                  <span>https://jayashakthitoursandtravels.com</span>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.68rem',
                    color: '#d4af37',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  LIVE PROD
                </span>
              </div>

              {/* Real Website Image Interface */}
              <div className="pro-browser-body">
                <img
                  src="/assets/proofs_optimized/jayashakthi_website.jpg"
                  alt="Jayashakthi Tours & Travels Live Production Website Interface"
                  loading="lazy"
                />

                {/* Hover Action Overlay */}
                <div className="pro-browser-action-overlay">
                  <span
                    className="pro-btn-primary"
                    style={{ pointerEvents: 'none' }}
                  >
                    INSPECT PROOF ↗
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pro-btn-cluster" style={{ justifyContent: 'center', marginTop: '2.5rem' }}>
            <a
              href="https://jayashakthitoursandtravels.com"
              target="_blank"
              rel="noopener noreferrer"
              className="pro-btn-primary"
            >
              VIEW LIVE ↗
            </a>
            <button
              type="button"
              className="pro-btn-outline"
              onClick={() => onOpenDrawer?.('drawer-web')}
            >
              SYSTEM ARCHITECTURE ↗
            </button>
          </div>

          {/* Transition: Browser screen darkens and transforms into video frame */}
          <div className="pro-trans-canvas-to-video" aria-hidden="true">
            <div className="pro-trans-canvas-to-video-taper"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
