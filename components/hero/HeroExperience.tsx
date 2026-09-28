'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroLighting from './HeroLighting';
import HeroPortrait from './HeroPortrait';
import HeroProjectPreview from './HeroProjectPreview';
import RoleSequence from '../identity/RoleSequence';

export default function HeroExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasRunEntrance = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const wrapper = document.getElementById('hero-experience');
      const leftFlank = document.getElementById('hero-left-flank');
      const rightFlank = document.getElementById('hero-right-flank');
      const portfolioWord = document.getElementById('hero-portfolio-wordmark');
      const radialLight = document.getElementById('hero-radial-light');
      const characterScene = document.getElementById('character-scene');
      const characterPortrait = document.getElementById('character-portrait');
      const aakashShadow = document.getElementById('aakash-contact-shadow');

      // Backdrop Statement
      const stmtBackdrop = document.getElementById('hero-statement-backdrop');
      const stmtLine1 = document.getElementById('stmt-line-1');
      const stmtLine2 = document.getElementById('stmt-line-2');
      const stmtLine3 = document.getElementById('stmt-line-3');

      // Environmental Glowing Symbols
      const envSymbolsWrap = document.getElementById('role-env-symbols');
      const envSymMarketer = document.getElementById('env-sym-marketer');
      const envSymBrand = document.getElementById('env-sym-brand');
      const envSymCreator = document.getElementById('env-sym-creator');
      const envSymSpeaker = document.getElementById('env-sym-speaker');

      // Active Role Frames & Warm Spotlight
      const roleStage = document.getElementById('active-role-stage');
      const roleSpotlight = document.getElementById('active-role-spotlight');
      const frame1 = document.getElementById('role-frame-1');
      const frame2 = document.getElementById('role-frame-2');
      const frame3 = document.getElementById('role-frame-3');
      const frame4 = document.getElementById('role-frame-4');

      // Top Identity History System
      const historyRow = document.getElementById('identity-history-row');
      const historySlots = [
        document.getElementById('history-slot-1'),
        document.getElementById('history-slot-2'),
        document.getElementById('history-slot-3'),
        document.getElementById('history-slot-4'),
      ];
      const historyCollectiveLine = document.getElementById('history-collective-line');

      // Digi Marketrix Transition Phase
      const workTransition = document.getElementById('work-transition-phase');
      const projectApproach = document.getElementById('hero-project-approach');

      // ----------------------------------------------------------------------
      // ENTRANCE SEQUENCE (Single run protection)
      // ----------------------------------------------------------------------
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

      const settleHeroImmediately = () => {
        if (portfolioWord) {
          portfolioWord.style.opacity = '0.9';
          portfolioWord.style.clipPath = 'none';
          portfolioWord.style.letterSpacing = '-0.055em';
          portfolioWord.style.transform = 'translate(-50%, -50%)';
        }
        if (characterPortrait) {
          characterPortrait.style.opacity = '1';
          characterPortrait.style.transform = 'none';
        }
        if (radialLight) {
          radialLight.style.opacity = '0.6';
          radialLight.style.transform = 'translate3d(-50%, -50%, 0)';
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
          if (line) line.style.transform = idx === 0 ? 'scaleX(1)' : 'scaleX(0)';
          if (title) { title.style.clipPath = 'none'; title.style.opacity = '1'; title.style.transform = 'none'; }
          if (sub) { sub.style.opacity = '1'; sub.style.transform = 'none'; }
        });
      };

      if (prefersReducedMotion || window.scrollY > 40 || hasRunEntrance.current) {
        settleHeroImmediately();
      } else {
        hasRunEntrance.current = true;

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
        if (greeting) { greeting.style.opacity = '0'; greeting.style.transform = 'translateY(16px)'; }
        if (positioning) { positioning.style.opacity = '0'; positioning.style.transform = 'translateY(16px)'; }
        if (ctaCluster) { ctaCluster.style.opacity = '0'; ctaCluster.style.transform = 'translateY(14px)'; }
        if (rightMantra) { rightMantra.style.opacity = '0'; rightMantra.style.transform = 'translateY(14px)'; }

        anchorItems.forEach((anchor) => {
          const num = anchor.querySelector('.anchor-index') as HTMLElement | null;
          const line = anchor.querySelector('.anchor-line') as HTMLElement | null;
          const title = anchor.querySelector('.anchor-title') as HTMLElement | null;
          const sub = anchor.querySelector('.anchor-sub') as HTMLElement | null;
          if (num) { num.style.opacity = '0'; num.style.transform = 'translateY(8px)'; }
          if (line) line.style.transform = 'scaleX(0)';
          if (title) { title.style.clipPath = 'inset(0% 100% 0% 0%)'; title.style.opacity = '0'; title.style.transform = 'translateX(-10px)'; }
          if (sub) { sub.style.opacity = '0'; sub.style.transform = 'translateY(8px)'; }
        });

        const entranceTl = gsap.timeline({
          onComplete: () => {
            settleHeroImmediately();
          },
        });

        if (radialLight) {
          entranceTl.to(radialLight, {
            opacity: 0.6,
            duration: 1.2,
            ease: 'power2.out',
          }, 0.2);
        }

        if (portfolioWord) {
          entranceTl.to(portfolioWord, {
            opacity: 0.9,
            clipPath: 'inset(0% 0% 0% 0%)',
            letterSpacing: '-0.055em',
            duration: 1.1,
            ease: 'power3.out',
          }, 0.4);
        }

        if (characterPortrait) {
          entranceTl.to(characterPortrait, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.35,
            ease: 'power3.out',
          }, 0.65);
        }

        if (leftLine) {
          entranceTl.to(leftLine, { scaleX: 1, duration: 0.55, ease: 'power2.out' }, 1.15);
        }
        if (leftTag1) {
          entranceTl.to(leftTag1, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }, 1.25);
        }
        if (leftSep) {
          entranceTl.to(leftSep, { opacity: 0.5, duration: 0.35, ease: 'power1.out' }, 1.35);
        }
        if (leftTag2) {
          entranceTl.to(leftTag2, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }, 1.4);
        }

        if (rightLine) {
          entranceTl.to(rightLine, { scaleX: 1, duration: 0.55, ease: 'power2.out' }, 1.3);
        }
        if (rightTag1) {
          entranceTl.to(rightTag1, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }, 1.4);
        }
        if (rightSep) {
          entranceTl.to(rightSep, { opacity: 0.5, duration: 0.35, ease: 'power1.out' }, 1.48);
        }
        if (rightTag2) {
          entranceTl.to(rightTag2, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }, 1.52);
        }

        if (greeting) {
          entranceTl.to(greeting, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 1.5);
        }
        if (positioning) {
          entranceTl.to(positioning, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 1.62);
        }
        if (ctaCluster) {
          entranceTl.to(ctaCluster, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, 1.74);
        }
        if (rightMantra) {
          entranceTl.to(rightMantra, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, 1.7);
        }
      }

      // ----------------------------------------------------------------------
      // SCROLLTRIGGER STORYTELLING (Desktop)
      // ----------------------------------------------------------------------
      const mm = gsap.matchMedia();

      mm.add('(min-width: 961px) and (prefers-reduced-motion: no-preference)', () => {
        if (!wrapper || !characterScene) return;

        const getAnchorRightX = () => Math.min(Math.max(window.innerWidth * 0.22, 220), 380);

        const getSlotDelta = (index: number) => {
          const stage = roleStage || document.getElementById('active-role-stage');
          const slot = historySlots[index] || document.getElementById(`history-slot-${index + 1}`);
          if (!stage || !slot) return { x: 0, y: 0, scale: 0.38 };

          const stageRect = stage.getBoundingClientRect();
          const slotRect = slot.getBoundingClientRect();
          if (!stageRect.width || !slotRect.width) return { x: 0, y: -200, scale: 0.38 };

          const scale = Math.min(Math.max(slotRect.width / stageRect.width, 0.3), 0.44);
          const x = slotRect.left - stageRect.left;
          const y = slotRect.top - stageRect.top;
          return { x, y, scale };
        };

        const markPath = envSymMarketer ? envSymMarketer.querySelector('.env-path-draw') : null;
        if (markPath) gsap.set(markPath, { strokeDasharray: 480, strokeDashoffset: 480 });

        const brandPaths = envSymBrand ? envSymBrand.querySelectorAll('.env-path-draw') : [];
        if (brandPaths.length) brandPaths.forEach((p) => gsap.set(p, { strokeDasharray: 340, strokeDashoffset: 340 }));

        const creatorBlades = envSymCreator ? envSymCreator.querySelectorAll('g path') : [];
        if (creatorBlades.length) gsap.set(creatorBlades, { transformOrigin: '170px 170px', rotation: 18, scale: 0.88, opacity: 0.4 });

        const speakerBars = envSymSpeaker ? envSymSpeaker.querySelectorAll('line') : [];
        if (speakerBars.length) {
          speakerBars.forEach((bar, idx) => {
            if (idx > 0) gsap.set(bar, { transformOrigin: 'center center', scaleY: 0.1 });
          });
        }

        [frame1, frame2, frame3, frame4].forEach((f) => {
          if (f) {
            gsap.set(f, {
              transformPerspective: 1200,
              transformOrigin: 'center bottom',
              y: 100,
              scale: 0.9,
              rotateX: 9,
              opacity: 0,
            });
          }
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: 'top top',
            end: '+=5200',
            pin: true,
            scrub: 1.5,
            anticipatePin: 1,
          },
        });

        // Step 1: Flanks Slide Out, Portrait Anchors to Right
        tl.to(leftFlank, { x: -60, opacity: 0, duration: 1.0, ease: 'power2.inOut' }, 0);
        tl.to(rightFlank, { x: 60, opacity: 0, duration: 1.0, ease: 'power2.inOut' }, 0);
        tl.to(portfolioWord, { scale: 0.94, opacity: 0, duration: 0.9, ease: 'power2.inOut' }, 0.05);

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

        // Step 2: "I DON'T FIT INTO ONE BOX."
        tl.to(stmtBackdrop, { opacity: 1, duration: 0.1 }, 1.2);
        tl.fromTo(stmtLine1,
          { scale: 0.94, filter: 'blur(7px)', opacity: 0, y: 35 },
          { scale: 1, filter: 'blur(0px)', opacity: 0.55, y: 0, duration: 0.85, ease: 'power2.out' },
          1.3
        );
        tl.to(stmtLine1, { opacity: 0.55, duration: 0.7 }, 2.15);

        tl.fromTo(stmtLine2,
          { scale: 0.95, filter: 'blur(6px)', opacity: 0, y: 30 },
          { scale: 1, filter: 'blur(0px)', opacity: 0.72, y: 0, duration: 0.85, ease: 'power2.out' },
          2.85
        );
        tl.to(stmtLine1, { opacity: 0.42, y: -8, duration: 0.7, ease: 'power2.out' }, 2.85);
        tl.to(stmtLine2, { opacity: 0.72, duration: 0.7 }, 3.7);

        tl.fromTo(stmtLine3,
          { scale: 0.96, filter: 'blur(5px)', opacity: 0, y: 25 },
          { scale: 1, filter: 'blur(0px)', opacity: 0.98, y: 0, duration: 0.85, ease: 'power2.out' },
          4.4
        );
        tl.to([stmtLine1, stmtLine2], { y: -16, duration: 0.7, ease: 'power2.out' }, 4.4);
        tl.to(stmtLine2, { opacity: 0.58, duration: 0.7, ease: 'power2.out' }, 4.4);

        // Hold sentence
        tl.to(stmtBackdrop, { opacity: 1, filter: 'contrast(1.08)', duration: 2.2 }, 5.25);
        tl.to(stmtBackdrop, { scale: 0.92, opacity: 0.12, filter: 'blur(4px) contrast(0.8)', duration: 0.9, ease: 'power2.inOut' }, 7.45);

        // Role 01: MARKETER
        if (envSymMarketer) {
          tl.fromTo(envSymMarketer, { opacity: 0, scale: 0.9, y: 20 }, { opacity: 0.58, scale: 1, y: 0, duration: 0.85, ease: 'power2.out' }, 8.35);
        }
        if (markPath) {
          tl.to(markPath, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.out' }, 8.4);
        }
        if (roleSpotlight) {
          tl.fromTo(roleSpotlight, { opacity: 0, scale: 0.85 }, { opacity: 0.85, scale: 1.0, duration: 0.7, ease: 'power2.out' }, 8.4);
        }
        if (frame1) {
          tl.fromTo(frame1,
            { y: 100, scale: 0.9, rotateX: 9, rotateZ: -2.0, opacity: 0 },
            { y: 0, scale: 1, rotateX: 0, rotateZ: 0, opacity: 1, duration: 0.95, ease: 'power3.out' },
            8.35
          );
        }
        if (characterScene) {
          tl.to(characterScene, { x: () => getAnchorRightX() + 6, duration: 0.8, ease: 'power1.out' }, 8.5);
        }
        tl.to(frame1, { opacity: 1, duration: 1.8 }, 9.3);

        // Store Marketer into Slot 1
        if (frame1) {
          const subWrap = frame1.querySelector('.role-frame-sub-wrap');
          const cat = frame1.querySelector('.role-frame-category');
          const inner = frame1.querySelector('.role-frame-inner');
          if (subWrap) tl.to(subWrap, { height: 0, opacity: 0, duration: 0.75, ease: 'power2.inOut' }, 11.1);
          if (cat) tl.to(cat, { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, 11.1);
          if (inner) tl.to(inner, { padding: '12px 16px', duration: 0.85, ease: 'power2.inOut' }, 11.1);
          tl.to(frame1, {
            transformOrigin: 'top left',
            x: () => getSlotDelta(0).x,
            y: () => getSlotDelta(0).y,
            scale: () => getSlotDelta(0).scale,
            opacity: 0.65,
            rotateX: 0,
            rotateZ: 0,
            duration: 1.1,
            ease: 'power2.inOut',
            onStart: () => frame1.classList.add('is-stored'),
          }, 11.1);
        }
        if (envSymMarketer) tl.to(envSymMarketer, { opacity: 0.05, duration: 0.75, ease: 'power2.out' }, 11.3);
        if (roleSpotlight) tl.to(roleSpotlight, { opacity: 0.25, duration: 0.7 }, 11.3);

        // Role 02: BRAND BUILDER
        if (envSymBrand) {
          tl.fromTo(envSymBrand, { opacity: 0, scale: 0.9, y: 20 }, { opacity: 0.58, scale: 1, y: 0, duration: 0.85, ease: 'power2.out' }, 12.3);
        }
        if (brandPaths.length) {
          tl.to(brandPaths, { strokeDashoffset: 0, duration: 0.9, stagger: 0.08, ease: 'power2.out' }, 12.35);
        }
        if (roleSpotlight) {
          tl.to(roleSpotlight, { opacity: 0.88, scale: 1.05, duration: 0.7 }, 12.35);
        }
        if (frame2) {
          tl.fromTo(frame2,
            { y: 100, scale: 0.9, rotateX: 9, rotateZ: 2.0, opacity: 0 },
            { y: 0, scale: 1, rotateX: 0, rotateZ: 0, opacity: 1, duration: 0.95, ease: 'power3.out' },
            12.3
          );
        }
        if (characterScene) {
          tl.to(characterScene, { x: () => getAnchorRightX() - 4, duration: 0.8, ease: 'power1.out' }, 12.45);
        }
        tl.to(frame2, { opacity: 1, duration: 1.8 }, 13.25);

        // Store Brand Builder into Slot 2
        if (frame2) {
          const subWrap = frame2.querySelector('.role-frame-sub-wrap');
          const cat = frame2.querySelector('.role-frame-category');
          const inner = frame2.querySelector('.role-frame-inner');
          if (subWrap) tl.to(subWrap, { height: 0, opacity: 0, duration: 0.75, ease: 'power2.inOut' }, 15.05);
          if (cat) tl.to(cat, { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, 15.05);
          if (inner) tl.to(inner, { padding: '12px 16px', duration: 0.85, ease: 'power2.inOut' }, 15.05);
          tl.to(frame2, {
            transformOrigin: 'top left',
            x: () => getSlotDelta(1).x,
            y: () => getSlotDelta(1).y,
            scale: () => getSlotDelta(1).scale,
            opacity: 0.65,
            rotateX: 0,
            rotateZ: 0,
            duration: 1.1,
            ease: 'power2.inOut',
            onStart: () => frame2.classList.add('is-stored'),
          }, 15.05);
        }
        if (envSymBrand) tl.to(envSymBrand, { opacity: 0.05, duration: 0.75, ease: 'power2.out' }, 15.25);
        if (roleSpotlight) tl.to(roleSpotlight, { opacity: 0.25, duration: 0.7 }, 15.25);

        // Role 03: CREATOR
        if (envSymCreator) {
          tl.fromTo(envSymCreator, { opacity: 0, scale: 0.9, y: 20 }, { opacity: 0.6, scale: 1, y: 0, duration: 0.85, ease: 'power2.out' }, 16.25);
        }
        if (creatorBlades.length) {
          tl.to(creatorBlades, { rotation: 0, scale: 1, opacity: 0.9, duration: 0.9, stagger: 0.04, ease: 'power2.out' }, 16.3);
        }
        if (roleSpotlight) {
          tl.to(roleSpotlight, { opacity: 0.88, scale: 1.05, duration: 0.7 }, 16.3);
        }
        if (frame3) {
          tl.fromTo(frame3,
            { y: 100, scale: 0.9, rotateX: 9, rotateZ: -1.8, opacity: 0 },
            { y: 0, scale: 1, rotateX: 0, rotateZ: 0, opacity: 1, duration: 0.95, ease: 'power3.out' },
            16.25
          );
        }
        if (characterScene) {
          tl.to(characterScene, { x: () => getAnchorRightX() + 4, duration: 0.8, ease: 'power1.out' }, 16.4);
        }
        tl.to(frame3, { opacity: 1, duration: 1.8 }, 17.2);

        // Store Creator into Slot 3
        if (frame3) {
          const subWrap = frame3.querySelector('.role-frame-sub-wrap');
          const cat = frame3.querySelector('.role-frame-category');
          const inner = frame3.querySelector('.role-frame-inner');
          if (subWrap) tl.to(subWrap, { height: 0, opacity: 0, duration: 0.75, ease: 'power2.inOut' }, 19.0);
          if (cat) tl.to(cat, { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, 19.0);
          if (inner) tl.to(inner, { padding: '12px 16px', duration: 0.85, ease: 'power2.inOut' }, 19.0);
          tl.to(frame3, {
            transformOrigin: 'top left',
            x: () => getSlotDelta(2).x,
            y: () => getSlotDelta(2).y,
            scale: () => getSlotDelta(2).scale,
            opacity: 0.65,
            rotateX: 0,
            rotateZ: 0,
            duration: 1.1,
            ease: 'power2.inOut',
            onStart: () => frame3.classList.add('is-stored'),
          }, 19.0);
        }
        if (envSymCreator) tl.to(envSymCreator, { opacity: 0.05, duration: 0.75, ease: 'power2.out' }, 19.2);
        if (roleSpotlight) tl.to(roleSpotlight, { opacity: 0.25, duration: 0.7 }, 19.2);

        // Role 04: SPEAKER
        if (envSymSpeaker) {
          tl.fromTo(envSymSpeaker, { opacity: 0, scale: 0.9, y: 20 }, { opacity: 0.6, scale: 1, y: 0, duration: 0.85, ease: 'power2.out' }, 20.2);
        }
        if (speakerBars.length) {
          speakerBars.forEach((bar, idx) => {
            if (idx > 0) tl.to(bar, { scaleY: 1, duration: 0.65, ease: 'back.out(1.5)' }, 20.25 + idx * 0.02);
          });
        }
        if (roleSpotlight) {
          tl.to(roleSpotlight, { opacity: 0.88, scale: 1.05, duration: 0.7 }, 20.25);
        }
        if (frame4) {
          tl.fromTo(frame4,
            { y: 100, scale: 0.9, rotateX: 9, rotateZ: 1.8, opacity: 0 },
            { y: 0, scale: 1, rotateX: 0, rotateZ: 0, opacity: 1, duration: 0.95, ease: 'power3.out' },
            20.2
          );
        }
        if (characterScene) {
          tl.to(characterScene, { x: () => getAnchorRightX(), duration: 0.8, ease: 'power1.out' }, 20.35);
        }
        tl.to(frame4, { opacity: 1, duration: 1.8 }, 21.15);

        // Store Speaker into Slot 4
        if (frame4) {
          const subWrap = frame4.querySelector('.role-frame-sub-wrap');
          const cat = frame4.querySelector('.role-frame-category');
          const inner = frame4.querySelector('.role-frame-inner');
          if (subWrap) tl.to(subWrap, { height: 0, opacity: 0, duration: 0.75, ease: 'power2.inOut' }, 22.95);
          if (cat) tl.to(cat, { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, 22.95);
          if (inner) tl.to(inner, { padding: '12px 16px', duration: 0.85, ease: 'power2.inOut' }, 22.95);
          tl.to(frame4, {
            transformOrigin: 'top left',
            x: () => getSlotDelta(3).x,
            y: () => getSlotDelta(3).y,
            scale: () => getSlotDelta(3).scale,
            opacity: 0.65,
            rotateX: 0,
            rotateZ: 0,
            duration: 1.1,
            ease: 'power2.inOut',
            onStart: () => frame4.classList.add('is-stored'),
          }, 22.95);
        }
        if (envSymSpeaker) tl.to(envSymSpeaker, { opacity: 0.05, duration: 0.75, ease: 'power2.out' }, 23.15);
        if (roleSpotlight) tl.to(roleSpotlight, { opacity: 0, duration: 0.7 }, 23.15);

        // Step 7: Completed History Row & Collective Line
        const storedFrames = [frame1, frame2, frame3, frame4].filter(Boolean);
        if (storedFrames.length) {
          tl.to(storedFrames, { opacity: 0.95, duration: 0.65, ease: 'power2.out' }, 24.15);
        }
        if (historyCollectiveLine) {
          tl.fromTo(historyCollectiveLine, { scaleX: 0 }, { scaleX: 1, duration: 0.85, ease: 'power2.out' }, 24.25);
        }
        tl.to(wrapper, { duration: 1.6 }, 24.8);

        // Step 8: Transition into Digi Marketrix
        if (historyRow) tl.to(historyRow, { y: -25, opacity: 0, duration: 0.85, ease: 'power2.in' }, 26.4);
        if (storedFrames.length) tl.to(storedFrames, { y: '-=25', opacity: 0, duration: 0.85, ease: 'power2.in' }, 26.4);
        if (stmtBackdrop) tl.to(stmtBackdrop, { opacity: 0, duration: 0.85, ease: 'power2.in' }, 26.4);
        if (envSymbolsWrap) tl.to(envSymbolsWrap, { opacity: 0, duration: 0.85, ease: 'power2.in' }, 26.4);

        tl.to(characterScene, {
          x: () => getAnchorRightX() * 1.5,
          scale: 0.94,
          opacity: 0.32,
          duration: 1.1,
          ease: 'power2.inOut',
        }, 26.4);

        if (characterPortrait) tl.to(characterPortrait, { y: -15, duration: 1.1, ease: 'power2.inOut' }, 26.4);
        if (radialLight) tl.to(radialLight, { opacity: 0.22, scale: 0.85, duration: 1.1, ease: 'power2.inOut' }, 26.4);

        tl.to(workTransition, { opacity: 1, duration: 0.1 }, 26.5);
        tl.fromTo('#work-kicker', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, ease: 'power2.out' }, 26.6);
        tl.fromTo('#work-title-digi', { y: '100%', opacity: 0 }, { y: '0%', opacity: 1, duration: 0.85, ease: 'power3.out' }, 26.9);
        tl.fromTo('#work-title-marketrix', { y: '100%', opacity: 0 }, { y: '0%', opacity: 1, duration: 0.85, ease: 'power3.out' }, 27.05);
        tl.fromTo('#work-subtitle', { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, ease: 'power2.out' }, 27.4);

        tl.to(characterScene, { opacity: 0, duration: 0.8, ease: 'power2.in' }, 28.2);
        if (radialLight) tl.to(radialLight, { opacity: 0, duration: 0.8 }, 28.2);
        tl.to(workTransition, { scale: 0.94, y: -18, duration: 0.9, ease: 'power2.out' }, 28.3);

        if (projectApproach) {
          tl.fromTo(projectApproach,
            { opacity: 0, scale: 0.85, y: 35 },
            { opacity: 1, scale: 1.0, y: 0, duration: 1.15, ease: 'power3.out' },
            28.3
          );
        }
        tl.to(workTransition, { opacity: 1, duration: 0.9 }, 29.45);
      });

      // Mobile reveals
      mm.add('(max-width: 960px)', () => {
        const stmtLines = document.querySelectorAll('.stmt-line');
        stmtLines.forEach((line) => {
          gsap.fromTo(line,
            { opacity: 0.35, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: line,
                start: 'top 88%',
                end: 'top 65%',
                scrub: 0.35,
              },
            }
          );
        });

        const roleFrames = document.querySelectorAll('.editorial-role-frame');
        roleFrames.forEach((frame) => {
          gsap.fromTo(frame,
            { opacity: 0.25, y: 25, scale: 0.94 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.75,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: frame,
                start: 'top 88%',
                end: 'top 58%',
                scrub: 0.35,
              },
            }
          );
        });

        if (workTransition) {
          gsap.fromTo(workTransition,
            { opacity: 0.3, y: 25 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: workTransition,
                start: 'top 85%',
                end: 'top 55%',
                scrub: 0.4,
              },
            }
          );
        }
      });

      // ----------------------------------------------------------------------
      // ANCHOR HOVER PREVIEW CONTROLLER
      // ----------------------------------------------------------------------
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
      }
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

        {/* LAYER 3: Enormous Background Typography PORTFOLIO (Behind Aakash) */}
        <div className="hero-poster-wordmark" id="hero-portfolio-wordmark" aria-hidden="true">
          PORTFOLIO
        </div>

        {/* LAYER 3b, 3c, History Row & Active Roles */}
        <RoleSequence />

        {/* LAYER 4, 5 & 6: Poster Grid Composition (Left Flank, Centered Aakash, Right Flank) */}
        <div className="hero-poster-grid">
          {/* LEFT FLANK: Identity fragments, Greeting, Statement, and CTAs */}
          <div className="hero-flank hero-flank-left" id="hero-left-flank">
            <div className="hero-tag-cluster hero-tag-left-cluster" id="hero-left-tags">
              <span className="tag-accent-line tag-accent-line-left" aria-hidden="true"></span>
              <div className="tag-reveal-wrap tag-reveal-left">
                <span className="poster-tag tag-item-1">MARKETER.</span>
                <span className="poster-tag-separator">/</span>
                <span className="poster-tag tag-item-2">BRAND BUILDER.</span>
              </div>
            </div>

            <div className="hero-greeting-block" id="hero-greeting">
              <span className="hero-salutation">Hello, I&apos;m</span>
              <h1 className="hero-poster-name">AAKASH.</h1>
            </div>

            <div className="hero-positioning-block" id="hero-positioning">
              <p className="hero-poster-statement">
                I build brands, digital experiences<br />
                and <span className="hero-serif-accent">ideas that move people.</span>
              </p>
              <p className="hero-poster-subtext">
                Turning ideas into real commercial opportunities through marketing, high-retention media, and scalable web platforms.
              </p>
            </div>

            <div className="hero-cta-cluster" id="hero-cta-cluster">
              <a href="#work" className="btn-editorial">
                <span>Explore My Work →</span>
              </a>
              <a href="#about" className="btn-editorial-outline">
                <span>About Me →</span>
              </a>
            </div>
          </div>

          {/* CENTER SUBJECT: AAKASH */}
          <HeroPortrait />

          {/* RIGHT FLANK */}
          <div className="hero-flank hero-flank-right" id="hero-right-flank">
            <div className="hero-tag-cluster hero-tag-right-cluster" id="hero-right-tags">
              <div className="tag-reveal-wrap tag-reveal-right">
                <span className="poster-tag tag-item-1">CREATOR.</span>
                <span className="poster-tag-separator">/</span>
                <span className="poster-tag tag-item-2">SPEAKER.</span>
              </div>
              <span className="tag-accent-line tag-accent-line-right" aria-hidden="true"></span>
            </div>

            <div className="hero-right-mantra" id="hero-right-mantra">
              <span className="poster-kicker-mono">CORE PHILOSOPHY</span>
              <h3 className="poster-mantra-title">
                TURNING IDEAS<br />
                INTO EXPERIENCES.
              </h3>
            </div>

            <div className="hero-anchors-stream" id="hero-anchors">
              {/* Anchor 01 */}
              <div
                className="hero-anchor-item active"
                data-index="01"
                data-preview="/assets/proofs_optimized/digi_marketrix_office.jpg"
                data-title="DIGI MARKETRIX"
                data-sub="Marketing the Digital Presence"
                data-kicker="SELECTED WORK / 01"
              >
                <div className="anchor-step-row">
                  <span className="anchor-index">01</span>
                  <span className="anchor-line" aria-hidden="true"></span>
                </div>
                <div className="anchor-body">
                  <div className="anchor-title-wrap">
                    <span className="anchor-title">DIGI MARKETRIX</span>
                  </div>
                  <div className="anchor-sub-wrap">
                    <span className="anchor-sub">Marketing the Digital Presence</span>
                  </div>
                </div>
              </div>

              {/* Anchor 02 */}
              <div
                className="hero-anchor-item"
                data-index="02"
                data-preview="/assets/proofs_optimized/purple_collection_bts.jpg"
                data-title="PERSONAL BRANDING STRATEGIST"
                data-sub="Brand Building"
                data-kicker="STRATEGY / 02"
              >
                <div className="anchor-step-row">
                  <span className="anchor-index">02</span>
                  <span className="anchor-line" aria-hidden="true"></span>
                </div>
                <div className="anchor-body">
                  <div className="anchor-title-wrap">
                    <span className="anchor-title">PERSONAL BRANDING STRATEGIST</span>
                  </div>
                  <div className="anchor-sub-wrap">
                    <span className="anchor-sub">Brand Building</span>
                  </div>
                </div>
              </div>

              {/* Anchor 03 */}
              <div
                className="hero-anchor-item"
                data-index="03"
                data-preview="/assets/proofs_optimized/lwa_page.jpg"
                data-title="LIFE WITH AAKASH"
                data-sub="Life & Motivational Content"
                data-kicker="CONTENT & REFLECTION / 03"
              >
                <div className="anchor-step-row">
                  <span className="anchor-index">03</span>
                  <span className="anchor-line" aria-hidden="true"></span>
                </div>
                <div className="anchor-body">
                  <div className="anchor-title-wrap">
                    <span className="anchor-title">LIFE WITH AAKASH</span>
                  </div>
                  <div className="anchor-sub-wrap">
                    <span className="anchor-sub">Life &amp; Motivational Content</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hover preview */}
        <HeroProjectPreview />

        {/* Transition Phase into Digi Marketrix */}
        <div className="work-transition-phase" id="work-transition-phase">
          <div className="work-transition-kicker-mask">
            <span className="work-transition-label" id="work-kicker">SELECTED WORK / 01</span>
          </div>
          <div className="work-title-mask-line">
            <h2 className="work-title-word" id="work-title-digi">DIGI</h2>
          </div>
          <div className="work-title-mask-line">
            <h2 className="work-title-word" id="work-title-marketrix">MARKETRIX</h2>
          </div>
          <div className="work-sub-mask-wrap">
            <p className="work-transition-subtitle" id="work-subtitle">Digital Marketing &nbsp;·&nbsp; Strategy &nbsp;·&nbsp; Brand Growth</p>
          </div>
        </div>

        {/* Approach Canvas */}
        <div className="hero-project-approach-canvas" id="hero-project-approach" aria-hidden="true">
          <div className="project-approach-frame">
            <img
              src="/assets/experience_digi_marketrix.jpg"
              alt="Digi Marketrix Commercial Case Study Production"
              className="project-approach-img"
              id="project-approach-img"
            />
            <div className="project-approach-glow"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
