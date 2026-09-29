'use client';

import React, { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (lineRef.current) {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = totalHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / totalHeight)) : 0;
            lineRef.current.style.transform = `scaleX(${progress})`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={lineRef}
      className="scroll-progress-line"
      id="scroll-progress"
      aria-hidden="true"
      style={{ width: '100%', transform: 'scaleX(0)', transformOrigin: 'left center' }}
    />
  );
}
