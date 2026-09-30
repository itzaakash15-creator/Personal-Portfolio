'use client';

import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, initGSAP } from '../../lib/gsap';

export default function SharedPortraitBridge() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    initGSAP();

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const characterScene = document.getElementById('character-scene');
      const characterPortrait = document.getElementById('character-portrait');
      const dissolveWrapper = document.getElementById('portrait-dissolve-wrapper');
      const gradientOverlay = document.getElementById('portrait-gradient-overlay');
      const rimLight = document.getElementById('aakash-rim-light');

      if (!characterScene || !characterPortrait || !container) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

      // Calculates dynamic left-side anchor offset (20–24vw visual center, 5–9vw margin from left edge)
      const getAnchorLeftX = () => {
        if (typeof window === 'undefined') return -360;
        const w = window.innerWidth;
        if (w <= 960) return 0;
        const stageWidth = Math.min(Math.max(w * 0.40, 380), 640);
        const scaledHalfWidth = (stageWidth * 0.86) * 0.5;
        // 6.5vw left margin gives ~22-23.7vw visual center, perfectly placed in left black negative space
        const targetLeftMargin = Math.max(w * 0.065, 36);
        const desiredCenter = targetLeftMargin + scaledHalfWidth;
        const deltaX = desiredCenter - (w * 0.5);
        return deltaX;
      };

      // Canonical restore for top Hero state — deterministic resting position
      const restoreHeroState = () => {
        container.style.visibility = 'visible';
        container.style.opacity = '1';
        container.style.pointerEvents = 'none';

        gsap.set(characterScene, {
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          opacity: 1,
          force3D: true,
        });

        if (dissolveWrapper) {
          gsap.set(dissolveWrapper, {
            opacity: 1,
            y: 0,
            scale: 1,
            force3D: true,
          });
        }

        if (gradientOverlay) {
          gsap.set(gradientOverlay, { opacity: 0 });
        }

        if (rimLight) {
          gsap.set(rimLight, { opacity: 0 });
        }

        characterPortrait.style.opacity = '1';
        characterPortrait.style.visibility = 'visible';
      };

      // ======================================================================
      // Master ScrollTrigger Portrait Bridge (Desktop)
      // Controlled lifecycle: Hero Center -> Glide Left on "I DON'T FIT INTO ONE BOX"
      // -> Stable Left Hold through all 4 Roles -> Gradual Dissolve -> Clean Exit
      // ======================================================================
      const mm = gsap.matchMedia();

      mm.add('(min-width: 961px) and (prefers-reduced-motion: no-preference)', () => {
        const portraitTl = gsap.timeline({
          scrollTrigger: {
            trigger: '#hero-experience',
            start: 'top top',
            endTrigger: '#work',
            end: 'top top',
            scrub: 0.5,
            anticipatePin: 1,
            refreshPriority: -1,
            invalidateOnRefresh: true,
            onLeave: () => {
              container.style.visibility = 'hidden';
              container.style.opacity = '0';
              container.style.pointerEvents = 'none';
            },
            onEnterBack: () => {
              container.style.visibility = 'visible';
              container.style.opacity = '1';
            },
            onLeaveBack: () => {
              restoreHeroState();
            },
          },
        });

        // 1. Hero Dominant Hold (0.0 -> 0.7 units, ~320px scroll):
        // Composition remains intact while Hero is still dominant; Aakash stays centered.
        portraitTl.to(characterScene, {
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'none',
          force3D: true,
        }, 0);

        // 2. Hero -> Identity Glide (0.7 -> 2.0 units):
        // As "I DON'T FIT INTO ONE BOX" enters, portrait glides smoothly from Center to Left
        // Target: visual center 20–24vw, left edge 5–9vw, scale 86%, rotation -0.6 deg.
        portraitTl.to(characterScene, {
          x: () => getAnchorLeftX(),
          y: 16,
          scale: 0.86,
          rotation: -0.6,
          duration: 1.3,
          ease: 'power2.inOut',
          force3D: true,
        }, 0.7);

        if (rimLight) {
          portraitTl.fromTo(rimLight, { opacity: 0 }, { opacity: 0.45, duration: 1.3, ease: 'power1.inOut' }, 0.7);
        }

        // 3. Gentle Rotation Settle (2.0 -> 2.3 units):
        portraitTl.to(characterScene, {
          rotation: 0,
          duration: 0.3,
          ease: 'power1.out',
          force3D: true,
        }, 2.0);

        // 4. Stable Hold on the Left across the ENTIRE Role Experience (2.3 -> 8.8 units):
        // "I DON'T FIT INTO ONE BOX", MARKETER, BRAND BUILDER, CREATOR, SPEAKER.
        // Aakash remains stably anchored on the left for all roles without moving.
        portraitTl.to(characterScene, {
          x: () => getAnchorLeftX(),
          y: 16,
          scale: 0.86,
          opacity: 1,
          duration: 6.5,
          ease: 'none',
          force3D: true,
        }, 2.3);

        // 5. SPEAKER completes -> Gradual Dissolve begins (8.8 -> 9.5 units):
        // Lower blazer fades first via gradient overlay, rim light recedes.
        if (gradientOverlay) {
          portraitTl.fromTo(gradientOverlay, { opacity: 0 }, { opacity: 1, duration: 0.7, ease: 'power2.in' }, 8.8);
        }
        if (rimLight) {
          portraitTl.to(rimLight, { opacity: 0, duration: 0.5, ease: 'power1.out' }, 8.8);
        }

        // 6. Final Dissolve before Work Section (9.5 -> 10.0 units):
        // Upper torso/head dissolves completely before #work starts.
        if (dissolveWrapper) {
          portraitTl.to(dissolveWrapper, {
            opacity: 0,
            y: 24,
            scale: 0.83,
            duration: 0.5,
            ease: 'power2.inOut',
            force3D: true,
          }, 9.5);
        }

        // Strict Work Section boundary guard: guarantees portrait is completely hidden in all work/later sections
        ScrollTrigger.create({
          trigger: '#work',
          start: 'top top',
          onEnter: () => {
            container.style.visibility = 'hidden';
            container.style.opacity = '0';
            container.style.pointerEvents = 'none';
          },
        });
      });

      // Reduced motion: simple minimal cross-position and clean fade
      mm.add('(min-width: 961px) and (prefers-reduced-motion: reduce)', () => {
        const portraitTl = gsap.timeline({
          scrollTrigger: {
            trigger: '#hero-experience',
            start: 'top top',
            endTrigger: '#work',
            end: 'top top',
            scrub: 0.4,
            refreshPriority: -1,
            onLeave: () => {
              container.style.visibility = 'hidden';
              container.style.opacity = '0';
              container.style.pointerEvents = 'none';
            },
            onEnterBack: () => {
              container.style.visibility = 'visible';
              container.style.opacity = '1';
            },
            onLeaveBack: () => {
              restoreHeroState();
            },
          },
        });

        portraitTl.to(characterScene, {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.7,
          force3D: true,
        }, 0);

        portraitTl.to(characterScene, {
          x: () => getAnchorLeftX(),
          scale: 0.86,
          y: 16,
          opacity: 1,
          duration: 1.3,
          ease: 'power2.inOut',
          force3D: true,
        }, 0.7);

        portraitTl.to(characterScene, {
          x: () => getAnchorLeftX(),
          scale: 0.86,
          y: 16,
          opacity: 1,
          duration: 6.8,
          force3D: true,
        }, 2.0);

        if (dissolveWrapper) {
          portraitTl.to(dissolveWrapper, {
            opacity: 0,
            duration: 1.2,
            force3D: true,
          }, 8.8);
        }
      });

      // Mobile adaptation: gentle scale and fade before role text
      mm.add('(max-width: 960px)', () => {
        const portraitTl = gsap.timeline({
          scrollTrigger: {
            trigger: '#hero-experience',
            start: 'top top',
            endTrigger: '#identity',
            end: 'top top',
            scrub: 0.4,
            invalidateOnRefresh: true,
            onLeave: () => {
              container.style.visibility = 'hidden';
              container.style.opacity = '0';
              container.style.pointerEvents = 'none';
            },
            onEnterBack: () => {
              container.style.visibility = 'visible';
              container.style.opacity = '1';
            },
            onLeaveBack: () => {
              restoreHeroState();
            },
          },
        });

        portraitTl.to(characterScene, {
          scale: 0.88,
          y: -15,
          opacity: 0.35,
          duration: 1.0,
          ease: 'power1.inOut',
          force3D: true,
        }, 0);

        if (dissolveWrapper) {
          portraitTl.to(dissolveWrapper, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
            force3D: true,
          }, 0.8);
        }
      });

      // Micro mouse parallax on portrait only when in Hero zone (scrollY < 60)
      if (!isTouch && !prefersReducedMotion) {
        let pX = 0, pY = 0;
        let tX = 0, tY = 0;
        let isHeroZone = window.scrollY < 60;

        const onPointerMove = (e: MouseEvent) => {
          if (window.innerWidth <= 960 || !isHeroZone || !(window as any).__heroEntranceDone) return;
          tX = (e.clientX / window.innerWidth - 0.5) * 6;
          tY = (e.clientY / window.innerHeight - 0.5) * 4;
        };

        const onScrollCheck = () => {
          const inHero = window.scrollY < 60;
          if (inHero !== isHeroZone) {
            isHeroZone = inHero;
            if (!isHeroZone) {
              pX = 0;
              pY = 0;
              tX = 0;
              tY = 0;
              characterPortrait.style.transform = 'translate3d(0, 0, 0)';
            } else {
              restoreHeroState();
            }
          }
        };

        window.addEventListener('mousemove', onPointerMove, { passive: true });
        window.addEventListener('scroll', onScrollCheck, { passive: true });

        const parallaxTick = () => {
          if (isHeroZone && (window as any).__heroEntranceDone) {
            pX += (tX - pX) * 0.08;
            pY += (tY - pY) * 0.08;
            if (Math.abs(pX) > 0.02 || Math.abs(pY) > 0.02) {
              characterPortrait.style.transform = `translate3d(${pX.toFixed(2)}px, ${pY.toFixed(2)}px, 0)`;
            }
          }
        };

        gsap.ticker.add(parallaxTick);

        cleanups.push(() => {
          window.removeEventListener('mousemove', onPointerMove);
          window.removeEventListener('scroll', onScrollCheck);
          gsap.ticker.remove(parallaxTick);
        });
      }
    }, containerRef);

    return () => {
      cleanups.forEach((c) => c());
      ctx.revert();
    };
  }, []);

  return (
    <div className="shared-portrait-container" id="shared-portrait-container" ref={containerRef}>
      <div className="shared-portrait-stage" id="character-scene">
        {/* Contact shadow beneath & behind Aakash */}
        <div className="aakash-contact-shadow" id="aakash-contact-shadow" aria-hidden="true"></div>

        {/* Subtle warm champagne rim light that emerges as Aakash glides into Identity */}
        <div className="aakash-rim-light" id="aakash-rim-light" aria-hidden="true"></div>

        {/* Dissolve wrapper for the gradual gradient exit */}
        <div className="portrait-dissolve-wrapper" id="portrait-dissolve-wrapper">
          <div className="portrait-gradient-overlay" id="portrait-gradient-overlay" aria-hidden="true"></div>
          <img
            src="/assets/aakash_authentic_portrait.png"
            alt="AAKASH — Creative Director, Marketer and Builder"
            className="hero-poster-portrait"
            id="character-portrait"
            width={682}
            height={1024}
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}
