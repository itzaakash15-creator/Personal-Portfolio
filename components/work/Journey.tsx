import React from 'react';
import { journeyMilestones, progressionSteps } from '../../data/journey';

interface JourneyProps {
  onOpenProof?: (proofKey: string) => void;
}

export default function Journey({ onOpenProof }: JourneyProps) {
  return (
    <section className="editorial-chapter" id="journey">
      <div className="editorial-bg-glow" aria-hidden="true"></div>

      <div className="editorial-container">
        {/* Hook Viewport */}
        <div className="editorial-chapter-hook">
          <span className="hook-kicker">EVOLUTIONARY ARC // 2020 → 2026</span>
          <h2 className="hook-headline">
            NONE OF THIS<br />
            STARTED WITH<br />
            <span className="text-gold">MARKETING.</span>
          </h2>
        </div>

        {/* Identity Title Lockup */}
        <div className="editorial-title-row">
          <h3 className="editorial-chapter-title">
            THE PROGRESSION
          </h3>
          <p className="editorial-chapter-tagline">2020 → 2026 // SIX YEARS OF ACTIVE COMPOUNDING</p>
        </div>

        {/* Progression Strip Visual */}
        <div className="progression-strip">
          {progressionSteps.map((step, idx) => (
            <React.Fragment key={step}>
              <span className={`progression-step ${idx === progressionSteps.length - 1 ? 'text-gold' : ''}`}>
                {step}
              </span>
              {idx < progressionSteps.length - 1 && (
                <span className="progression-arrow">→</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Six Milestone Progression Cards */}
        <div className="editorial-journey-cards-grid">
          {journeyMilestones.map((milestone) => (
            <div
              key={milestone.year}
              className="journey-step-card open-proof-trigger"
              data-proof={milestone.proofKey}
              data-cursor="INSPECT"
              onClick={() => onOpenProof?.(milestone.proofKey)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onOpenProof?.(milestone.proofKey);
                }
              }}
            >
              <span className="journey-year-tag">{milestone.year}</span>
              <h4 className="journey-stage-title">{milestone.title}</h4>
              <p className="journey-stage-desc">{milestone.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
