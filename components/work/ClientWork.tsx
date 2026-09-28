'use client';

import React, { useState } from 'react';
import { selectedProjects, ProjectItem } from '../../data/projects';

interface ClientWorkProps {
  onOpenProof?: (proofKey: string) => void;
}

export default function ClientWork({ onOpenProof }: ClientWorkProps) {
  const [activeProject, setActiveProject] = useState<ProjectItem>(selectedProjects[0]);

  return (
    <section className="editorial-chapter" id="clients" data-alias="other-work">
      <span id="other-work" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} aria-hidden="true"></span>
      <div className="editorial-bg-glow glow-alt" aria-hidden="true"></div>

      <div className="editorial-container">
        {/* Editorial Index Header */}
        <div className="editorial-index-header">
          <span className="hook-kicker">SELECTED REPERTORY // 2023 → 2026</span>
          <h2 className="index-section-title">CLIENTS &amp; PRODUCTION INDEX</h2>
          <p className="index-section-subtitle">
            Authentic commercial engagements executed across web engineering, video production, personal branding, and digital campaigns.
          </p>
        </div>

        {/* Editorial Split Layout: Left Index List + Right Dynamic Preview */}
        <div className="editorial-index-layout">
          <div className="editorial-index-list" id="editorial-index-list">
            {selectedProjects.map((proj) => {
              const isActive = activeProject.id === proj.id;
              return (
                <div
                  key={proj.id}
                  className={`index-row-item open-proof-trigger ${isActive ? 'active-index' : ''}`}
                  data-proof={proj.proofKey}
                  data-cursor="INSPECT"
                  data-preview-img={proj.previewImg}
                  data-preview-cat={proj.category}
                  data-preview-title={proj.title}
                  data-preview-scope={proj.scope}
                  onMouseEnter={() => setActiveProject(proj)}
                  onClick={() => {
                    setActiveProject(proj);
                    onOpenProof?.(proj.proofKey);
                  }}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActiveProject(proj);
                      onOpenProof?.(proj.proofKey);
                    }
                  }}
                >
                  <span className="row-index-num">{proj.num}</span>
                  <span className="row-index-name">{proj.title}</span>
                  <span className="row-index-service">{proj.service}</span>
                  <span className="row-index-arrow">↗</span>
                </div>
              );
            })}
          </div>

          {/* Sticky Dynamic Preview Pane */}
          <div className="index-preview-pane" id="index-preview-pane">
            <div className="preview-media-box">
              <img
                id="editorial-preview-img"
                src={activeProject.previewImg}
                alt={activeProject.title}
              />
            </div>
            <div className="preview-meta-box">
              <span className="preview-kicker" id="editorial-preview-cat">{activeProject.category}</span>
              <h4 className="preview-title" id="editorial-preview-title">{activeProject.title}</h4>
              <p className="preview-scope" id="editorial-preview-scope">
                {activeProject.scope}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
