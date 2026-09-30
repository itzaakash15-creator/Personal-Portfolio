'use client';

import React, { useEffect, useRef } from 'react';

export default function CursorBadge() {
  const badgeRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch || window.innerWidth <= 960) return;

    let badgeX = -200;
    let badgeY = -200;
    let targetX = -200;
    let targetY = -200;
    let rafId: number | null = null;
    let isTicking = false;

    const render = () => {
      badgeX += (targetX - badgeX) * 0.25;
      badgeY += (targetY - badgeY) * 0.25;

      if (badgeRef.current) {
        badgeRef.current.style.transform = `translate3d(${badgeX.toFixed(1)}px, ${badgeY.toFixed(1)}px, 0)`;
      }

      const diff = Math.abs(targetX - badgeX) + Math.abs(targetY - badgeY);
      if (diff > 0.5) {
        rafId = requestAnimationFrame(render);
      } else {
        isTicking = false;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX + 16;
      targetY = e.clientY + 16;
      if (!isTicking) {
        isTicking = true;
        rafId = requestAnimationFrame(render);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor]');
      if (target && badgeRef.current && textRef.current) {
        const text = target.getAttribute('data-cursor') || 'VIEW';
        textRef.current.textContent = text;
        badgeRef.current.classList.add('visible');
      } else if (badgeRef.current) {
        badgeRef.current.classList.remove('visible');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={badgeRef}
      className="cursor-context-badge"
      id="cursor-badge"
      aria-hidden="true"
      style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none' }}
    >
      <span ref={textRef} className="cursor-badge-text" id="cursor-badge-text">
        VIEW
      </span>
      <span className="cursor-badge-arrow">↗</span>
    </div>
  );
}
