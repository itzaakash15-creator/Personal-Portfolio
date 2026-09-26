/**
 * AAKASH K — Master Portfolio Controller & Proof System Engine
 * Clean, lean, high performance (60–120 FPS).
 * Supports Proof Lightbox / Document Previews, Resume Actions, and Smooth Anchors.
 */

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

    if (prefersReducedMotion || window.scrollY > 30) {
      settleHeroImmediately();
      return;
    }

    CharacterController.isEntrancePlaying = true;

    // 0.0s: Atmospheric near-black background; warm light starts extremely faint
    if (radialLight) {
      radialLight.style.opacity = '0.08';
    }
    if (portfolioWord) {
      portfolioWord.style.opacity = '0';
      portfolioWord.style.clipPath = 'inset(100% 0% 0% 0%)';
      portfolioWord.style.letterSpacing = '0.025em';
      portfolioWord.style.transform = 'translate(-50%, -50%)';
    }
    if (characterPortrait) {
      characterPortrait.style.opacity = '0';
      characterPortrait.style.transform = 'translate3d(0, 80%, 0) scale(0.97)';
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
      // 0.2s — PORTFOLIO: Vertical clipping reveal (bottom -> top)
      // Letter-spacing compression (slightly expanded -> settles into final tracking)
      // ----------------------------------------------------------------------
      entranceTimeline.to(portfolioWord, {
        opacity: 0.9,
        clipPath: 'inset(0% 0% 0% 0%)',
        letterSpacing: '-0.055em',
        duration: 0.65,
        ease: 'power3.out'
      }, 0.2);

      // ----------------------------------------------------------------------
      // 0.55s — AAKASH ENTERS: Rises from translateY 80% -> 0, scale 0.97 -> 1
      // Passes IN FRONT of PORTFOLIO. Physical weight settling motion at end.
      // ----------------------------------------------------------------------
      entranceTimeline.to(characterPortrait, {
        y: '0%',
        opacity: 1,
        scale: 1,
        duration: 0.95,
        ease: 'power3.out'
      }, 0.55);

      // Light reacts as Aakash reaches ~70% of his rise (~1.2s):
      // Studio light brightens slightly, then settles to normal intensity
      entranceTimeline.to(radialLight, {
        opacity: 0.85,
        duration: 0.35,
        ease: 'power2.out'
      }, 1.18);

      entranceTimeline.to(radialLight, {
        opacity: 0.6,
        duration: 0.45,
        ease: 'power2.inOut'
      }, 1.50);

      // Tiny physical weight settling motion: final position -> 3-5px above (-4px) -> final position
      entranceTimeline.to(characterPortrait, {
        y: '-4px',
        duration: 0.12,
        ease: 'power1.out'
      }, 1.50);

      entranceTimeline.to(characterPortrait, {
        y: '0px',
        duration: 0.16,
        ease: 'power2.inOut'
      }, 1.62);

      // ----------------------------------------------------------------------
      // 03 — SIDE IDENTITY DETAILS: Editorial information assembling around Aakash
      // Directional reveals: Left (left -> right), Right (right -> left)
      // ----------------------------------------------------------------------
      // LEFT SIDE: small line appears first, then text reveals left -> right
      if (leftLine) {
        entranceTimeline.to(leftLine, {
          scaleX: 1,
          duration: 0.22,
          ease: 'power2.out'
        }, 1.66);
      }
      if (leftTag1) {
        entranceTimeline.to(leftTag1, {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          x: 0,
          duration: 0.28,
          ease: 'power2.out'
        }, 1.76);
      }
      if (leftSep) {
        entranceTimeline.to(leftSep, { opacity: 1, duration: 0.15 }, 1.80);
      }
      if (leftTag2) {
        entranceTimeline.to(leftTag2, {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          x: 0,
          duration: 0.28,
          ease: 'power2.out'
        }, 1.82);
      }

      // RIGHT SIDE: small line appears first, then text reveals right -> left
      if (rightLine) {
        entranceTimeline.to(rightLine, {
          scaleX: 1,
          duration: 0.22,
          ease: 'power2.out'
        }, 1.70);
      }
      if (rightTag1) {
        entranceTimeline.to(rightTag1, {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          x: 0,
          duration: 0.28,
          ease: 'power2.out'
        }, 1.80);
      }
      if (rightSep) {
        entranceTimeline.to(rightSep, { opacity: 1, duration: 0.15 }, 1.84);
      }
      if (rightTag2) {
        entranceTimeline.to(rightTag2, {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          x: 0,
          duration: 0.28,
          ease: 'power2.out'
        }, 1.86);
      }

      // Main Greeting & Editorial Statement
      if (greeting) {
        entranceTimeline.to(greeting, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out'
        }, 1.85);
      }
      if (positioning) {
        entranceTimeline.to(positioning, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out'
        }, 1.95);
      }
      if (rightMantra) {
        entranceTimeline.to(rightMantra, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out'
        }, 1.95);
      }

      // ----------------------------------------------------------------------
      // 05 — PROFESSIONAL ANCHORS ENTRANCE (Sequential 4-Step Entrance)
      // For each: Step A (num), Step B (line), Step C (title clip), Step D (sub slide up)
      // ----------------------------------------------------------------------
      const anchorDelays = [2.05, 2.20, 2.35]; // ~150ms stagger
      anchorItems.forEach((anchor, idx) => {
        const baseTime = anchorDelays[idx] || (2.05 + idx * 0.15);
        const num = anchor.querySelector('.anchor-index');
        const line = anchor.querySelector('.anchor-line');
        const title = anchor.querySelector('.anchor-title');
        const sub = anchor.querySelector('.anchor-sub');

        if (num) {
          entranceTimeline.to(num, { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out' }, baseTime);
        }
        if (line) {
          // 01 begins active with line grown; 02 & 03 grow then gently rest
          entranceTimeline.to(line, {
            scaleX: idx === 0 ? 1 : 0.35,
            duration: 0.22,
            ease: 'power2.out'
          }, baseTime + 0.06);
        }
        if (title) {
          entranceTimeline.to(title, {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            y: 0,
            duration: 0.24,
            ease: 'power2.out'
          }, baseTime + 0.12);
        }
        if (sub) {
          entranceTimeline.to(sub, {
            opacity: 1,
            y: 0,
            duration: 0.20,
            ease: 'power2.out'
          }, baseTime + 0.18);
        }
      });

      // CTAs Cluster Reveal
      if (ctaCluster) {
        entranceTimeline.to(ctaCluster, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out'
        }, 2.45);
      }

    } else {
      setTimeout(settleHeroImmediately, 2500);
    }

    // Safety Skip Listener on early scroll or keydown
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
      if (window.scrollY > 15) {
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
      
      const identityPhase = document.getElementById('identity-box-phase');
      const idLine1 = document.getElementById('id-line-1');
      const idLine2 = document.getElementById('id-line-2');
      const idLine3 = document.getElementById('id-line-3');

      const role1 = document.getElementById('role-slide-1');
      const role2 = document.getElementById('role-slide-2');
      const role3 = document.getElementById('role-slide-3');
      const role4 = document.getElementById('role-slide-4');

      const workTransition = document.getElementById('work-transition-phase');
      const projectApproach = document.getElementById('hero-project-approach');

      if (!wrapper || !characterScene) return;

      // Calculate safe rightward anchor offset for Aakash portrait
      // Keeps him anchored in the right 35–40% zone, leaving left 60–65% 100% clear
      const getAnchorRightX = () => Math.min(Math.max(window.innerWidth * 0.22, 220), 380);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "+=4400",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            let section = 'hero';
            if (p < 0.12) {
              section = 'hero';
            } else if (p >= 0.12 && p < 0.32) {
              section = 'identity';
            } else if (p >= 0.32 && p < 0.44) {
              section = 'marketer';
            } else if (p >= 0.44 && p < 0.56) {
              section = 'strategist';
            } else if (p >= 0.56 && p < 0.68) {
              section = 'creator';
            } else if (p >= 0.68 && p < 0.80) {
              section = 'speaker';
            } else {
              section = 'work';
            }

            // Sync with CharacterScene modular API for future 3D GLB model
            if (window.Character3DScene && typeof window.Character3DScene.setScroll === 'function') {
              window.Character3DScene.setScroll(p, section);
            }
          }
        }
      });

      // ----------------------------------------------------------------------
      // STEP 1: Hero Flanks Slide Outward; AAKASH Moves Smoothly to the Right
      // Aakash anchors to right 35–40%, clearing the left 60–65% for typography
      // ----------------------------------------------------------------------
      tl.to(leftFlank, {
        x: -60,
        opacity: 0,
        duration: 0.85,
        ease: "power2.inOut"
      }, 0);

      tl.to(rightFlank, {
        x: 60,
        opacity: 0,
        duration: 0.85,
        ease: "power2.inOut"
      }, 0);

      tl.to(portfolioWord, {
        scale: 0.94,
        opacity: 0,
        duration: 0.85,
        ease: "power2.inOut"
      }, 0.05);

      // AAKASH SHIFTS TO THE RIGHT (Anchor Position: no text across face!)
      tl.to(characterScene, {
        x: () => getAnchorRightX(),
        scale: 1.02,
        opacity: 1,
        duration: 1.0,
        ease: "power2.inOut"
      }, 0.15);

      // Studio light accompanies Aakash to the right
      tl.to(radialLight, {
        x: () => getAnchorRightX() * 0.75,
        duration: 1.0,
        ease: "power2.inOut"
      }, 0.15);

      // ----------------------------------------------------------------------
      // STEP 2 (Section 09): "I DON'T FIT INTO ONE BOX." Sequential Reveal
      // FIRST: I DON'T FIT (bottom-to-top mask)
      // THEN: INTO ONE (previous moves up slightly, lower contrast)
      // THEN: BOX. (BOX. becomes temporarily dominant)
      // ----------------------------------------------------------------------
      tl.to(identityPhase, { opacity: 1, duration: 0.1 }, 1.15);

      // Line 1: I DON'T FIT
      tl.fromTo(idLine1,
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.85, ease: 'power3.out' },
        1.2
      );

      // Line 2: INTO ONE
      tl.fromTo(idLine2,
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.85, ease: 'power3.out' },
        2.05
      );
      // Line 1 moves up slightly and becomes lower contrast
      tl.to(idLine1, {
        y: '-14px',
        opacity: 0.35,
        duration: 0.75,
        ease: 'power2.out'
      }, 2.05);

      // Line 3: BOX. (temporarily dominant)
      tl.fromTo(idLine3,
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.85, ease: 'power3.out' },
        2.9
      );
      // Line 1 & Line 2 move up slightly
      tl.to([idLine1, idLine2], {
        y: '-26px',
        duration: 0.75,
        ease: 'power2.out'
      }, 2.9);
      tl.to(idLine2, {
        opacity: 0.42,
        duration: 0.75,
        ease: 'power2.out'
      }, 2.9);

      // Hold dominant BOX. statement
      tl.to(idLine3, { opacity: 1, duration: 0.7 }, 3.75);

      // Exit "I DON'T FIT INTO ONE BOX." with upward clip
      tl.to([idLine1, idLine2, idLine3], {
        y: '-105%',
        opacity: 0,
        duration: 0.8,
        ease: 'power2.in'
      }, 4.45);
      tl.to(identityPhase, { opacity: 0, duration: 0.15 }, 5.15);

      // ----------------------------------------------------------------------
      // STEP 3 (Sections 10 & 11): ROLE MORPH SEQUENCE (Typography Reel System)
      // MARKETER. -> STRATEGIST. -> CREATOR. -> SPEAKER.
      // Outgoing word moves upward + clips away.
      // Incoming word enters from below + clips into view.
      // Aakash remains mostly stable on the right with subtle light shifts.
      // ----------------------------------------------------------------------

      // --- ROLE 01: MARKETER. ---
      tl.to(role1, { opacity: 1, duration: 0.1 }, 5.35);
      tl.fromTo(role1.querySelector('.role-pre-lead'),
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' },
        5.4
      );
      tl.fromTo(role1.querySelector('.role-huge-title'),
        { y: '100%' },
        { y: '0%', duration: 0.85, ease: 'power3.out' },
        5.4
      );
      // Aakash: neutral warm studio light
      tl.to(radialLight, {
        y: 0,
        scale: 1.0,
        opacity: 0.6,
        duration: 0.8
      }, 5.4);
      // Hold
      tl.to(role1, { opacity: 1, duration: 0.65 }, 6.25);
      // Outgoing clip
      tl.to(role1.querySelector('.role-huge-title'), {
        y: '-100%',
        duration: 0.7,
        ease: 'power2.in'
      }, 6.9);
      tl.to(role1.querySelector('.role-pre-lead'), {
        opacity: 0,
        y: -10,
        duration: 0.45
      }, 7.0);
      tl.to(role1, { opacity: 0, duration: 0.1 }, 7.6);

      // --- ROLE 02: STRATEGIST. ---
      tl.to(role2, { opacity: 1, duration: 0.1 }, 7.65);
      tl.fromTo(role2.querySelector('.role-pre-lead'),
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' },
        7.7
      );
      tl.fromTo(role2.querySelector('.role-huge-title'),
        { y: '100%' },
        { y: '0%', duration: 0.85, ease: 'power3.out' },
        7.7
      );
      // Aakash: light moves slightly higher
      tl.to(radialLight, {
        y: -30,
        scale: 1.02,
        opacity: 0.65,
        duration: 0.8
      }, 7.7);
      tl.to(characterScene, {
        x: () => getAnchorRightX() * 0.98,
        duration: 0.8
      }, 7.7);
      // Hold
      tl.to(role2, { opacity: 1, duration: 0.65 }, 8.55);
      // Outgoing clip
      tl.to(role2.querySelector('.role-huge-title'), {
        y: '-100%',
        duration: 0.7,
        ease: 'power2.in'
      }, 9.2);
      tl.to(role2.querySelector('.role-pre-lead'), {
        opacity: 0,
        y: -10,
        duration: 0.45
      }, 9.3);
      tl.to(role2, { opacity: 0, duration: 0.1 }, 9.9);

      // --- ROLE 03: CREATOR. ---
      tl.to(role3, { opacity: 1, duration: 0.1 }, 9.95);
      tl.fromTo(role3.querySelector('.role-pre-lead'),
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' },
        10.0
      );
      tl.fromTo(role3.querySelector('.role-huge-title'),
        { y: '100%' },
        { y: '0%', duration: 0.85, ease: 'power3.out' },
        10.0
      );
      // Aakash: slightly broader atmospheric light
      tl.to(radialLight, {
        y: -10,
        scale: 1.15,
        opacity: 0.68,
        duration: 0.8
      }, 10.0);
      tl.to(characterScene, {
        x: () => getAnchorRightX() * 1.03,
        duration: 0.8
      }, 10.0);
      // Hold
      tl.to(role3, { opacity: 1, duration: 0.65 }, 10.85);
      // Outgoing clip
      tl.to(role3.querySelector('.role-huge-title'), {
        y: '-100%',
        duration: 0.7,
        ease: 'power2.in'
      }, 11.5);
      tl.to(role3.querySelector('.role-pre-lead'), {
        opacity: 0,
        y: -10,
        duration: 0.45
      }, 11.6);
      tl.to(role3, { opacity: 0, duration: 0.1 }, 12.2);

      // --- ROLE 04: SPEAKER. ---
      tl.to(role4, { opacity: 1, duration: 0.1 }, 12.25);
      tl.fromTo(role4.querySelector('.role-pre-lead'),
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' },
        12.3
      );
      tl.fromTo(role4.querySelector('.role-huge-title'),
        { y: '100%' },
        { y: '0%', duration: 0.85, ease: 'power3.out' },
        12.3
      );
      // Aakash: subtle spotlight influence
      tl.to(radialLight, {
        y: -20,
        scale: 0.92,
        opacity: 0.76,
        duration: 0.8
      }, 12.3);
      tl.to(characterScene, {
        x: () => getAnchorRightX(),
        duration: 0.8
      }, 12.3);
      // Hold
      tl.to(role4, { opacity: 1, duration: 0.65 }, 13.15);
      // Outgoing clip
      tl.to(role4.querySelector('.role-huge-title'), {
        y: '-100%',
        duration: 0.7,
        ease: 'power2.in'
      }, 13.8);
      tl.to(role4.querySelector('.role-pre-lead'), {
        opacity: 0,
        y: -10,
        duration: 0.45
      }, 13.9);
      tl.to(role4, { opacity: 0, duration: 0.1 }, 14.5);

      // ----------------------------------------------------------------------
      // STEP 4 (Sections 12 & 13): TRANSITION INTO DIGI MARKETRIX
      // As SPEAKER finishes:
      // Aakash moves toward the far right (translateX: 0 -> 8-12vw further)
      // scale: 1 -> 0.94, opacity: 1 -> 0.32, lighting dims
      // DIGI MARKETRIX enters from LEFT:
      // SELECTED WORK / 01 first, then DIGI, then MARKETRIX (~100ms later)
      // Project title OWNS the screen. Aakash is faint continuity on far right.
      // ----------------------------------------------------------------------
      tl.to(characterScene, {
        x: () => getAnchorRightX() * 1.5,
        scale: 0.94,
        opacity: 0.32,
        duration: 1.1,
        ease: 'power2.inOut'
      }, 14.5);

      tl.to(radialLight, {
        opacity: 0.22,
        scale: 0.85,
        duration: 1.1,
        ease: 'power2.inOut'
      }, 14.5);

      // DIGI MARKETRIX Enters Left
      tl.to(workTransition, { opacity: 1, duration: 0.1 }, 14.55);

      // SELECTED WORK / 01 first
      tl.fromTo('#work-kicker',
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        14.65
      );

      // DIGI: upward mask reveal
      tl.fromTo('#work-title-digi',
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.85, ease: 'power3.out' },
        14.95
      );

      // MARKETRIX: upward mask reveal approx 100ms later
      tl.fromTo('#work-title-marketrix',
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.85, ease: 'power3.out' },
        15.10
      );

      // Descriptor subtitle slides up 10px while fading in
      tl.fromTo('#work-subtitle',
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
        15.45
      );

      // ----------------------------------------------------------------------
      // STEP 5 (Section 14): TRANSITION INTO PROJECT CANVAS
      // Aakash fades completely.
      // One actual Digi Marketrix project image approaches from depth.
      // Title slightly reduces/moves.
      // Case study begins: PERSON -> IDENTITY -> WORK.
      // ----------------------------------------------------------------------
      tl.to(characterScene, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.in'
      }, 16.2);

      tl.to(radialLight, {
        opacity: 0,
        duration: 0.8
      }, 16.2);

      tl.to(workTransition, {
        scale: 0.94,
        y: -18,
        duration: 0.9,
        ease: 'power2.out'
      }, 16.4);

      if (projectApproach) {
        tl.fromTo(projectApproach,
          { opacity: 0, scale: 0.85, y: 35 },
          { opacity: 1, scale: 1.0, y: 0, duration: 1.15, ease: 'power3.out' },
          16.4
        );
      }

      // Rest / hold before smooth unpinning into case study section
      tl.to(workTransition, { opacity: 1, duration: 0.8 }, 17.55);
    });
  }

  // Mobile: Native Scroll with Clean Element Reveals (No Pinning, No Jitter)
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    const mm = gsap.matchMedia();
    mm.add("(max-width: 960px)", () => {
      const identityLines = document.querySelectorAll('.identity-line');
      identityLines.forEach((line) => {
        gsap.fromTo(line,
          { opacity: 0.3, y: 20 },
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

      const roleSlides = document.querySelectorAll('.role-slide-item');
      roleSlides.forEach((slide) => {
        gsap.fromTo(slide,
          { opacity: 0.35, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: slide,
              start: 'top 88%',
              end: 'top 60%',
              scrub: 0.35
            }
          }
        );
      });

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

        // Update preview content from data attributes
        const previewSrc = item.getAttribute('data-preview');
        const titleText = item.getAttribute('data-title');
        const subText = item.getAttribute('data-sub');
        const kickerText = item.getAttribute('data-kicker');

        if (previewImg && previewSrc) previewImg.src = previewSrc;
        if (previewTitle && titleText) previewTitle.textContent = titleText;
        if (previewSub && subText) previewSub.textContent = subText;
        if (previewKicker && kickerText) previewKicker.textContent = kickerText;

        // Reveal atmospheric preview card on opposite side
        previewStage.classList.add('active');
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

        // Fade out atmospheric preview card
        previewStage.classList.remove('active');
      });
    });

    // Subtle pointer parallax response on the atmospheric preview card
    window.addEventListener('mousemove', (e) => {
      if (!isDesktop() || !previewStage.classList.contains('active')) return;
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;
      previewStage.style.transform = `translate(calc(-50% + ${(normX * 8).toFixed(1)}px), calc(-50% + ${(normY * 6).toFixed(1)}px)) scale(1)`;
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

  // 5. Interactive Proof Modal Lightbox Engine
  const proofModal = document.getElementById('proof-modal');
  const proofModalTitle = document.getElementById('proof-modal-title');
  const proofModalBody = document.getElementById('proof-modal-body');
  const proofModalClose = document.getElementById('proof-modal-close');

  const proofData = {
    'digi-cert': {
      title: 'Digi Marketrix — Certified Internship Completion',
      category: 'PROFESSIONAL CREDENTIAL',
      period: 'May 1, 2026 — July 1, 2026 // Tuticorin',
      image: 'assets/digi_marketrix_cert.jpg',
      desc: 'Official credential verifying completion of full-time digital marketing & creative internship at Digi Marketrix. Covered end-to-end commercial scripting, videography, on-location client shoots, and post-production video editing for regional businesses and personal brands.',
      linkText: 'Explore Experience Chapter →',
      linkUrl: 'experience.html'
    },
    'digi-shoots': {
      title: 'Digi Marketrix — On-Location Client Production Media',
      category: 'WORKING MEDIA & PRODUCTION',
      period: 'Commercial Shoots // Retail, Automotive & Food',
      image: 'assets/experience_digi_marketrix.jpg',
      desc: 'Field execution archive: directed on-location commercial shoots using gimbal stabilization, directional audio recording, ambient lighting rigs, and talent directing. Produced high-tempo short-form content designed for audience retention.',
      linkText: 'View Selected Work →',
      linkUrl: 'work.html#digi-marketrix'
    },
    'u6nick-analytics': {
      title: 'U6NICK — Editorial Model Personal Branding Case Study',
      category: 'CASE STUDY & METRICS',
      period: '2026 // Thoothukudi',
      image: 'assets/project_fashion.jpg',
      desc: 'Executed complete digital positioning for an editorial model. Formulated script hooks, visual aesthetic, content planning, and profile optimization. Resulted in high-performing viral reels and ~3,000 engaged followers verified by profile analytics and client review.',
      linkText: 'Deep Dive U6NICK Case Study →',
      linkUrl: 'work.html#u6nick'
    },
    'life-reel': {
      title: 'Life With Aakash — 59K Peak Reel Showcase',
      category: 'CREATOR PLATFORM',
      period: '59K Views // 17 Published Reels // 453 Followers',
      image: 'assets/life_with_aakash.jpg',
      desc: 'Original platform focused on life lessons, motivation, and storytelling. Proved short-form viral hook mechanics organically with a top reel reaching 59,000 views. Earned regional recognition for informative content.',
      linkText: 'Visit @life.with_aakash on Instagram ↗',
      linkUrl: 'https://www.instagram.com/life.with_aakash/'
    },
    'mraku-archive': {
      title: 'Mr Aku Vlogs — Foundational Creator Archive',
      category: 'CREATOR FOUNDATION',
      period: 'YouTube (2020) & Instagram (2023) // 2,177 Verified Followers',
      image: 'assets/mraku_vlogs.jpg',
      desc: 'Where the journey started in 2020. Explored videography pacing, local food documentation, brand promotion videos, and creator collaborations. Built 2,177 verified Instagram followers, establishing the discipline that led directly into commercial digital marketing.',
      linkText: 'Explore Journey Timeline →',
      linkUrl: 'journey.html'
    },
    'tech-mineguardian': {
      title: 'MineGuardian / MineCore — Autonomous Underground Rover',
      category: 'AI & HARDWARE TELEMETRY',
      period: 'Smart India Hackathon // IoT & Sensor Fusion',
      image: 'assets/lab_mineguardian.jpg',
      desc: 'Hazardous underground coal mine rover concept designed to monitor toxic methane (MQ-4), temperature (DHT22), and structural cave-in vibrations. Transmits real-time environmental telemetry to an emergency dashboard before miners enter hazardous shafts.',
      linkText: 'View Digital Lab →',
      linkUrl: 'lab.html#mineguardian'
    },
    'tech-jayashakthi': {
      title: 'Jayashakthi Tours & Travels — Live Web Platform + Admin Portal',
      category: 'WEB ENGINEERING & COMMERCE',
      period: 'Live Commercial Deployment // Full-Stack',
      image: 'assets/project_jayashakthi.jpg',
      desc: 'Production travel business web platform featuring responsive fleet showcase, interactive booking flow, and private administrative portal for route management and booking inquiries.',
      linkText: 'Visit Live Website ↗',
      linkUrl: 'https://www.jayashakthitoursandtravels.com/'
    },
    'award-bestreels': {
      title: 'Best Reels Creator — 2025 Regional Award',
      category: 'VERIFIED RECOGNITION',
      period: '2025 // Tuticorin Content Honors',
      image: 'assets/life_with_aakash.jpg',
      desc: 'Awarded for creative short-form visual storytelling, dynamic pacing, and audience retention metrics on Life With Aakash and commercial video productions.',
      linkText: 'Explore Journey Timeline →',
      linkUrl: 'journey.html'
    },
    'award-younginfo': {
      title: 'Young Informative Content — 2025 Citation',
      category: 'VERIFIED RECOGNITION',
      period: '2025 // Regional Digital Honors',
      image: 'assets/mraku_vlogs.jpg',
      desc: 'Recognized for informative, value-driven lifestyle and personal growth content, bridging youth motivation with real-world execution.',
      linkText: 'Explore Journey Timeline →',
      linkUrl: 'journey.html'
    },
    'chinnadurai-textiles': {
      title: 'Chinnadurai Textiles — Commercial Campaign Strategy',
      category: 'COMMERCIAL CONTENT & SCRIPTING',
      period: '10K–15K Organic Views // Thoothukudi',
      image: 'assets/project_textile.jpg',
      desc: 'Full content research, scriptwriting, and promotional reel direction for retail textile brand, yielding 10,000–15,000 organic impressions without paid ad spend.',
      linkText: 'Read Full Case Study →',
      linkUrl: 'work.html#chinnadurai'
    },
    'salemrr-food': {
      title: 'SalemRR Biriyani — Commercial Video VJ & Food Promotion',
      category: 'BRAND PROMOTION & VIDEO VJ',
      period: 'Cinematic Food Production // 2026',
      image: 'assets/project_food.jpg',
      desc: 'On-camera VJ presentation, commercial scripting, and culinary cinematography capturing store ambiance, dish presentation, and promotional reach.',
      linkText: 'Read Full Case Study →',
      linkUrl: 'work.html#salemrr'
    }
  };

  function openProofModal(key) {
    const item = proofData[key];
    if (!item || !proofModal) return;

    if (proofModalTitle) proofModalTitle.textContent = item.title;

    if (proofModalBody) {
      proofModalBody.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="proof-modal-image" />
        <div class="proof-modal-meta-row">
          <span>${item.category}</span>
          <span>${item.period}</span>
        </div>
        <p class="proof-modal-desc">${item.desc}</p>
        <div>
          <a href="${item.linkUrl}" target="${item.linkUrl.startsWith('http') ? '_blank' : '_self'}" class="btn-editorial" style="margin-top: 0.5rem;">
            <span>${item.linkText}</span>
          </a>
        </div>
      `;
    }

    proofModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProofModal() {
    if (!proofModal) return;
    proofModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-proof]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const key = trigger.getAttribute('data-proof');
      openProofModal(key);
    });
  });

  if (proofModalClose) {
    proofModalClose.addEventListener('click', closeProofModal);
  }

  if (proofModal) {
    proofModal.addEventListener('click', (e) => {
      if (e.target === proofModal) closeProofModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProofModal();
  });

  // 6. Proof Vault Tab Filtering (Multi-category support)
  const filterBtns = document.querySelectorAll('.proof-filter-btn');
  const proofCards = document.querySelectorAll('.proof-card');

  if (filterBtns.length > 0 && proofCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        proofCards.forEach(card => {
          const category = card.getAttribute('data-category') || '';
          const categories = category.toLowerCase().split(/\s+/);
          if (filter === 'all' || categories.includes(filter.toLowerCase())) {
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

  // 10b. Interactive Project Index Preview System (#other-work)
  // Hovering over a project row updates the sticky preview pane media & meta
  function initProjectIndexPreview() {
    const rows = document.querySelectorAll('.horizontal-project-row');
    const previewImg = document.getElementById('project-preview-img');
    const previewCat = document.getElementById('project-preview-cat');
    const previewTitle = document.getElementById('project-preview-title');

    if (!rows.length || !previewImg) return;

    rows.forEach(row => {
      row.addEventListener('mouseenter', () => {
        rows.forEach(r => r.classList.remove('active-index'));
        row.classList.add('active-index');

        const imgSrc = row.getAttribute('data-preview-img');
        const cat = row.getAttribute('data-preview-cat');
        const title = row.getAttribute('data-preview-title');

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
      });
    });
  }
  initProjectIndexPreview();

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

