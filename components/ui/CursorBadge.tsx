'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function CursorBadge() {
  const [badgeText, setBadgeText] = useState('VIEW');
  const [isVisible, setIsVisible] = useState(false);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch || window.innerWidth <= 960) return;

    let badgeX = 0;
    let badgeY = 0;
    let targetX = 0;
    let targetY = 0;
    let rafId: number;

    const render = () => {
      badgeX += (targetX - badgeX) * 0.25;
      badgeY += (targetY - badgeY) * 0.25;

      if (badgeRef.current) {
        badgeRef.current.style.left = `${badgeX}px`;
        badgeRef.current.style.top = `${badgeY}px`;
      }

      rafId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX + 16;
      targetY = e.clientY + 16;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor]');
      if (target) {
        const text = target.getAttribute('data-cursor') || 'VIEW';
        setBadgeText(text);
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver);
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={badgeRef}
      className={`cursor-context-badge ${isVisible ? 'visible' : ''}`}
      id="cursor-badge"
      aria-hidden="true"
    >
      <span className="cursor-badge-text" id="cursor-badge-text">
        {badgeText}
      </span>
      <span className="cursor-badge-arrow">↗</span>
    </div>
  );
}
