'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface CredibilityTrustProps {
  onOpenDrawer?: (drawerId: string) => void;
  onOpenProof?: (proofKey: string) => void;
}

interface AwardItem {
  id: string;
  num: string;
  title: string;
  category: string;
  year: string;
  image: string;
  proofKey: string;
  rotation: number;
}

const AWARDS_LIST: AwardItem[] = [
  {
    id: 'award-1',
    num: '01 / 03',
    title: 'TWIN HEART BUSINESS EXCELLENCE AWARD',
    category: 'HONORARY STAGE RECOGNITION',
    year: 'HONORS · VERIFIED',
    image: '/assets/proofs_optimized/award_1_business_excellence.jpg',
    proofKey: 'award-business-excellence',
    rotation: 2.5,
  },
  {
    id: 'award-2',
    num: '02 / 03',
    title: 'STATE LEVEL TALENT COMPETITION 2025',
    category: 'STATE-LEVEL FIRST HONORS',
    year: '2025 · VERIFIED FIRST PLACE',
    image: '/assets/proofs_optimized/award_2_talent_competition.jpg',
    proofKey: 'award-talent-competition',
    rotation: -2,
  },
  {
    id: 'award-3',
    num: '03 / 03',
    title: 'CERTIFIED AGENCY INTERNSHIP CREDENTIAL',
    category: 'DIGI MARKETRIX AGENCY ISSUED',
    year: '2023 – 2026 · SIGNED BY CEO',
    image: '/assets/proofs_optimized/digi_marketrix_certificate.jpg',
    proofKey: 'digi-cert',
    rotation: 2,
  },
];

