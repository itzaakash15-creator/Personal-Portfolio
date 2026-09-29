'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';

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

    const ctx = gsap.context(() => {
      if (canvasRef.current) {
        gsap.fromTo(
          canvasRef.current,
          {
            rotateX: 6,
            scale: 0.9,
            y: 50,
            opacity: 0.35,
          },
          {
            rotateX: 0,
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 1.25,
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
      rotateY: x * 5,
      rotateX: -y * 4,
      y: -4 + y * 4,
      duration: 0.4,
      ease: 'power1.out',
      transformPerspective: 1200,
    });
  };

  const handleMouseLeave = () => {
    if (!canvasRef.current) return;
    gsap.to(canvasRef.current, {
      rotateY: 0,
      rotateX: 0,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  return (
    <section className="pro-section pro-chapter-card" id="web" data-alias="about" ref={sectionRef}>
      <span id="about" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} aria-hidden="true"></span>

      <div className="pro-container">
        <div className="pro-chapter-grid">
          {/* Left Column: Title + One-Line Impact + 3 Chips + CTAs */}
          <div className="pro-chapter-content">
            <div className="pro-kicker-row">
              <span className="pro-kicker-dot" aria-hidden="true"></span>
              <span className="pro-kicker-text">CASE STUDY // 03</span>
            </div>

            <h3 className="pro-chapter-title">
              WEBSITE<br />
              <span style={{ color: '#d4af37' }}>BUILDER</span>
            </h3>

            <p className="pro-chapter-impact">
              Crafting bespoke, high-performance web applications that merge thoughtful interaction design with commercial conversion.
            </p>

            {/* 3 Compact Supporting Details/Chips */}
            <div className="pro-chapter-chips">
              <span className="pro-chip">BESPOKE UI/UX</span>
              <span className="pro-chip">FULL-STACK ARCHITECTURE</span>
              <span className="pro-chip">LIVE CLIENT DEPLOYMENT</span>
            </div>

            <div className="pro-btn-cluster">
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
          </div>

          {/* Right Column: Central Visual in 3D Browser Canvas */}
          <div
            className="pro-chapter-media-wrap"
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
                <span className="pro-browser-tag">LIVE PROD</span>
              </div>

              {/* Real Website Image Interface */}
              <div className="pro-browser-body">
                <img
                  src="/assets/proofs_optimized/jayashakthi_website.jpg"
                  alt="Jayashakthi Tours & Travels Live Production Website Interface"
                  loading="lazy"
                  decoding="async"
                />
                <div className="pro-media-badge">
                  <span>INSPECT PROOF</span>
                  <span style={{ color: '#d4af37' }}>↗</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
