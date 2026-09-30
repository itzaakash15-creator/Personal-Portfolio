'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SharedPortraitBridge() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const characterScene = document.getElementById('character-scene');
      const characterPortrait = document.getElementById('character-portrait');
      const dissolveWrapper = document.getElementById('portrait-dissolve-wrapper');
      const gradientOverlay = document.getElementById('portrait-gradient-overlay');
      const rimLight = document.getElementById('aakash-rim-light');
      const workEl = document.getElementById('work');

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

      // Canonical restore for top Hero state
      const restoreHeroState = (smooth = true) => {
        container.style.visibility = 'visible';
        container.style.display = 'flex';

        if (smooth) {
          gsap.to(characterScene, {
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: 'auto',
          });
          if (dissolveWrapper) {
            gsap.to(dissolveWrapper, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }
          if (gradientOverlay) {
            gsap.to(gradientOverlay, { opacity: 0, duration: 0.4, overwrite: 'auto' });
          }
          if (rimLight) {
            gsap.to(rimLight, { opacity: 0, duration: 0.4, overwrite: 'auto' });
          }
        } else {
          gsap.set(characterScene, {
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            opacity: 1,
          });
          if (dissolveWrapper) {
            gsap.set(dissolveWrapper, { opacity: 1, y: 0, scale: 1 });
          }
          if (gradientOverlay) {
            gsap.set(gradientOverlay, { opacity: 0 });
          }
          if (rimLight) {
            gsap.set(rimLight, { opacity: 0 });
          }
          characterPortrait.style.opacity = '1';
          characterPortrait.style.visibility = 'visible';
          characterPortrait.style.display = 'block';
        }
      };

      // ======================================================================
      // Triple-Layer Boundary Enforcement with Section 3 (#work / Executive Hook)
      // Once the user enters Section 3 (#work), the portrait is guaranteed completely gone
      // ======================================================================
      const checkBoundary = () => {
        if (!container) return;
        if (workEl) {
          const workRect = workEl.getBoundingClientRect();
          // If Section 3 (#work) top has entered the viewport:
          if (workRect.top <= window.innerHeight) {
            container.style.display = 'none';
            container.style.visibility = 'hidden';
            return;
          }
        }
        // Within Hero and Roles:
        container.style.display = 'flex';
        container.style.visibility = 'visible';

        // When returning to top Hero position:
        if (window.scrollY <= 40) {
          restoreHeroState(false);
        }
      };

      window.addEventListener('scroll', checkBoundary, { passive: true });
      checkBoundary();

      // ======================================================================
      // Master ScrollTrigger Portrait Bridge (Desktop)
      // Controlled lifecycle: Hero -> Roles -> Disappear at Roles End
      // ======================================================================
      const mm = gsap.matchMedia();

      mm.add('(min-width: 961px) and (prefers-reduced-motion: no-preference)', () => {
        const portraitTl = gsap.timeline({
          scrollTrigger: {
            trigger: '#hero-experience',
            start: 'top top',
            endTrigger: '#work',
            end: 'top bottom',
            scrub: 0.6,
            anticipatePin: 1,
            refreshPriority: -1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (self.progress >= 0.999) {
                container.style.display = 'none';
                container.style.visibility = 'hidden';
              } else {
                container.style.display = 'flex';
                container.style.visibility = 'visible';
              }
            },
            onLeave: () => {
              container.style.display = 'none';
              container.style.visibility = 'hidden';
            },
            onEnterBack: () => {
              container.style.display = 'flex';
              container.style.visibility = 'visible';
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
        }, 0);

        if (rimLight) {
          portraitTl.fromTo(rimLight, { opacity: 0 }, { opacity: 0.65, duration: 1.8, ease: 'power1.inOut' }, 0);
        }

        // 2. Roles Resting Position & Hold through 4 Roles (1.8 -> 7.5 units):
        // Settle rotation gently to 0, remain the steadfast human anchor while Marketer, Brand Builder, Creator, Speaker play
        portraitTl.to(characterScene, {
          rotation: 0,
          duration: 0.4,
          ease: 'power1.out',
        }, 1.8);

        portraitTl.to(characterScene, {
          x: () => getAnchorRightX(),
          y: -12,
          scale: 0.94,
          opacity: 1,
          duration: 5.3,
        }, 2.2);

        // 3. Gradual Cinematic Exit Dissolve (7.5 -> 10.0 units, final ~25% of Roles scroll):
        // Vertical gradient overlay dissolves lower body first, then whole portrait dissolves into dark background
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
            end: 'top bottom',
            scrub: 0.3,
            refreshPriority: -1,
            onLeave: () => {
              container.style.display = 'none';
              container.style.visibility = 'hidden';
            },
            onEnterBack: () => {
              container.style.display = 'flex';
              container.style.visibility = 'visible';
            },
          },
        });

        portraitTl.to(characterScene, {
          x: () => getAnchorRightX(),
          opacity: 1,
          duration: 1.2,
        }, 0);

        portraitTl.to(characterScene, {
          x: () => getAnchorRightX(),
          opacity: 1,
          duration: 6.3,
        }, 1.2);

        if (dissolveWrapper) {
          portraitTl.to(dissolveWrapper, {
            opacity: 0,
            duration: 2.5,
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
            scrub: 0.5,
            invalidateOnRefresh: true,
            onLeave: () => {
              container.style.display = 'none';
              container.style.visibility = 'hidden';
            },
            onEnterBack: () => {
              container.style.display = 'flex';
              container.style.visibility = 'visible';
            },
          },
        });

        portraitTl.to(characterScene, {
          scale: 0.88,
          y: -15,
          opacity: 0.35,
          duration: 1.0,
          ease: 'power1.inOut',
        }, 0);

        if (dissolveWrapper) {
          portraitTl.to(dissolveWrapper, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
          }, 0.8);
        }
      });

      // Micro mouse parallax on wrapper only when in Hero zone and entrance is settled
      if (!isTouch && !prefersReducedMotion) {
        const isDesktop = () => window.innerWidth > 960;
        let pX = 0, pY = 0;
        let tX = 0, tY = 0;

        const onPointerMove = (e: MouseEvent) => {
          if (!isDesktop() || !(window as any).__heroEntranceDone || window.scrollY > 80) return;
          tX = (e.clientX / window.innerWidth - 0.5) * 6;
          tY = (e.clientY / window.innerHeight - 0.5) * 4;
        };

        window.addEventListener('mousemove', onPointerMove, { passive: true });

        const parallaxTick = () => {
          if (window.scrollY < 80 && (window as any).__heroEntranceDone) {
            pX += (tX - pX) * 0.08;
            pY += (tY - pY) * 0.08;
            if (dissolveWrapper && Math.abs(pX) > 0.01) {
              dissolveWrapper.style.transform = `translate3d(${pX.toFixed(2)}px, ${pY.toFixed(2)}px, 0)`;
            }
          }
        };

        gsap.ticker.add(parallaxTick);

        return () => {
          window.removeEventListener('mousemove', onPointerMove);
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
