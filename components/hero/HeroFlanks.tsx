import React from 'react';
import { HERO_ANCHORS_DATA } from '../../data/anchors';

export function HeroLeftFlank() {
  return (
    <div className="hero-flank hero-flank-left" id="hero-left-flank">
      <div className="hero-tag-cluster hero-tag-left-cluster" id="hero-left-tags">
        <span className="tag-accent-line tag-accent-line-left" aria-hidden="true"></span>
        <div className="tag-reveal-wrap tag-reveal-left">
          <span className="poster-tag tag-item-1">MARKETER.</span>
          <span className="poster-tag-separator">/</span>
          <span className="poster-tag tag-item-2">BRAND BUILDER.</span>
        </div>
      </div>

      <div className="hero-greeting-block" id="hero-greeting">
        <span className="hero-salutation">Hello, I&apos;m</span>
        <h1 className="hero-poster-name">AAKASH.</h1>
      </div>

      <div className="hero-positioning-block" id="hero-positioning">
        <p className="hero-poster-statement">
          I build brands, digital experiences<br />
          and <span className="hero-serif-accent">ideas that move people.</span>
        </p>
        <p className="hero-poster-subtext">
          Turning ideas into real commercial opportunities through marketing, high-retention media, and scalable web platforms.
        </p>
      </div>

      <div className="hero-cta-cluster" id="hero-cta-cluster">
        <a href="#work" className="btn-editorial">
          <span>Explore My Work →</span>
        </a>
        <a href="#about" className="btn-editorial-outline">
          <span>About Me →</span>
        </a>
      </div>
    </div>
  );
}

export function HeroRightFlank() {
  return (
    <div className="hero-flank hero-flank-right" id="hero-right-flank">
      <div className="hero-tag-cluster hero-tag-right-cluster" id="hero-right-tags">
        <div className="tag-reveal-wrap tag-reveal-right">
          <span className="poster-tag tag-item-1">CREATOR.</span>
          <span className="poster-tag-separator">/</span>
          <span className="poster-tag tag-item-2">SPEAKER.</span>
        </div>
        <span className="tag-accent-line tag-accent-line-right" aria-hidden="true"></span>
      </div>

      <div className="hero-right-mantra" id="hero-right-mantra">
        <span className="poster-kicker-mono">CORE PHILOSOPHY</span>
        <h3 className="poster-mantra-title">
          TURNING IDEAS<br />
          INTO EXPERIENCES.
        </h3>
      </div>

      <div className="hero-anchors-stream" id="hero-anchors">
        {HERO_ANCHORS_DATA.map((anchor, idx) => (
          <div
            key={anchor.index}
            className={`hero-anchor-item ${idx === 0 ? 'active' : ''}`}
            data-index={anchor.index}
            data-preview={anchor.preview}
            data-title={anchor.title}
            data-sub={anchor.sub}
            data-kicker={anchor.kicker}
          >
            <div className="anchor-step-row">
              <span className="anchor-index">{anchor.index}</span>
              <span className="anchor-line" aria-hidden="true"></span>
            </div>
            <div className="anchor-body">
              <div className="anchor-title-wrap">
                <span className="anchor-title">{anchor.title}</span>
              </div>
              <div className="anchor-sub-wrap">
                <span className="anchor-sub">{anchor.sub}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
