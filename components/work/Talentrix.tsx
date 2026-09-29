'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';

interface TalentrixProps {
  onOpenDrawer?: (drawerId: string) => void;
  onOpenProof?: (proofKey: string) => void;
}

export default function Talentrix({ onOpenDrawer, onOpenProof }: TalentrixProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const sweepLine = document.getElementById('talentrix-sweep-line');
      const talentrixTitle = document.querySelector('.pro-talentrix-word');
      const poster = posterRef.current;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      });

      if (sweepLine) {
        tl.fromTo(
          sweepLine,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.0, ease: 'power3.inOut' },
          0
        );
      }

      if (talentrixTitle) {
        tl.fromTo(
          talentrixTitle,
          { y: '100%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 0.9, ease: 'power3.out' },
          0.1
        );
      }

      if (poster) {
        tl.fromTo(
          poster,
          { scale: 0.92, y: 40, opacity: 0.4 },
          { scale: 1, y: 0, opacity: 1, duration: 1.0, ease: 'power2.out' },
          0.15
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!posterRef.current || window.innerWidth < 960) return;
    const rect = posterRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(posterRef.current, {
      x: x * 16,
      y: y * 14,
      duration: 0.45,
      ease: 'power1.out',
    });
  };

  const handleMouseLeave = () => {
    if (!posterRef.current) return;
    gsap.to(posterRef.current, { x: 0, y: 0, duration: 0.6, ease: 'power2.out' });
  };

  return (
    <div className="pro-talentrix-block" id="talentrix" ref={containerRef}>
      {/* Left Column: Revealed Wordmark & Micro Kicker */}
      <div className="pro-talentrix-info">
        <div className="pro-kicker-row">
          <span className="pro-kicker-dot" aria-hidden="true"></span>
          <span className="pro-kicker-text">IN-HOUSE VENTURE // 02</span>
        </div>

        <div className="pro-title-mask">
          <h3 className="pro-talentrix-title pro-talentrix-word">
            TALENT<br />
            RIX<span style={{ color: '#d4af37' }}>.</span>
          </h3>
        </div>

        <p className="pro-hook-sub" style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
          STARTED &amp; LED<br />
          <span style={{ color: '#d4af37' }}>INFLUENCER MARKETING.</span>
        </p>

        <div className="pro-btn-cluster">
          <button
            type="button"
            className="pro-btn-primary"
            onClick={() => onOpenDrawer?.('drawer-digi')}
          >
            EXPLORE INITIATIVE →
          </button>
          <button
            type="button"
            className="pro-btn-outline"
            onClick={() => onOpenProof?.('digi-gimbal')}
          >
            FIELD PRODUCTION ↗
          </button>
        </div>
      </div>

      {/* Right Column: Floating Editorial Poster with Cursor Parallax */}
      <div
        className="pro-talentrix-poster"
        ref={posterRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onOpenProof?.('digi-gimbal')}
        title="Click to inspect Talentrix field production"
      >
        <img
          src="/assets/proofs_optimized/digi_marketrix_gimbal_shoot.jpg"
          alt="Aakash operating 3-axis motorized gimbal during commercial production"
          loading="lazy"
        />
        <div className="pro-media-badge">
          <span>EXPLORE</span>
          <span>↗</span>
        </div>
      </div>
    </div>
  );
}
