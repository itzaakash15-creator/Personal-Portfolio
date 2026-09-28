import React from 'react';
import RoleFrame from './RoleFrame';

export default function RoleSequence() {
  return (
    <>
      {/* LAYER 3b: ENORMOUS BACKGROUND TYPOGRAPHY: I DON'T FIT INTO ONE BOX (Behind Aakash) */}
      <div className="hero-statement-backdrop" id="hero-statement-backdrop" aria-hidden="true">
        <div className="stmt-line stmt-line-1" id="stmt-line-1">
          <span className="stmt-text">I DON&apos;T FIT</span>
        </div>
        <div className="stmt-line stmt-line-2" id="stmt-line-2">
          <span className="stmt-text">INTO ONE</span>
        </div>
        <div className="stmt-line stmt-line-3" id="stmt-line-3">
          <span className="stmt-text">
            BOX<span className="stmt-dot">.</span>
          </span>
        </div>
      </div>

      {/* LAYER 3c: ENVIRONMENTAL ROLE SYMBOLS (Subtle Glowing Artwork in Environment) */}
      <div className="role-environmental-symbols" id="role-env-symbols" aria-hidden="true">
        {/* Symbol 01: Strategy Path (Marketer) */}
        <div className="env-symbol-layer env-symbol-marketer" id="env-sym-marketer">
          <svg viewBox="0 0 440 260" className="env-symbol-svg" fill="none">
            <path
              className="env-path-draw"
              d="M 30 200 L 130 140 L 220 170 L 330 85 L 400 45"
              stroke="#d4af37"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="30" cy="200" r="5" fill="#a1a1aa" />
            <circle cx="130" cy="140" r="6" fill="#d4af37" />
            <circle cx="220" cy="170" r="5" fill="#a1a1aa" />
            <circle cx="330" cy="85" r="7" fill="#d4af37" />
            <circle cx="400" cy="45" r="8" fill="#ffffff" stroke="#d4af37" strokeWidth="3" />
            <circle cx="400" cy="45" r="18" stroke="rgba(212,175,55,0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>
        </div>

        {/* Symbol 02: Fingerprint / Identity Contours (Brand Builder) */}
        <div className="env-symbol-layer env-symbol-brand" id="env-sym-brand">
          <svg viewBox="0 0 340 360" className="env-symbol-svg" fill="none">
            <path
              className="env-path-draw"
              d="M 170 265 C 152 230 152 185 170 155 C 182 135 198 145 198 168 C 198 198 186 238 170 265"
              stroke="#d4af37"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              className="env-path-draw"
              d="M 144 288 C 122 240 122 172 152 130 C 178 95 224 105 228 144 C 232 190 210 250 186 298"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              className="env-path-draw"
              d="M 118 310 C 92 250 92 155 135 105 C 174 62 252 70 260 122 C 268 186 238 268 202 324"
              stroke="rgba(212,175,55,0.35)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="170" cy="155" r="4.5" fill="#d4af37" />
          </svg>
        </div>

        {/* Symbol 03: Camera Aperture Viewfinder (Creator) */}
        <div className="env-symbol-layer env-symbol-creator" id="env-sym-creator">
          <svg viewBox="0 0 340 340" className="env-symbol-svg" fill="none">
            <circle cx="170" cy="170" r="140" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
            <circle cx="170" cy="170" r="118" stroke="rgba(212,175,55,0.4)" strokeWidth="1.8" strokeDasharray="4 4" />
            <path d="M 50 80 L 50 50 L 80 50" stroke="rgba(212,175,55,0.6)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 290 80 L 290 50 L 260 50" stroke="rgba(212,175,55,0.6)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 50 260 L 50 290 L 80 290" stroke="rgba(212,175,55,0.6)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 290 260 L 290 290 L 260 290" stroke="rgba(212,175,55,0.6)" strokeWidth="2.5" strokeLinecap="round" />
            <g stroke="rgba(212,175,55,0.5)" strokeWidth="2" fill="rgba(255,255,255,0.03)">
              <path d="M 170 70 C 202 70 238 86 256 112 L 208 134 Z" />
              <path d="M 268 112 C 286 142 286 182 268 212 L 226 186 Z" />
              <path d="M 268 226 C 250 256 216 272 186 272 L 186 226 Z" />
              <path d="M 170 270 C 138 270 102 254 84 228 L 132 206 Z" />
              <path d="M 72 228 C 54 198 54 158 72 128 L 114 154 Z" />
              <path d="M 72 114 C 90 84 124 68 154 68 L 154 114 Z" />
            </g>
          </svg>
        </div>

        {/* Symbol 04: Soundwave Acoustic Abstraction (Speaker) */}
        <div className="env-symbol-layer env-symbol-speaker" id="env-sym-speaker">
          <svg viewBox="0 0 440 200" className="env-symbol-svg" fill="none">
            <line x1="20" y1="100" x2="420" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            <g stroke="rgba(212,175,55,0.5)" strokeWidth="2.5" strokeLinecap="round">
              <line x1="60" y1="88" x2="60" y2="112" />
              <line x1="88" y1="72" x2="88" y2="128" />
              <line x1="116" y1="52" x2="116" y2="148" />
              <line x1="144" y1="32" x2="144" y2="168" />
              <line x1="172" y1="56" x2="172" y2="144" />
              <line x1="200" y1="20" x2="200" y2="180" stroke="#ffffff" strokeWidth="3" />
              <line x1="228" y1="44" x2="228" y2="156" />
              <line x1="256" y1="28" x2="256" y2="172" />
              <line x1="284" y1="56" x2="284" y2="144" />
              <line x1="312" y1="38" x2="312" y2="162" />
              <line x1="340" y1="68" x2="340" y2="132" />
              <line x1="368" y1="80" x2="368" y2="120" />
              <line x1="396" y1="90" x2="396" y2="110" />
            </g>
          </svg>
        </div>
      </div>

      {/* TOP IDENTITY HISTORY ROW: Reserved slots for stored completed frames */}
      <div className="identity-history-row" id="identity-history-row" aria-hidden="true">
        <div className="history-grid-container">
          <div className="history-slot" id="history-slot-1"></div>
          <div className="history-slot" id="history-slot-2"></div>
          <div className="history-slot" id="history-slot-3"></div>
          <div className="history-slot" id="history-slot-4"></div>
        </div>
        <div className="history-collective-line" id="history-collective-line"></div>
      </div>

      {/* THE 4 ACTIVE EDITORIAL ROLE FRAMES */}
      <div className="active-role-stage" id="active-role-stage">
        <div className="active-role-spotlight" id="active-role-spotlight" aria-hidden="true"></div>

        <RoleFrame
          id="role-frame-1"
          roleClass="role-frame-marketer"
          num="01"
          category="DISCIPLINE // STRATEGY"
          title="MARKETER"
          sub="STRATEGY • DIGITAL • GROWTH"
        />

        <RoleFrame
          id="role-frame-2"
          roleClass="role-frame-brand"
          num="02"
          category="DISCIPLINE // IDENTITY"
          title="BRAND BUILDER"
          sub="POSITIONING • TRUST • IDENTITY"
        />

        <RoleFrame
          id="role-frame-3"
          roleClass="role-frame-creator"
          num="03"
          category="DISCIPLINE // MEDIA"
          title="CREATOR"
          sub="STORYTELLING • VIDEO • CONTENT"
        />

        <RoleFrame
          id="role-frame-4"
          roleClass="role-frame-speaker"
          num="04"
          category="DISCIPLINE // VOICE"
          title="SPEAKER"
          sub="LIFE • MOTIVATION • COMMUNICATION"
        />
      </div>

      {/* Scroll Exit Phase 4: Transition into Selected Work */}
      <div className="work-transition-phase" id="work-transition-phase">
        <div className="work-transition-kicker-mask">
          <span className="work-transition-label" id="work-kicker">SELECTED WORK / 01</span>
        </div>
        <div className="work-title-mask-line">
          <h2 className="work-title-word" id="work-title-digi">DIGI</h2>
        </div>
        <div className="work-title-mask-line">
          <h2 className="work-title-word" id="work-title-marketrix">MARKETRIX</h2>
        </div>
        <div className="work-sub-mask-wrap">
          <p className="work-transition-subtitle" id="work-subtitle">
            Digital Marketing &nbsp;·&nbsp; Strategy &nbsp;·&nbsp; Brand Growth
          </p>
        </div>
      </div>

      {/* Scroll Exit Phase 5: Approach into Project Canvas */}
      <div className="hero-project-approach-canvas" id="hero-project-approach" aria-hidden="true">
        <div className="project-approach-frame">
          <img
            src="/assets/experience_digi_marketrix.jpg"
            alt="Digi Marketrix Commercial Case Study Production"
            className="project-approach-img"
            id="project-approach-img"
          />
          <div className="project-approach-glow"></div>
        </div>
      </div>
    </>
  );
}
