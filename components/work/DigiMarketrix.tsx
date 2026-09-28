'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Talentrix from './Talentrix';

interface DigiMarketrixProps {
  onOpenDrawer?: (drawerId: string) => void;
  onOpenProof?: (proofKey: string) => void;
}

export default function DigiMarketrix({ onOpenDrawer, onOpenProof }: DigiMarketrixProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const depthLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Masked typography reveal
      const digiWord = document.querySelector('.pro-digi-word-1');
      const marketrixWord = document.querySelector('.pro-digi-word-2');
      const mainVisual = mediaRef.current;

      if (digiWord && marketrixWord) {
        gsap.fromTo(
          digiWord,
          { y: '105%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          marketrixWord,
          { y: '105%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 1.0,
            ease: 'power3.out',
            delay: 0.12,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Visual settling physics
      if (mainVisual) {
        gsap.fromTo(
          mainVisual,
          { scale: 0.88, y: 60, rotateZ: 2, opacity: 0.3 },
          {
            scale: 1,
            y: 0,
            rotateZ: 0,
            opacity: 1,
            duration: 1.25,
            ease: 'power2.out',
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

  // Subtle pointer movement: maximum 6–8px shift, calm anchor
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mediaRef.current || window.innerWidth < 960) return;
    const rect = mediaRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(mediaRef.current, {
      x: x * 14,
      y: y * 12,
      duration: 0.5,
      ease: 'power1.out',
    });

    if (depthLayerRef.current) {
      gsap.to(depthLayerRef.current, {
        x: x * -18,
        y: y * -16,
        duration: 0.6,
        ease: 'power1.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (!mediaRef.current) return;
    gsap.to(mediaRef.current, { x: 0, y: 0, duration: 0.6, ease: 'power2.out' });
    if (depthLayerRef.current) {
      gsap.to(depthLayerRef.current, { x: 0, y: 0, duration: 0.7, ease: 'power2.out' });
    }
  };

  return (
    <section className="pro-section" id="work" data-alias="experience" ref={sectionRef}>
      <span id="experience" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} aria-hidden="true"></span>
      <div className="pro-bg-radial" style={{ top: '15%', right: '-8%' }} aria-hidden="true"></div>

      <div className="pro-container">
        {/* Digi Marketrix Asymmetric Presentation */}
        <div className="pro-digi-grid">
          {/* Left Column: Masked Typography + Concise Hook + Factual Markers */}
          <div className="pro-digi-content">
            <div className="pro-kicker-row">
              <span className="pro-kicker-dot" aria-hidden="true"></span>
              <span className="pro-kicker-text">01 // 3 YEARS · DIGITAL MARKETING</span>
            </div>

            <h2 className="pro-hook-headline">
              REAL WORK.<br />
              <span style={{ color: '#d4af37' }}>REAL RESPONSIBILITY.</span>
            </h2>

            <div className="pro-digi-wordmark" aria-label="Digi Marketrix">
              <div className="pro-title-mask">
                <span className="pro-digi-word-1">DIGI</span>
              </div>
              <div className="pro-title-mask">
                <span className="pro-digi-word-2" style={{ color: '#d4af37' }}>MARKETRIX</span>
              </div>
            </div>

            {/* Typography-integrated factual markers (No generic cards) */}
            <div className="pro-facts-row">
              <div className="pro-fact-item">
                <span className="pro-fact-num">03</span>
                <span className="pro-fact-label">Years Agency Execution</span>
              </div>
              <div className="pro-fact-item">
                <span className="pro-fact-num" style={{ color: '#ffffff' }}>CERTIFIED</span>
                <span className="pro-fact-label">Full-Time Internship</span>
              </div>
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

          {/* Right Column: Dominant Real Visual with 3D Depth Layer */}
          <div
            className="pro-media-stage"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Secondary depth visual behind */}
            <div
              className="pro-media-depth-peek"
              ref={depthLayerRef}
              style={{ backgroundImage: 'url(/assets/proofs_optimized/digi_marketrix_working.jpg)' }}
              aria-hidden="true"
            ></div>

            {/* Primary Dominant Real Image */}
            <div
              className="pro-media-main-frame"
              ref={mediaRef}
              onClick={() => onOpenProof?.('digi-office')}
              title="Click to inspect Digi Marketrix agency studio"
            >
              <img
                src="/assets/proofs_optimized/digi_marketrix_office.jpg"
                alt="Digi Marketrix Agency Studio Workplace and 3D Logo Wall"
                loading="lazy"
              />
              <div className="pro-media-badge">
                <span>VIEW WORK</span>
                <span>↗</span>
              </div>
            </div>
          </div>
        </div>

        {/* Thin Viewport Sweep Line into Talentrix */}
        <div className="pro-sweep-divider" id="talentrix-sweep-line"></div>

        {/* Talentrix Moment */}
        <Talentrix onOpenDrawer={onOpenDrawer} onOpenProof={onOpenProof} />

        {/* Transition: Talentrix wide poster collapses into vertical framing */}
        <div className="pro-trans-collapse-vertical" aria-hidden="true"></div>
      </div>
    </section>
  );
}
