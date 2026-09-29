'use client';

import React, { useEffect, useRef } from 'react';
import { initGSAP, gsap, ScrollTrigger } from '../../lib/gsap';
import HeroLighting from './HeroLighting';
import HeroPortrait from './HeroPortrait';
import HeroProjectPreview from './HeroProjectPreview';
import { HeroLeftFlank, HeroRightFlank } from './HeroFlanks';
import IdentityExperience from '../identity/IdentityExperience';
import { buildIdentityTimeline, attachIdentityParallax } from '../identity/identityTimeline';
import WorkTransition from '../work/WorkTransition';
import { buildWorkTransitionTimeline } from '../work/workTransitionTimeline';

export default function HeroExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopTlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    initGSAP();

    const ctx = gsap.context(() => {
      const wrapper = document.getElementById('hero-experience');
      const leftFlank = document.getElementById('hero-left-flank');
      const rightFlank = document.getElementById('hero-right-flank');
      const wordmark =
        document.getElementById('hero-bg-wordmark') ||
        document.getElementById('hero-portfolio-wordmark') ||
        (document.querySelector('.hero-poster-wordmark') as HTMLElement | null);
      const radialLight = document.getElementById('hero-radial-light');
      const characterScene = document.getElementById('character-scene');
      const characterStage = document.getElementById('character-stage');
      const characterPortrait = document.getElementById('character-portrait');
      const aakashShadow = document.getElementById('aakash-contact-shadow');

      // Identity Experience Elements
      const stmtBackdrop = document.getElementById('hero-statement-backdrop');
      const stmtLine1 = document.getElementById('stmt-line-1');
      const stmtLine2 = document.getElementById('stmt-line-2');
      const stmtLine3 = document.getElementById('stmt-line-3');
      const envSymbolsWrap = document.getElementById('role-env-symbols');
      const envSymMarketer = document.getElementById('env-sym-marketer');
      const envSymBrand = document.getElementById('env-sym-brand');
      const envSymCreator = document.getElementById('env-sym-creator');
      const envSymSpeaker = document.getElementById('env-sym-speaker');
      const roleStage = document.getElementById('active-role-stage');
      const roleSpotlight = document.getElementById('active-role-spotlight');
      const frame1 = document.getElementById('role-frame-1');
      const frame2 = document.getElementById('role-frame-2');
      const frame3 = document.getElementById('role-frame-3');
      const frame4 = document.getElementById('role-frame-4');
      const historyRow = document.getElementById('identity-history-row');
      const historySlots = [
        document.getElementById('history-slot-1'),
        document.getElementById('history-slot-2'),
        document.getElementById('history-slot-3'),
        document.getElementById('history-slot-4'),
      ];
      const historyCollectiveLine = document.getElementById('history-collective-line');

      // Work Transition Elements
      const workTransition = document.getElementById('work-transition-phase');
      const projectApproach = document.getElementById('hero-project-approach');

      // Flank elements for entrance & restoration
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
      const isHashHero =
        typeof window !== 'undefined' &&
        (window.location.hash === '#hero' || window.location.hash === '#hero-experience');

      // ======================================================================
      // 1. One Canonical Hero Rest State Function
      // ======================================================================
      let isFirstLoadRunning = false;
      let entranceTl: gsap.core.Timeline | null = null;

      const restoreHeroState = (immediate = true) => {
        // If an explicit restoration is called, kill any lingering entrance timeline
        if (entranceTl && entranceTl.isActive()) {
          entranceTl.kill();
        }
        isFirstLoadRunning = false;

        // Kill any lagging scrub tween from ScrollTrigger so it cannot overwrite our values
        if (desktopTlRef.current) {
          const st = desktopTlRef.current.scrollTrigger as any;
          if (st) {
            const scrub = st.getTween?.();
            if (scrub) {
              scrub.pause();
              scrub.kill();
            }
          }
          desktopTlRef.current.progress(0, true);
        }

        // Kill any conflicting tweens specifically on Hero elements
        gsap.killTweensOf([
          characterPortrait,
          characterScene,
          wordmark,
          radialLight,
          leftFlank,
          rightFlank,
        ]);

        // Ensure any stored role cards from identity scroll section are unstored
        [frame1, frame2, frame3, frame4].forEach((f) => {
          f?.classList.remove('is-stored');
        });

        const approvedWordmarkOpacity = window.innerWidth <= 960 ? 0.15 : 0.92;

        if (immediate) {
          // Aakash Portrait: opacity 1, visible, display block, scale 1, pos 0
          if (characterPortrait) {
            gsap.set(characterPortrait, {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotation: 0,
              clearProps: 'clipPath',
            });
            characterPortrait.style.visibility = 'visible';
            characterPortrait.style.display = 'block';
          }

          // Character Scene & Stage
          if (characterScene) {
            gsap.set(characterScene, {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            });
            characterScene.style.visibility = 'visible';
            characterScene.style.display = 'flex';
          }
          if (characterStage) {
            characterStage.style.transform = 'none';
          }

          // Contact Shadow
          if (aakashShadow) {
            gsap.set(aakashShadow, { opacity: 1 });
            aakashShadow.style.visibility = 'visible';
          }

          // Background Wordmark (AAKASH)
          if (wordmark) {
            gsap.set(wordmark, {
              opacity: approvedWordmarkOpacity,
              scale: 1,
              x: 0,
              y: 0,
              letterSpacing: window.innerWidth <= 960 ? '-0.03em' : '-0.04em',
              clearProps: 'clipPath',
            });
            wordmark.style.visibility = 'visible';
            wordmark.style.display = 'block';
          }

          // Radial Lighting
          if (radialLight) {
            gsap.set(radialLight, {
              opacity: 0.65,
              x: 0,
              y: 0,
              scale: 1,
            });
            radialLight.style.visibility = 'visible';
          }

          // Left & Right Flanks
          if (leftFlank) {
            gsap.set(leftFlank, { opacity: 1, x: 0 });
            leftFlank.style.visibility = 'visible';
          }
          if (rightFlank) {
            gsap.set(rightFlank, { opacity: 1, x: 0 });
            rightFlank.style.visibility = 'visible';
          }

          // Flank Children & Details
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
        } else {
          // Smooth return transition (500–700ms equivalent motion with premium easing)
          if (characterPortrait) {
            characterPortrait.style.visibility = 'visible';
            characterPortrait.style.display = 'block';
          }
          if (characterScene) {
            characterScene.style.visibility = 'visible';
            characterScene.style.display = 'flex';
          }
          if (wordmark) {
            wordmark.style.visibility = 'visible';
            wordmark.style.display = 'block';
          }
          if (radialLight) radialLight.style.visibility = 'visible';
          if (leftFlank) leftFlank.style.visibility = 'visible';
          if (rightFlank) rightFlank.style.visibility = 'visible';

          gsap.to(characterPortrait, {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: 'power2.out',
          });

          gsap.to(characterScene, {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
          });

          if (characterStage) characterStage.style.transform = 'none';

          gsap.to(wordmark, {
            opacity: approvedWordmarkOpacity,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
          });

          gsap.to(radialLight, {
            opacity: 0.65,
            x: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
          });

          gsap.to([leftFlank, rightFlank], {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: 'power2.out',
          });

          // Ensure flank details are visible
          if (leftLine) leftLine.style.transform = 'scaleX(1)';
          if (rightLine) rightLine.style.transform = 'scaleX(1)';
          [leftTag1, leftTag2, rightTag1, rightTag2, leftSep, rightSep, greeting, positioning, ctaCluster, rightMantra].forEach((el) => {
            if (el) {
              el.style.opacity = '1';
              el.style.transform = 'none';
            }
          });
        }

        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.update();
        }
      };

      // Expose canonical restoration function for navbar-brand click and route return
      (window as any).__restoreHeroState = (immediate = false) => {
        restoreHeroState(immediate);
      };

      const onHeroRestoreEvent = (e: Event) => {
        const detail = (e as CustomEvent).detail;
        restoreHeroState(detail?.immediate ?? false);
      };
      window.addEventListener('hero:restore', onHeroRestoreEvent);

      // ======================================================================
      // 2. First-Load Hero Entrance (GPU-friendly, transforms + opacity)
      // ======================================================================
      if (prefersReducedMotion || window.scrollY > 40 || isHashHero) {
        isFirstLoadRunning = false;
        restoreHeroState(true);
      } else {
        isFirstLoadRunning = true;

        if (radialLight) radialLight.style.opacity = '0.08';
        if (wordmark) {
          wordmark.style.opacity = '0';
          wordmark.style.letterSpacing = '0.04em';
          wordmark.style.clipPath = 'inset(100% 0% 0% 0%)';
        }
        if (characterPortrait) {
          characterPortrait.style.opacity = '0';
          characterPortrait.style.transform = 'translate3d(0, 85vh, 0) scale(0.97)';
        }

        if (leftLine) leftLine.style.transform = 'scaleX(0)';
        if (rightLine) rightLine.style.transform = 'scaleX(0)';
        if (leftTag1) { leftTag1.style.clipPath = 'inset(0% 100% 0% 0%)'; leftTag1.style.opacity = '0'; }
        if (leftTag2) { leftTag2.style.clipPath = 'inset(0% 100% 0% 0%)'; leftTag2.style.opacity = '0'; }
        if (rightTag1) { rightTag1.style.clipPath = 'inset(0% 0% 0% 100%)'; rightTag1.style.opacity = '0'; }
        if (rightTag2) { rightTag2.style.clipPath = 'inset(0% 0% 0% 100%)'; rightTag2.style.opacity = '0'; }
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

        entranceTl = gsap.timeline({
          onComplete: () => {
            isFirstLoadRunning = false;
            restoreHeroState(true);
          },
        });

        // 1. Background AAKASH wordmark mask-reveal
        if (wordmark) {
          entranceTl.fromTo(
            wordmark,
            { opacity: 0, clipPath: 'inset(100% 0% 0% 0%)', letterSpacing: '0.04em' },
            { opacity: 0.92, clipPath: 'inset(0% 0% 0% 0%)', letterSpacing: '-0.04em', duration: 0.7, ease: 'power3.out' },
            0.2
          );
        }

        // 2. AAKASH portrait rises smoothly from below (85vh -> 0)
        if (characterPortrait) {
          entranceTl.fromTo(
            characterPortrait,
            { y: '85vh', opacity: 0, scale: 0.97 },
            { y: '0%', opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out' },
            0.5
          );
          entranceTl.to(characterPortrait, { y: '-4px', duration: 0.14, ease: 'power1.out' }, 1.6);
          entranceTl.to(characterPortrait, { y: '0px', duration: 0.18, ease: 'power2.inOut' }, 1.74);
        }

        // 3. Backlight blooms behind Aakash
        if (radialLight) {
          entranceTl.fromTo(
            radialLight,
            { opacity: 0.12 },
            { opacity: 0.88, duration: 0.45, ease: 'power2.out' },
            1.3
          );
          entranceTl.to(radialLight, { opacity: 0.65, duration: 0.45, ease: 'power2.inOut' }, 1.75);
        }

        // 4. Side Details Assemble
        if (leftLine) entranceTl.to(leftLine, { scaleX: 1, duration: 0.22, ease: 'power2.out' }, 1.35);
        if (leftTag1) entranceTl.to(leftTag1, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 0.26, ease: 'power2.out' }, 1.4);
        if (leftSep) entranceTl.to(leftSep, { opacity: 1, duration: 0.15 }, 1.45);
        if (leftTag2) entranceTl.to(leftTag2, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 0.26, ease: 'power2.out' }, 1.48);

        if (rightLine) entranceTl.to(rightLine, { scaleX: 1, duration: 0.22, ease: 'power2.out' }, 1.36);
        if (rightTag1) entranceTl.to(rightTag1, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 0.26, ease: 'power2.out' }, 1.42);
        if (rightSep) entranceTl.to(rightSep, { opacity: 1, duration: 0.15 }, 1.46);
        if (rightTag2) entranceTl.to(rightTag2, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 0.26, ease: 'power2.out' }, 1.5);

        // 5. Copy & CTAs
        if (greeting) entranceTl.to(greeting, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 1.55);
        if (positioning) entranceTl.to(positioning, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 1.62);
        if (rightMantra) entranceTl.to(rightMantra, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 1.68);

        anchorItems.forEach((anchor, idx) => {
          const baseTime = 1.74 + idx * 0.08;
          const num = anchor.querySelector('.anchor-index') as HTMLElement | null;
          const line = anchor.querySelector('.anchor-line') as HTMLElement | null;
          const title = anchor.querySelector('.anchor-title') as HTMLElement | null;
          const sub = anchor.querySelector('.anchor-sub') as HTMLElement | null;

          if (num) entranceTl?.to(num, { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out' }, baseTime);
          if (line) entranceTl?.to(line, { scaleX: idx === 0 ? 1 : 0.35, duration: 0.22, ease: 'power2.out' }, baseTime + 0.03);
          if (title) entranceTl?.to(title, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, y: 0, duration: 0.22, ease: 'power2.out' }, baseTime + 0.06);
          if (sub) entranceTl?.to(sub, { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out' }, baseTime + 0.09);
        });

        if (ctaCluster) entranceTl.to(ctaCluster, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 1.8);

        // Instant settle if user scrolls before entrance finishes
        const skipEntranceOnScroll = () => {
          if (window.scrollY > 30) {
            window.removeEventListener('scroll', skipEntranceOnScroll);
            entranceTl?.kill();
            isFirstLoadRunning = false;
            restoreHeroState(true);
          }
        };
        window.addEventListener('scroll', skipEntranceOnScroll, { passive: true });
      }

      // Safe scroll listener for continuous return-to-hero detection
      let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
      const onWindowScroll = () => {
        const curY = window.scrollY;
        const scrollingUp = curY < lastScrollY;
        lastScrollY = curY;

        if (!isFirstLoadRunning && (curY === 0 || (scrollingUp && curY <= 25))) {
          restoreHeroState(true);
        }
      };
      window.addEventListener('scroll', onWindowScroll, { passive: true });

      // ======================================================================
      // 3. Desktop Master ScrollTrigger Timeline
      // ======================================================================
      const mm = gsap.matchMedia();

      mm.add('(min-width: 961px) and (prefers-reduced-motion: no-preference)', () => {
        if (!wrapper || !characterScene) return;

        const getAnchorRightX = () => Math.min(Math.max(window.innerWidth * 0.22, 220), 380);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: 'top top',
            end: '+=5200',
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            onEnterBack: () => {
              if (characterScene) {
                characterScene.style.visibility = 'visible';
                characterScene.style.display = 'flex';
              }
              if (characterPortrait) {
                characterPortrait.style.visibility = 'visible';
                characterPortrait.style.display = 'block';
              }
              if (wordmark) {
                wordmark.style.visibility = 'visible';
                wordmark.style.display = 'block';
              }
            },
            onLeaveBack: () => {
              restoreHeroState(true);
            },
            onUpdate: (self) => {
              if (self.scroll() === 0 || (self.direction === -1 && self.scroll() <= 25)) {
                restoreHeroState(true);
              }
            },
          },
        });

        desktopTlRef.current = tl;

        // Step 1: Flanks Slide Out, Portrait Anchors to Right
        tl.to(leftFlank, { x: -60, opacity: 0, duration: 1.0, ease: 'power2.inOut' }, 0);
        tl.to(rightFlank, { x: 60, opacity: 0, duration: 1.0, ease: 'power2.inOut' }, 0);
        if (wordmark) {
          tl.to(wordmark, { scale: 0.94, opacity: 0, duration: 0.9, ease: 'power2.inOut' }, 0.05);
        }

        tl.to(characterScene, {
          x: () => getAnchorRightX(),
          scale: 0.98,
          duration: 1.1,
          ease: 'power2.inOut',
        }, 0.15);

        if (characterPortrait) {
          tl.to(characterPortrait, { scale: 0.98, opacity: 0.96, duration: 1.1, ease: 'power2.inOut' }, 0.15);
        }
        if (radialLight) {
          tl.to(radialLight, { x: () => getAnchorRightX() * 0.75, duration: 1.1, ease: 'power2.inOut' }, 0.15);
        }
        if (aakashShadow) {
          tl.to(aakashShadow, { opacity: 1, duration: 0.9, ease: 'power2.out' }, 0.2);
        }

        // Steps 2–7 & Identity Exit
        buildIdentityTimeline(tl, {
          stmtBackdrop,
          stmtLine1,
          stmtLine2,
          stmtLine3,
          envSymMarketer,
          envSymBrand,
          envSymCreator,
          envSymSpeaker,
          roleStage,
          roleSpotlight,
          frame1,
          frame2,
          frame3,
          frame4,
          historySlots,
          historyCollectiveLine,
          historyRow,
          envSymbolsWrap,
          wrapper,
          characterScene,
          getAnchorRightX,
        });

        // Step 8: Work Transition Phase
        buildWorkTransitionTimeline(tl, {
          characterScene,
          characterPortrait,
          radialLight,
          workTransition,
          projectApproach,
          getAnchorRightX,
        });

        // ====================================================================
        // Subtle Desktop Pointer Tilt (Only in Hero Zone, Non-conflicting)
        // ====================================================================
        let targetNormX = 0;
        let targetNormY = 0;
        let curNormX = 0;
        let curNormY = 0;
        let isPointerRunning = false;
        let pointerRafId = 0;

        const updatePointerMotion = () => {
          curNormX += (targetNormX - curNormX) * 0.07;
          curNormY += (targetNormY - curNormY) * 0.07;

          // Apply subtle ambient parallax only when scrolled within the hero zone (< 100px)
          if (window.scrollY < 100) {
            if (characterStage) {
              characterStage.style.transform = `translate3d(${(curNormX * 4).toFixed(1)}px, ${(curNormY * 3).toFixed(1)}px, 0)`;
            }
            if (radialLight) {
              radialLight.style.transform = `translate3d(calc(-50% + ${(curNormX * 8).toFixed(1)}px), calc(-50% + ${(curNormY * 5).toFixed(1)}px), 0)`;
            }
          }

          // Identity active frame tilt
          attachIdentityParallax(
            curNormX,
            curNormY,
            [frame1, frame2, frame3, frame4],
            [envSymMarketer, envSymBrand, envSymCreator, envSymSpeaker],
            roleSpotlight
          );

          const diff = Math.abs(targetNormX - curNormX) + Math.abs(targetNormY - curNormY);
          if (diff > 0.005) {
            pointerRafId = requestAnimationFrame(updatePointerMotion);
          } else {
            isPointerRunning = false;
          }
        };

        const onMouseMove = (e: MouseEvent) => {
          if (window.scrollY > 2000) return; // Skip calculation when far down
          targetNormX = (e.clientX / window.innerWidth - 0.5) * 2;
          targetNormY = (e.clientY / window.innerHeight - 0.5) * 2;

          if (!isPointerRunning) {
            isPointerRunning = true;
            pointerRafId = requestAnimationFrame(updatePointerMotion);
          }
        };

        const onMouseLeave = () => {
          targetNormX = 0;
          targetNormY = 0;
          if (!isPointerRunning) {
            isPointerRunning = true;
            pointerRafId = requestAnimationFrame(updatePointerMotion);
          }
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('mouseleave', onMouseLeave, { passive: true });

        return () => {
          window.removeEventListener('mousemove', onMouseMove);
          window.removeEventListener('mouseleave', onMouseLeave);
          if (pointerRafId) cancelAnimationFrame(pointerRafId);
        };
      });

      // ======================================================================
      // 4. Mobile Reveals (Lightweight, No-scrub for Instant Touch Response)
      // ======================================================================
      mm.add('(max-width: 960px)', () => {
        const stmtLines = document.querySelectorAll('.stmt-line');
        if (stmtLines.length) {
          gsap.fromTo(
            stmtLines,
            { opacity: 0.35, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.12,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: '#hero-statement-backdrop',
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        const roleFrames = document.querySelectorAll('.editorial-role-frame');
        roleFrames.forEach((frame) => {
          gsap.fromTo(
            frame,
            { opacity: 0.3, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: frame,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });

        if (workTransition) {
          gsap.fromTo(
            workTransition,
            { opacity: 0.3, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: workTransition,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });

      // ======================================================================
      // 5. Anchor Hover Preview Controller
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
              }, 100);
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
          });
        });
      }
    }, containerRef);

    return () => {
      delete (window as any).__restoreHeroState;
      ctx.revert();
    };
  }, []);

  return (
    <div className="hero-signature-wrapper" id="hero-experience" ref={containerRef}>
      <section className="home-hero-section poster-hero-stage" id="hero">
        {/* LAYER 1 & 2: Atmospheric Studio Background & Cinematic Lighting */}
        <HeroLighting />

        {/* LAYER 3: Enormous Background Typography AAKASH (Behind Aakash) */}
        <div
          className="hero-poster-wordmark"
          id="hero-bg-wordmark"
          aria-hidden="true"
        >
          AAKASH
        </div>

        {/* LAYER 3b, 3c: Statement Backdrop, Environmental SVG Symbols, Completed History Row, Active Role Stage */}
        <IdentityExperience />

        {/* LAYER 4, 5 & 6: Poster Grid Composition (Left Flank, Centered Aakash, Right Flank) */}
        <div className="hero-poster-grid">
          <HeroLeftFlank />
          <HeroPortrait />
          <HeroRightFlank />
        </div>

        {/* Hover preview */}
        <HeroProjectPreview />

        {/* Transition Phase into Digi Marketrix */}
        <WorkTransition />
      </section>
    </div>
  );
}
