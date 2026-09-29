'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroLighting from './HeroLighting';
import HeroPortrait from './HeroPortrait';
import HeroProjectPreview from './HeroProjectPreview';
import { HeroLeftFlank, HeroRightFlank } from './HeroFlanks';

export default function HeroExperience() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const heroSection = document.getElementById('hero');
      const leftFlank = document.getElementById('hero-left-flank');
      const rightFlank = document.getElementById('hero-right-flank');
      const portfolioWord = document.getElementById('hero-portfolio-wordmark');
      const radialLight = document.getElementById('hero-radial-light');
      const characterScene = document.getElementById('character-scene');
      const characterPortrait = document.getElementById('character-portrait');
      const aakashShadow = document.getElementById('aakash-contact-shadow');

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

      // ======================================================================
      // CharacterController: Responsive Parallax & Studio Lighting
      // ======================================================================
      const CharacterController = {
        isEntrancePlaying: false,
        current: {
          pointerX: 0,
          pointerY: 0,
          pointerScale: 1,
          lightX: 0,
          lightY: 0,
          dirLightX: 0,
          dirLightY: 0,
          wordmarkX: 0,
          wordmarkY: 0,
          flankX: 0,
          flankY: 0,
          shadowX: 0,
          shadowY: 18,
        },
        target: {
          pointerX: 0,
          pointerY: 0,
          pointerScale: 1,
          lightX: 0,
          lightY: 0,
          dirLightX: 0,
          dirLightY: 0,
          wordmarkX: 0,
          wordmarkY: 0,
          flankX: 0,
          flankY: 0,
          shadowX: 0,
          shadowY: 18,
        },
        isTicking: false,
        rafId: 0 as number,

        init() {
          if (characterPortrait) {
            characterPortrait.style.opacity = '1';
            characterPortrait.style.visibility = 'visible';
            characterPortrait.style.display = 'block';
          }
          if (!isTouch && !prefersReducedMotion) {
            this.bindPointerEvents();
          }
        },

        bindPointerEvents() {
          const isDesktop = () => window.innerWidth > 960 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

          const onPointerMove = (e: MouseEvent) => {
            if (!isDesktop() || this.isEntrancePlaying || window.scrollY > window.innerHeight) return;

            const normX = (e.clientX / window.innerWidth) * 2 - 1;
            const normY = (e.clientY / window.innerHeight) * 2 - 1;

            this.target.pointerX = normX * 4.5;
            this.target.pointerY = normY * 2.8;
            this.target.lightX = normX * 8.0;
            this.target.lightY = normY * 5.0;
            this.target.dirLightX = -normX * 6.0;
            this.target.dirLightY = -normY * 4.0;
            this.target.wordmarkX = normX * 1.8;
            this.target.wordmarkY = normY * 1.2;
            this.target.flankX = normX * 1.8;
            this.target.flankY = normY * 1.2;
            this.target.shadowX = -normX * 7;
            this.target.shadowY = 18 - normY * 3;

            this.requestTick();
          };

          const onPointerLeave = () => {
            if (!isDesktop()) return;
            this.target.pointerX = 0;
            this.target.pointerY = 0;
            this.target.lightX = 0;
            this.target.lightY = 0;
            this.target.dirLightX = 0;
            this.target.dirLightY = 0;
            this.target.wordmarkX = 0;
            this.target.wordmarkY = 0;
            this.target.flankX = 0;
            this.target.flankY = 0;
            this.target.shadowX = 0;
            this.target.shadowY = 18;

            this.requestTick();
          };

          window.addEventListener('mousemove', onPointerMove, { passive: true });
          window.addEventListener('mouseleave', onPointerLeave, { passive: true });
        },

        requestTick() {
          if (!this.isTicking) {
            this.isTicking = true;
            this.rafId = requestAnimationFrame(() => this.update());
          }
        },

        update() {
          const c = this.current;
          const t = this.target;

          c.pointerX += (t.pointerX - c.pointerX) * 0.055;
          c.pointerY += (t.pointerY - c.pointerY) * 0.055;
          c.lightX += (t.lightX - c.lightX) * 0.040;
          c.lightY += (t.lightY - c.lightY) * 0.040;
          c.dirLightX += (t.dirLightX - c.dirLightX) * 0.040;
          c.dirLightY += (t.dirLightY - c.dirLightY) * 0.040;
          c.wordmarkX += (t.wordmarkX - c.wordmarkX) * 0.035;
          c.wordmarkY += (t.wordmarkY - c.wordmarkY) * 0.035;
          c.flankX += (t.flankX - c.flankX) * 0.065;
          c.flankY += (t.flankY - c.flankY) * 0.065;
          c.shadowX += (t.shadowX - c.shadowX) * 0.055;
          c.shadowY += (t.shadowY - c.shadowY) * 0.055;

          this.render();

          const diff = Math.abs(t.pointerX - c.pointerX) +
                       Math.abs(t.pointerY - c.pointerY) +
                       Math.abs(t.lightX - c.lightX) +
                       Math.abs(t.lightY - c.lightY) +
                       Math.abs(t.wordmarkX - c.wordmarkX) +
                       Math.abs(t.wordmarkY - c.wordmarkY);

          if (diff > 0.005) {
            this.rafId = requestAnimationFrame(() => this.update());
          } else {
            this.isTicking = false;
          }
        },

        render() {
          if (radialLight) {
            radialLight.style.transform = `translate3d(calc(-50% + ${this.current.lightX.toFixed(2)}px), calc(-50% + ${this.current.lightY.toFixed(2)}px), 0)`;
          }
          const dirLightEl = document.querySelector('.hero-poster-side-light') as HTMLElement | null;
          if (dirLightEl) {
            dirLightEl.style.transform = `translate3d(${this.current.dirLightX.toFixed(2)}px, ${this.current.dirLightY.toFixed(2)}px, 0)`;
          }
          if (portfolioWord && !this.isEntrancePlaying) {
            portfolioWord.style.transform = `translate(calc(-50% + ${this.current.wordmarkX.toFixed(2)}px), calc(-50% + ${this.current.wordmarkY.toFixed(2)}px))`;
          }
          if (leftFlank && !this.isEntrancePlaying) {
            leftFlank.style.transform = `translate3d(${(-this.current.flankX).toFixed(2)}px, ${this.current.flankY.toFixed(2)}px, 0)`;
          }
          if (rightFlank && !this.isEntrancePlaying) {
            rightFlank.style.transform = `translate3d(${this.current.flankX.toFixed(2)}px, ${this.current.flankY.toFixed(2)}px, 0)`;
          }
          if (characterPortrait && !this.isEntrancePlaying) {
            const totalX = this.current.pointerX;
            const totalY = this.current.pointerY;
            characterPortrait.style.transform = `translate3d(${totalX.toFixed(2)}px, ${totalY.toFixed(2)}px, 0)`;
            characterPortrait.style.filter = `contrast(1.08) brightness(0.97) saturate(0.9) drop-shadow(${this.current.shadowX.toFixed(1)}px ${this.current.shadowY.toFixed(1)}px 32px rgba(0, 0, 0, 0.7))`;
          }
        },
      };

      CharacterController.init();

      // ======================================================================
      // Canonical Hero Settle & Scroll Return Lifecycle
      // ======================================================================
      const restoreHeroState = (smooth = true) => {
        CharacterController.isEntrancePlaying = false;

        if (smooth) {
          if (characterPortrait) {
            gsap.to(characterPortrait, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.65,
              ease: 'power2.out',
              overwrite: 'auto',
              onStart: () => {
                if (characterPortrait) {
                  characterPortrait.style.visibility = 'visible';
                  characterPortrait.style.display = 'block';
                }
              },
            });
          }

          if (characterScene) {
            gsap.to(characterScene, {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.65,
              ease: 'power2.out',
              overwrite: 'auto',
              onStart: () => {
                if (characterScene) {
                  characterScene.style.visibility = 'visible';
                  characterScene.style.display = 'flex';
                }
              },
            });
          }

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
          // Immediate snap for instant initialization or bypass
          if (characterPortrait) {
            characterPortrait.style.opacity = '1';
            characterPortrait.style.visibility = 'visible';
            characterPortrait.style.display = 'block';
            characterPortrait.style.transform = 'none';
          }
          if (characterScene) {
            characterScene.style.opacity = '1';
            characterScene.style.visibility = 'visible';
            characterScene.style.display = 'flex';
            characterScene.style.transform = 'none';
          }
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
        CharacterController.requestTick();
      };

      const settleHeroImmediately = () => {
        restoreHeroState(false);
      };

      if (prefersReducedMotion || window.scrollY > 40) {
        settleHeroImmediately();
      } else {
        CharacterController.isEntrancePlaying = true;

        if (radialLight) radialLight.style.opacity = '0.08';
        if (portfolioWord) {
          portfolioWord.style.opacity = '0';
          portfolioWord.style.clipPath = 'inset(100% 0% 0% 0%)';
          portfolioWord.style.letterSpacing = '0.04em';
          portfolioWord.style.transform = 'translate(-50%, -50%)';
        }
        if (characterPortrait) {
          characterPortrait.style.opacity = '0';
          characterPortrait.style.transform = 'translate3d(0, 85vh, 0) scale(0.97)';
        }

        if (leftLine) leftLine.style.transform = 'scaleX(0)';
        if (rightLine) rightLine.style.transform = 'scaleX(0)';
        if (leftTag1) { leftTag1.style.clipPath = 'inset(0% 100% 0% 0%)'; leftTag1.style.opacity = '0'; leftTag1.style.transform = 'translateX(-8px)'; }
        if (leftTag2) { leftTag2.style.clipPath = 'inset(0% 100% 0% 0%)'; leftTag2.style.opacity = '0'; leftTag2.style.transform = 'translateX(-8px)'; }
        if (rightTag1) { rightTag1.style.clipPath = 'inset(0% 0% 0% 100%)'; rightTag1.style.opacity = '0'; rightTag1.style.transform = 'translateX(8px)'; }
        if (rightTag2) { rightTag2.style.clipPath = 'inset(0% 0% 0% 100%)'; rightTag2.style.opacity = '0'; rightTag2.style.transform = 'translateX(8px)'; }
        if (leftSep) leftSep.style.opacity = '0';
        if (rightSep) rightSep.style.opacity = '0';

        [greeting, positioning, ctaCluster, rightMantra].forEach((el) => {
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
            CharacterController.isEntrancePlaying = false;
            CharacterController.requestTick();
          },
        });

        // 1. AAKASH mask-reveal
        entranceTl.fromTo(portfolioWord,
          { opacity: 0, clipPath: 'inset(100% 0% 0% 0%)', letterSpacing: '0.04em' },
          { opacity: 0.92, clipPath: 'inset(0% 0% 0% 0%)', letterSpacing: '-0.04em', duration: 0.70, ease: 'power3.out' },
          0.22
        );

        // 2. AAKASH portrait rises smoothly from below (85vh -> 0%) with authentic physics settling (-4px -> 0px)
        entranceTl.fromTo(characterPortrait,
          { y: '85vh', opacity: 0, scale: 0.97 },
          { y: '0%', opacity: 1, scale: 1, duration: 1.15, ease: 'power3.out' },
          0.55
        );
        entranceTl.to(characterPortrait, { y: '-4px', duration: 0.14, ease: 'power1.out' }, 1.70);
        entranceTl.to(characterPortrait, { y: '0px', duration: 0.18, ease: 'power2.inOut' }, 1.84);

        // 3. Backlight blooms behind Aakash
        entranceTl.fromTo(radialLight,
          { opacity: 0.12 },
          { opacity: 0.88, duration: 0.45, ease: 'power2.out' },
          1.35
        );
        entranceTl.to(radialLight, { opacity: 0.65, duration: 0.45, ease: 'power2.inOut' }, 1.80);

        // 4. Side Details Assemble
        if (leftLine) entranceTl.to(leftLine, { scaleX: 1, duration: 0.22, ease: 'power2.out' }, 1.38);
        if (leftTag1) entranceTl.to(leftTag1, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, x: 0, duration: 0.26, ease: 'power2.out' }, 1.44);
        if (leftSep) entranceTl.to(leftSep, { opacity: 1, duration: 0.15 }, 1.48);
        if (leftTag2) entranceTl.to(leftTag2, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, x: 0, duration: 0.26, ease: 'power2.out' }, 1.50);

        if (rightLine) entranceTl.to(rightLine, { scaleX: 1, duration: 0.22, ease: 'power2.out' }, 1.40);
        if (rightTag1) entranceTl.to(rightTag1, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, x: 0, duration: 0.26, ease: 'power2.out' }, 1.46);
        if (rightSep) entranceTl.to(rightSep, { opacity: 1, duration: 0.15 }, 1.50);
        if (rightTag2) entranceTl.to(rightTag2, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, x: 0, duration: 0.26, ease: 'power2.out' }, 1.52);

        // 5. Copy & CTAs
        if (greeting) entranceTl.to(greeting, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 1.58);
        if (positioning) entranceTl.to(positioning, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 1.66);
        if (rightMantra) entranceTl.to(rightMantra, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 1.72);

        anchorItems.forEach((anchor, idx) => {
          const baseTime = 1.78 + idx * 0.10;
          const num = anchor.querySelector('.anchor-index') as HTMLElement | null;
          const line = anchor.querySelector('.anchor-line') as HTMLElement | null;
          const title = anchor.querySelector('.anchor-title') as HTMLElement | null;
          const sub = anchor.querySelector('.anchor-sub') as HTMLElement | null;

          if (num) entranceTl.to(num, { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out' }, baseTime);
          if (line) entranceTl.to(line, { scaleX: idx === 0 ? 1 : 0.35, duration: 0.22, ease: 'power2.out' }, baseTime + 0.04);
          if (title) entranceTl.to(title, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, y: 0, duration: 0.24, ease: 'power2.out' }, baseTime + 0.08);
          if (sub) entranceTl.to(sub, { opacity: 1, y: 0, duration: 0.20, ease: 'power2.out' }, baseTime + 0.12);
        });

        if (ctaCluster) entranceTl.to(ctaCluster, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 1.84);

        // Safety skip on user scroll or key interaction
        let hasSkipped = false;
        const checkScrollSkip = () => {
          if (window.scrollY > 40 && !hasSkipped) {
            triggerSkip();
          }
        };
        const triggerSkip = () => {
          if (hasSkipped) return;
          hasSkipped = true;
          window.removeEventListener('scroll', checkScrollSkip);
          window.removeEventListener('keydown', triggerSkip);
          window.removeEventListener('touchstart', checkScrollSkip);
          entranceTl.kill();
          settleHeroImmediately();
        };
        window.addEventListener('scroll', checkScrollSkip, { passive: true });
        window.addEventListener('keydown', triggerSkip, { once: true });
        window.addEventListener('touchstart', checkScrollSkip, { passive: true, once: true });
      }

      // ======================================================================
      // Restrained, Non-Destructive Hero Exit Timeline
      // ======================================================================
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
        .to(leftFlank, { opacity: 0.35, y: -20, ease: 'none' }, 0)
        .to(rightFlank, { opacity: 0.35, y: -20, ease: 'none' }, 0)
        .to(portfolioWord, { opacity: 0.25, y: -25, ease: 'none' }, 0)
        .to(characterPortrait, { opacity: 0.75, scale: 0.98, y: -15, ease: 'none' }, 0);
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
          item.addEventListener('mouseenter', () => {
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
          });

          item.addEventListener('mouseleave', () => {
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
          });
        });

        window.addEventListener('mousemove', (e) => {
          if (window.innerWidth <= 960 || !previewStage.classList.contains('active')) return;
          const normX = (e.clientX / window.innerWidth) * 2 - 1;
          const normY = (e.clientY / window.innerHeight) * 2 - 1;
          previewStage.style.transform = `translate(${(normX * 6).toFixed(1)}px, ${(normY * 4).toFixed(1)}px) scale(1) rotate(0deg)`;
        }, { passive: true });
      }

      // Global top scroll return safety: ensures portrait and hero state restore smoothly when returning to top
      const handleScrollReturn = () => {
        if (window.scrollY <= 40) {
          const portraitOp = characterPortrait ? Number(gsap.getProperty(characterPortrait, 'opacity')) : 1;
          if (portraitOp < 0.95) {
            restoreHeroState(true);
          }
        }
      };
      window.addEventListener('scroll', handleScrollReturn, { passive: true });
    }, containerRef);

    return () => {
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

        {/* LAYER 4, 5 & 6: Poster Grid Composition (Left Flank, Centered Aakash, Right Flank) */}
        <div className="hero-poster-grid">
          <HeroLeftFlank />
          <HeroPortrait />
          <HeroRightFlank />
        </div>

        {/* Hover preview */}
        <HeroProjectPreview />
      </section>
    </div>
  );
}
