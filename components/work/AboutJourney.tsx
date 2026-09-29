'use client';

import React, { useState, useRef, useEffect } from 'react';
import { gsap } from '../../lib/gsap';

interface AboutJourneyProps {
  onOpenProof?: (proofKey: string) => void;
}

interface Milestone {
  year: string;
  title: string;
  role: string;
  desc: string;
  proofKey: string;
}

const MILESTONES: Milestone[] = [
  {
    year: '2020',
    title: 'CREATIVE IGNITION',
    role: 'Visual Storytelling & Filmmaking',
    desc: 'Began commercial video cutting, narrative editing, and self-directed creator productions.',
    proofKey: 'award-talent-competition',
  },
  {
    year: '2022',
    title: 'CREATOR PRODUCTION',
    role: 'Digital Marketing & Content Execution',
    desc: 'Founded Mr Aku Vlogs and published 100+ cinematic travelogues and long-form visual narratives.',
    proofKey: 'client-mraku',
  },
  {
    year: '2023',
    title: 'AGENCY LEADERSHIP',
    role: 'Digi Marketrix Core Team',
    desc: 'Stepped into full-time agency responsibility handling client marketing, field shoots, and editing.',
    proofKey: 'digi-cert',
  },
  {
    year: '2024',
    title: 'TALENTRIX INITIATIVE',
    role: 'Influencer Marketing Lead',
    desc: 'Conceptualized and launched Talentrix, bridging high-performing creators with regional brands.',
    proofKey: 'talentrix-reel',
  },
  {
    year: '2025',
    title: 'ENTERPRISE DEPLOYMENTS',
    role: 'Full-Stack Web & Brand Systems',
    desc: 'Shipped production web applications and led commercial campaigns for regional enterprises.',
    proofKey: 'jayashakthi-site',
  },
  {
    year: '2026+',
    title: 'STRATEGIC EXPANSION',
    role: 'Founder Authority & Agency Vision',
    desc: 'Scaling personal branding architectures and establishing a next-generation marketing practice.',
    proofKey: 'award-business-excellence',
  },
];

export default function AboutJourney({ onOpenProof }: AboutJourneyProps) {
  const [activeIdx, setActiveIdx] = useState(MILESTONES.length - 1);
  const activeMilestone = MILESTONES[activeIdx];
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      if (timelineRef.current) {
        gsap.fromTo(
          timelineRef.current,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="pro-section pro-about-section" id="about" data-alias="journey" ref={sectionRef}>
      <span id="journey" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} aria-hidden="true"></span>
      <span id="future" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} aria-hidden="true"></span>
      <span id="vision" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} aria-hidden="true"></span>

      <div className="pro-container">
        {/* Part 1: High-Impact Short Personal Introduction */}
        <div className="pro-about-intro">
          <div className="pro-kicker-row">
            <span className="pro-kicker-dot" aria-hidden="true"></span>
            <span className="pro-kicker-text">07 // THE PERSON BEHIND THE WORK</span>
          </div>

          <h2 className="pro-hook-headline">
            STRATEGIST. BUILDER.<br />
            <span style={{ color: '#d4af37' }}>COMMUNICATOR.</span>
          </h2>

          <div className="pro-about-bio-grid">
            <p className="pro-about-bio-lead">
              Aakash bridges brand positioning, full-stack digital execution, and high-retention creator media.
              Rooted in engineering principles (AI &amp; Data Science) and forged through 3+ years of intense agency leadership at Digi Marketrix, he builds systems that command attention and drive authentic commercial growth.
            </p>

            <div className="pro-about-traits">
              <span className="pro-trait-badge">● SYSTEMS THINKING</span>
              <span className="pro-trait-badge">● AUDIENCE PSYCHOLOGY</span>
              <span className="pro-trait-badge">● BESPOKE WEB ARCHITECTURE</span>
              <span className="pro-trait-badge">● KEYNOTE ORATORY</span>
            </div>
          </div>
        </div>

        {/* Part 2: Compact 2020 to Now Journey Timeline */}
        <div className="pro-journey-wrap" ref={timelineRef}>
          <div className="pro-journey-header">
            <h3 className="pro-subheading-title">THE PROGRESSION // 2020 → 2026</h3>
            <span className="pro-journey-subtag">SIX YEARS OF COMPOUNDING EXECUTION</span>
          </div>

          {/* Interactive Timeline Rail */}
          <div className="pro-timeline-rail">
            {MILESTONES.map((m, idx) => (
              <button
                key={m.year}
                type="button"
                className={`pro-timeline-node ${activeIdx === idx ? 'active' : ''}`}
                onClick={() => setActiveIdx(idx)}
              >
                <span className="node-year">{m.year}</span>
                <span className="node-dot"></span>
                <span className="node-title-mini">{m.title}</span>
              </button>
            ))}
          </div>

          {/* Active Milestone Inspector Card */}
          <div className="pro-milestone-card">
            <div className="pro-milestone-top">
              <span className="pro-milestone-year">{activeMilestone.year}</span>
              <span className="pro-milestone-role">{activeMilestone.role}</span>
            </div>
            <h4 className="pro-milestone-title">{activeMilestone.title}</h4>
            <p className="pro-milestone-desc">{activeMilestone.desc}</p>
            <div style={{ marginTop: '1.25rem' }}>
              <button
                type="button"
                className="pro-btn-outline"
                style={{ fontSize: '0.72rem', padding: '0.55rem 1.1rem' }}
                onClick={() => onOpenProof?.(activeMilestone.proofKey)}
              >
                VIEW MILESTONE PROOF ↗
              </button>
            </div>
          </div>
        </div>

        {/* Part 3: Future Vision (Compact 2 Pillars) */}
        <div className="pro-future-wrap">
          <div className="pro-journey-header" style={{ marginBottom: '1.5rem' }}>
            <h3 className="pro-subheading-title">NEXT HORIZONS // FUTURE DIRECTION</h3>
            <span className="pro-journey-subtag">NEAR-TERM ACCELERATION &amp; LONG-TERM VISION</span>
          </div>

          <div className="pro-future-grid">
            {/* Horizon 1 */}
            <div className="pro-future-card">
              <span className="pro-future-kicker">NEAR-TERM // SPECIALIZED PRACTICE</span>
              <h4 className="pro-future-title">PERSONAL BRANDING AGENCY</h4>
              <div className="pro-future-status-row">
                <span className="status-tag">RESEARCHING</span>
                <span className="status-tag">DESIGNING</span>
                <span className="status-tag active">BUILDING</span>
              </div>
              <p className="pro-future-desc">
                A dedicated strategic firm architecting founder authority, high-trust media assets, and executive positioning systems for founders and high-impact leaders.
              </p>
            </div>

            {/* Horizon 2 */}
            <div className="pro-future-card">
              <span className="pro-future-kicker">LONG-TERM // FULL-SPECTRUM FIRM</span>
              <h4 className="pro-future-title">INTEGRATED MARKETING ENTERPRISE</h4>
              <div className="pro-future-status-row">
                <span className="status-tag">VISION &amp; ARCHITECTURE</span>
              </div>
              <p className="pro-future-desc">
                An institutional creative company unifying brand strategy, cinematography, software development, and growth distribution under a single roof.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
