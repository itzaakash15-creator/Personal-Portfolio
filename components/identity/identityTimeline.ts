import gsap from 'gsap';

export interface IdentityTimelineElements {
  stmtBackdrop: HTMLElement | null;
  stmtLine1: HTMLElement | null;
  stmtLine2: HTMLElement | null;
  stmtLine3: HTMLElement | null;
  envSymMarketer: HTMLElement | null;
  envSymBrand: HTMLElement | null;
  envSymCreator: HTMLElement | null;
  envSymSpeaker: HTMLElement | null;
  roleStage: HTMLElement | null;
  roleSpotlight: HTMLElement | null;
  frame1: HTMLElement | null;
  frame2: HTMLElement | null;
  frame3: HTMLElement | null;
  frame4: HTMLElement | null;
  historySlots: (HTMLElement | null)[];
  historyCollectiveLine: HTMLElement | null;
  historyRow?: HTMLElement | null;
  envSymbolsWrap?: HTMLElement | null;
  wrapper?: HTMLElement | null;
  characterScene: HTMLElement | null;
  getAnchorRightX: () => number;
}

export function buildIdentityTimeline(tl: gsap.core.Timeline, el: IdentityTimelineElements) {
  const getSlotDelta = (index: number) => {
    const stage = el.roleStage || document.getElementById('active-role-stage');
    const slot = el.historySlots[index] || document.getElementById(`history-slot-${index + 1}`);
    if (!stage || !slot) return { x: 0, y: 0, scale: 0.38 };

    const stageRect = stage.getBoundingClientRect();
    const slotRect = slot.getBoundingClientRect();
    if (!stageRect.width || !slotRect.width) return { x: 0, y: -200, scale: 0.38 };

    const scale = Math.min(Math.max(slotRect.width / stageRect.width, 0.3), 0.44);
    const x = slotRect.left - stageRect.left;
    const y = slotRect.top - stageRect.top;
    return { x, y, scale };
  };

  const markPath = el.envSymMarketer ? el.envSymMarketer.querySelector('.env-path-draw') : null;
  if (markPath) gsap.set(markPath, { strokeDasharray: 480, strokeDashoffset: 480 });

  const brandPaths = el.envSymBrand ? el.envSymBrand.querySelectorAll('.env-path-draw') : [];
  if (brandPaths.length) brandPaths.forEach((p) => gsap.set(p, { strokeDasharray: 340, strokeDashoffset: 340 }));

  const creatorBlades = el.envSymCreator ? el.envSymCreator.querySelectorAll('g path') : [];
  if (creatorBlades.length) gsap.set(creatorBlades, { transformOrigin: '170px 170px', rotation: 18, scale: 0.88, opacity: 0.4 });

  const speakerBars = el.envSymSpeaker ? el.envSymSpeaker.querySelectorAll('line') : [];
  if (speakerBars.length) {
    speakerBars.forEach((bar, idx) => {
      if (idx > 0) gsap.set(bar, { transformOrigin: 'center center', scaleY: 0.1 });
    });
  }

  [el.frame1, el.frame2, el.frame3, el.frame4].forEach((f) => {
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

  // Step 2: "I DON'T FIT INTO ONE BOX."
  tl.to(el.stmtBackdrop, { opacity: 1, duration: 0.1 }, 1.2);
  tl.fromTo(el.stmtLine1,
    { scale: 0.94, opacity: 0, y: 35 },
    { scale: 1, opacity: 0.55, y: 0, duration: 0.85, ease: 'power2.out' },
    1.3
  );
  tl.to(el.stmtLine1, { opacity: 0.55, duration: 0.7 }, 2.15);

  tl.fromTo(el.stmtLine2,
    { scale: 0.95, opacity: 0, y: 30 },
    { scale: 1, opacity: 0.72, y: 0, duration: 0.85, ease: 'power2.out' },
    2.85
  );
  tl.to(el.stmtLine1, { opacity: 0.42, y: -8, duration: 0.7, ease: 'power2.out' }, 2.85);
  tl.to(el.stmtLine2, { opacity: 0.72, duration: 0.7 }, 3.7);

  tl.fromTo(el.stmtLine3,
    { scale: 0.96, opacity: 0, y: 25 },
    { scale: 1, opacity: 0.98, y: 0, duration: 0.85, ease: 'power2.out' },
    4.4
  );
  tl.to([el.stmtLine1, el.stmtLine2], { y: -16, duration: 0.7, ease: 'power2.out' }, 4.4);
  tl.to(el.stmtLine2, { opacity: 0.58, duration: 0.7, ease: 'power2.out' }, 4.4);

  // Full sentence reading hold window
  tl.to(el.stmtBackdrop, { opacity: 1, duration: 2.2 }, 5.25);
  tl.to(el.stmtBackdrop, { scale: 0.92, opacity: 0.12, duration: 0.9, ease: 'power2.inOut' }, 7.45);

  // Role 01: MARKETER
  if (el.envSymMarketer) {
    tl.fromTo(el.envSymMarketer, { opacity: 0, scale: 0.9, y: 20 }, { opacity: 0.58, scale: 1, y: 0, duration: 0.85, ease: 'power2.out' }, 8.35);
  }
  if (markPath) {
    tl.to(markPath, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.out' }, 8.4);
  }
  if (el.roleSpotlight) {
    tl.fromTo(el.roleSpotlight, { opacity: 0, scale: 0.85 }, { opacity: 0.85, scale: 1.0, duration: 0.7, ease: 'power2.out' }, 8.4);
  }
  if (el.frame1) {
    tl.fromTo(el.frame1,
      { y: 100, scale: 0.9, rotateX: 9, rotateZ: -2.0, opacity: 0 },
      { y: 0, scale: 1, rotateX: 0, rotateZ: 0, opacity: 1, duration: 0.95, ease: 'power3.out' },
      8.35
    );
  }
  if (el.characterScene) {
    tl.to(el.characterScene, { x: () => el.getAnchorRightX() + 6, duration: 0.8, ease: 'power1.out' }, 8.5);
  }
  tl.to(el.frame1, { opacity: 1, duration: 1.8 }, 9.3);

  // Store Marketer into Slot 1
  if (el.frame1) {
    const subWrap = el.frame1.querySelector('.role-frame-sub-wrap');
    const cat = el.frame1.querySelector('.role-frame-category');
    const inner = el.frame1.querySelector('.role-frame-inner');
    if (subWrap) tl.to(subWrap, { height: 0, opacity: 0, duration: 0.75, ease: 'power2.inOut' }, 11.1);
    if (cat) tl.to(cat, { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, 11.1);
    if (inner) tl.to(inner, { padding: '12px 16px', duration: 0.85, ease: 'power2.inOut' }, 11.1);
    tl.to(el.frame1, {
      transformOrigin: 'top left',
      x: () => getSlotDelta(0).x,
      y: () => getSlotDelta(0).y,
      scale: () => getSlotDelta(0).scale,
      opacity: 0.65,
      rotateX: 0,
      rotateZ: 0,
      duration: 1.1,
      ease: 'power2.inOut',
      onStart: () => el.frame1?.classList.add('is-stored'),
      onReverseComplete: () => el.frame1?.classList.remove('is-stored'),
    }, 11.1);
  }
  if (el.envSymMarketer) tl.to(el.envSymMarketer, { opacity: 0.05, duration: 0.75, ease: 'power2.out' }, 11.3);
  if (el.roleSpotlight) tl.to(el.roleSpotlight, { opacity: 0.25, duration: 0.7 }, 11.3);

  // Role 02: BRAND BUILDER
  if (el.envSymBrand) {
    tl.fromTo(el.envSymBrand, { opacity: 0, scale: 0.9, y: 20 }, { opacity: 0.58, scale: 1, y: 0, duration: 0.85, ease: 'power2.out' }, 12.3);
  }
  if (brandPaths.length) {
    tl.to(brandPaths, { strokeDashoffset: 0, duration: 0.9, stagger: 0.08, ease: 'power2.out' }, 12.35);
  }
  if (el.roleSpotlight) {
    tl.to(el.roleSpotlight, { opacity: 0.88, scale: 1.05, duration: 0.7 }, 12.35);
  }
  if (el.frame2) {
    tl.fromTo(el.frame2,
      { y: 100, scale: 0.9, rotateX: 9, rotateZ: 2.0, opacity: 0 },
      { y: 0, scale: 1, rotateX: 0, rotateZ: 0, opacity: 1, duration: 0.95, ease: 'power3.out' },
      12.3
    );
  }
  if (el.characterScene) {
    tl.to(el.characterScene, { x: () => el.getAnchorRightX() - 4, duration: 0.8, ease: 'power1.out' }, 12.45);
  }
  tl.to(el.frame2, { opacity: 1, duration: 1.8 }, 13.25);

  // Store Brand Builder into Slot 2
  if (el.frame2) {
    const subWrap = el.frame2.querySelector('.role-frame-sub-wrap');
    const cat = el.frame2.querySelector('.role-frame-category');
    const inner = el.frame2.querySelector('.role-frame-inner');
    if (subWrap) tl.to(subWrap, { height: 0, opacity: 0, duration: 0.75, ease: 'power2.inOut' }, 15.05);
    if (cat) tl.to(cat, { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, 15.05);
    if (inner) tl.to(inner, { padding: '12px 16px', duration: 0.85, ease: 'power2.inOut' }, 15.05);
    tl.to(el.frame2, {
      transformOrigin: 'top left',
      x: () => getSlotDelta(1).x,
      y: () => getSlotDelta(1).y,
      scale: () => getSlotDelta(1).scale,
      opacity: 0.65,
      rotateX: 0,
      rotateZ: 0,
      duration: 1.1,
      ease: 'power2.inOut',
      onStart: () => el.frame2?.classList.add('is-stored'),
      onReverseComplete: () => el.frame2?.classList.remove('is-stored'),
    }, 15.05);
  }
  if (el.envSymBrand) tl.to(el.envSymBrand, { opacity: 0.05, duration: 0.75, ease: 'power2.out' }, 15.25);
  if (el.roleSpotlight) tl.to(el.roleSpotlight, { opacity: 0.25, duration: 0.7 }, 15.25);

  // Role 03: CREATOR
  if (el.envSymCreator) {
    tl.fromTo(el.envSymCreator, { opacity: 0, scale: 0.9, y: 20 }, { opacity: 0.58, scale: 1, y: 0, duration: 0.85, ease: 'power2.out' }, 16.2);
  }
  if (creatorBlades.length) {
    tl.to(creatorBlades, { rotation: 0, scale: 1, opacity: 0.85, duration: 0.9, ease: 'power2.out' }, 16.25);
  }
  if (el.roleSpotlight) {
    tl.to(el.roleSpotlight, { opacity: 0.88, scale: 1.0, duration: 0.7 }, 16.25);
  }
  if (el.frame3) {
    tl.fromTo(el.frame3,
      { y: 100, scale: 0.9, rotateX: 9, rotateZ: -1.5, opacity: 0 },
      { y: 0, scale: 1, rotateX: 0, rotateZ: 0, opacity: 1, duration: 0.95, ease: 'power3.out' },
      16.2
    );
  }
  if (el.characterScene) {
    tl.to(el.characterScene, { x: () => el.getAnchorRightX() + 4, duration: 0.8, ease: 'power1.out' }, 16.35);
  }
  tl.to(el.frame3, { opacity: 1, duration: 1.8 }, 17.15);

  // Store Creator into Slot 3
  if (el.frame3) {
    const subWrap = el.frame3.querySelector('.role-frame-sub-wrap');
    const cat = el.frame3.querySelector('.role-frame-category');
    const inner = el.frame3.querySelector('.role-frame-inner');
    if (subWrap) tl.to(subWrap, { height: 0, opacity: 0, duration: 0.75, ease: 'power2.inOut' }, 18.95);
    if (cat) tl.to(cat, { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, 18.95);
    if (inner) tl.to(inner, { padding: '12px 16px', duration: 0.85, ease: 'power2.inOut' }, 18.95);
    tl.to(el.frame3, {
      transformOrigin: 'top left',
      x: () => getSlotDelta(2).x,
      y: () => getSlotDelta(2).y,
      scale: () => getSlotDelta(2).scale,
      opacity: 0.65,
      rotateX: 0,
      rotateZ: 0,
      duration: 1.1,
      ease: 'power2.inOut',
      onStart: () => el.frame3?.classList.add('is-stored'),
      onReverseComplete: () => el.frame3?.classList.remove('is-stored'),
    }, 18.95);
  }
  if (el.envSymCreator) tl.to(el.envSymCreator, { opacity: 0.05, duration: 0.75, ease: 'power2.out' }, 19.15);
  if (el.roleSpotlight) tl.to(el.roleSpotlight, { opacity: 0.25, duration: 0.7 }, 19.15);

  // Role 04: SPEAKER
  if (el.envSymSpeaker) {
    tl.fromTo(el.envSymSpeaker, { opacity: 0, scale: 0.9, y: 20 }, { opacity: 0.58, scale: 1, y: 0, duration: 0.85, ease: 'power2.out' }, 20.1);
  }
  if (speakerBars.length) {
    tl.to(speakerBars, { scaleY: 1, duration: 0.85, stagger: 0.03, ease: 'power2.out' }, 20.15);
  }
  if (el.roleSpotlight) {
    tl.to(el.roleSpotlight, { opacity: 0.88, scale: 1.05, duration: 0.7 }, 20.15);
  }
  if (el.frame4) {
    tl.fromTo(el.frame4,
      { y: 100, scale: 0.9, rotateX: 9, rotateZ: 1.5, opacity: 0 },
      { y: 0, scale: 1, rotateX: 0, rotateZ: 0, opacity: 1, duration: 0.95, ease: 'power3.out' },
      20.1
    );
  }
  if (el.characterScene) {
    tl.to(el.characterScene, { x: () => el.getAnchorRightX() - 2, duration: 0.8, ease: 'power1.out' }, 20.25);
  }
  tl.to(el.frame4, { opacity: 1, duration: 1.8 }, 21.05);

  // Store Speaker into Slot 4
  if (el.frame4) {
    const subWrap = el.frame4.querySelector('.role-frame-sub-wrap');
    const cat = el.frame4.querySelector('.role-frame-category');
    const inner = el.frame4.querySelector('.role-frame-inner');
    if (subWrap) tl.to(subWrap, { height: 0, opacity: 0, duration: 0.75, ease: 'power2.inOut' }, 22.95);
    if (cat) tl.to(cat, { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, 22.95);
    if (inner) tl.to(inner, { padding: '12px 16px', duration: 0.85, ease: 'power2.inOut' }, 22.95);
    tl.to(el.frame4, {
      transformOrigin: 'top left',
      x: () => getSlotDelta(3).x,
      y: () => getSlotDelta(3).y,
      scale: () => getSlotDelta(3).scale,
      opacity: 0.65,
      rotateX: 0,
      rotateZ: 0,
      duration: 1.1,
      ease: 'power2.inOut',
      onStart: () => el.frame4?.classList.add('is-stored'),
      onReverseComplete: () => el.frame4?.classList.remove('is-stored'),
    }, 22.95);
  }
  if (el.envSymSpeaker) tl.to(el.envSymSpeaker, { opacity: 0.05, duration: 0.75, ease: 'power2.out' }, 23.15);
  if (el.roleSpotlight) tl.to(el.roleSpotlight, { opacity: 0, duration: 0.7 }, 23.15);

  // Step 7: Completed History Row & Collective Line
  const storedFrames = [el.frame1, el.frame2, el.frame3, el.frame4].filter(Boolean);
  if (storedFrames.length) {
    tl.to(storedFrames, { opacity: 0.95, duration: 0.65, ease: 'power2.out' }, 24.15);
  }
  if (el.historyCollectiveLine) {
    tl.fromTo(el.historyCollectiveLine, { scaleX: 0 }, { scaleX: 1, duration: 0.85, ease: 'power2.out' }, 24.25);
  }
  if (el.wrapper) {
    tl.to(el.wrapper, { duration: 1.6 }, 24.8);
  }

  // Step 8 (Identity Exit): Clean transition into next phase
  if (el.historyRow) tl.to(el.historyRow, { y: -25, opacity: 0, duration: 0.85, ease: 'power2.in' }, 26.4);
  if (storedFrames.length) tl.to(storedFrames, { y: '-=25', opacity: 0, duration: 0.85, ease: 'power2.in' }, 26.4);
  if (el.stmtBackdrop) tl.to(el.stmtBackdrop, { opacity: 0, duration: 0.85, ease: 'power2.in' }, 26.4);
  if (el.envSymbolsWrap) tl.to(el.envSymbolsWrap, { opacity: 0, duration: 0.85, ease: 'power2.in' }, 26.4);
}

export function attachIdentityParallax(
  mouseX: number,
  mouseY: number,
  frames: (HTMLElement | null)[],
  envSyms: (HTMLElement | null)[],
  roleSpotlight: HTMLElement | null
) {
  frames.forEach((f) => {
    if (f && !f.classList.contains('is-stored')) {
      const op = (f as any)._gsap?.opacity;
      if (op === undefined || op > 0.6) {
        gsap.set(f, {
          rotateY: mouseX * 4,
          rotateX: -mouseY * 3,
        });
      }
    }
  });

  envSyms.forEach((sym, i) => {
    if (sym) {
      const factor = i % 2 === 0 ? 4 : 2.5;
      gsap.set(sym, {
        x: mouseX * factor,
        y: mouseY * factor,
      });
    }
  });

  if (roleSpotlight) {
    gsap.set(roleSpotlight, {
      x: mouseX * 8,
      y: mouseY * 6,
    });
  }
}
