'use client';

import React, { useState, useRef, useEffect } from 'react';
import { gsap } from '../../lib/gsap';

interface CredibilityTrustProps {
  onOpenDrawer?: (drawerId: string) => void;
  onOpenProof?: (proofKey: string) => void;
}

interface ProofCardItem {
  id: string;
  category: 'awards' | 'certificates' | 'growth';
  categoryLabel: string;
  title: string;
  subtitle: string;
  image: string;
  proofKey: string;
  tag: string;
}

const PROOF_CARDS: ProofCardItem[] = [
  {
    id: 'proof-1',
    category: 'awards',
    categoryLabel: 'AWARDS & HONORS',
    title: 'TWIN HEART BUSINESS EXCELLENCE AWARD',
    subtitle: 'Honorary stage recognition for business leadership and digital impact.',
    image: '/assets/proofs_optimized/award_1_business_excellence.jpg',
    proofKey: 'award-business-excellence',
    tag: 'HONORARY DISTINCTION',
  },
  {
    id: 'proof-2',
    category: 'awards',
    categoryLabel: 'AWARDS & HONORS',
    title: 'STATE LEVEL TALENT COMPETITION 2025',
    subtitle: 'First place honors in state-wide oratorical and communication distinctions.',
    image: '/assets/proofs_optimized/award_2_talent_competition.jpg',
    proofKey: 'award-talent-competition',
    tag: '1ST PLACE TROPHY',
  },
  {
    id: 'proof-3',
    category: 'certificates',
    categoryLabel: 'CERTIFICATES',
    title: 'DIGI MARKETRIX CERTIFIED CREDENTIAL',
    subtitle: 'Signed by CEO Antony Joyson Fernando verifying 3 years of agency execution.',
    image: '/assets/proofs_optimized/digi_marketrix_certificate.jpg',
    proofKey: 'digi-cert',
    tag: 'SIGNED BY CEO',
  },
  {
    id: 'proof-4',
    category: 'growth',
    categoryLabel: 'GROWTH & CLIENT METRICS',
    title: 'CHINNADURAI 15K+ RETENTION ANALYTICS',
    subtitle: 'Documented organic retention spike on client brand positioning campaigns.',
    image: '/assets/proofs_optimized/chinnadurai_retention.jpg',
    proofKey: 'chinnadurai-retention',
    tag: 'VERIFIED METRICS',
  },
  {
    id: 'proof-5',
    category: 'growth',
    categoryLabel: 'GROWTH & CLIENT METRICS',
    title: 'PURPLE COLLECTION COMMERCIAL DIRECTING',
    subtitle: 'On-location cinematography and creative direction for commercial brand assets.',
    image: '/assets/proofs_optimized/purple_collection_bts.jpg',
    proofKey: 'purple-bts',
    tag: 'FIELD PRODUCTION',
  },
  {
    id: 'proof-6',
    category: 'growth',
    categoryLabel: 'GROWTH & CLIENT METRICS',
    title: 'LIFE WITH AAKASH 59.1K+ ORGANIC REACH',
    subtitle: 'Spoken-word media metrics proving high-trust community engagement with zero ad spend.',
    image: '/assets/proofs_optimized/lwa_organic_views.jpg',
    proofKey: 'lwa-views',
    tag: 'ZERO PAID ADS',
  },
];

export default function CredibilityTrust({ onOpenDrawer, onOpenProof }: CredibilityTrustProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'awards' | 'certificates' | 'growth'>('all');
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRectMap = useRef<WeakMap<HTMLElement, DOMRect>>(new WeakMap());

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: 'power2.out',
            force3D: true,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filteredCards = activeTab === 'all'
    ? PROOF_CARDS
    : PROOF_CARDS.filter((card) => card.category === activeTab);

  const handleCardMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    cardRectMap.current.set(e.currentTarget, e.currentTarget.getBoundingClientRect());
  };

  // Subtle 3D tilt on card hover (cached rect, transform only, no layout thrashing)
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 960) return;
    const card = e.currentTarget;
    const rect = cardRectMap.current.get(card) || card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateY: x * 5,
      rotateX: -y * 5,
      scale3d: 1.015,
      duration: 0.35,
      ease: 'power1.out',
      transformPerspective: 1000,
      force3D: true,
    });
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    cardRectMap.current.delete(card);
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      scale3d: 1,
      duration: 0.5,
      ease: 'power2.out',
      force3D: true,
    });
  };

  const tabs: { key: 'all' | 'awards' | 'certificates' | 'growth'; label: string }[] = [
    { key: 'all', label: 'ALL PROOFS' },
    { key: 'awards', label: 'AWARDS & HONORS' },
    { key: 'certificates', label: 'CERTIFICATES' },
    { key: 'growth', label: 'GROWTH & METRICS' },
  ];

  return (
    <section className="pro-section pro-proof-section" id="proof" ref={sectionRef}>
      <div className="pro-container">
        {/* Section Header */}
        <div className="pro-proof-header">
          <div className="pro-kicker-row" style={{ justifyContent: 'center' }}>
            <span className="pro-kicker-dot" aria-hidden="true"></span>
            <span className="pro-kicker-text">05 // VERIFIABLE PROOF &amp; EVIDENCE</span>
          </div>

          <h2 className="pro-hook-headline" style={{ textAlign: 'center' }}>
            PROOF OVER<br />
            <span style={{ color: '#d4af37' }}>PROMISES.</span>
          </h2>

          <p style={{ textAlign: 'center', maxWidth: '580px', marginInline: 'auto', color: '#a1a1aa', fontSize: '0.95rem', lineHeight: 1.6, marginTop: '0.75rem' }}>
            Every capability claimed on this site is backed by physical artifacts, verified client metrics, agency certifications, and documented stage honors.
          </p>

          {/* Interactive Filter Pills */}
          <div className="pro-proof-tabs-bar" role="tablist" aria-label="Proof Categories">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.key}
                className={`pro-proof-tab-btn ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Proof Cards Grid */}
        <div className="pro-proof-grid" ref={gridRef}>
          {filteredCards.map((card) => (
            <div
              key={card.id}
              className="pro-proof-card"
              onMouseEnter={handleCardMouseEnter}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              onClick={() => onOpenProof?.(card.proofKey)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onOpenProof?.(card.proofKey);
                }
              }}
              aria-label={`Inspect ${card.title}`}
            >
              {/* Media Container */}
              <div className="pro-proof-card-media">
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  decoding="async"
                />
                <span className="pro-proof-tag">{card.tag}</span>
                <div className="pro-proof-overlay">
                  <span className="pro-proof-view-btn">
                    VIEW PROOF ↗
                  </span>
                </div>
              </div>

              {/* Text Meta */}
              <div className="pro-proof-card-info">
                <span className="pro-proof-cat-label">{card.categoryLabel}</span>
                <h4 className="pro-proof-card-title">{card.title}</h4>
                <p className="pro-proof-card-sub">{card.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
