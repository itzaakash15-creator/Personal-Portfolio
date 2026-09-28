'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { selectedProjects, ProjectItem } from '../../data/projects';

interface ClientWorkProps {
  onOpenProof?: (proofKey: string) => void;
}

export default function ClientWork({ onOpenProof }: ClientWorkProps) {
  const [hoveredProject, setHoveredProject] = useState<ProjectItem | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -500, y: -500 });
  const targetRef = useRef({ x: -500, y: -500 });
  const rafId = useRef<number | null>(null);

  // Smooth inertial cursor following with viewport clamping
  const updateCardPosition = useCallback(() => {
    const card = cardRef.current;
    if (card) {
      // Lerp smoothing factor ~0.16 for responsive yet smooth inertia
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.16;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.16;

      const cardWidth = 340;
      const cardHeight = 220;
      const padding = 24;

      // Safe viewport boundary clamping
      const maxX = window.innerWidth - cardWidth / 2 - padding;
      const minX = cardWidth / 2 + padding;
      const maxY = window.innerHeight - cardHeight / 2 - padding;
      const minY = cardHeight / 2 + padding;

      const clampedX = Math.max(minX, Math.min(maxX, posRef.current.x + 30));
      const clampedY = Math.max(minY, Math.min(maxY, posRef.current.y - 10));

      card.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0) translate(-50%, -50%)`;
    }

    rafId.current = requestAnimationFrame(updateCardPosition);
  }, []);

  useEffect(() => {
    rafId.current = requestAnimationFrame(updateCardPosition);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [updateCardPosition]);

  const handleMouseMove = (e: React.MouseEvent) => {
    targetRef.current = { x: e.clientX, y: e.clientY };
  };

  return (
    <section
      className="pro-section"
      id="clients"
      data-alias="other-work"
      onMouseMove={handleMouseMove}
    >
      <span id="other-work" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} aria-hidden="true"></span>
      <div className="pro-bg-radial" style={{ top: '15%', left: '8%' }} aria-hidden="true"></div>

      <div className="pro-container">
        {/* Editorial Section Header */}
        <div className="pro-kicker-row">
          <span className="pro-kicker-dot" aria-hidden="true"></span>
          <span className="pro-kicker-text">06 // SELECTED WORK &amp; CLIENTS</span>
        </div>

        <h2 className="pro-hook-headline" style={{ marginBottom: '0.75rem' }}>
          CLIENTS &amp;<br />
          <span style={{ color: '#d4af37' }}>PRODUCTION INDEX</span>
        </h2>

        <p style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.8rem', color: '#71717a', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '2.5rem' }}>
          HOVER TO PREVIEW EVIDENCE · CLICK TO INSPECT ARTIFACT
        </p>

        {/* Large Interactive Text Index */}
        <div
          className="pro-clients-index-container"
          onMouseLeave={() => setHoveredProject(null)}
        >
          {selectedProjects.map((proj) => {
            const isHovered = hoveredProject?.id === proj.id;
            const isAnyHovered = hoveredProject !== null;

            return (
              <div
                key={proj.id}
                className="pro-client-row"
                style={{
                  opacity: isAnyHovered ? (isHovered ? 1 : 0.35) : 1,
                  borderBottomColor: isHovered ? 'rgba(212, 175, 55, 0.4)' : 'rgba(255, 255, 255, 0.08)',
                }}
                onMouseEnter={() => setHoveredProject(proj)}
                onClick={() => onOpenProof?.(proj.proofKey)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onOpenProof?.(proj.proofKey);
                  }
                }}
                aria-label={`Inspect ${proj.title} project proof`}
              >
                <div className="pro-client-row-left">
                  <span
                    className="pro-client-num"
                    style={{ color: isHovered ? '#d4af37' : '#71717a' }}
                  >
                    {proj.num}
                  </span>
                  <span
                    className="pro-client-name"
                    style={{ color: isHovered ? '#d4af37' : '#ffffff' }}
                  >
                    {proj.title}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <span className="pro-client-service">{proj.service}</span>
                  <span className="pro-client-arrow">↗</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Inertial Floating Cursor Media Preview Card */}
        <div
          ref={cardRef}
          className={`pro-cursor-preview-card ${hoveredProject ? 'is-active' : ''}`}
          aria-hidden="true"
        >
          {hoveredProject && (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <img
                src={hoveredProject.previewImg}
                alt={hoveredProject.title}
                loading="eager"
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(8, 8, 10, 0.95), transparent)',
                  padding: '1.2rem 1rem 0.6rem',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.68rem',
                    color: '#d4af37',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    margin: 0,
                  }}
                >
                  {hoveredProject.category}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-sans, sans-serif)',
                    fontSize: '0.78rem',
                    color: '#ffffff',
                    fontWeight: 600,
                    margin: '0.2rem 0 0',
                  }}
                >
                  {hoveredProject.title}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
