import React from 'react';

export default function WorkTransition() {
  return (
    <>
      {/* Scroll Exit Phase 4: Transition into Selected Work (Left Enters, Owns Screen) */}
      <div className="work-transition-phase" id="work-transition-phase">
        <div className="work-transition-kicker-mask">
          <span className="work-transition-label" id="work-kicker">
            PROFESSIONAL EXPERIENCE / 01
          </span>
        </div>
        <div className="work-title-mask-line">
          <h2 className="work-title-word" id="work-title-digi">
            DIGI
          </h2>
        </div>
        <div className="work-title-mask-line">
          <h2 className="work-title-word" id="work-title-marketrix">
            MARKETRIX
          </h2>
        </div>
        <div className="work-sub-mask-wrap">
          <p className="work-transition-subtitle" id="work-subtitle">
            Digital Marketing &nbsp;·&nbsp; Content &nbsp;·&nbsp; Influencer Marketing
          </p>
        </div>
      </div>

      {/* Scroll Exit Phase 5: Approach into Project Canvas */}
      <div className="hero-project-approach-canvas" id="hero-project-approach" aria-hidden="true">
        <div className="project-approach-frame">
          <img
            src="/assets/proofs_optimized/digi_marketrix_office.jpg"
            alt="Digi Marketrix Agency Studio Workplace and 3D Logo Wall"
            className="project-approach-img"
            id="project-approach-img"
          />
          <div className="project-approach-glow"></div>
        </div>
      </div>
    </>
  );
}
