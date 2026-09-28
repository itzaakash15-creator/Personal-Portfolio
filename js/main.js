/**
 * AAKASH K — Master Portfolio Controller & Proof System Engine
 * Clean, lean, high performance (60–120 FPS).
 * Supports Proof Lightbox / Document Previews, Resume Actions, and Smooth Anchors.
 */

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation Header Scroll State
  const header = document.getElementById('site-header');
  function handleScroll() {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Navigation Drawer
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.classList.toggle('open', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ==========================================================================
  // 3. CharacterScene Controller: Responsive Parallax & Scroll Kinematics
  // Architecture ready for React Three Fiber / WebGL 3D GLB Model
  // ==========================================================================
  // ==========================================================================
  // 3. CharacterScene & Poster Controller: Responsive Depth Parallax & Kinematics
  // Architecture ready for React Three Fiber / WebGL 3D GLB Model
  // ==========================================================================
  const CharacterController = {
    isEntrancePlaying: false,
    // Layered state for physical depth (portrait, wordmark, flanks, background light)
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
      scrollX: 0,
      scrollY: 0,
      scrollScale: 1,
      scrollOpacity: 1
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
      scrollX: 0,
      scrollY: 0,
      scrollScale: 1,
      scrollOpacity: 1
    },
    lerpFactor: 0.055,
    isTicking: false,
    rafId: null,
    portraitEl: null,
    stageEl: null,
    wordmarkEl: null,
    leftFlankEl: null,
    rightFlankEl: null,
    radialLightEl: null,
    dirLightEl: null,
    rimLightEl: null,

    init() {
      this.portraitEl = document.getElementById('character-portrait') || document.querySelector('.hero-poster-portrait');
      this.stageEl = document.getElementById('character-scene') || document.querySelector('.hero-center-subject');
      this.wordmarkEl = document.getElementById('hero-portfolio-wordmark');
      this.leftFlankEl = document.getElementById('hero-left-flank');
      this.rightFlankEl = document.getElementById('hero-right-flank');
      this.radialLightEl = document.getElementById('hero-radial-light') || document.querySelector('.hero-poster-backlight');
      this.dirLightEl = document.querySelector('.hero-poster-side-light');
      this.rimLightEl = document.querySelector('.hero-poster-rim-light');

      // Ensure portrait is visible and highlighted
      if (this.portraitEl) {
        this.portraitEl.style.opacity = '1';
        this.portraitEl.style.visibility = 'visible';
        this.portraitEl.style.display = 'block';
      }

      const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!isTouch && !prefersReducedMotion) {
        this.bindPointerEvents();
      }
    },

    bindPointerEvents() {
      const isDesktop = () => window.innerWidth > 960 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const onPointerMove = (e) => {
        if (!isDesktop() || this.isEntrancePlaying) return;

        // Normalized mouse coordinates from -1 to +1
        const normX = (e.clientX / window.innerWidth) * 2 - 1;
        const normY = (e.clientY / window.innerHeight) * 2 - 1;

        // Exact depth specifications from Specification 07:
        // AAKASH portrait: maximum ±5px X, maximum ±3px Y
        this.target.pointerX = normX * 5.0;
        this.target.pointerY = normY * 3.0;
        this.target.pointerScale = 1; // Natural, no distortion

        // LIGHT: maximum ±10px X, maximum ±6px Y
        this.target.lightX = normX * 10.0;
        this.target.lightY = normY * 6.0;
        this.target.dirLightX = -normX * 8.0;
        this.target.dirLightY = -normY * 5.0;

        // PORTFOLIO wordmark: maximum ±2px
        this.target.wordmarkX = normX * 2.0;
        this.target.wordmarkY = normY * 1.5;

        // Foreground details: maximum ±2px
        this.target.flankX = normX * 2.0;
        this.target.flankY = normY * 1.5;

        // Shadow subtle shift
        this.target.shadowX = -normX * 8;
        this.target.shadowY = 18 - normY * 4;

        // Forward to CharacterScene modular interaction API for future 3D model
        if (window.Character3DScene && typeof window.Character3DScene.setPointer === 'function') {
          window.Character3DScene.setPointer(normX, normY);
        }

        this.requestTick();
      };

      const onPointerLeave = () => {
        if (!isDesktop()) return;
        this.target.pointerX = 0;
        this.target.pointerY = 0;
        this.target.pointerScale = 1;
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

        if (window.Character3DScene && typeof window.Character3DScene.setPointer === 'function') {
          window.Character3DScene.setPointer(0, 0);
        }

        this.requestTick();
      };

      window.addEventListener('mousemove', onPointerMove, { passive: true });
      window.addEventListener('mouseleave', onPointerLeave, { passive: true });

      window.addEventListener('resize', () => {
        if (!isDesktop()) {
          this.reset();
        }
      });
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

      // Layered damping speeds according to physical depth:
      // Aakash portrait lerp (physical, responsive)
      c.pointerX += (t.pointerX - c.pointerX) * 0.055;
      c.pointerY += (t.pointerY - c.pointerY) * 0.055;
      c.pointerScale += (t.pointerScale - c.pointerScale) * 0.055;

      // Lighting lerp (soft atmospheric inertia)
      c.lightX += (t.lightX - c.lightX) * 0.040;
      c.lightY += (t.lightY - c.lightY) * 0.040;
      c.dirLightX += (t.dirLightX - c.dirLightX) * 0.040;
      c.dirLightY += (t.dirLightY - c.dirLightY) * 0.040;

      // PORTFOLIO wordmark lerp (deep background, calm)
      c.wordmarkX += (t.wordmarkX - c.wordmarkX) * 0.035;
      c.wordmarkY += (t.wordmarkY - c.wordmarkY) * 0.035;

      // Foreground flank details lerp (crisp)
      c.flankX += (t.flankX - c.flankX) * 0.065;
      c.flankY += (t.flankY - c.flankY) * 0.065;

      c.shadowX += (t.shadowX - c.shadowX) * 0.055;
      c.shadowY += (t.shadowY - c.shadowY) * 0.055;

      c.scrollX += (t.scrollX - c.scrollX) * 0.055;
      c.scrollY += (t.scrollY - c.scrollY) * 0.055;
      c.scrollScale += (t.scrollScale - c.scrollScale) * 0.055;
      c.scrollOpacity += (t.scrollOpacity - c.scrollOpacity) * 0.055;

      this.render();

      const diff = Math.abs(t.pointerX - c.pointerX) +
                   Math.abs(t.pointerY - c.pointerY) +
                   Math.abs(t.lightX - c.lightX) +
                   Math.abs(t.lightY - c.lightY) +
                   Math.abs(t.wordmarkX - c.wordmarkX) +
                   Math.abs(t.wordmarkY - c.wordmarkY) +
                   Math.abs(t.scrollX - c.scrollX) +
                   Math.abs(t.scrollY - c.scrollY) +
                   Math.abs(t.scrollOpacity - c.scrollOpacity);

      if (diff > 0.005) {
        this.rafId = requestAnimationFrame(() => this.update());
      } else {
        this.isTicking = false;
      }
    },

    render() {
      // 1. Move Background Lighting Layers
      if (this.radialLightEl) {
        this.radialLightEl.style.transform = `translate3d(calc(-50% + ${this.current.lightX.toFixed(2)}px), calc(-50% + ${this.current.lightY.toFixed(2)}px), 0)`;
      }
      if (this.dirLightEl) {
        this.dirLightEl.style.transform = `translate3d(${this.current.dirLightX.toFixed(2)}px, ${this.current.dirLightY.toFixed(2)}px, 0)`;
      }
      if (this.rimLightEl) {
        this.rimLightEl.style.transform = `translate3d(calc(-50% + ${(this.current.lightX * 0.8).toFixed(2)}px), 0, 0)`;
      }

      // 2. Move PORTFOLIO wordmark (depth layer 3)
      if (this.wordmarkEl && !this.isEntrancePlaying) {
        this.wordmarkEl.style.transform = `translate(calc(-50% + ${this.current.wordmarkX.toFixed(2)}px), calc(-50% + ${this.current.wordmarkY.toFixed(2)}px))`;
      }

      // 3. Move Flanks (micro-depth layer 4 & 6)
      if (this.leftFlankEl && !this.isEntrancePlaying) {
        this.leftFlankEl.style.transform = `translate3d(${(-this.current.flankX).toFixed(2)}px, ${this.current.flankY.toFixed(2)}px, 0)`;
      }
      if (this.rightFlankEl && !this.isEntrancePlaying) {
        this.rightFlankEl.style.transform = `translate3d(${this.current.flankX.toFixed(2)}px, ${this.current.flankY.toFixed(2)}px, 0)`;
      }

      // 4. Move 2D Portrait (depth layer 5)
      if (this.portraitEl && !this.isEntrancePlaying) {
        const totalX = this.current.pointerX + this.current.scrollX;
        const totalY = this.current.pointerY + this.current.scrollY;
        const totalScale = this.current.pointerScale * this.current.scrollScale;

        this.portraitEl.style.transform = 
          `translate3d(${totalX.toFixed(2)}px, ${totalY.toFixed(2)}px, 0) ` +
          `scale(${totalScale.toFixed(4)})`;

        this.portraitEl.style.filter = 
          `contrast(1.08) brightness(0.97) saturate(0.9) ` +
          `drop-shadow(${this.current.shadowX.toFixed(1)}px ${this.current.shadowY.toFixed(1)}px 32px rgba(0, 0, 0, 0.7))`;

        this.portraitEl.style.opacity = this.current.scrollOpacity.toFixed(3);
      }
    },

    setScrollKinematics(x = 0, y = 0, rotY = 0, scale = 1, opacity = 1) {
      this.target.scrollX = x;
      this.target.scrollY = y;
      this.target.scrollScale = scale;
      this.target.scrollOpacity = opacity;

      if (window.Character3DScene && typeof window.Character3DScene.setScrollKinematics === 'function') {
        window.Character3DScene.setScrollKinematics(x, y, rotY, scale, opacity);
      }

      this.requestTick();
    },

    reset() {
      this.target.pointerX = 0;
      this.target.pointerY = 0;
      this.target.pointerScale = 1;
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

      this.current.pointerX = 0;
      this.current.pointerY = 0;
      this.current.pointerScale = 1;
      this.current.lightX = 0;
      this.current.lightY = 0;
      this.current.dirLightX = 0;
      this.current.dirLightY = 0;
      this.current.wordmarkX = 0;
      this.current.wordmarkY = 0;
      this.current.flankX = 0;
      this.current.flankY = 0;
      this.current.shadowX = 0;
      this.current.shadowY = 18;

      if (this.portraitEl) {
        this.portraitEl.style.transform = 'none';
        this.portraitEl.style.filter = 'contrast(1.08) brightness(0.97) saturate(0.9) drop-shadow(0 22px 45px rgba(0, 0, 0, 0.75))';
        this.portraitEl.style.opacity = '1';
      }
      if (this.radialLightEl) this.radialLightEl.style.transform = 'translate3d(-50%, -50%, 0)';
      if (this.dirLightEl) this.dirLightEl.style.transform = 'none';
      if (this.rimLightEl) this.rimLightEl.style.transform = 'translate3d(-50%, 0, 0)';
      if (this.wordmarkEl) this.wordmarkEl.style.transform = 'translate(-50%, -50%)';
      if (this.leftFlankEl) this.leftFlankEl.style.transform = 'none';
      if (this.rightFlankEl) this.rightFlankEl.style.transform = 'none';

      this.isTicking = false;
    }
  };

  CharacterController.init();

  // ==========================================================================
  // 3b. Cinematic Personal-Portfolio Poster Entrance (2–2.5 seconds total)
  // 0.0s: Atmospheric dark background
  // 0.2s: Warm lighting blooms behind head and shoulders
  // 0.4s: PORTFOLIO typography reveals
  // 0.7s: AAKASH rises from below viewport in front of PORTFOLIO (smooth ease, no bounce)
  // 1.2s: Left-side identity (MARKETER / BRAND BUILDER)
  // 1.4s: Right-side identity (CREATOR / SPEAKER)
  // 1.6s: Hello, I'm AAKASH
  // 1.8s: Positioning statement
  // 2.0s: Professional anchors & CTAs
  // ==========================================================================
  // ==========================================================================
  // 3b. Cinematic Personal-Portfolio Poster Entrance (2–2.5 seconds total)
  // Visitor Experience Order:
  // PORTFOLIO ↓ AAKASH ↓ IDENTITY DETAILS ↓ PROFESSIONAL DETAILS ↓ FULL HERO
  // ==========================================================================
  function initEntranceSequence() {
    const portfolioWord = document.getElementById('hero-portfolio-wordmark');
    const characterPortrait = document.getElementById('character-portrait') || document.querySelector('.hero-poster-portrait');
    const radialLight = document.getElementById('hero-radial-light');
    
    // Left-side Identity Elements
    const leftLine = document.querySelector('.tag-accent-line-left');
    const leftTag1 = document.querySelector('#hero-left-tags .tag-item-1');
    const leftTag2 = document.querySelector('#hero-left-tags .tag-item-2');
    const leftSep = document.querySelector('#hero-left-tags .poster-tag-separator');

    // Right-side Identity Elements
    const rightLine = document.querySelector('.tag-accent-line-right');
    const rightTag1 = document.querySelector('#hero-right-tags .tag-item-1');
    const rightTag2 = document.querySelector('#hero-right-tags .tag-item-2');
    const rightSep = document.querySelector('#hero-right-tags .poster-tag-separator');

    // Editorial Content Elements
    const greeting = document.getElementById('hero-greeting');
    const positioning = document.getElementById('hero-positioning');
    const ctaCluster = document.getElementById('hero-cta-cluster');
    const rightMantra = document.getElementById('hero-right-mantra');
    const anchorItems = document.querySelectorAll('.hero-anchor-item');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const settleHeroImmediately = () => {
      CharacterController.isEntrancePlaying = false;
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
      [leftTag1, leftTag2, rightTag1, rightTag2].forEach(tag => {
        if (tag) {
          tag.style.clipPath = 'none';
          tag.style.opacity = '1';
          tag.style.transform = 'none';
        }
      });
      [leftSep, rightSep, greeting, positioning, ctaCluster, rightMantra].forEach(el => {
        if (el) {
          el.style.opacity = '1';
          el.style.transform = 'none';
        }
      });
      anchorItems.forEach((anchor, idx) => {
        const num = anchor.querySelector('.anchor-index');
        const line = anchor.querySelector('.anchor-line');
        const title = anchor.querySelector('.anchor-title');
        const sub = anchor.querySelector('.anchor-sub');
        if (num) { num.style.opacity = '1'; num.style.transform = 'none'; }
        if (line) line.style.transform = idx === 0 ? 'scaleX(1)' : 'scaleX(0)';
        if (title) { title.style.clipPath = 'none'; title.style.opacity = '1'; title.style.transform = 'none'; }
        if (sub) { sub.style.opacity = '1'; sub.style.transform = 'none'; }
      });
      CharacterController.requestTick();
    };

    if (prefersReducedMotion || window.scrollY > 40) {
      settleHeroImmediately();
      return;
    }

    CharacterController.isEntrancePlaying = true;

    // STEP 1 — Dark cinematic background (faint radial backlight)
    if (radialLight) {
      radialLight.style.opacity = '0.08';
    }
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

    // Directional tags initial state
    if (leftLine) leftLine.style.transform = 'scaleX(0)';
    if (rightLine) rightLine.style.transform = 'scaleX(0)';
    if (leftTag1) { leftTag1.style.clipPath = 'inset(0% 100% 0% 0%)'; leftTag1.style.opacity = '0'; leftTag1.style.transform = 'translateX(-8px)'; }
    if (leftTag2) { leftTag2.style.clipPath = 'inset(0% 100% 0% 0%)'; leftTag2.style.opacity = '0'; leftTag2.style.transform = 'translateX(-8px)'; }
    if (rightTag1) { rightTag1.style.clipPath = 'inset(0% 0% 0% 100%)'; rightTag1.style.opacity = '0'; rightTag1.style.transform = 'translateX(8px)'; }
    if (rightTag2) { rightTag2.style.clipPath = 'inset(0% 0% 0% 100%)'; rightTag2.style.opacity = '0'; rightTag2.style.transform = 'translateX(8px)'; }
    if (leftSep) leftSep.style.opacity = '0';
    if (rightSep) rightSep.style.opacity = '0';

    // Supporting copy initial state
    [greeting, positioning, ctaCluster, rightMantra].forEach(el => {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translate3d(0, 16px, 0)';
      }
    });

    // Anchors initial state
    anchorItems.forEach(anchor => {
      const num = anchor.querySelector('.anchor-index');
      const line = anchor.querySelector('.anchor-line');
      const title = anchor.querySelector('.anchor-title');
      const sub = anchor.querySelector('.anchor-sub');
      if (num) { num.style.opacity = '0'; num.style.transform = 'translate3d(0, 8px, 0)'; }
      if (line) line.style.transform = 'scaleX(0)';
      if (title) { title.style.clipPath = 'inset(100% 0% 0% 0%)'; title.style.opacity = '0'; title.style.transform = 'translate3d(0, 12px, 0)'; }
      if (sub) { sub.style.opacity = '0'; sub.style.transform = 'translate3d(0, 10px, 0)'; }
    });

    let entranceTimeline = null;

    if (typeof gsap !== 'undefined') {
      entranceTimeline = gsap.timeline({
        onComplete: () => {
          CharacterController.isEntrancePlaying = false;
          CharacterController.requestTick();
        }
      });

      // ----------------------------------------------------------------------
      // STEP 1: Atmospheric dark background active (0.0s)
      // ----------------------------------------------------------------------

      // ----------------------------------------------------------------------
      // STEP 2: The huge word PORTFOLIO appears BEHIND future position of Aakash
      // Using cinematic mask/reveal (bottom -> top clipPath inset)
      // ----------------------------------------------------------------------
      entranceTimeline.fromTo(portfolioWord,
        {
          opacity: 0,
          clipPath: 'inset(100% 0% 0% 0%)',
          letterSpacing: '0.04em'
        },
        {
          opacity: 0.92,
          clipPath: 'inset(0% 0% 0% 0%)',
          letterSpacing: '-0.055em',
          duration: 0.70,
          ease: 'power3.out'
        },
        0.22
      );

      // ----------------------------------------------------------------------
      // STEP 3: AAKASH RISES UP FROM BELOW THE VIEWPORT (translateY 85vh -> 0)
      // Enters smoothly in front of PORTFOLIO with physical weight and cinematic ease.
      // Physical weight: subtle 3-5px settling movement (-4px -> 0px) near the end.
      // ----------------------------------------------------------------------
      entranceTimeline.fromTo(characterPortrait,
        {
          y: '85vh',
          opacity: 0,
          scale: 0.97
        },
        {
          y: '0%',
          opacity: 1,
          scale: 1,
          duration: 1.15,
          ease: 'power3.out'
        },
        0.55
      );

      // Physical weight subtle settling movement at the end of Aakash's entrance (1.70s)
      entranceTimeline.to(characterPortrait, {
        y: '-4px',
        duration: 0.14,
        ease: 'power1.out'
      }, 1.70);

      entranceTimeline.to(characterPortrait, {
        y: '0px',
        duration: 0.18,
        ease: 'power2.inOut'
      }, 1.84);

      // ----------------------------------------------------------------------
      // STEP 4: Backlight blooms behind Aakash as he approaches position
      // ----------------------------------------------------------------------
      entranceTimeline.fromTo(radialLight,
        { opacity: 0.12 },
        {
          opacity: 0.88,
          duration: 0.45,
          ease: 'power2.out'
        },
        1.35
      );

      entranceTimeline.to(radialLight, {
        opacity: 0.65,
        duration: 0.45,
        ease: 'power2.inOut'
      }, 1.80);

      // ----------------------------------------------------------------------
      // STEP 5: SIDE DETAILS ASSEMBLE
      // Only reveal surrounding details once Aakash has completed ~65-75% of his rise (~1.38s)!
      // Staggered mask reveals, small translates, opacity.
      // ----------------------------------------------------------------------
      if (leftLine) {
        entranceTimeline.to(leftLine, {
          scaleX: 1,
          duration: 0.22,
          ease: 'power2.out'
        }, 1.38);
      }
      if (leftTag1) {
        entranceTimeline.to(leftTag1, {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          x: 0,
          duration: 0.26,
          ease: 'power2.out'
        }, 1.44);
      }
      if (leftSep) {
        entranceTimeline.to(leftSep, { opacity: 1, duration: 0.15 }, 1.48);
      }
      if (leftTag2) {
        entranceTimeline.to(leftTag2, {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          x: 0,
          duration: 0.26,
          ease: 'power2.out'
        }, 1.50);
      }

      if (rightLine) {
        entranceTimeline.to(rightLine, {
          scaleX: 1,
          duration: 0.22,
          ease: 'power2.out'
        }, 1.40);
      }
      if (rightTag1) {
        entranceTimeline.to(rightTag1, {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          x: 0,
          duration: 0.26,
          ease: 'power2.out'
        }, 1.46);
      }
      if (rightSep) {
        entranceTimeline.to(rightSep, { opacity: 1, duration: 0.15 }, 1.50);
      }
      if (rightTag2) {
        entranceTimeline.to(rightTag2, {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          x: 0,
          duration: 0.26,
          ease: 'power2.out'
        }, 1.52);
      }

      if (greeting) {
        entranceTimeline.to(greeting, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out'
        }, 1.58);
      }

      if (positioning) {
        entranceTimeline.to(positioning, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out'
        }, 1.66);
      }

      if (rightMantra) {
        entranceTimeline.to(rightMantra, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out'
        }, 1.72);
      }

      // Anchors Entrance
      anchorItems.forEach((anchor, idx) => {
        const baseTime = 1.78 + idx * 0.10;
        const num = anchor.querySelector('.anchor-index');
        const line = anchor.querySelector('.anchor-line');
        const title = anchor.querySelector('.anchor-title');
        const sub = anchor.querySelector('.anchor-sub');

        if (num) {
          entranceTimeline.to(num, { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out' }, baseTime);
        }
        if (line) {
          entranceTimeline.to(line, {
            scaleX: idx === 0 ? 1 : 0.35,
            duration: 0.22,
            ease: 'power2.out'
          }, baseTime + 0.04);
        }
        if (title) {
          entranceTimeline.to(title, {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            y: 0,
            duration: 0.24,
            ease: 'power2.out'
          }, baseTime + 0.08);
        }
        if (sub) {
          entranceTimeline.to(sub, {
            opacity: 1,
            y: 0,
            duration: 0.20,
            ease: 'power2.out'
          }, baseTime + 0.12);
        }
      });

      // CTAs Cluster Reveal
      if (ctaCluster) {
        entranceTimeline.to(ctaCluster, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out'
        }, 1.84);
      }

    } else {
      setTimeout(settleHeroImmediately, 2500);
    }

    // Safety Skip Listener on intentional scroll or keydown
    let hasSkipped = false;
    const triggerSkip = () => {
      if (hasSkipped) return;
      hasSkipped = true;
      window.removeEventListener('scroll', checkScrollSkip);
      window.removeEventListener('keydown', triggerSkip);
      window.removeEventListener('touchstart', checkScrollSkip);
      if (entranceTimeline) entranceTimeline.kill();
      settleHeroImmediately();
    };

    const checkScrollSkip = () => {
      if (window.scrollY > 40) {
        triggerSkip();
      }
    };

    window.addEventListener('scroll', checkScrollSkip, { passive: true });
    window.addEventListener('keydown', triggerSkip, { passive: true });
    window.addEventListener('touchstart', checkScrollSkip, { passive: true });
  }

  initEntranceSequence();

  // ==========================================================================
  // 4. Signature Hero + Scroll Motion Choreography (GSAP ScrollTrigger)
  //
  // CORE PRINCIPLE: AAKASH = VISUAL ANCHOR.
  // Typography and content move AROUND him, NEVER constantly through him!
  //
  // LEFT 60–65%: Reserved for typography sequence
  // RIGHT 35–40%: Reserved for Aakash portrait as dimensional anchor
  // ==========================================================================
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // Desktop: Pinned Cinematic Scroll-Driven Experience
    mm.add("(min-width: 961px) and (prefers-reduced-motion: no-preference)", () => {
      const wrapper = document.getElementById('hero-experience');
      const leftFlank = document.getElementById('hero-left-flank');
      const rightFlank = document.getElementById('hero-right-flank');
      const portfolioWord = document.getElementById('hero-portfolio-wordmark');
      const radialLight = document.getElementById('hero-radial-light');
      const characterScene = document.getElementById('character-scene');
      const characterPortrait = document.getElementById('character-portrait');
      const aakashShadow = document.getElementById('aakash-contact-shadow');

      // PART 2: Backdrop Statement (3 Typographic Depth Levels Behind Aakash)
      const stmtBackdrop = document.getElementById('hero-statement-backdrop');
      const stmtLine1 = document.getElementById('stmt-line-1');
      const stmtLine2 = document.getElementById('stmt-line-2');
      const stmtLine3 = document.getElementById('stmt-line-3');

      // PART 3 & 4: Environmental Glowing Symbols (Large Artwork Behind Frames)
      const envSymbolsWrap = document.getElementById('role-env-symbols');
      const envSymMarketer = document.getElementById('env-sym-marketer');
      const envSymBrand = document.getElementById('env-sym-brand');
      const envSymCreator = document.getElementById('env-sym-creator');
      const envSymSpeaker = document.getElementById('env-sym-speaker');

      // Active Role Frames & Warm Spotlight
      const roleStage = document.getElementById('active-role-stage');
      const roleSpotlight = document.getElementById('active-role-spotlight');
      const frame1 = document.getElementById('role-frame-1'); // 01 MARKETER
      const frame2 = document.getElementById('role-frame-2'); // 02 BRAND BUILDER
      const frame3 = document.getElementById('role-frame-3'); // 03 CREATOR
      const frame4 = document.getElementById('role-frame-4'); // 04 SPEAKER

      // Top Identity History System (Reserved slots for stored completed frames)
      const historyRow = document.getElementById('identity-history-row');
      const historySlots = [
        document.getElementById('history-slot-1'),
        document.getElementById('history-slot-2'),
        document.getElementById('history-slot-3'),
        document.getElementById('history-slot-4')
      ];
      const historyCollectiveLine = document.getElementById('history-collective-line');

      // Untouched Digi Marketrix Transition Phase
      const workTransition = document.getElementById('work-transition-phase');
      const projectApproach = document.getElementById('hero-project-approach');

      if (!wrapper || !characterScene) return;

      // Safe rightward anchor calculation for Aakash portrait
      // Keeps Aakash stably anchored in right 35–40%, clearing left 60–65% for the editorial frames
      const getAnchorRightX = () => Math.min(Math.max(window.innerWidth * 0.22, 220), 380);

      // Calculates exact delta to physically store active frame into top history slot
      const getSlotDelta = (index) => {
        const stage = roleStage || document.getElementById('active-role-stage');
        const slot = historySlots[index] || document.getElementById(`history-slot-${index + 1}`);
        if (!stage || !slot) return { x: 0, y: 0, scale: 0.38 };

        const stageRect = stage.getBoundingClientRect();
        const slotRect = slot.getBoundingClientRect();

        if (!stageRect.width || !slotRect.width) return { x: 0, y: -200, scale: 0.38 };

        const scale = Math.min(Math.max(slotRect.width / stageRect.width, 0.30), 0.44);
        const x = slotRect.left - stageRect.left;
        const y = slotRect.top - stageRect.top;

        return { x, y, scale };
      };

      // SVG path initialization for smooth environmental drawings
      const markPath = envSymMarketer ? envSymMarketer.querySelector('.env-path-draw') : null;
      if (markPath) {
        gsap.set(markPath, { strokeDasharray: 480, strokeDashoffset: 480 });
      }
      const brandPaths = envSymBrand ? envSymBrand.querySelectorAll('.env-path-draw') : [];
      if (brandPaths.length) {
        brandPaths.forEach(p => gsap.set(p, { strokeDasharray: 340, strokeDashoffset: 340 }));
      }
      const creatorBlades = envSymCreator ? envSymCreator.querySelectorAll('g path') : [];
      if (creatorBlades.length) {
        gsap.set(creatorBlades, { transformOrigin: '170px 170px', rotation: 18, scale: 0.88, opacity: 0.4 });
      }
      const speakerBars = envSymSpeaker ? envSymSpeaker.querySelectorAll('line') : [];
      if (speakerBars.length) {
        speakerBars.forEach((bar, idx) => {
          if (idx > 0) gsap.set(bar, { transformOrigin: 'center center', scaleY: 0.1 });
        });
      }

      // Initial state of active frames (Architectural Panels elevated in 3D depth)
      [frame1, frame2, frame3, frame4].forEach(f => {
        if (f) {
          gsap.set(f, {
            transformPerspective: 1200,
            transformOrigin: 'center bottom',
            y: 100,
            scale: 0.90,
            rotateX: 9,
            opacity: 0
          });
        }
      });

      // Master ScrollTrigger Timeline
      // Distance: +=5200 for slow, weighted, buttery storytelling
      // Scrub: 1.5 for buttery inertia between physical wheel input & visual animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "+=5200",
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            let section = 'hero';
            if (p < 0.05) {
              section = 'hero';
            } else if (p >= 0.05 && p < 0.28) {
              section = 'statement';
            } else if (p >= 0.28 && p < 0.44) {
              section = 'marketer';
            } else if (p >= 0.44 && p < 0.60) {
              section = 'brand';
            } else if (p >= 0.60 && p < 0.76) {
              section = 'creator';
            } else if (p >= 0.76 && p < 0.88) {
              section = 'speaker';
            } else {
              section = 'work';
            }

            if (window.Character3DScene && typeof window.Character3DScene.setScroll === 'function') {
              window.Character3DScene.setScroll(p, section);
            }
          }
        }
      });

      // ----------------------------------------------------------------------
      // STEP 1: Hero Flanks Slide Out; AAKASH Anchors Smoothly to Right
      // ----------------------------------------------------------------------
      tl.to(leftFlank, {
        x: -60,
        opacity: 0,
        duration: 1.0,
        ease: "power2.inOut"
      }, 0);

      tl.to(rightFlank, {
        x: 60,
        opacity: 0,
        duration: 1.0,
        ease: "power2.inOut"
      }, 0);

      tl.to(portfolioWord, {
        scale: 0.94,
        opacity: 0,
        duration: 0.9,
        ease: "power2.inOut"
      }, 0.05);

      // AAKASH SHIFTS TO THE RIGHT (Anchor Position: right 35–40%, face stable)
      tl.to(characterScene, {
        x: () => getAnchorRightX(),
        scale: 0.98,
        duration: 1.1,
        ease: "power2.inOut"
      }, 0.15);

      if (characterPortrait) {
        tl.to(characterPortrait, {
          scale: 0.98,
          opacity: 0.96,
          duration: 1.1,
          ease: "power2.inOut"
        }, 0.15);
      }

      tl.to(radialLight, {
        x: () => getAnchorRightX() * 0.75,
        duration: 1.1,
        ease: "power2.inOut"
      }, 0.15);

      if (aakashShadow) {
        tl.to(aakashShadow, {
          opacity: 1,
          duration: 0.9,
          ease: "power2.out"
        }, 0.2);
      }

      // ----------------------------------------------------------------------
      // STEP 2: "I DON'T FIT INTO ONE BOX." ENORMOUS BACKGROUND TYPOGRAPHY
      // Intelligent layering behind Aakash: Left/center text extends naturally
      // behind hair, shoulders, body while preserving full line readability.
      // Timing: Line 1 enters -> HOLD -> Line 2 enters -> HOLD -> Line 3 enters
      // -> FULL SENTENCE READING HOLD -> Soften before first role enters.
      // ----------------------------------------------------------------------
      tl.to(stmtBackdrop, { opacity: 1, duration: 0.1 }, 1.2);

      // 0–8% of sentence segment: Line 1 "I DON'T FIT" enters
      tl.fromTo(stmtLine1,
        { scale: 0.94, filter: 'blur(7px)', opacity: 0, y: 35 },
        { scale: 1, filter: 'blur(0px)', opacity: 0.55, y: 0, duration: 0.85, ease: 'power2.out' },
        1.3
      );

      // 8–17%: HOLD Line 1 (Reading window)
      tl.to(stmtLine1, { opacity: 0.55, duration: 0.7 }, 2.15);

      // 17–24%: Line 2 "INTO ONE" enters
      tl.fromTo(stmtLine2,
        { scale: 0.95, filter: 'blur(6px)', opacity: 0, y: 30 },
        { scale: 1, filter: 'blur(0px)', opacity: 0.72, y: 0, duration: 0.85, ease: 'power2.out' },
        2.85
      );
      tl.to(stmtLine1, { opacity: 0.42, y: -8, duration: 0.7, ease: 'power2.out' }, 2.85);

      // 24–34%: HOLD Lines 1 & 2 (Reading window)
      tl.to(stmtLine2, { opacity: 0.72, duration: 0.7 }, 3.7);

      // 34–41%: Line 3 "BOX." enters (Enormous, lower background, warm dot)
      tl.fromTo(stmtLine3,
        { scale: 0.96, filter: 'blur(5px)', opacity: 0, y: 25 },
        { scale: 1, filter: 'blur(0px)', opacity: 0.98, y: 0, duration: 0.85, ease: 'power2.out' },
        4.4
      );
      tl.to([stmtLine1, stmtLine2], { y: -16, duration: 0.7, ease: 'power2.out' }, 4.4);
      tl.to(stmtLine2, { opacity: 0.58, duration: 0.7, ease: 'power2.out' }, 4.4);

      // 41–55%: FULL SENTENCE READING HOLD
      // Active moment: increase contrast slightly, generous pause to absorb statement
      tl.to(stmtBackdrop, {
        opacity: 1,
        filter: 'contrast(1.08)',
        duration: 2.2
      }, 5.25);

      // Sentence contrast reduces, settles deeper into background before first role enters
      tl.to(stmtBackdrop, {
        scale: 0.92,
        opacity: 0.12,
        filter: 'blur(4px) contrast(0.8)',
        duration: 0.9,
        ease: 'power2.inOut'
      }, 7.45);

      // ----------------------------------------------------------------------
      // STEP 3: ROLE 01 — 01 MARKETER
      // ENTRANCE: Rises from depth (y: 100 -> 0, scale 0.90 -> 1, rotateZ -2 -> 0)
      // Environmental strategy path symbol illuminates behind frame.
      // HOLD: Full reading window for MARKETER.
      // TRANSFORMATION: THE SAME MARKETER FRAME shrinks, travels upward,
      // settles into top identity history slot 1!
      // ----------------------------------------------------------------------
      // Environmental Symbol 01: Strategy Path
      if (envSymMarketer) {
        tl.fromTo(envSymMarketer,
          { opacity: 0, scale: 0.9, y: 20 },
          { opacity: 0.58, scale: 1, y: 0, duration: 0.85, ease: 'power2.out' },
          8.35
        );
      }
      if (markPath) {
        tl.to(markPath, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.out' }, 8.4);
      }

      // Spotlight warms up beneath Marketer
      if (roleSpotlight) {
        tl.fromTo(roleSpotlight,
          { opacity: 0, scale: 0.85 },
          { opacity: 0.85, scale: 1.0, duration: 0.7, ease: 'power2.out' },
          8.4
        );
      }

      // Frame 01 Entrance (25% Enter)
      if (frame1) {
        tl.fromTo(frame1,
          { y: 100, scale: 0.90, rotateX: 9, rotateZ: -2.0, opacity: 0 },
          { y: 0, scale: 1, rotateX: 0, rotateZ: 0, opacity: 1, duration: 0.95, ease: 'power3.out' },
          8.35
        );
      }

      // Subtle Aakash micro-anchor
      if (characterScene) {
        tl.to(characterScene, { x: () => getAnchorRightX() + 6, duration: 0.8, ease: 'power1.out' }, 8.5);
      }

      // MARKETER HOLD (45% Reading Hold - Generous time to read all details)
      tl.to(frame1, { opacity: 1, duration: 1.8 }, 9.3);

      // MARKETER TRANSFORMATION INTO TOP HISTORY SLOT 1 (30% Exit / Move to History)
      // The SAME frame shrinks, moves upward, collapses keywords, settles in Slot 1!
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
          onStart: () => frame1.classList.add('is-stored')
        }, 11.1);
      }

      // Strategy symbol dims as Marketer settles at top
      if (envSymMarketer) {
        tl.to(envSymMarketer, { opacity: 0.05, duration: 0.75, ease: 'power2.out' }, 11.3);
      }
      if (roleSpotlight) {
        tl.to(roleSpotlight, { opacity: 0.25, duration: 0.7 }, 11.3);
      }

      // ----------------------------------------------------------------------
      // STEP 4: ROLE 02 — 02 BRAND BUILDER
      // ONLY AFTER MARKETER SETTLES AT TOP does Brand Builder rise!
      // Brand contour symbol illuminates.
      // Brand Builder is 100% visible with zero text clipping.
      // HOLD: Full reading window for BRAND BUILDER.
      // TRANSFORMATION: BRAND BUILDER itself shrinks and travels upward,
      // settling NEXT TO MARKETER in Slot 2.
      // Top now contains: [ 01 MARKETER ] [ 02 BRAND BUILDER ].
      // ----------------------------------------------------------------------
      // Environmental Symbol 02: Fingerprint / Identity Contours
      if (envSymBrand) {
        tl.fromTo(envSymBrand,
          { opacity: 0, scale: 0.9, y: 20 },
          { opacity: 0.58, scale: 1, y: 0, duration: 0.85, ease: 'power2.out' },
          12.3
        );
      }
      if (brandPaths.length) {
        tl.to(brandPaths, { strokeDashoffset: 0, duration: 0.9, stagger: 0.08, ease: 'power2.out' }, 12.35);
      }

      if (roleSpotlight) {
        tl.to(roleSpotlight, { opacity: 0.88, scale: 1.05, duration: 0.7 }, 12.35);
      }

      // Frame 02 Entrance (rotateZ +2deg -> 0)
      if (frame2) {
        tl.fromTo(frame2,
          { y: 100, scale: 0.90, rotateX: 9, rotateZ: 2.0, opacity: 0 },
          { y: 0, scale: 1, rotateX: 0, rotateZ: 0, opacity: 1, duration: 0.95, ease: 'power3.out' },
          12.3
        );
      }

      if (characterScene) {
        tl.to(characterScene, { x: () => getAnchorRightX() - 4, duration: 0.8, ease: 'power1.out' }, 12.45);
      }

      // BRAND BUILDER HOLD (Full reading window)
      tl.to(frame2, { opacity: 1, duration: 1.8 }, 13.25);

      // BRAND BUILDER TRANSFORMATION INTO TOP HISTORY SLOT 2
      // Same frame shrinks and moves next to Marketer
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
          onStart: () => frame2.classList.add('is-stored')
        }, 15.05);
      }

      // Env symbol 2 dims
      if (envSymBrand) {
        tl.to(envSymBrand, { opacity: 0.05, duration: 0.75, ease: 'power2.out' }, 15.25);
      }
      if (roleSpotlight) {
        tl.to(roleSpotlight, { opacity: 0.25, duration: 0.7 }, 15.25);
      }

      // ----------------------------------------------------------------------
      // STEP 5: ROLE 03 — 03 CREATOR
      // Marketer & Brand Builder remain parked in Slots 1 & 2!
      // Creator rises from depth.
      // Aperture symbol illuminates.
      // HOLD: Full reading window for CREATOR.
      // TRANSFORMATION: CREATOR shrinks and moves into Slot 3.
      // Top now contains: [ 01 MARKETER ] [ 02 BRAND BUILDER ] [ 03 CREATOR ].
      // ----------------------------------------------------------------------
      if (envSymCreator) {
        tl.fromTo(envSymCreator,
          { opacity: 0, scale: 0.9, y: 20 },
          { opacity: 0.60, scale: 1, y: 0, duration: 0.85, ease: 'power2.out' },
          16.25
        );
      }
      if (creatorBlades.length) {
        tl.to(creatorBlades, {
          rotation: 0,
          scale: 1,
          opacity: 0.9,
          duration: 0.9,
          stagger: 0.04,
          ease: 'power2.out'
        }, 16.3);
      }

      if (roleSpotlight) {
        tl.to(roleSpotlight, { opacity: 0.88, scale: 1.05, duration: 0.7 }, 16.3);
      }

      // Frame 03 Entrance (rotateZ -1.8deg -> 0)
      if (frame3) {
        tl.fromTo(frame3,
          { y: 100, scale: 0.90, rotateX: 9, rotateZ: -1.8, opacity: 0 },
          { y: 0, scale: 1, rotateX: 0, rotateZ: 0, opacity: 1, duration: 0.95, ease: 'power3.out' },
          16.25
        );
      }

      if (characterScene) {
        tl.to(characterScene, { x: () => getAnchorRightX() + 4, duration: 0.8, ease: 'power1.out' }, 16.4);
      }

      // CREATOR HOLD (Full reading window)
      tl.to(frame3, { opacity: 1, duration: 1.8 }, 17.2);

      // CREATOR TRANSFORMATION INTO TOP HISTORY SLOT 3
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
          onStart: () => frame3.classList.add('is-stored')
        }, 19.0);
      }

      if (envSymCreator) {
        tl.to(envSymCreator, { opacity: 0.05, duration: 0.75, ease: 'power2.out' }, 19.2);
      }
      if (roleSpotlight) {
        tl.to(roleSpotlight, { opacity: 0.25, duration: 0.7 }, 19.2);
      }

      // ----------------------------------------------------------------------
      // STEP 6: ROLE 04 — 04 SPEAKER
      // Marketer, Brand Builder & Creator parked in Slots 1, 2, 3!
      // Speaker rises from depth.
      // Soundwave symbol illuminates.
      // HOLD: Full reading window for SPEAKER.
      // TRANSFORMATION: SPEAKER shrinks and moves into Slot 4.
      // Top now contains: [ 01 MARKETER ] [ 02 BRAND BUILDER ] [ 03 CREATOR ] [ 04 SPEAKER ].
      // ----------------------------------------------------------------------
      if (envSymSpeaker) {
        tl.fromTo(envSymSpeaker,
          { opacity: 0, scale: 0.9, y: 20 },
          { opacity: 0.60, scale: 1, y: 0, duration: 0.85, ease: 'power2.out' },
          20.2
        );
      }
      if (speakerBars.length) {
        speakerBars.forEach((bar, idx) => {
          if (idx > 0) {
            tl.to(bar, { scaleY: 1, duration: 0.65, ease: 'back.out(1.5)' }, 20.25 + (idx * 0.02));
          }
        });
      }

      if (roleSpotlight) {
        tl.to(roleSpotlight, { opacity: 0.88, scale: 1.05, duration: 0.7 }, 20.25);
      }

      // Frame 04 Entrance (rotateZ +1.8deg -> 0)
      if (frame4) {
        tl.fromTo(frame4,
          { y: 100, scale: 0.90, rotateX: 9, rotateZ: 1.8, opacity: 0 },
          { y: 0, scale: 1, rotateX: 0, rotateZ: 0, opacity: 1, duration: 0.95, ease: 'power3.out' },
          20.2
        );
      }

      if (characterScene) {
        tl.to(characterScene, { x: () => getAnchorRightX(), duration: 0.8, ease: 'power1.out' }, 20.35);
      }

      // SPEAKER HOLD (Full reading window)
      tl.to(frame4, { opacity: 1, duration: 1.8 }, 21.15);

      // SPEAKER TRANSFORMATION INTO TOP HISTORY SLOT 4
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
          onStart: () => frame4.classList.add('is-stored')
        }, 22.95);
      }

      if (envSymSpeaker) {
        tl.to(envSymSpeaker, { opacity: 0.05, duration: 0.75, ease: 'power2.out' }, 23.15);
      }
      if (roleSpotlight) {
        tl.to(roleSpotlight, { opacity: 0, duration: 0.7 }, 23.15);
      }

      // ----------------------------------------------------------------------
      // STEP 7: ALL FOUR COMPLETED FRAMES IN TOP HISTORY ROW
      // All 4 collective opacity increases to 0.95.
      // Glowing champagne collective line draws underneath.
      // "THE FOUR PARTS OF AAKASH."
      // Generous reading hold.
      // ----------------------------------------------------------------------
      const storedFrames = [frame1, frame2, frame3, frame4].filter(Boolean);
      if (storedFrames.length) {
        tl.to(storedFrames, {
          opacity: 0.95,
          duration: 0.65,
          ease: 'power2.out'
        }, 24.15);
      }

      if (historyCollectiveLine) {
        tl.fromTo(historyCollectiveLine,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.85, ease: 'power2.out' },
          24.25
        );
      }

      // Hold the completed identity collection
      tl.to(wrapper, { duration: 1.6 }, 24.8);

      // ----------------------------------------------------------------------
      // STEP 8: SEAMLESS TRANSITION INTO UNTOUCHED DIGI MARKETRIX
      // Top history row, frames & statement glide gently into darkness.
      // Aakash moves toward right edge and dims.
      // DIGI MARKETRIX enters from LEFT: SELECTED WORK / 01 first, then DIGI,
      // then MARKETRIX (~100ms later). Untouched case study code.
      // ----------------------------------------------------------------------
      if (historyRow) {
        tl.to(historyRow, {
          y: -25,
          opacity: 0,
          duration: 0.85,
          ease: 'power2.in'
        }, 26.4);
      }
      if (storedFrames.length) {
        tl.to(storedFrames, {
          y: '-=25',
          opacity: 0,
          duration: 0.85,
          ease: 'power2.in'
        }, 26.4);
      }
      if (stmtBackdrop) {
        tl.to(stmtBackdrop, {
          opacity: 0,
          duration: 0.85,
          ease: 'power2.in'
        }, 26.4);
      }
      if (envSymbolsWrap) {
        tl.to(envSymbolsWrap, {
          opacity: 0,
          duration: 0.85,
          ease: 'power2.in'
        }, 26.4);
      }

      // Aakash moves toward far right & dims (continuity into Digi Marketrix)
      tl.to(characterScene, {
        x: () => getAnchorRightX() * 1.5,
        scale: 0.94,
        opacity: 0.32,
        duration: 1.1,
        ease: 'power2.inOut'
      }, 26.4);

      if (characterPortrait) {
        tl.to(characterPortrait, {
          y: -15,
          duration: 1.1,
          ease: 'power2.inOut'
        }, 26.4);
      }

      tl.to(radialLight, {
        opacity: 0.22,
        scale: 0.85,
        duration: 1.1,
        ease: 'power2.inOut'
      }, 26.4);

      // DIGI MARKETRIX ENTERS (Untouched Content & Structure)
      tl.to(workTransition, { opacity: 1, duration: 0.1 }, 26.5);

      // SELECTED WORK / 01 first
      tl.fromTo('#work-kicker',
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: 'power2.out' },
        26.6
      );

      // DIGI: upward mask reveal
      tl.fromTo('#work-title-digi',
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.85, ease: 'power3.out' },
        26.9
      );

      // MARKETRIX: upward mask reveal approx 100ms later
      tl.fromTo('#work-title-marketrix',
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.85, ease: 'power3.out' },
        27.05
      );

      // Descriptor subtitle slides up 14px while fading in
      tl.fromTo('#work-subtitle',
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: 'power2.out' },
        27.4
      );

      // Approach into project canvas (untouched)
      tl.to(characterScene, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.in'
      }, 28.2);

      tl.to(radialLight, {
        opacity: 0,
        duration: 0.8
      }, 28.2);

      tl.to(workTransition, {
        scale: 0.94,
        y: -18,
        duration: 0.9,
        ease: 'power2.out'
      }, 28.3);

      if (projectApproach) {
        tl.fromTo(projectApproach,
          { opacity: 0, scale: 0.85, y: 35 },
          { opacity: 1, scale: 1.0, y: 0, duration: 1.15, ease: 'power3.out' },
          28.3
        );
      }

      // Rest / hold before unpinning into case study section
      tl.to(workTransition, { opacity: 1, duration: 0.9 }, 29.45);

      // ----------------------------------------------------------------------
      // POINTER INTERACTION (Desktop Only — Micro-Interactions & Calm Parallax)
      // Aakash: strict limit max ±3px X, ±2.5px Y (calm anchor, no face distortion)
      // Constellation objects: subtle depth ±5px
      // ----------------------------------------------------------------------
      if (window.matchMedia("(min-width: 1025px)").matches) {
        let mouseX = 0, mouseY = 0;
        let targetX = 0, targetY = 0;

        window.addEventListener('mousemove', (e) => {
          targetX = (e.clientX / window.innerWidth - 0.5) * 2;
          targetY = (e.clientY / window.innerHeight - 0.5) * 2;
        }, { passive: true });

        gsap.ticker.add(() => {
          mouseX += (targetX - mouseX) * 0.08;
          mouseY += (targetY - mouseY) * 0.08;

          // Aakash: calm anchor! strictly max ±3px, ±2.5px
          if (characterPortrait && !CharacterController.isEntrancePlaying) {
            gsap.set(characterPortrait, {
              x: mouseX * 3,
              y: mouseY * 2.5
            });
          }

          // Active role frames subtle architectural 3D response (active center stage only)
          const activeFrames = [frame1, frame2, frame3, frame4];
          activeFrames.forEach(f => {
            if (f && !f.classList.contains('is-stored') && gsap.getProperty(f, 'opacity') > 0.7) {
              gsap.set(f, {
                rotateY: mouseX * 4,
                rotateX: -mouseY * 3
              });
            }
          });

          // Environmental symbols subtle parallax
          const activeEnvSyms = [envSymMarketer, envSymBrand, envSymCreator, envSymSpeaker];
          activeEnvSyms.forEach((sym, i) => {
            if (sym) {
              const factor = i % 2 === 0 ? 4 : 2.5;
              gsap.set(sym, {
                x: mouseX * factor,
                y: mouseY * factor
              });
            }
          });

          // Role spotlight responds gently
          if (roleSpotlight) {
            gsap.set(roleSpotlight, {
              x: mouseX * 8,
              y: mouseY * 6
            });
          }
        });
      }
    });

    // Mobile & Tablet: Native Scroll with Clean Element Reveals
    mm.add("(max-width: 960px)", () => {
      // Backdrop statement lines reveal cleanly on mobile
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
              scrub: 0.35
            }
          }
        );
      });

      // The 4 Editorial Role Frames reveal smoothly without clipping
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
              scrub: 0.35
            }
          }
        );
      });

      // Digi Marketrix Work Transition
      const workTransition = document.getElementById('work-transition-phase');
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
              scrub: 0.4
            }
          }
        );
      }
    });
  }

  // ==========================================================================
  // 5. Professional Anchors & Atmospheric Hover Preview (Sections 15 & 16)
  // Hover shifts title 6-10px horizontally.
  // Large atmospheric preview appears on opposite side (Left viewport).
  // ==========================================================================
  function initAnchorPreviews() {
    const anchorItems = document.querySelectorAll('.hero-anchor-item');
    const previewStage = document.getElementById('hero-hover-preview');
    const previewImg = document.getElementById('hover-preview-img');
    const previewTitle = document.getElementById('hover-preview-title');
    const previewSub = document.getElementById('hover-preview-sub');
    const previewKicker = document.getElementById('hover-preview-kicker');

    if (!anchorItems.length || !previewStage) return;

    const isDesktop = () => window.innerWidth > 960 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    anchorItems.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        if (!isDesktop() || CharacterController.isEntrancePlaying) return;

        // Shift title horizontally ~8px inward
        const titleEl = item.querySelector('.anchor-title');
        if (titleEl) {
          titleEl.style.transform = 'translateX(-8px)';
        }

        // Highlight this item and recede siblings
        anchorItems.forEach(sib => {
          const line = sib.querySelector('.anchor-line');
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

        // Update preview content from data attributes with smooth crossfade
        const previewSrc = item.getAttribute('data-preview');
        const titleText = item.getAttribute('data-title');
        const subText = item.getAttribute('data-sub');
        const kickerText = item.getAttribute('data-kicker');

        if (previewStage.classList.contains('active') && previewImg && previewImg.src !== previewSrc) {
          // Crossfade media smoothly inside existing frame without destroy/recreate
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
          // Smooth 600ms entrance from opacity 0, scale 0.94, translateY 18px, rotateZ -1deg
          previewStage.classList.add('active');
        }
      });

      item.addEventListener('mouseleave', () => {
        if (!isDesktop()) return;

        const titleEl = item.querySelector('.anchor-title');
        if (titleEl) {
          titleEl.style.transform = 'none';
        }

        // Reset anchors: 01 active, others normal
        anchorItems.forEach((sib, sIdx) => {
          sib.classList.remove('receded');
          const line = sib.querySelector('.anchor-line');
          if (sIdx === 0) {
            sib.classList.add('active');
            if (line) line.style.transform = 'scaleX(1)';
          } else {
            sib.classList.remove('active');
            if (line) line.style.transform = 'scaleX(0)';
          }
        });

        // Fade out refined preview card & reset transform to resting state
        previewStage.classList.remove('active');
        previewStage.style.transform = '';
      });
    });

    // Subtle pointer parallax response strictly within safe viewport limits
    // Note: NEVER shift by -50% to prevent pushing the preview out of the left screen edge
    window.addEventListener('mousemove', (e) => {
      if (!isDesktop() || !previewStage.classList.contains('active')) return;
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;
      previewStage.style.transform = `translate(${(normX * 6).toFixed(1)}px, ${(normY * 4).toFixed(1)}px) scale(1) rotate(0deg)`;
    }, { passive: true });
  }

  initAnchorPreviews();

  // 6. Clipboard Helpers & Toast Notifications
  const toast = document.getElementById('toast');
  const directEmail = 'itzaakash15@gmail.com';
  const directPhone = '8590637715';

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2600);
  }

  // Copy Email Buttons
  document.querySelectorAll('.copy-email-btn, #copy-email-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(directEmail);
        showToast(`Email copied: ${directEmail}`);
      } catch (err) {
        showToast(directEmail);
      }
    });
  });

  // Copy Phone Buttons
  document.querySelectorAll('.copy-phone-btn, #copy-phone-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(directPhone);
        showToast(`Phone copied: ${directPhone}`);
      } catch (err) {
        showToast(directPhone);
      }
    });
  });

  // 5. Interactive Proof Modal Lightbox Engine (ProofViewer / MediaViewer)
  const proofModal = document.getElementById('proof-modal');
  const proofModalBackdrop = document.getElementById('proof-modal-backdrop');
  const proofModalClose = document.getElementById('proof-modal-close');
  const proofModalPrev = document.getElementById('proof-modal-prev');
  const proofModalNext = document.getElementById('proof-modal-next');
  const proofModalBadge = document.getElementById('proof-modal-badge');
  const proofModalCounter = document.getElementById('proof-modal-counter');
  const proofModalMedia = document.getElementById('proof-modal-media');
  const proofModalMetaCategory = document.getElementById('proof-modal-meta-category');
  const proofModalMetaPeriod = document.getElementById('proof-modal-meta-period');
  const proofModalTitle = document.getElementById('proof-modal-title');
  const proofModalDesc = document.getElementById('proof-modal-desc');
  const proofModalActions = document.getElementById('proof-modal-actions');

  const proofData = {
    'digi-cert': {
      title: 'Digi Marketrix — Certified Internship Completion',
      category: 'OFFICIAL CREDENTIAL',
      period: 'May 1, 2026 — July 1, 2026 // Tuticorin',
      type: 'image',
      image: 'assets/proofs_optimized/digi_marketrix_certificate.jpg',
      desc: 'Official internship completion certificate issued and signed by Antony Joyson Fernando, CEO of Digi Marketrix. Formally verifies full-time agency experience in commercial scripting, on-location videography, and post-production video editing.',
      linkText: 'View Digi Marketrix LinkedIn ↗',
      linkUrl: 'https://www.linkedin.com/company/digimarketrix/'
    },
    'digi-office': {
      title: 'Digi Marketrix — Agency Studio & 3D Logo Wall',
      category: 'AGENCY ENVIRONMENT',
      period: 'Thoothukudi Studio // Agency Headquarters',
      type: 'image',
      image: 'assets/proofs_optimized/digi_marketrix_office.jpg',
      desc: 'The physical workplace at Digi Marketrix featuring the illuminated 3D logo wall. The creative operations hub where commercial campaigns, client pitches, and video production strategies were formulated.',
      linkText: 'Explore Agency LinkedIn ↗',
      linkUrl: 'https://www.linkedin.com/company/digimarketrix/'
    },
    'digi-working': {
      title: 'Digi Marketrix — In-House Editing & Timeline Workflow',
      category: 'POST-PRODUCTION',
      period: 'Premiere Pro Timeline // Video Editing',
      type: 'image',
      image: 'assets/proofs_optimized/digi_marketrix_working.jpg',
      desc: 'Behind-the-scenes photograph capturing commercial video post-production in Adobe Premiere Pro at Digi Marketrix. Demonstrates multi-layer timeline cutting, rhythm pacing, sound effects, and color grading.',
      linkText: 'Digi Marketrix on LinkedIn ↗',
      linkUrl: 'https://www.linkedin.com/company/digimarketrix/'
    },
    'digi-gimbal': {
      title: 'Digi Marketrix — On-Location Gimbal Videography',
      category: 'FIELD PRODUCTION',
      period: '3-Axis Gimbal Stabilization // Commercial Shoot',
      type: 'image',
      image: 'assets/proofs_optimized/digi_marketrix_gimbal_shoot.jpg',
      desc: 'On-location videography shoot utilizing a 3-axis motorized gimbal for dynamic, fluid commercial camera movement across retail, hospitality, and automotive client spaces.',
      linkText: 'Digi Marketrix on LinkedIn ↗',
      linkUrl: 'https://www.linkedin.com/company/digimarketrix/'
    },
    'digi-video-shooting': {
      title: 'Digi Marketrix — Shooting to Uploading Production Reel',
      category: 'PRODUCTION REEL',
      period: 'End-to-End Workflow // Shoot to Post',
      type: 'video',
      video: 'assets/proofs_optimized/digi_work_shooting_uploading.mp4',
      poster: 'assets/proofs_optimized/poster_digi_shooting_uploading.jpg',
      desc: 'Full workflow record demonstrating the complete creative cycle: storyboard planning, field camera operation, post-production timeline editing, client review, and final digital distribution.',
      linkText: 'Digi Marketrix on LinkedIn ↗',
      linkUrl: 'https://www.linkedin.com/company/digimarketrix/'
    },
    'salemrr-bts': {
      title: 'Salem RR Biriyani — Commercial Shoot Production',
      category: 'CLIENT CAMPAIGN',
      period: 'Thoothukudi // Food & Hospitality',
      type: 'image',
      image: 'assets/proofs_optimized/salemrr_shoot_bts.jpg',
      desc: 'Behind-the-scenes photography during the commercial video shoot for Salem RR Biriyani. Handled on-camera VJ presentation, culinary lighting, and close-up food videography.',
      linkText: 'Watch Reel on Instagram ↗',
      linkUrl: 'https://www.instagram.com/reel/DahRlLUSNZ0/'
    },
    'salemrr-food': {
      title: 'Salem RR Biriyani — Commercial Food Promotion Reel',
      category: 'COMMERCIAL REEL',
      period: 'VJ, Scripting & Editing // Salem RR Biriyani',
      type: 'image',
      image: 'assets/proofs_optimized/salemrr_reel_2848.jpg',
      desc: 'Featured commercial reel frame from Salem RR Biriyani campaign. Seamlessly combined dynamic culinary closeups, pacing, and engaging on-screen VJ storytelling.',
      linkText: 'Watch Reel on Instagram ↗',
      linkUrl: 'https://www.instagram.com/reel/DahRlLUSNZ0/'
    },
    'talentrix-reel': {
      title: 'Talentrix — Sub-Brand Influencer Marketing Reel',
      category: 'SUB-BRAND INITIATIVE',
      period: 'Digi Marketrix Influencer Division',
      type: 'image',
      image: 'assets/proofs_optimized/salemrr_reel_2870.jpg',
      desc: 'Commercial reel produced for Talentrix (@talentrix_), the specialized talent & influencer marketing division under Digi Marketrix, connecting brands with high-retention regional creators.',
      linkText: 'View Reel on Instagram ↗',
      linkUrl: 'https://www.instagram.com/reel/DYhJlysI9Nr/'
    },
    'purple-bts': {
      title: 'Purple Collection — Personal Branding Shoot BTS',
      category: 'PERSONAL BRANDING',
      period: 'Client Production // Fashion & Retail',
      type: 'image',
      image: 'assets/proofs_optimized/purple_collection_bts_large.jpg',
      desc: 'On-location personal branding direction and video capture for Purple Collection. Establishing premium editorial tone, camera framing, and scripted talking points.',
      linkText: 'Visit Client Instagram ↗',
      linkUrl: 'https://www.instagram.com/mr._aku_vlogs/'
    },
    'purple-video': {
      title: 'Purple Collection — Complete Client Campaign Video',
      category: 'CLIENT VIDEO',
      period: 'Direction, Filming & Editing by Aakash',
      type: 'video',
      video: 'assets/proofs_optimized/personal_branding_video.mp4',
      poster: 'assets/proofs_optimized/poster_personal_branding_video.jpg',
      desc: 'Full promotional video conceived, filmed, and edited for Purple Collection. Employs rhythmic pacing, music synchronization, and compelling visual hooks.',
      linkText: 'Visit Client Instagram ↗',
      linkUrl: 'https://www.instagram.com/mr._aku_vlogs/'
    },
    'personal-branding-video': {
      title: 'Personal Branding Client Video — 100% Executed by Aakash',
      category: 'COMMERCIAL VIDEO REEL',
      period: 'Direction, Filming & Editing by Aakash',
      type: 'video',
      video: 'assets/proofs_optimized/personal_branding_video.mp4',
      poster: 'assets/proofs_optimized/poster_personal_branding_video.jpg',
      desc: 'Complete commercial video planned, scripted, shot, and edited by Aakash. Incorporates high-retention hook architecture, sound design, and narrative pacing.',
      linkText: 'Explore Selected Work ↗',
      linkUrl: '#clients'
    },
    'purple-growth': {
      title: 'Purple Collection — Verified +3,000 Reach Growth',
      category: 'ANALYTICS & RESULTS',
      period: 'Meta Business Suite Analytics Screenshot',
      type: 'image',
      image: 'assets/proofs_optimized/purple_collection_growth_3000.jpg',
      desc: 'Verified platform metrics showing a 3,000+ follower and impression increase following the targeted personal branding content release for the client.',
      linkText: 'Visit Client Profile ↗',
      linkUrl: 'https://www.instagram.com/mr._aku_vlogs/'
    },
    'jayashakthi-site': {
      title: 'Jayashakthi Tours & Travels — Commercial Web Platform',
      category: 'WEB ENGINEERING',
      period: 'Live Production Deployment // Responsive Architecture',
      type: 'image',
      image: 'assets/proofs_optimized/jayashakthi_website.jpg',
      desc: 'Production commercial web portal built for Jayashakthi Tours & Travels, featuring responsive fleet showcase, inquiry workflows, and administrative management.',
      linkText: 'Visit Live Website ↗',
      linkUrl: 'https://www.jayashakthitoursandtravels.com/'
    },
    'tech-jayashakthi': {
      title: 'Jayashakthi Tours & Travels — Full-Stack Deployment',
      category: 'WEB ENGINEERING',
      period: 'Deployed Commercial Platform',
      type: 'image',
      image: 'assets/proofs_optimized/jayashakthi_website.jpg',
      desc: 'Complete commercial website deployed for regional tour operator, engineered with lightweight vanilla stack, fast page load speeds, and intuitive booking inquiries.',
      linkText: 'Visit Live Website ↗',
      linkUrl: 'https://www.jayashakthitoursandtravels.com/'
    },
    'chinnadurai-scripting': {
      title: 'Chinnadurai Textiles — Commercial Scripting Document',
      category: 'SCRIPTING & STRATEGY',
      period: 'Pre-Production Concept & Script',
      type: 'image',
      image: 'assets/proofs_optimized/chinnadurai_scripting.jpg',
      desc: 'Pre-production concept and script notes for retail commercial content. Outlined visual hooks, sequence transitions, and promotional call-to-actions.',
      linkText: 'Explore Selected Work ↗',
      linkUrl: '#other-work'
    },
    'chinnadurai-retention': {
      title: 'Chinnadurai Textiles — Audience Retention Analytics',
      category: 'RETENTION ANALYTICS',
      period: '10K–15K Organic Views // Non-Paid',
      type: 'image',
      image: 'assets/proofs_optimized/chinnadurai_retention.jpg',
      desc: 'Analytics graph demonstrating sustained organic viewership and high watch time for Chinnadurai Textiles video campaigns, generated without paid ad spend.',
      linkText: 'Explore Selected Work ↗',
      linkUrl: '#other-work'
    },
    'vedha-rice': {
      title: 'Vedha Rice — Commercial VJ Reel Frame',
      category: 'BRAND PROMOTION',
      period: 'Commercial VJ & Scripting // FMCG',
      type: 'image',
      image: 'assets/proofs_optimized/vedha_rice_vj.jpg',
      desc: 'On-screen commercial presentation for Vedha Rice, delivering clear brand value, quality differentiation, and engaging regional consumer connection.',
      linkText: 'Explore Selected Work ↗',
      linkUrl: '#other-work'
    },
    'lwa-views': {
      title: 'Life With Aakash — 59K Peak Viewership Analytics',
      category: 'ORGANIC METRICS',
      period: '59.1K Impressions // Organic Audience Retention',
      type: 'image',
      image: 'assets/proofs_optimized/lwa_organic_views.jpg',
      desc: 'Verified platform insights displaying 59.1K organic views on Life With Aakash motivational reel, proving hook retention and viral distribution mechanics.',
      linkText: 'Visit @life.with_aakash ↗',
      linkUrl: 'https://www.instagram.com/life.with_aakash?stkn=MXcwa2ZraGllYXBuOA=='
    },
    'lwa-profile': {
      title: 'Life With Aakash — Official Instagram Profile',
      category: 'CREATOR PLATFORM',
      period: '@life.with_aakash // Motivational Content',
      type: 'image',
      image: 'assets/proofs_optimized/lwa_page.jpg',
      desc: 'Dedicated personal growth and motivational communication platform. Features original reflections, spoken-word perspectives, and life mindset lessons.',
      linkText: 'Visit @life.with_aakash ↗',
      linkUrl: 'https://www.instagram.com/life.with_aakash?stkn=MXcwa2ZraGllYXBuOA=='
    },
    'lwa-feedback': {
      title: 'Life With Aakash — Community Direct Feedback & DMs',
      category: 'AUDIENCE TRUST',
      period: 'Verified Direct Messages & Viewer Feedback',
      type: 'image',
      image: 'assets/proofs_optimized/lwa_congrats_IMG_2888.jpg',
      desc: 'Direct responses and messages from viewers appreciating the clarity, motivation, and practical mindset advice shared through Life With Aakash videos.',
      linkText: 'Visit @life.with_aakash ↗',
      linkUrl: 'https://www.instagram.com/life.with_aakash?stkn=MXcwa2ZraGllYXBuOA=='
    },
    'award-business-excellence': {
      title: 'Twin Heart Business Excellence Award',
      category: 'VERIFIED RECOGNITION',
      period: 'Stage Presentation // Excellence Trophy & Certificate',
      type: 'image',
      image: 'assets/proofs_optimized/award_1_business_excellence.jpg',
      desc: 'Prestigious Twin Heart Business Excellence Award presented on stage for outstanding contribution in digital marketing, brand promotion, and creative execution.',
      linkText: 'Explore Journey Timeline ↗',
      linkUrl: '#journey'
    },
    'award-talent-competition': {
      title: 'State Level Talent Competition 2025 Award',
      category: 'STAGE HONORS',
      period: '2025 // State Level Recognition',
      type: 'image',
      image: 'assets/proofs_optimized/award_2_talent_competition.jpg',
      desc: 'State-level recognition honoring creative communication, visual storytelling, and digital content impact at the 2025 talent competition.',
      linkText: 'Explore Journey Timeline ↗',
      linkUrl: '#journey'
    },
    'award-talent-video': {
      title: 'State Level Talent Competition 2025 — Stage Ceremony Video',
      category: 'STAGE CEREMONY',
      period: 'Live On-Stage Award Presentation',
      type: 'video',
      video: 'assets/proofs_optimized/award_2_video.mov',
      poster: 'assets/proofs_optimized/poster_award2_video.jpg',
      desc: 'Live stage recording capturing the announcement and presentation of the 2025 State Level Talent Competition award.',
      linkText: 'Explore Journey Timeline ↗',
      linkUrl: '#journey'
    },
    'mraku-joined': {
      title: 'Mr Aku Vlogs — Account Creation & Early Origin (2020)',
      category: 'CREATOR ARCHIVE',
      period: 'Instagram Joined Record // September 2020',
      type: 'image',
      image: 'assets/proofs_optimized/mr_aku_joined_proof.jpg',
      desc: 'Official platform proof showing the account creation date in 2020. Verifies the authentic five-year foundation in digital video, audience growth, and content creation.',
      linkText: 'Visit @mr._aku_vlogs ↗',
      linkUrl: 'https://www.instagram.com/mr._aku_vlogs/'
    },
    'mraku-profile': {
      title: 'Mr Aku Vlogs — Verified Creator Profile (2,177+ Followers)',
      category: 'CREATOR ARCHIVE',
      period: '2,177+ Verified Followers // 332 Posts',
      type: 'image',
      image: 'assets/proofs_optimized/mr_aku_instagram_page.jpg',
      desc: 'Primary creator channel demonstrating consistent multi-year publishing, regional food reviews, local brand promotions, and creator collaborations.',
      linkText: 'Visit @mr._aku_vlogs ↗',
      linkUrl: 'https://www.instagram.com/mr._aku_vlogs/'
    },
    'mraku-vj': {
      title: 'Mr Aku Vlogs — On-Camera VJ Mic Field Shoot',
      category: 'FIELD PRODUCTION',
      period: 'Live VJ Mic Presentation // Street Interviews',
      type: 'image',
      image: 'assets/proofs_optimized/mr_aku_vj_shoot.jpg',
      desc: 'On-camera hosting and street interview coverage for Mr Aku Vlogs, mastering quick audience engagement, improvised dialogue, and live event energy.',
      linkText: 'Visit @mr._aku_vlogs ↗',
      linkUrl: 'https://www.instagram.com/mr._aku_vlogs/'
    },
    'mraku-roshan': {
      title: 'Music Album Video Shoot with Actor Roshan',
      category: 'MEDIA COLLABORATION',
      period: 'Cinema & Music Album Production',
      type: 'image',
      image: 'assets/proofs_optimized/album_song_shoot_roshan.jpg',
      desc: 'Collaborative shoot alongside actor Roshan during production of a commercial music album video, integrating cinematic direction with high-tempo performance.',
      linkText: 'Visit @mr._aku_vlogs ↗',
      linkUrl: 'https://www.instagram.com/mr._aku_vlogs/'
    },
    'mraku-paranthu': {
      title: 'Movie Promotion // Paranthu Po',
      category: 'CINEMA PROMOTION',
      period: 'Film Promotional Interview & Creator Coverage',
      type: 'image',
      image: 'assets/proofs_optimized/movie_paranthu_po.jpg',
      desc: 'Promotional interview and digital media coverage for the Tamil film Paranthu Po, connecting the film\'s cast with regional digital audiences.',
      linkText: 'Visit @mr._aku_vlogs ↗',
      linkUrl: 'https://www.instagram.com/mr._aku_vlogs/'
    },
    'mraku-tourist': {
      title: 'Film Collaboration // Tourist Family',
      category: 'CINEMA PROMOTION',
      period: 'Entertainment & Cinema Promotional Coverage',
      type: 'image',
      image: 'assets/proofs_optimized/movie_tourist_family.jpg',
      desc: 'Entertainment media shoot and promotional interview coverage for the movie Tourist Family, expanding creator reach into mainstream Tamil cinema.',
      linkText: 'Visit @mr._aku_vlogs ↗',
      linkUrl: 'https://www.instagram.com/mr._aku_vlogs/'
    },
    'mraku-nayanthara': {
      title: 'Nayanthara Production Collaboration Shoot',
      category: 'PRODUCTION COLLABORATION',
      period: 'Commercial Production Shoot with Leading Banner',
      type: 'image',
      image: 'assets/proofs_optimized/mr_aku_nayanthara_production.jpg',
      desc: 'Commercial collaboration shoot linked with a major production associated with actress Nayanthara, executing creative promotional formats.',
      linkText: 'Visit @mr._aku_vlogs ↗',
      linkUrl: 'https://www.instagram.com/mr._aku_vlogs/'
    },
    'mraku-bts-video': {
      title: 'Mr Aku Vlogs Production BTS',
      category: 'BTS VIDEO',
      period: 'Behind-the-Scenes Camera Setups & Filming',
      type: 'video',
      video: 'assets/proofs_optimized/mr_aku_bts.mov',
      poster: 'assets/proofs_optimized/poster_mr_aku_bts.jpg',
      desc: 'Behind-the-scenes recording revealing on-location camera setups, lighting, mobile gear, and spontaneous content creation in the field.',
      linkText: 'Visit @mr._aku_vlogs ↗',
      linkUrl: 'https://www.instagram.com/mr._aku_vlogs/'
    },
    'mraku-promo-1': {
      title: 'Mr Aku Vlogs — Retail Store Promotion Campaign',
      category: 'SHOP PROMOTION',
      period: 'Regional Commercial Client Promotion',
      type: 'image',
      image: 'assets/proofs_optimized/mr_aku_promo_2876.jpg',
      desc: 'High-impact promotional campaign video for regional retail store, featuring product demonstrations, offer announcements, and store walk-throughs.',
      linkText: 'Visit @mr._aku_vlogs ↗',
      linkUrl: 'https://www.instagram.com/mr._aku_vlogs/'
    },
    'tech-mineguardian': {
      title: 'MineGuardian / MineCore — Autonomous Underground Rover',
      category: 'AI & HARDWARE TELEMETRY',
      period: 'Smart India Hackathon // IoT & Sensor Fusion',
      type: 'image',
      image: 'assets/lab_mineguardian.jpg',
      desc: 'Hazardous underground coal mine rover concept designed to monitor toxic methane (MQ-4), temperature (DHT22), and structural cave-in vibrations. Transmits real-time environmental telemetry to an emergency dashboard before miners enter hazardous shafts.',
      linkText: 'Explore Digital Lab ↗',
      linkUrl: 'lab.html#mineguardian'
    }
  };

  const proofKeys = Object.keys(proofData);
  let currentProofIndex = 0;

  // Single-Video playback controller: pause all other videos when one plays
  function pauseAllVideos(exceptVideo = null) {
    document.querySelectorAll('video').forEach(vid => {
      if (vid !== exceptVideo && !vid.paused) {
        vid.pause();
      }
    });
  }

  function renderProofItem(key) {
    const item = proofData[key];
    if (!item) return;

    currentProofIndex = proofKeys.indexOf(key);
    if (currentProofIndex === -1) currentProofIndex = 0;

    // Pause any other playing video
    pauseAllVideos();

    if (proofModalBadge) proofModalBadge.textContent = item.category;
    if (proofModalCounter) {
      const currentNum = String(currentProofIndex + 1).padStart(2, '0');
      const totalNum = String(proofKeys.length).padStart(2, '0');
      proofModalCounter.textContent = `${currentNum} / ${totalNum}`;
    }
    if (proofModalMetaCategory) proofModalMetaCategory.textContent = item.category;
    if (proofModalMetaPeriod) proofModalMetaPeriod.textContent = item.period;
    if (proofModalTitle) proofModalTitle.textContent = item.title;
    if (proofModalDesc) proofModalDesc.textContent = item.desc;

    // Media presentation
    if (proofModalMedia) {
      if (item.type === 'video') {
        proofModalMedia.innerHTML = `
          <video class="proof-modal-video" controls playsinline poster="${item.poster || ''}">
            <source src="${item.video}" type="video/mp4">
            <source src="${item.video}" type="video/quicktime">
            Your browser does not support HTML5 video.
          </video>
        `;
        const modalVid = proofModalMedia.querySelector('video');
        if (modalVid) {
          modalVid.addEventListener('play', () => pauseAllVideos(modalVid));
          // Attempt playback safely
          modalVid.play().catch(() => {});
        }
      } else {
        proofModalMedia.innerHTML = `
          <img src="${item.image}" alt="${item.title}" class="proof-modal-image" />
        `;
      }
    }

    // External action button
    if (proofModalActions) {
      if (item.linkUrl) {
        const isExternal = item.linkUrl.startsWith('http');
        proofModalActions.innerHTML = `
          <a href="${item.linkUrl}" target="${isExternal ? '_blank' : '_self'}" rel="${isExternal ? 'noopener noreferrer' : ''}" class="proof-external-btn">
            <span>${item.linkText || 'VIEW ORIGINAL ↗'}</span>
          </a>
        `;
      } else {
        proofModalActions.innerHTML = '';
      }
    }
  }

  function openProofModal(key) {
    if (!proofModal) return;
    renderProofItem(key);
    proofModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProofModal() {
    if (!proofModal) return;
    // Pause video in modal before closing
    if (proofModalMedia) {
      const vid = proofModalMedia.querySelector('video');
      if (vid) vid.pause();
    }
    proofModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navigateProof(direction) {
    if (proofKeys.length === 0) return;
    currentProofIndex = (currentProofIndex + direction + proofKeys.length) % proofKeys.length;
    renderProofItem(proofKeys[currentProofIndex]);
  }

  // Trigger clicks
  document.querySelectorAll('[data-proof]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const key = trigger.getAttribute('data-proof');
      openProofModal(key);
    });
  });

  // Delegated click handler ensuring all dynamic/drawer [data-proof] triggers open smoothly
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-proof]');
    if (trigger) {
      const key = trigger.getAttribute('data-proof');
      if (key && proofData[key]) {
        e.preventDefault();
        openProofModal(key);
      }
    }
  });

  if (proofModalClose) proofModalClose.addEventListener('click', closeProofModal);
  if (proofModalBackdrop) proofModalBackdrop.addEventListener('click', closeProofModal);
  if (proofModalPrev) proofModalPrev.addEventListener('click', () => navigateProof(-1));
  if (proofModalNext) proofModalNext.addEventListener('click', () => navigateProof(1));

  // Global Keyboard listener: ESC to close, Left/Right arrows to cycle
  window.addEventListener('keydown', (e) => {
    if (!proofModal || !proofModal.classList.contains('active')) return;
    if (e.key === 'Escape') {
      closeProofModal();
    } else if (e.key === 'ArrowLeft') {
      navigateProof(-1);
    } else if (e.key === 'ArrowRight') {
      navigateProof(1);
    }
  });

  // Global video playback coordination: single video active
  document.querySelectorAll('video').forEach(vid => {
    vid.addEventListener('play', () => pauseAllVideos(vid));
  });

  // 6. Proof Vault Tab Filtering (Multi-category support for .proof-wall-item and .proof-card)
  const filterBtns = document.querySelectorAll('.proof-filter-btn');
  const proofCards = document.querySelectorAll('.proof-wall-item, .proof-card');

  if (filterBtns.length > 0 && proofCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = (btn.getAttribute('data-filter') || 'all').toLowerCase();

        proofCards.forEach(card => {
          const category = (card.getAttribute('data-category') || '').toLowerCase();
          const categories = category.split(/\s+/);
          if (filter === 'all' || categories.includes(filter)) {
            card.style.display = 'flex';
            setTimeout(() => { card.style.opacity = '1'; }, 20);
          } else {
            card.style.opacity = '0';
            setTimeout(() => { card.style.display = 'none'; }, 200);
          }
        });
      });
    });
  }

  // 7. Interactive Journey System (Career Progression & Inspector Panel)
  const journeyNodes = document.querySelectorAll('.journey-node');
  const panelYear = document.getElementById('panel-year');
  const panelRole = document.getElementById('panel-role');
  const panelCompany = document.getElementById('panel-company');
  const panelSkills = document.getElementById('panel-skills');
  const panelProofBtn = document.getElementById('panel-proof-btn');

  if (journeyNodes.length > 0) {
    journeyNodes.forEach(node => {
      node.addEventListener('click', () => {
        journeyNodes.forEach(n => n.classList.remove('active'));
        node.classList.add('active');

        const year = node.getAttribute('data-year') || '';
        const role = node.getAttribute('data-role') || '';
        const company = node.getAttribute('data-company') || '';
        const rawSkills = node.getAttribute('data-skills') || '';
        const skills = rawSkills.split(',').map(s => s.trim()).filter(Boolean);
        const proofKey = node.getAttribute('data-proof') || '';

        if (panelYear) panelYear.textContent = year;
        if (panelRole) panelRole.textContent = role;
        if (panelCompany) panelCompany.textContent = company;

        if (panelSkills) {
          panelSkills.innerHTML = skills.map(skill => `<span class="editorial-role-tag">${skill.toUpperCase()}</span>`).join('');
        }

        if (panelProofBtn) {
          if (proofKey) {
            panelProofBtn.setAttribute('data-proof', proofKey);
            panelProofBtn.style.display = 'inline-flex';
          } else {
            panelProofBtn.style.display = 'none';
          }
        }
      });
    });
  }

  // 8. Digi Marketrix Chapter Scroll Spy & Smooth Navigation
  const chapterNavLinks = document.querySelectorAll('.chapter-nav-item');
  const chapterCards = document.querySelectorAll('.case-chapter-card');

  if (chapterNavLinks.length > 0 && chapterCards.length > 0) {
    chapterNavLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetEl = targetId ? document.querySelector(targetId) : null;
        if (targetEl) {
          const headerOffset = 115;
          const elementPosition = targetEl.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - headerOffset,
            behavior: 'smooth'
          });
        }
      });
    });

    if ('IntersectionObserver' in window) {
      const chapterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            chapterNavLinks.forEach(link => {
              const href = (link.getAttribute('href') || '').replace('#', '');
              link.classList.toggle('active', href === id);
            });
          }
        });
      }, {
        rootMargin: '-20% 0px -55% 0px',
        threshold: 0.1
      });

      chapterCards.forEach(card => chapterObserver.observe(card));
    }
  }

  // 9. Motivational Speaking Horizontal Gallery Wheel & Drag Handling
  const speakingViewport = document.querySelector('.speaking-horizontal-viewport');
  if (speakingViewport) {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    speakingViewport.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - speakingViewport.offsetLeft;
      scrollLeft = speakingViewport.scrollLeft;
    });

    window.addEventListener('mouseup', () => {
      isDown = false;
    });

    speakingViewport.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - speakingViewport.offsetLeft;
      const walk = (x - startX) * 1.6;
      speakingViewport.scrollLeft = scrollLeft - walk;
    });
  }

  // 10. Scroll Progress Indicator Line
  const scrollProgress = document.getElementById('scroll-progress');
  function updateScrollProgress() {
    if (!scrollProgress) return;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    scrollProgress.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // 10b. Interactive Project Index Preview System (#clients & #other-work)
  // Hovering over a project row updates the sticky preview pane media & meta
  function initProjectIndexPreview() {
    const rows = document.querySelectorAll('.horizontal-project-row, .index-row-item');
    const previewImg = document.getElementById('editorial-preview-img') || document.getElementById('project-preview-img');
    const previewCat = document.getElementById('editorial-preview-cat') || document.getElementById('project-preview-cat');
    const previewTitle = document.getElementById('editorial-preview-title') || document.getElementById('project-preview-title');
    const previewScope = document.getElementById('editorial-preview-scope');

    if (!rows.length || !previewImg) return;

    rows.forEach(row => {
      const updatePreview = () => {
        rows.forEach(r => r.classList.remove('active-index'));
        row.classList.add('active-index');

        const imgSrc = row.getAttribute('data-preview-img');
        const cat = row.getAttribute('data-preview-cat');
        const title = row.getAttribute('data-preview-title');
        const scope = row.getAttribute('data-preview-scope');

        if (imgSrc && !previewImg.src.endsWith(imgSrc)) {
          previewImg.style.opacity = '0.3';
          previewImg.style.transform = 'scale(0.985)';
          setTimeout(() => {
            previewImg.src = imgSrc;
            previewImg.style.opacity = '1';
            previewImg.style.transform = 'scale(1)';
          }, 110);
        }

        if (previewCat && cat) previewCat.textContent = cat;
        if (previewTitle && title) previewTitle.textContent = title;
        if (previewScope && scope) previewScope.textContent = scope;
      };

      row.addEventListener('mouseenter', updatePreview);
      row.addEventListener('click', updatePreview);
    });
  }
  initProjectIndexPreview();

  // 10bb. Editorial Slide-Over Drawers (Full Case Study Depth)
  function initEditorialDrawers() {
    const openBtns = document.querySelectorAll('.open-drawer-btn');
    const closeBtns = document.querySelectorAll('[data-close-drawer]');
    const allDrawers = document.querySelectorAll('.editorial-drawer-overlay');

    function closeAllDrawers() {
      allDrawers.forEach(drawer => {
        drawer.classList.remove('active');
        drawer.setAttribute('aria-hidden', 'true');
      });
      document.body.style.overflow = '';
    }

    openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const drawerId = btn.getAttribute('data-drawer');
        const targetDrawer = document.getElementById(drawerId);
        if (targetDrawer) {
          closeAllDrawers();
          targetDrawer.classList.add('active');
          targetDrawer.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    closeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        closeAllDrawers();
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const activeDrawer = document.querySelector('.editorial-drawer-overlay.active');
        if (activeDrawer && (!proofModal || !proofModal.classList.contains('active'))) {
          closeAllDrawers();
        }
      }
    });
  }
  initEditorialDrawers();

  // 10c. The Journey Chronology Rail Scroll-Spy & Interactive Chapter Nav
  // 2020 ━━━ 2021–22 ━━━ 2023 ━━━ 2024 ━━━ 2025 ━━━ 2026 / NOW ━━━ NEXT →
  function initJourneyTimelineRail() {
    const railBtns = document.querySelectorAll('.journey-rail-btn');
    const yearBlocks = document.querySelectorAll('.journey-year-block, .journey-next-transition-block');

    if (!railBtns.length) return;

    // Click handler for smooth navigation to year chapter
    railBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetId = btn.getAttribute('data-target');
        if (!targetId) return;

        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          const headerOffset = 110;
          const targetY = targetEl.getBoundingClientRect().top + window.scrollY - headerOffset;
          window.scrollTo({
            top: targetY,
            behavior: 'smooth'
          });
        }
      });
    });

    // Scroll-spy with IntersectionObserver
    if ('IntersectionObserver' in window && yearBlocks.length > 0) {
      const railObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const chapterId = entry.target.id;
            railBtns.forEach(btn => {
              const matches = btn.getAttribute('data-target') === chapterId;
              btn.classList.toggle('active', matches);
            });
          }
        });
      }, {
        rootMargin: '-25% 0px -50% 0px',
        threshold: 0.1
      });

      yearBlocks.forEach(block => railObserver.observe(block));
    }
  }
  initJourneyTimelineRail();

  // 10d. Header & Drawer Navigation Scroll-Spy (Storytelling Order)
  // WORK → SPEAKING → CREATOR → JOURNEY → PROOF → ABOUT
  const navLinks = document.querySelectorAll('.nav-center-links .nav-link, .mobile-drawer .nav-link');

  const navSectionMap = [
    { id: 'about', target: 'about' },
    { id: 'vision', target: 'about' },
    { id: 'proof', target: 'proof' },
    { id: 'journey', target: 'journey' },
    { id: 'creator', target: 'creator' },
    { id: 'speaking', target: 'speaking' },
    { id: 'branding', target: 'work' },
    { id: 'experience', target: 'work' },
    { id: 'work', target: 'work' }
  ];

  let isNavScrolling = false;

  function updateActiveNav() {
    if (isNavScrolling || !navLinks.length) return;

    // In the hero top area, no section link should be active
    if (window.scrollY < 250) {
      navLinks.forEach(link => link.classList.remove('active'));
      return;
    }

    const headerOffset = 180;
    let currentTarget = null;

    for (const item of navSectionMap) {
      const el = document.getElementById(item.id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= headerOffset && rect.bottom > 80) {
          currentTarget = item.target;
          break;
        }
      }
    }

    navLinks.forEach(link => {
      const href = (link.getAttribute('href') || '').replace('#', '');
      link.classList.toggle('active', href === currentTarget);
    });
  }

  let navSpyTicking = false;
  window.addEventListener('scroll', () => {
    if (!navSpyTicking) {
      requestAnimationFrame(() => {
        updateActiveNav();
        navSpyTicking = false;
      });
      navSpyTicking = true;
    }
  }, { passive: true });
  updateActiveNav();

  // 10e. Controlled Smooth Anchor Navigation with Pin-Aware Layout Recalculation
  function scrollToAnchor(targetEl, smooth = true) {
    if (!targetEl) return;

    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }

    const headerOffset = 90;
    const rect = targetEl.getBoundingClientRect();
    const targetPos = Math.max(0, rect.top + window.scrollY - headerOffset);

    // Update active nav link immediately to match target
    const targetId = targetEl.id;
    const mappedTarget = navSectionMap.find(m => m.id === targetId)?.target || targetId;
    navLinks.forEach(link => {
      const href = (link.getAttribute('href') || '').replace('#', '');
      link.classList.toggle('active', href === mappedTarget);
    });

    if (!smooth) {
      window.scrollTo({ top: targetPos, behavior: 'instant' });
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
      return;
    }

    isNavScrolling = true;
    const startPos = window.scrollY;
    const distance = targetPos - startPos;
    const duration = Math.min(850, Math.max(400, Math.abs(distance) * 0.045));
    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease in-out cubic
      const ease = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startPos + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        window.scrollTo(0, targetPos);
        isNavScrolling = false;
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.refresh();
        }
        updateActiveNav();
      }
    }

    requestAnimationFrame(step);
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        if (history.pushState) {
          history.pushState(null, '', href);
        }
        scrollToAnchor(target, true);
      }
    });
  });

  // Handle URL hash on initial page load (prevent getting trapped in pinned hero spacer)
  function handleInitialHash() {
    if (window.location.hash && window.location.hash !== '#') {
      const target = document.querySelector(window.location.hash);
      if (target) {
        if ('scrollRestoration' in history) {
          history.scrollRestoration = 'manual';
        }
        scrollToAnchor(target, false);
        setTimeout(() => {
          scrollToAnchor(target, false);
        }, 150);
        setTimeout(() => {
          scrollToAnchor(target, false);
        }, 500);
      }
    }
  }

  handleInitialHash();
  window.addEventListener('load', handleInitialHash);
  window.addEventListener('hashchange', () => {
    if (window.location.hash && window.location.hash !== '#') {
      const target = document.querySelector(window.location.hash);
      if (target) {
        scrollToAnchor(target, true);
      }
    }
  });

  // 11. Subtle Contextual Cursor Badge ([data-cursor])
  const cursorBadge = document.getElementById('cursor-badge');
  const cursorBadgeText = document.getElementById('cursor-badge-text');
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  if (cursorBadge && !isTouchDevice && window.innerWidth > 960) {
    let badgeX = 0;
    let badgeY = 0;
    let targetBadgeX = 0;
    let targetBadgeY = 0;
    let isBadgeMoving = false;

    const renderBadge = () => {
      badgeX += (targetBadgeX - badgeX) * 0.25;
      badgeY += (targetBadgeY - badgeY) * 0.25;
      cursorBadge.style.left = `${badgeX}px`;
      cursorBadge.style.top = `${badgeY}px`;

      if (Math.abs(targetBadgeX - badgeX) > 0.1 || Math.abs(targetBadgeY - badgeY) > 0.1) {
        requestAnimationFrame(renderBadge);
      } else {
        isBadgeMoving = false;
      }
    };

    window.addEventListener('mousemove', (e) => {
      targetBadgeX = e.clientX + 16;
      targetBadgeY = e.clientY + 16;
      if (!isBadgeMoving) {
        isBadgeMoving = true;
        requestAnimationFrame(renderBadge);
      }
    }, { passive: true });

    document.querySelectorAll('[data-cursor]').forEach(item => {
      item.addEventListener('mouseenter', () => {
        const text = item.getAttribute('data-cursor') || 'VIEW';
        if (cursorBadgeText) cursorBadgeText.textContent = text;
        cursorBadge.classList.add('visible');
      });
      item.addEventListener('mouseleave', () => {
        cursorBadge.classList.remove('visible');
      });
    });
  }

  // 12. Subtle Desktop Magnetic Button Interaction
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.innerWidth > 960) {
    document.querySelectorAll('.btn-editorial, .btn-editorial-outline, .nav-connect-btn, .proof-pill-btn').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.18;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.18;
        btn.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate3d(0, 0, 0)';
      });
    });
  }

  // 13. Contact Form Handler (Clean Mailto Generation with Aakash Greeting)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('[name="name"]')?.value.trim();
      const email = contactForm.querySelector('[name="email"]')?.value.trim();
      const category = contactForm.querySelector('[name="category"]')?.value.trim() || 'Project Inquiry';
      const message = contactForm.querySelector('[name="message"]')?.value.trim();

      if (!name || !email || !message) {
        showToast('Please complete all required fields.');
        return;
      }

      showToast('Opening email client...');
      const subject = `[${category}] Inquiry from ${name}`;
      const body = `Hi Aakash,\n\nName: ${name}\nEmail: ${email}\nCategory: ${category}\n\nMessage:\n${message}\n`;
      const mailtoUrl = `mailto:${directEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 400);
      contactForm.reset();
    });
  }

  // 14. Dynamic Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ==========================================================================
  // 15. Centralized Spatial Pointer & Depth Parallax Engine
  // Background: 1–2px, Midground: 3–5px with max 1.5° tilt, Foreground: 5–8px
  // ==========================================================================
  function initSpatialPointerEngine() {
    const isDesktop = () => window.innerWidth > 960 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isTouch || !isDesktop()) return;

    const root = document.documentElement;
    const spotlightEl = document.getElementById('speaking-spotlight');
    const contactSpotlight = document.querySelector('.contact-warm-spotlight');

    const state = {
      // Background (1-2px)
      bgX: 0, bgY: 0,
      targetBgX: 0, targetBgY: 0,
      // Midground (3-5px + tilt)
      midX: 0, midY: 0, tiltX: 0, tiltY: 0,
      targetMidX: 0, targetMidY: 0, targetTiltX: 0, targetTiltY: 0,
      // Foreground (5-8px)
      fgX: 0, fgY: 0,
      targetFgX: 0, targetFgY: 0,
      // Spotlights
      spotlightX: 0, spotlightY: 0,
      targetSpotlightX: 0, targetSpotlightY: 0
    };

    let isRunning = false;
    const lerp = 0.065; // smooth damping inertia

    function update() {
      // Background
      state.bgX += (state.targetBgX - state.bgX) * lerp;
      state.bgY += (state.targetBgY - state.bgY) * lerp;
      // Midground
      state.midX += (state.targetMidX - state.midX) * lerp;
      state.midY += (state.targetMidY - state.midY) * lerp;
      state.tiltX += (state.targetTiltX - state.tiltX) * lerp;
      state.tiltY += (state.targetTiltY - state.tiltY) * lerp;
      // Foreground
      state.fgX += (state.targetFgX - state.fgX) * lerp;
      state.fgY += (state.targetFgY - state.fgY) * lerp;
      // Spotlights
      state.spotlightX += (state.targetSpotlightX - state.spotlightX) * (lerp * 0.8);
      state.spotlightY += (state.targetSpotlightY - state.spotlightY) * (lerp * 0.8);

      // Apply CSS custom properties
      root.style.setProperty('--depth-bg-x', `${state.bgX.toFixed(2)}px`);
      root.style.setProperty('--depth-bg-y', `${state.bgY.toFixed(2)}px`);
      root.style.setProperty('--depth-mid-x', `${state.midX.toFixed(2)}px`);
      root.style.setProperty('--depth-mid-y', `${state.midY.toFixed(2)}px`);
      root.style.setProperty('--tilt-x', `${state.tiltX.toFixed(2)}deg`);
      root.style.setProperty('--tilt-y', `${state.tiltY.toFixed(2)}deg`);
      root.style.setProperty('--depth-fg-x', `${state.fgX.toFixed(2)}px`);
      root.style.setProperty('--depth-fg-y', `${state.fgY.toFixed(2)}px`);

      if (spotlightEl) {
        spotlightEl.style.transform = `translate3d(${state.spotlightX.toFixed(2)}px, ${state.spotlightY.toFixed(2)}px, 0)`;
      }
      if (contactSpotlight) {
        contactSpotlight.style.transform = `translate3d(${state.spotlightX.toFixed(2)}px, ${state.spotlightY.toFixed(2)}px, 0)`;
      }

      const diff = Math.abs(state.targetBgX - state.bgX) +
                   Math.abs(state.targetBgY - state.bgY) +
                   Math.abs(state.targetMidX - state.midX) +
                   Math.abs(state.targetMidY - state.midY) +
                   Math.abs(state.targetFgX - state.fgX) +
                   Math.abs(state.targetFgY - state.fgY);

      if (diff > 0.005) {
        requestAnimationFrame(update);
      } else {
        isRunning = false;
      }
    }

    function onPointerMove(e) {
      if (!isDesktop()) return;
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;

      // Background: 1–2px
      state.targetBgX = normX * 1.8;
      state.targetBgY = normY * 1.2;

      // Midground: 3–5px, tilt maximum ~1.4°
      state.targetMidX = normX * 4.2;
      state.targetMidY = normY * 3.0;
      state.targetTiltX = -normY * 1.4;
      state.targetTiltY = normX * 1.4;

      // Foreground: 5–8px
      state.targetFgX = normX * 6.5;
      state.targetFgY = normY * 4.5;

      // Lighting origin shift
      state.targetSpotlightX = normX * 22;
      state.targetSpotlightY = normY * 14;

      if (!isRunning) {
        isRunning = true;
        requestAnimationFrame(update);
      }
    }

    function onPointerLeave() {
      state.targetBgX = 0; state.targetBgY = 0;
      state.targetMidX = 0; state.targetMidY = 0;
      state.targetTiltX = 0; state.targetTiltY = 0;
      state.targetFgX = 0; state.targetFgY = 0;
      state.targetSpotlightX = 0; state.targetSpotlightY = 0;

      if (!isRunning) {
        isRunning = true;
        requestAnimationFrame(update);
      }
    }

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('mouseleave', onPointerLeave, { passive: true });
    window.addEventListener('resize', () => {
      if (!isDesktop()) {
        root.style.setProperty('--depth-bg-x', '0px');
        root.style.setProperty('--depth-bg-y', '0px');
        root.style.setProperty('--depth-mid-x', '0px');
        root.style.setProperty('--depth-mid-y', '0px');
        root.style.setProperty('--tilt-x', '0deg');
        root.style.setProperty('--tilt-y', '0deg');
        root.style.setProperty('--depth-fg-x', '0px');
        root.style.setProperty('--depth-fg-y', '0px');
      }
    });
  }
  initSpatialPointerEngine();

  // ==========================================================================
  // 16. Proof Over Promises: Spatial Evidence Wall (Focus & Recede)
  // Hovering an artifact brings it forward; surrounding evidence dims & recedes
  // ==========================================================================
  function initProofWallFocus() {
    const wall = document.getElementById('proof-wall');
    if (!wall) return;

    const items = wall.querySelectorAll('.proof-wall-item');
    if (!items.length) return;

    items.forEach(item => {
      item.addEventListener('mouseenter', () => {
        items.forEach(other => {
          if (other === item) {
            other.classList.add('proof-focused');
            other.classList.remove('proof-dimmed');
          } else {
            other.classList.remove('proof-focused');
            other.classList.add('proof-dimmed');
          }
        });
      });
    });

    wall.addEventListener('mouseleave', () => {
      items.forEach(item => {
        item.classList.remove('proof-focused', 'proof-dimmed');
      });
    });
  }
  initProofWallFocus();

  // ==========================================================================
  // 17. Project Index Smooth Spatial Preview Tracking
  // Constrained pointer tracking with damping within index section
  // ==========================================================================
  function initProjectIndexSpatialPreview() {
    const list = document.getElementById('project-index-list');
    const pane = document.getElementById('project-preview-pane');
    if (!list || !pane || window.innerWidth <= 960) return;

    let targetY = 0;
    let currentY = 0;
    let isTracking = false;

    function animate() {
      currentY += (targetY - currentY) * 0.1;
      pane.style.transform = `translate3d(0, ${currentY.toFixed(2)}px, 0)`;

      if (Math.abs(targetY - currentY) > 0.1) {
        requestAnimationFrame(animate);
      } else {
        isTracking = false;
      }
    }

    list.addEventListener('mousemove', (e) => {
      const rect = list.getBoundingClientRect();
      const relativeY = e.clientY - rect.top;
      const progress = (relativeY / rect.height) * 2 - 1; // -1 to 1
      targetY = progress * 24; // constrained range ±24px

      if (!isTracking) {
        isTracking = true;
        requestAnimationFrame(animate);
      }
    }, { passive: true });

    list.addEventListener('mouseleave', () => {
      targetY = 0;
      if (!isTracking) {
        isTracking = true;
        requestAnimationFrame(animate);
      }
    });
  }
  initProjectIndexSpatialPreview();
});

