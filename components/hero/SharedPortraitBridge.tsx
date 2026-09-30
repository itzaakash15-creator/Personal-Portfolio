'use client';

import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, initGSAP } from '../../lib/gsap';

export default function SharedPortraitBridge() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    initGSAP();

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

      // Calculates dynamic right-side anchor offset (6–10vw padding from right edge)
      const getAnchorRightX = () => {
        if (typeof window === 'undefined') return 340;
        const w = window.innerWidth;
        if (w <= 960) return 0;
        const pw = Math.min(Math.max(w * 0.34, 380), 560);
        const targetRightMargin = w * 0.08; // 8vw from right edge
        const desiredCenter = w - targetRightMargin - (pw * 0.47);
        const deltaX = desiredCenter - (w / 2);
        return Math.max(deltaX, 200);
      };

      // Canonical restore for top Hero state — deterministic resting position
      const restoreHeroState = () => {
        container.style.visibility = 'visible';
        container.style.opacity = '1';

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
      // Controlled lifecycle: Hero -> Roles -> Disappear cleanly before Section 3
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

        // 1. Hero -> Roles Glide (0 -> 1.8 units):
        // Portrait smoothly moves from center toward right side (6–10vw margin) with subtle cinematic arc
        portraitTl.to(characterScene, {
          x: () => getAnchorRightX(),
          y: -12,
          scale: 0.94,
          rotation: 0.6,
          duration: 1.8,
          ease: 'power1.inOut',
          force3D: true,
        }, 0);

        if (rimLight) {
          portraitTl.fromTo(rimLight, { opacity: 0 }, { opacity: 0.65, duration: 1.8, ease: 'power1.inOut' }, 0);
        }

        // 2. Roles Resting Position & Hold through 4 Roles (1.8 -> 7.5 units):
        portraitTl.to(characterScene, {
          rotation: 0,
          duration: 0.4,
          ease: 'power1.out',
          force3D: true,
        }, 1.8);

        portraitTl.to(characterScene, {
          x: () => getAnchorRightX(),
          y: -12,
          scale: 0.94,
          opacity: 1,
          duration: 5.3,
          force3D: true,
        }, 2.2);

        // 3. Gradual Cinematic Exit Dissolve (7.5 -> 10.0 units, final ~25% of Roles scroll):
        if (gradientOverlay) {
          portraitTl.fromTo(gradientOverlay, { opacity: 0 }, { opacity: 1, duration: 1.5, ease: 'power2.in' }, 7.5);
        }
        if (rimLight) {
          portraitTl.to(rimLight, { opacity: 0, duration: 1.2 }, 7.8);
        }
        if (dissolveWrapper) {
          portraitTl.to(dissolveWrapper, {
            opacity: 0,
            y: 20,
            scale: 0.97,
            duration: 2.0,
            ease: 'power2.inOut',
            force3D: true,
          }, 8.0);
        }
      });

      // Reduced motion: simple minimal cross-position and clean fade
      mm.add('(min-width: 961px) and (prefers-reduced-motion: reduce)', () => {
        const portraitTl = gsap.timeline({
          scrollTrigger: {
            trigger: '#hero-experience',
            start: 'top top',
            endTrigger: '#work',
            end: 'top top',
            scrub: 0.3,
            refreshPriority: -1,
            onLeave: () => {
              container.style.visibility = 'hidden';
              container.style.opacity = '0';
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
          x: () => getAnchorRightX(),
          opacity: 1,
          duration: 1.2,
          force3D: true,
        }, 0);

        portraitTl.to(characterScene, {
          x: () => getAnchorRightX(),
          opacity: 1,
          duration: 6.3,
          force3D: true,
        }, 1.2);

        if (dissolveWrapper) {
          portraitTl.to(dissolveWrapper, {
            opacity: 0,
            duration: 2.5,
            force3D: true,
          }, 7.5);
        }
      });

      // Mobile adaptation: no horizontal overflow, gentle scale and fade before role text
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

        return () => {
          window.removeEventListener('mousemove', onPointerMove);
          window.removeEventListener('scroll', onScrollCheck);
          gsap.ticker.remove(parallaxTick);
        };
      }
    }, containerRef);

    return () => {
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
