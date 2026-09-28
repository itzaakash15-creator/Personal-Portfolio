import gsap from 'gsap';

export interface WorkTransitionElements {
  characterScene: HTMLElement | null;
  characterPortrait: HTMLElement | null;
  radialLight: HTMLElement | null;
  workTransition: HTMLElement | null;
  projectApproach: HTMLElement | null;
  getAnchorRightX: () => number;
}

export function buildWorkTransitionTimeline(tl: gsap.core.Timeline, el: WorkTransitionElements) {
  // Step 8: Transition into Selected Work (Digi Marketrix)
  if (el.characterScene) {
    tl.to(
      el.characterScene,
      {
        x: () => el.getAnchorRightX() * 1.5,
        scale: 0.94,
        opacity: 0.32,
        duration: 1.1,
        ease: 'power2.inOut',
      },
      26.4
    );
  }

  if (el.characterPortrait) {
    tl.to(el.characterPortrait, { y: -15, duration: 1.1, ease: 'power2.inOut' }, 26.4);
  }
  if (el.radialLight) {
    tl.to(el.radialLight, { opacity: 0.22, scale: 0.85, duration: 1.1, ease: 'power2.inOut' }, 26.4);
  }

  if (el.workTransition) {
    tl.to(el.workTransition, { opacity: 1, duration: 0.1 }, 26.5);
  }

  tl.fromTo('#work-kicker', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, ease: 'power2.out' }, 26.6);
  tl.fromTo('#work-title-digi', { y: '100%', opacity: 0 }, { y: '0%', opacity: 1, duration: 0.85, ease: 'power3.out' }, 26.9);
  tl.fromTo('#work-title-marketrix', { y: '100%', opacity: 0 }, { y: '0%', opacity: 1, duration: 0.85, ease: 'power3.out' }, 27.05);
  tl.fromTo('#work-subtitle', { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, ease: 'power2.out' }, 27.4);

  if (el.characterScene) {
    tl.to(el.characterScene, { opacity: 0, duration: 0.8, ease: 'power2.in' }, 28.2);
  }
  if (el.radialLight) {
    tl.to(el.radialLight, { opacity: 0, duration: 0.8 }, 28.2);
  }
  if (el.workTransition) {
    tl.to(el.workTransition, { scale: 0.94, y: -18, duration: 0.9, ease: 'power2.out' }, 28.3);
  }

  if (el.projectApproach) {
    tl.fromTo(
      el.projectApproach,
      { opacity: 0, scale: 0.85, y: 35 },
      { opacity: 1, scale: 1.0, y: 0, duration: 1.15, ease: 'power3.out' },
      28.3
    );
  }

  if (el.workTransition) {
    tl.to(el.workTransition, { opacity: 1, duration: 0.9 }, 29.45);
  }
}
