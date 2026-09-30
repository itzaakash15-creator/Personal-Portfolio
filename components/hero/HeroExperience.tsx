'use client';

import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, initGSAP } from '../../lib/gsap';
import HeroLighting from './HeroLighting';
import HeroProjectPreview from './HeroProjectPreview';
import { HeroLeftFlank, HeroRightFlank } from './HeroFlanks';

export default function HeroExperience() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    initGSAP();

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const heroSection = document.getElementById('hero');
      const leftFlank = document.getElementById('hero-left-flank');
      const rightFlank = document.getElementById('hero-right-flank');
      const portfolioWord = document.getElementById('hero-portfolio-wordmark');
      const radialLight = document.getElementById('hero-radial-light');

      // Flank elements for entrance
      const leftLine = document.querySelector('.tag-accent-line-left') as HTMLElement | null;
      const leftTag1 = document.querySelector('#hero-left-tags .tag-item-1') as HTMLElement | null;
      const leftTag2 = document.querySelector('#hero-left-tags .tag-item-2') as HTMLElement | null;
      const leftSep = document.querySelector('#hero-left-tags .poster-tag-separator') as HTMLElement | null;

      const rightLine = document.querySelector('.tag-accent-line-right') as HTMLElement | null;
      const rightTag1 = document.querySelector('#hero-right-tags .tag-item-1') as HTMLElement | null;
      const rightTag2 = document.querySelector('#hero-right-tags .tag-item-2') as HTMLElement | null;
      const rightSep = document.querySelector('#hero-right-tags .poster-tag-separator') as HTMLElement | null;

      const greeting = document.getElementById('hero-greeting');
      const positioning = document.getElementById('hero-positioning');
      const ctaCluster = document.getElementById('hero-cta-cluster');
      const rightMantra = document.getElementById('hero-right-mantra');
      const anchorItems = document.querySelectorAll('.hero-anchor-item');

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

      // Canonical restore for Hero elements (Restores typography, flanks & lighting cleanly)
      const restoreHeroState = (smooth = true) => {
        if (smooth) {
          if (radialLight) {
            gsap.to(radialLight, {
              opacity: 0.65,
              x: 0,
              scale: 1,
              duration: 0.65,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }

          if (portfolioWord) {
            gsap.to(portfolioWord, {
              opacity: 0.92,
              scale: 1,
              y: 0,
              duration: 0.65,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }

          if (leftFlank) {
            gsap.to(leftFlank, {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.65,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }

          if (rightFlank) {
            gsap.to(rightFlank, {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.65,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }
        } else {
          if (radialLight) {
            radialLight.style.opacity = '0.65';
            radialLight.style.transform = 'translate3d(-50%, -50%, 0)';
          }
          if (portfolioWord) {
            portfolioWord.style.opacity = '0.92';
            portfolioWord.style.clipPath = 'none';
            portfolioWord.style.letterSpacing = '-0.04em';
            portfolioWord.style.transform = 'translate(-50%, -50%)';
          }
          if (leftFlank) {
            leftFlank.style.opacity = '1';
            leftFlank.style.transform = 'none';
          }
          if (rightFlank) {
            rightFlank.style.opacity = '1';
            rightFlank.style.transform = 'none';
          }
        }

        if (leftLine) leftLine.style.transform = 'scaleX(1)';
        if (rightLine) rightLine.style.transform = 'scaleX(1)';
        [leftTag1, leftTag2, rightTag1, rightTag2].forEach((tag) => {
          if (tag) {
            tag.style.clipPath = 'none';
            tag.style.opacity = '1';
            tag.style.transform = 'none';
          }
        });
        [leftSep, rightSep, greeting, positioning, ctaCluster, rightMantra].forEach((el) => {
          if (el) {
            el.style.opacity = '1';
            el.style.transform = 'none';
          }
        });
        const nameEl = document.querySelector('.hero-poster-name') as HTMLElement | null;
        const salutationEl = document.querySelector('.hero-salutation') as HTMLElement | null;
        if (nameEl) {
          nameEl.style.opacity = '1';
          nameEl.style.transform = 'none';
          nameEl.style.filter = 'none';
        }
        if (salutationEl) {
          salutationEl.style.opacity = '1';
          salutationEl.style.transform = 'none';
        }
        (window as any).__heroEntranceDone = true;
        anchorItems.forEach((anchor, idx) => {
          const num = anchor.querySelector('.anchor-index') as HTMLElement | null;
          const line = anchor.querySelector('.anchor-line') as HTMLElement | null;
          const title = anchor.querySelector('.anchor-title') as HTMLElement | null;
          const sub = anchor.querySelector('.anchor-sub') as HTMLElement | null;
          if (num) { num.style.opacity = '1'; num.style.transform = 'none'; }
          if (line) line.style.transform = idx === 0 ? 'scaleX(1)' : 'scaleX(0.35)';
          if (title) { title.style.clipPath = 'none'; title.style.opacity = '1'; title.style.transform = 'none'; }
          if (sub) { sub.style.opacity = '1'; sub.style.transform = 'none'; }
        });
      };

      // Flank pointer tracking (desktop only, gated to viewport top)
      if (!isTouch && !prefersReducedMotion) {
        let fX = 0, fY = 0;
        let tfX = 0, tfY = 0;
        let isHeroActive = window.scrollY < 80;

        const onPointerMove = (e: MouseEvent) => {
          if (window.innerWidth <= 960 || !isHeroActive) return;
          const normX = (e.clientX / window.innerWidth) * 2 - 1;
          const normY = (e.clientY / window.innerHeight) * 2 - 1;
          tfX = normX * 2.0;
          tfY = normY * 1.5;
        };

        const onScrollCheck = () => {
          isHeroActive = window.scrollY < 80;
        };

        window.addEventListener('mousemove', onPointerMove, { passive: true });
        window.addEventListener('scroll', onScrollCheck, { passive: true });

        const tick = () => {
          if (!isHeroActive) return;
          fX += (tfX - fX) * 0.065;
          fY += (tfY - fY) * 0.065;
          if (leftFlank) {
            leftFlank.style.transform = `translate3d(${(-fX).toFixed(2)}px, ${fY.toFixed(2)}px, 0)`;
          }
          if (rightFlank) {
            rightFlank.style.transform = `translate3d(${fX.toFixed(2)}px, ${fY.toFixed(2)}px, 0)`;
          }
          if (radialLight) {
            radialLight.style.transform = `translate3d(calc(-50% + ${(fX * 4).toFixed(2)}px), calc(-50% + ${(fY * 3).toFixed(2)}px), 0)`;
          }
        };

        gsap.ticker.add(tick);

        cleanups.push(() => {
          window.removeEventListener('mousemove', onPointerMove);
          window.removeEventListener('scroll', onScrollCheck);
          gsap.ticker.remove(tick);
        });
      }

      if (prefersReducedMotion || window.scrollY > 40) {
        restoreHeroState(false);
      } else {
        const nameEl = document.querySelector('.hero-poster-name') as HTMLElement | null;
        const salutationEl = document.querySelector('.hero-salutation') as HTMLElement | null;
        const characterPortrait = document.getElementById('character-portrait') as HTMLElement | null;

        if (radialLight) radialLight.style.opacity = '0.08';
        if (portfolioWord) {
          portfolioWord.style.opacity = '0';
          portfolioWord.style.clipPath = 'inset(100% 0% 0% 0%)';
          portfolioWord.style.letterSpacing = '0.04em';
          portfolioWord.style.transform = 'translate(-50%, -50%)';
        }

        if (leftLine) leftLine.style.transform = 'scaleX(0)';
        if (rightLine) rightLine.style.transform = 'scaleX(0)';
        if (leftTag1) { leftTag1.style.clipPath = 'inset(0% 100% 0% 0%)'; leftTag1.style.opacity = '0'; leftTag1.style.transform = 'translateX(-8px)'; }
        if (leftTag2) { leftTag2.style.clipPath = 'inset(0% 100% 0% 0%)'; leftTag2.style.opacity = '0'; leftTag2.style.transform = 'translateX(-8px)'; }
        if (rightTag1) { rightTag1.style.clipPath = 'inset(0% 0% 0% 100%)'; rightTag1.style.opacity = '0'; rightTag1.style.transform = 'translateX(8px)'; }
        if (rightTag2) { rightTag2.style.clipPath = 'inset(0% 0% 0% 100%)'; rightTag2.style.opacity = '0'; rightTag2.style.transform = 'translateX(8px)'; }
        if (leftSep) leftSep.style.opacity = '0';
        if (rightSep) rightSep.style.opacity = '0';

        if (salutationEl) {
          salutationEl.style.opacity = '0';
          salutationEl.style.transform = 'translate3d(0, 12px, 0)';
        }
        if (nameEl) {
          nameEl.style.opacity = '0';
          nameEl.style.transform = 'translate3d(0, 20px, 0)';
        }
        if (characterPortrait) {
          characterPortrait.style.opacity = '0';
          characterPortrait.style.transform = 'translate3d(0, 80px, 0) scale(0.96)';
        }

        [positioning, ctaCluster, rightMantra].forEach((el) => {
          if (el) {
            el.style.opacity = '0';
            el.style.transform = 'translate3d(0, 16px, 0)';
          }
        });

        anchorItems.forEach((anchor) => {
          const num = anchor.querySelector('.anchor-index') as HTMLElement | null;
          const line = anchor.querySelector('.anchor-line') as HTMLElement | null;
          const title = anchor.querySelector('.anchor-title') as HTMLElement | null;
          const sub = anchor.querySelector('.anchor-sub') as HTMLElement | null;
          if (num) { num.style.opacity = '0'; num.style.transform = 'translate3d(0, 8px, 0)'; }
          if (line) line.style.transform = 'scaleX(0)';
          if (title) { title.style.clipPath = 'inset(100% 0% 0% 0%)'; title.style.opacity = '0'; title.style.transform = 'translate3d(0, 12px, 0)'; }
          if (sub) { sub.style.opacity = '0'; sub.style.transform = 'translate3d(0, 10px, 0)'; }
        });

        const entranceTl = gsap.timeline({
          onComplete: () => {
            (window as any).__heroEntranceDone = true;
            [leftTag1, leftTag2, rightTag1, rightTag2].forEach((tag) => {
              if (tag) {
                tag.style.clipPath = 'none';
                tag.style.opacity = '1';
                tag.style.transform = 'none';
              }
            });
            if (leftSep) { leftSep.style.opacity = '1'; leftSep.style.transform = 'none'; }
            if (rightSep) { rightSep.style.opacity = '1'; rightSep.style.transform = 'none'; }
          },
        });

        // STEP 1 — NAME APPEARS FIRST (0.05s)
        if (salutationEl) {
          entranceTl.to(salutationEl, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', force3D: true }, 0.05);
        }
        if (nameEl) {
          entranceTl.to(nameEl, {
            opacity: 1,
            y: 0,
            duration: 0.82,
            ease: 'power3.out',
            force3D: true,
          }, 0.08);
        }

        // Background giant typography AAKASH smoothly reveals behind
        if (portfolioWord) {
          entranceTl.fromTo(portfolioWord,
            { opacity: 0, clipPath: 'inset(100% 0% 0% 0%)', letterSpacing: '0.04em' },
            { opacity: 0.92, clipPath: 'inset(0% 0% 0% 0%)', letterSpacing: '-0.04em', duration: 0.72, ease: 'power3.out' },
            0.12
          );
        }

        // Atmospheric studio backlight blooms
        if (radialLight) {
          entranceTl.fromTo(radialLight,
            { opacity: 0.12 },
            { opacity: 0.75, duration: 0.6, ease: 'power2.out' },
            0.25
          );
          entranceTl.to(radialLight, { opacity: 0.65, duration: 0.45, ease: 'power2.inOut' }, 1.35);
        }

        // STEP 2 — PORTRAIT ENTERS (0.45s)
        // High-performance GPU transform entrance: translateY 80px -> 0, scale 0.96 -> 1, opacity 0 -> 1
        if (characterPortrait) {
          entranceTl.to(characterPortrait, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.95,
            ease: 'power3.out',
            force3D: true,
          }, 0.45);
        }

        // STEP 3 — HERO DETAILS APPEAR (1.10s)
        if (leftLine) entranceTl.to(leftLine, { scaleX: 1, duration: 0.22, ease: 'power2.out' }, 1.10);
        if (leftTag1) entranceTl.to(leftTag1, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, x: 0, duration: 0.24, ease: 'power2.out' }, 1.14);
        if (leftSep) entranceTl.to(leftSep, { opacity: 1, duration: 0.14 }, 1.18);
        if (leftTag2) entranceTl.to(leftTag2, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, x: 0, duration: 0.24, ease: 'power2.out' }, 1.20);

        if (rightLine) entranceTl.to(rightLine, { scaleX: 1, duration: 0.22, ease: 'power2.out' }, 1.12);
        if (rightTag1) entranceTl.to(rightTag1, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, x: 0, duration: 0.24, ease: 'power2.out' }, 1.16);
        if (rightSep) entranceTl.to(rightSep, { opacity: 1, duration: 0.14 }, 1.20);
        if (rightTag2) entranceTl.to(rightTag2, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, x: 0, duration: 0.24, ease: 'power2.out' }, 1.22);

        if (positioning) entranceTl.to(positioning, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', force3D: true }, 1.26);
        if (rightMantra) entranceTl.to(rightMantra, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', force3D: true }, 1.34);

        anchorItems.forEach((anchor, idx) => {
          const baseTime = 1.38 + idx * 0.08;
          const num = anchor.querySelector('.anchor-index') as HTMLElement | null;
          const line = anchor.querySelector('.anchor-line') as HTMLElement | null;
          const title = anchor.querySelector('.anchor-title') as HTMLElement | null;
          const sub = anchor.querySelector('.anchor-sub') as HTMLElement | null;

          if (num) entranceTl.to(num, { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out', force3D: true }, baseTime);
          if (line) entranceTl.to(line, { scaleX: idx === 0 ? 1 : 0.35, duration: 0.22, ease: 'power2.out' }, baseTime + 0.04);
          if (title) entranceTl.to(title, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, y: 0, duration: 0.24, ease: 'power2.out', force3D: true }, baseTime + 0.06);
          if (sub) entranceTl.to(sub, { opacity: 1, y: 0, duration: 0.20, ease: 'power2.out', force3D: true }, baseTime + 0.08);
        });

        if (ctaCluster) entranceTl.to(ctaCluster, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', force3D: true }, 1.55);
      }

      // Restrained, Non-Destructive Hero Exit Timeline
      const mm = gsap.matchMedia();

      mm.add('(min-width: 961px)', () => {
        if (!heroSection) return;

        gsap.timeline({
          scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
            onLeaveBack: () => {
              restoreHeroState(true);
            },
          },
        })
        .to(leftFlank, { opacity: 0.3, y: -25, ease: 'none', force3D: true }, 0)
        .to(rightFlank, { opacity: 0.3, y: -25, ease: 'none', force3D: true }, 0)
        .to(portfolioWord, { opacity: 0.25, y: -30, ease: 'none', force3D: true }, 0);
      });

      // ======================================================================
      // ANCHOR HOVER PREVIEW CONTROLLER
      // ======================================================================
      const previewStage = document.getElementById('hero-hover-preview');
      const previewImg = document.getElementById('hover-preview-img') as HTMLImageElement | null;
      const previewTitle = document.getElementById('hover-preview-title');
      const previewSub = document.getElementById('hover-preview-sub');
      const previewKicker = document.getElementById('hover-preview-kicker');

      if (anchorItems.length && previewStage) {
        anchorItems.forEach((item) => {
          const onMouseEnter = () => {
            if (window.innerWidth <= 960) return;

            const titleEl = item.querySelector('.anchor-title') as HTMLElement | null;
            if (titleEl) titleEl.style.transform = 'translateX(-8px)';

            anchorItems.forEach((sib) => {
              const line = sib.querySelector('.anchor-line') as HTMLElement | null;
              if (sib === item) {
                sib.classList.add('active');
                sib.classList.remove('receded');
                if (line) line.style.transform = 'scaleX(1)';
              } else {
                sib.classList.remove('active');
                sib.classList.add('receded');
                if (line) line.style.transform = 'scaleX(0.35)';
              }
            });

            const previewSrc = item.getAttribute('data-preview');
            const titleText = item.getAttribute('data-title');
            const subText = item.getAttribute('data-sub');
            const kickerText = item.getAttribute('data-kicker');

            if (previewStage.classList.contains('active') && previewImg && previewImg.src !== previewSrc) {
              previewImg.style.opacity = '0.35';
              setTimeout(() => {
                if (previewImg && previewSrc) previewImg.src = previewSrc;
                if (previewTitle && titleText) previewTitle.textContent = titleText;
                if (previewSub && subText) previewSub.textContent = subText;
                if (previewKicker && kickerText) previewKicker.textContent = kickerText;
                if (previewImg) previewImg.style.opacity = '1';
              }, 120);
            } else {
              if (previewImg && previewSrc) {
                previewImg.src = previewSrc;
                previewImg.style.opacity = '1';
              }
              if (previewTitle && titleText) previewTitle.textContent = titleText;
              if (previewSub && subText) previewSub.textContent = subText;
              if (previewKicker && kickerText) previewKicker.textContent = kickerText;
              previewStage.classList.add('active');
            }
          };

          const onMouseLeave = () => {
            if (window.innerWidth <= 960) return;

            const titleEl = item.querySelector('.anchor-title') as HTMLElement | null;
            if (titleEl) titleEl.style.transform = 'none';

            anchorItems.forEach((sib, sIdx) => {
              sib.classList.remove('receded');
              const line = sib.querySelector('.anchor-line') as HTMLElement | null;
              if (sIdx === 0) {
                sib.classList.add('active');
                if (line) line.style.transform = 'scaleX(1)';
              } else {
                sib.classList.remove('active');
                if (line) line.style.transform = 'scaleX(0)';
              }
            });

            previewStage.classList.remove('active');
            previewStage.style.transform = '';
          };

          item.addEventListener('mouseenter', onMouseEnter);
          item.addEventListener('mouseleave', onMouseLeave);

          cleanups.push(() => {
            item.removeEventListener('mouseenter', onMouseEnter);
            item.removeEventListener('mouseleave', onMouseLeave);
          });
        });

        const onPreviewMouseMove = (e: MouseEvent) => {
          if (window.innerWidth <= 960 || !previewStage.classList.contains('active')) return;
          const normX = (e.clientX / window.innerWidth) * 2 - 1;
          const normY = (e.clientY / window.innerHeight) * 2 - 1;
          previewStage.style.transform = `translate3d(${(normX * 6).toFixed(1)}px, ${(normY * 4).toFixed(1)}px, 0)`;
        };

        window.addEventListener('mousemove', onPreviewMouseMove, { passive: true });
        cleanups.push(() => {
          window.removeEventListener('mousemove', onPreviewMouseMove);
        });
      }
    }, containerRef);

    return () => {
      cleanups.forEach((c) => c());
      ctx.revert();
    };
  }, []);

  return (
    <div className="hero-signature-wrapper" id="hero-experience" ref={containerRef}>
      <section className="home-hero-section poster-hero-stage" id="hero">
        {/* LAYER 1 & 2: Atmospheric Studio Background & Cinematic Lighting */}
        <HeroLighting />

        {/* LAYER 3: Enormous Background Typography AAKASH (Behind Aakash) */}
        <div className="hero-poster-wordmark" id="hero-portfolio-wordmark" aria-hidden="true">
          AAKASH
        </div>

        {/* LAYER 4, 5 & 6: Poster Grid Composition (Left Flank, Portrait Spacer, Right Flank) */}
        <div className="hero-poster-grid">
          <HeroLeftFlank />
          {/* Spatial placeholder maintaining pixel-perfect 3-column layout while SharedPortraitBridge renders the continuous portrait */}
          <div className="hero-center-subject hero-portrait-spacer" aria-hidden="true"></div>
          <HeroRightFlank />
        </div>

        {/* Hover preview */}
        <HeroProjectPreview />
      </section>
    </div>
  );
}
