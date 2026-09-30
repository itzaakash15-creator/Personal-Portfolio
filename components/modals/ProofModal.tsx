'use client';

import React, { useEffect, useCallback } from 'react';
import { proofData, ProofItem } from '../../data/proof';

interface ProofModalProps {
  currentKey: string | null;
  onClose: () => void;
  onSelectKey: (key: string) => void;
}

export default function ProofModal({ currentKey, onClose, onSelectKey }: ProofModalProps) {
  const proofKeys = Object.keys(proofData);
  const isOpen = Boolean(currentKey && proofData[currentKey]);
  const item: ProofItem | undefined = currentKey ? proofData[currentKey] : undefined;
  const currentIndex = currentKey ? proofKeys.indexOf(currentKey) : 0;

  const navigateProof = useCallback(
    (direction: number) => {
      if (proofKeys.length === 0) return;
      const nextIdx = (currentIndex + direction + proofKeys.length) % proofKeys.length;
      onSelectKey(proofKeys[nextIdx]);
    },
    [currentIndex, onSelectKey, proofKeys]
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        navigateProof(-1);
      } else if (e.key === 'ArrowRight') {
        navigateProof(1);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, navigateProof]);

  if (!isOpen || !item) return null;

  const currentNum = String(currentIndex + 1).padStart(2, '0');
  const totalNum = String(proofKeys.length).padStart(2, '0');

  // Format asset src with leading slash if needed
  const formatSrc = (path?: string) => {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('/')) {
      return path;
    }
    return `/${path}`;
  };

  const imgSrc = formatSrc(item.image);
  const vidSrc = formatSrc(item.video);
  const posterSrc = formatSrc(item.poster);

  return (
    <div
      className="proof-modal-overlay active"
      id="proof-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="proof-modal-title"
    >
      <div className="proof-modal-backdrop" id="proof-modal-backdrop" onClick={onClose}></div>
      <div className="proof-modal-dialog">
        <div className="proof-modal-header">
          <div className="proof-modal-header-left">
            <span className="proof-modal-badge" id="proof-modal-badge">
              {item.category || 'CREDENTIAL'}
            </span>
            <span className="proof-modal-counter" id="proof-modal-counter">
              {currentNum} / {totalNum}
            </span>
          </div>
          <div className="proof-modal-header-right">
            <span className="proof-modal-kbd-hint">ESC TO CLOSE · ← → NAVIGATE</span>
            <button
              type="button"
              className="proof-modal-close-btn"
              id="proof-modal-close"
              aria-label="Close modal"
              onClick={onClose}
            >
              ✕
            </button>
          </div>
        </div>

        <div className="proof-modal-stage">
          <button
            type="button"
            className="proof-nav-btn proof-nav-prev"
            id="proof-modal-prev"
            aria-label="Previous proof item"
            onClick={() => navigateProof(-1)}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div className="proof-modal-media-wrapper" id="proof-modal-media">
            {item.type === 'video' ? (
              <video
                key={vidSrc}
                className="proof-modal-video"
                controls
                playsInline
                poster={posterSrc || ''}
                autoPlay
              >
                <source src={vidSrc} type="video/mp4" />
                <source src={vidSrc} type="video/quicktime" />
                Your browser does not support HTML5 video.
              </video>
            ) : (
              <img
                src={imgSrc}
                alt={item.title}
                className="proof-modal-image"
              />
            )}
          </div>

          <button
            type="button"
            className="proof-nav-btn proof-nav-next"
            id="proof-modal-next"
            aria-label="Next proof item"
            onClick={() => navigateProof(1)}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        <div className="proof-modal-footer">
          <div className="proof-modal-info">
            <div className="proof-modal-meta-row" id="proof-modal-meta-row">
              <span id="proof-modal-meta-category">{item.category}</span>
              {item.period && <span id="proof-modal-meta-period">{item.period}</span>}
            </div>
            <h3 className="proof-modal-title" id="proof-modal-title">
              {item.title}
            </h3>
            {item.desc && (
              <p className="proof-modal-desc" id="proof-modal-desc">
                {item.desc}
              </p>
            )}
          </div>
          {item.linkUrl && (
            <div className="proof-modal-actions" id="proof-modal-actions">
              <a
                href={item.linkUrl}
                target={item.linkUrl.startsWith('http') ? '_blank' : '_self'}
                rel={item.linkUrl.startsWith('http') ? 'noopener noreferrer' : ''}
                className="proof-external-btn"
              >
                <span>{item.linkText || 'VIEW ORIGINAL ↗'}</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