export default function CredibilityTrust({ onOpenDrawer, onOpenProof }: CredibilityTrustProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const activeAward = AWARDS_LIST[currentIdx];
  const sectionRef = useRef<HTMLElement>(null);
  const artifactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (artifactRef.current) {
        // Entrance: slide in, rotate into soft spotlight
        gsap.fromTo(
          artifactRef.current,
          {
            x: 50,
            y: 35,
            rotateZ: activeAward.rotation * 1.8,
            opacity: 0.25,
            scale: 0.92,
          },
          {
            x: 0,
            y: 0,
            rotateZ: activeAward.rotation,
            opacity: 1,
            scale: 1,
            duration: 1.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: artifactRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [currentIdx, activeAward.rotation]);

  const handleNext = () => {
    if (artifactRef.current) {
      gsap.to(artifactRef.current, {
        x: -35,
        opacity: 0.3,
        duration: 0.22,
        ease: 'power2.in',
        onComplete: () => {
          setCurrentIdx((prev) => (prev + 1) % AWARDS_LIST.length);
          const nextAward = AWARDS_LIST[(currentIdx + 1) % AWARDS_LIST.length];
          gsap.fromTo(
            artifactRef.current,
            { x: 45, opacity: 0.3, rotateZ: nextAward.rotation * 1.6 },
            { x: 0, opacity: 1, rotateZ: nextAward.rotation, duration: 0.45, ease: 'power2.out' }
          );
        },
      });
    } else {
      setCurrentIdx((prev) => (prev + 1) % AWARDS_LIST.length);
    }
  };

  const handlePrev = () => {
    if (artifactRef.current) {
      gsap.to(artifactRef.current, {
        x: 35,
        opacity: 0.3,
        duration: 0.22,
        ease: 'power2.in',
        onComplete: () => {
          setCurrentIdx((prev) => (prev - 1 + AWARDS_LIST.length) % AWARDS_LIST.length);
          const prevAward = AWARDS_LIST[(currentIdx - 1 + AWARDS_LIST.length) % AWARDS_LIST.length];
          gsap.fromTo(
            artifactRef.current,
            { x: -45, opacity: 0.3, rotateZ: prevAward.rotation * 1.6 },
            { x: 0, opacity: 1, rotateZ: prevAward.rotation, duration: 0.45, ease: 'power2.out' }
          );
        },
      });
    } else {
      setCurrentIdx((prev) => (prev - 1 + AWARDS_LIST.length) % AWARDS_LIST.length);
    }
  };

  return (
    <section className="pro-section" id="proof" ref={sectionRef}>
      <div className="pro-bg-radial" style={{ top: '20%', right: '15%' }} aria-hidden="true"></div>

      <div className="pro-container">
        {/* Gallery Section Header: RECOGNIZED. */}
        <div className="pro-awards-header">
          <div className="pro-kicker-row" style={{ justifyContent: 'center' }}>
            <span className="pro-kicker-dot" aria-hidden="true"></span>
            <span className="pro-kicker-text">05 // PHYSICAL EVIDENCE &amp; RECOGNITION</span>
          </div>

          <h2 className="pro-hook-headline" style={{ fontSize: 'clamp(2.6rem, 5.2vw, 4.6rem)', marginBottom: '0.4rem' }}>
            RECOGNIZED.
          </h2>

          <p style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.78rem', color: '#71717a', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            GALLERY OF AUTHENTIC STAGE TROPHIES &amp; OFFICIAL CREDENTIALS
          </p>
        </div>

        {/* Gallery Stage: One Award Object at a Time under Soft Directional Spotlight */}
        <div className="pro-gallery-stage">
          {/* Spotlight Hero Object Box */}
          <div className="pro-artifact-spotlight-box">
            <div className="pro-artifact-glow" aria-hidden="true"></div>

            <div
              className="pro-artifact-frame"
              ref={artifactRef}
              style={{ transform: `rotate(${activeAward.rotation}deg)` }}
              onClick={() => onOpenProof?.(activeAward.proofKey)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onOpenProof?.(activeAward.proofKey);
                }
              }}
              aria-label={`Inspect ${activeAward.title}`}
            >
              <img
                src={activeAward.image}
                alt={activeAward.title}
                loading="lazy"
              />

              <div
                style={{
                  position: 'absolute',
                  bottom: '1rem',
                  right: '1rem',
                  background: 'rgba(8, 8, 10, 0.85)',
                  backdropFilter: 'blur(10px)',
                  padding: '0.45rem 0.9rem',
                  borderRadius: '999px',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#d4af37',
                  letterSpacing: '0.08em',
                }}
              >
                VIEW PROOF ↗
              </div>
            </div>
          </div>

          {/* Label & Details Beside the Object */}
          <div className="pro-artifact-info">
            <span className="pro-artifact-num">{activeAward.num}</span>

            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.74rem',
                color: '#d4af37',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '0.4rem',
              }}
            >
              {activeAward.category}
            </span>

            <h3 className="pro-artifact-title">{activeAward.title}</h3>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.35rem 0.75rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
                width: 'fit-content',
                marginBottom: '1.5rem',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#27c93f' }}></span>
              <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.72rem', color: '#f4f4f5', letterSpacing: '0.1em' }}>
                {activeAward.year}
              </span>
            </div>

            {/* Gallery Navigation Controls: Prev / Next */}
            <div className="pro-gallery-controls">
              <button
                type="button"
                className="pro-ctrl-btn"
                onClick={handlePrev}
                aria-label="Previous award"
              >
                ← PREV
              </button>
              <button
                type="button"
                className="pro-ctrl-btn"
                onClick={handleNext}
                aria-label="Next award"
                style={{ borderColor: 'rgba(212, 175, 55, 0.4)', color: '#d4af37' }}
              >
                NEXT →
              </button>
            </div>

            {/* Deep dive option */}
            <div style={{ marginTop: '1.75rem' }}>
              <button
                type="button"
                className="pro-btn-primary"
                onClick={() => onOpenProof?.(activeAward.proofKey)}
                style={{ fontSize: '0.74rem' }}
              >
                VIEW PROOF ↗
              </button>
            </div>
          </div>
        </div>

        {/* Transition: Award artifact moves away as typography index enters */}
        <div className="pro-trans-artifact-to-index" aria-hidden="true">
          <div className="pro-trans-index-line"></div>
        </div>
      </div>
    </section>
  );
}
