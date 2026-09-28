'use client';

import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobile = () => {
    setIsMobileOpen(false);
  };

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`} id="site-header">
      <nav className="nav-container" aria-label="Main Navigation">
        <a href="#hero" className="nav-brand" aria-label="AAKASH Home">
          <span>
            AAKASH<span className="brand-period">.</span>
          </span>
        </a>

        <div className="nav-center-links">
          <a href="#work" className="nav-link">WORK</a>
          <a href="#speaking" className="nav-link">SPEAKING</a>
          <a href="#creator" className="nav-link">CREATOR</a>
          <a href="#journey" className="nav-link">JOURNEY</a>
          <a href="#proof" className="nav-link">PROOF</a>
          <a href="#about" className="nav-link">ABOUT</a>
        </div>

        <div className="nav-right-action">
          <a href="#contact" className="nav-connect-btn" aria-label="Connect with Aakash">
            <span>LET&apos;S CONNECT ↗</span>
          </a>
          <button
            type="button"
            className={`mobile-nav-toggle ${isMobileOpen ? 'open' : ''}`}
            id="mobile-toggle"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileOpen}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Menu with Large Typography */}
      <div className={`mobile-drawer ${isMobileOpen ? 'open' : ''}`} id="mobile-drawer">
        <div className="mobile-drawer-links">
          <a href="#work" className="nav-link" onClick={closeMobile}>WORK</a>
          <a href="#speaking" className="nav-link" onClick={closeMobile}>SPEAKING</a>
          <a href="#creator" className="nav-link" onClick={closeMobile}>CREATOR</a>
          <a href="#journey" className="nav-link" onClick={closeMobile}>JOURNEY</a>
          <a href="#proof" className="nav-link" onClick={closeMobile}>PROOF</a>
          <a href="#about" className="nav-link" onClick={closeMobile}>ABOUT</a>
        </div>
        <div className="mobile-drawer-footer">
          <a
            href="#contact"
            className="nav-connect-btn"
            style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
            onClick={closeMobile}
          >
            <span>LET&apos;S CONNECT ↗</span>
          </a>
          <a
            href="/resume.html"
            className="nav-link"
            style={{ fontSize: '1.15rem', color: 'var(--accent-gold)' }}
            onClick={closeMobile}
          >
            DOWNLOAD RESUME ↗
          </a>
        </div>
      </div>
    </header>
  );
}
