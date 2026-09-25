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
  const CharacterController = {
    // Layered state for physical depth (portrait, background light, shadow)
    current: {
      pointerX: 0,
      pointerY: 0,
      pointerScale: 1,
      lightX: 0,
      lightY: 0,
      dirLightX: 0,
      dirLightY: 0,
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
    radialLightEl: null,
    dirLightEl: null,
    rimLightEl: null,

    init() {
      this.portraitEl = document.getElementById('character-portrait') || document.querySelector('.character-portrait-asset');
      this.stageEl = document.getElementById('character-scene') || document.querySelector('.character-scene');
      this.radialLightEl = document.getElementById('hero-radial-light') || document.querySelector('.character-scene-backdrop');
      this.dirLightEl = document.querySelector('.character-directional-light');
      this.rimLightEl = document.querySelector('.character-rim-light');

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
        if (!isDesktop()) return;

        // Normalized mouse coordinates from -1 to +1
        const normX = (e.clientX / window.innerWidth) * 2 - 1;
        const normY = (e.clientY / window.innerHeight) * 2 - 1;

        // Exact bounds per instructions:
        // 1. Portrait movement: translateX ±8px, translateY ±5px
        this.target.pointerX = normX * 8;
        this.target.pointerY = normY * 5;

        // 2. Portrait scale: 1 → maximum 1.008
        this.target.pointerScale = 1 + (Math.abs(normX) + Math.abs(normY)) * 0.004;

        // 3. Background light movement: ±15px horizontally, ±10px vertically
        this.target.lightX = normX * 15;
        this.target.lightY = normY * 10;
        this.target.dirLightX = -normX * 18;
        this.target.dirLightY = -normY * 12;

        // 4. Subtle physical shadow movement (shifts opposite to light origin)
        this.target.shadowX = -normX * 12;
        this.target.shadowY = 18 - normY * 6;

        // Forward to CharacterScene modular interaction API for future 3D model
        if (window.Character3DScene && typeof window.Character3DScene.setPointer === 'function') {
          window.Character3DScene.setPointer(normX, normY);
        }

        this.requestTick();
      };

      const onPointerLeave = () => {
        if (!isDesktop()) return;
        // Smooth neutral return with gentle damping
        this.target.pointerX = 0;
        this.target.pointerY = 0;
        this.target.pointerScale = 1;
        this.target.lightX = 0;
        this.target.lightY = 0;
        this.target.dirLightX = 0;
        this.target.dirLightY = 0;
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
      const lf = this.lerpFactor;
      const c = this.current;
      const t = this.target;

      // Smooth damping interpolation (different speeds for distinct physical layers)
      c.pointerX += (t.pointerX - c.pointerX) * lf;
      c.pointerY += (t.pointerY - c.pointerY) * lf;
      c.pointerScale += (t.pointerScale - c.pointerScale) * lf;

      c.lightX += (t.lightX - c.lightX) * (lf * 0.85);
      c.lightY += (t.lightY - c.lightY) * (lf * 0.85);
      c.dirLightX += (t.dirLightX - c.dirLightX) * (lf * 0.85);
      c.dirLightY += (t.dirLightY - c.dirLightY) * (lf * 0.85);

      c.shadowX += (t.shadowX - c.shadowX) * lf;
      c.shadowY += (t.shadowY - c.shadowY) * lf;

      c.scrollX += (t.scrollX - c.scrollX) * lf;
      c.scrollY += (t.scrollY - c.scrollY) * lf;
      c.scrollScale += (t.scrollScale - c.scrollScale) * lf;
      c.scrollOpacity += (t.scrollOpacity - c.scrollOpacity) * lf;

      this.render();

      const diff = Math.abs(t.pointerX - c.pointerX) +
                   Math.abs(t.pointerY - c.pointerY) +
                   Math.abs(t.lightX - c.lightX) +
                   Math.abs(t.lightY - c.lightY) +
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
      // 1. Move Background Lighting Layers (smooth ambient shift)
      if (this.radialLightEl) {
        this.radialLightEl.style.transform = `translate3d(calc(-50% + ${this.current.lightX.toFixed(2)}px), calc(-50% + ${this.current.lightY.toFixed(2)}px), 0)`;
      }
      if (this.dirLightEl) {
        this.dirLightEl.style.transform = `translate3d(${this.current.dirLightX.toFixed(2)}px, ${this.current.dirLightY.toFixed(2)}px, 0)`;
      }
      if (this.rimLightEl) {
        this.rimLightEl.style.transform = `translate3d(calc(-50% + ${(this.current.lightX * 0.8).toFixed(2)}px), ${this.current.lightY.toFixed(2)}px, 0)`;
      }

      // 2. Move 2D Portrait with subtle shadow movement (depth simulation without flat rotation)
      if (this.portraitEl) {
        const totalX = this.current.pointerX + this.current.scrollX;
        const totalY = this.current.pointerY + this.current.scrollY;
        const totalScale = this.current.pointerScale * this.current.scrollScale;

        this.portraitEl.style.transform = 
          `translate3d(${totalX.toFixed(2)}px, ${totalY.toFixed(2)}px, 0) ` +
          `scale(${totalScale.toFixed(4)})`;

        this.portraitEl.style.filter = 
          `contrast(1.08) brightness(0.96) saturate(0.88) ` +
          `drop-shadow(${this.current.shadowX.toFixed(1)}px ${this.current.shadowY.toFixed(1)}px 28px rgba(0, 0, 0, 0.6))`;

        this.portraitEl.style.opacity = this.current.scrollOpacity.toFixed(3);
      }
    },

    setScrollKinematics(x = 0, y = 0, rotY = 0, scale = 1, opacity = 1) {
      this.target.scrollX = x;
      this.target.scrollY = y;
      this.target.scrollScale = scale;
      this.target.scrollOpacity = opacity;

      // Forward kinematics to CharacterScene for 3D model API
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
      this.target.shadowX = 0;
      this.target.shadowY = 18;

      this.current.pointerX = 0;
      this.current.pointerY = 0;
      this.current.pointerScale = 1;
      this.current.lightX = 0;
      this.current.lightY = 0;
      this.current.dirLightX = 0;
      this.current.dirLightY = 0;
      this.current.shadowX = 0;
      this.current.shadowY = 18;

      if (this.portraitEl) {
        this.portraitEl.style.transform = 'none';
        this.portraitEl.style.filter = 'contrast(1.08) brightness(0.96) saturate(0.88) drop-shadow(0 18px 30px rgba(0, 0, 0, 0.6))';
        this.portraitEl.style.opacity = '1';
      }
      if (this.radialLightEl) this.radialLightEl.style.transform = 'translate3d(-50%, -50%, 0)';
      if (this.dirLightEl) this.dirLightEl.style.transform = 'none';
      if (this.rimLightEl) this.rimLightEl.style.transform = 'translate3d(-50%, 0, 0)';

      this.isTicking = false;
    }
  };

  CharacterController.init();

  // ==========================================================================
  // 4. Signature Identity Experience Choreography (GSAP ScrollTrigger)
  // ==========================================================================
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // Desktop: Pinned Cinematic Scroll-Driven Experience
    mm.add("(min-width: 961px) and (prefers-reduced-motion: no-preference)", () => {
      const wrapper = document.getElementById('hero-experience');
      const introPhase = document.getElementById('hero-intro-phase');
      const akuTitle = document.getElementById('hero-aku-title');
      const statementBox = document.getElementById('hero-statement-box');
      const ctaGroup = document.getElementById('hero-cta-group');
      const eyebrow = introPhase ? introPhase.querySelector('.hero-eyebrow') : null;
      
      const identityPhase = document.getElementById('identity-box-phase');
      const role1 = document.getElementById('role-slide-1');
      const role2 = document.getElementById('role-slide-2');
      const role3 = document.getElementById('role-slide-3');
      const role4 = document.getElementById('role-slide-4');
      const workTransition = document.getElementById('work-transition-phase');

      if (!wrapper || !introPhase) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "+=4200",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            let section = 'hero';
            // Character continuity kinematics mapped to scroll progress
            if (p < 0.15) {
              section = 'hero';
              CharacterController.setScrollKinematics(0, 0, 0, 1, 1);
            } else if (p >= 0.15 && p < 0.32) {
              section = 'identity';
              CharacterController.setScrollKinematics(-22, -10, 0, 1.03, 1);
            } else if (p >= 0.32 && p < 0.45) {
              section = 'marketer';
              CharacterController.setScrollKinematics(-15, -6, 0, 1.02, 1);
            } else if (p >= 0.45 && p < 0.58) {
              section = 'brandbuilder';
              CharacterController.setScrollKinematics(-28, -12, 0, 1.035, 1);
            } else if (p >= 0.58 && p < 0.70) {
              section = 'creator';
              CharacterController.setScrollKinematics(-12, -5, 0, 1.02, 1);
            } else if (p >= 0.70 && p < 0.82) {
              section = 'speaker';
              CharacterController.setScrollKinematics(-20, -8, 0, 1.03, 1);
            } else {
              section = 'work';
              CharacterController.setScrollKinematics(30, 25, 0, 0.98, 0.25);
            }

            // Sync scroll progress and active section with CharacterScene
            if (window.Character3DScene && typeof window.Character3DScene.setScroll === 'function') {
              window.Character3DScene.setScroll(p, section);
            }
          }
        }
      });

      // Step 3: Transition out Hero Content
      // Hero supporting text and CTA visibility gradually reduces
      tl.to([statementBox, ctaGroup, eyebrow], {
        opacity: 0,
        y: -25,
        duration: 0.8,
        ease: "power2.inOut"
      }, 0);

      // AKU title moves slightly upward/left and fades out
      tl.to(akuTitle, {
        x: -55,
        y: -30,
        opacity: 0,
        duration: 1.0,
        ease: "power2.inOut"
      }, 0.1);

      // Character remains visible; dark transition into "I DON'T FIT INTO ONE BOX."
      tl.fromTo(identityPhase,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
        1.2
      );
      // Hold identity statement
      tl.to(identityPhase, { opacity: 1, duration: 0.8 }, 2.4);
      // Fade out identity statement
      tl.to(identityPhase, { opacity: 0, y: -40, duration: 0.9, ease: "power2.in" }, 3.2);

      // Step 4: Role 1 — MARKETER (Only ONE role dominates)
      tl.fromTo(role1,
        { opacity: 0, y: 45 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power2.out" },
        4.1
      );
      tl.to(role1, { opacity: 1, duration: 0.8 }, 5.2);
      tl.to(role1, { opacity: 0, y: -35, duration: 0.9, ease: "power2.in" }, 6.0);

      // Role 2 — BRAND BUILDER
      tl.fromTo(role2,
        { opacity: 0, y: 45 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power2.out" },
        6.9
      );
      tl.to(role2, { opacity: 1, duration: 0.8 }, 8.0);
      tl.to(role2, { opacity: 0, y: -35, duration: 0.9, ease: "power2.in" }, 8.8);

      // Role 3 — CREATOR
      tl.fromTo(role3,
        { opacity: 0, y: 45 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power2.out" },
        9.7
      );
      tl.to(role3, { opacity: 1, duration: 0.8 }, 10.8);
      tl.to(role3, { opacity: 0, y: -35, duration: 0.9, ease: "power2.in" }, 11.6);

      // Role 4 — SPEAKER
      tl.fromTo(role4,
        { opacity: 0, y: 45 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power2.out" },
        12.5
      );
      tl.to(role4, { opacity: 1, duration: 0.8 }, 13.6);
      // Reduce role typography
      tl.to(role4, { opacity: 0, scale: 0.93, y: -30, duration: 0.9, ease: "power2.in" }, 14.4);

      // Step 6: Transition into Work — DIGI MARKETRIX
      tl.fromTo(workTransition,
        { opacity: 0, y: 45 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
        15.3
      );
      tl.to(workTransition, { opacity: 1, duration: 1.2 }, 16.5);
    });

    // Mobile: Native Scroll with Elegant Element Reveals (No Pinning, No Glitches)
    mm.add("(max-width: 960px)", () => {
      const identityPhase = document.getElementById('identity-box-phase');
      if (identityPhase) {
        gsap.fromTo(identityPhase,
          { opacity: 0.25, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: identityPhase,
              start: 'top 85%',
              end: 'top 55%',
              scrub: 0.4
            }
          }
        );
      }

      const roleSlides = document.querySelectorAll('.role-slide-item');
      roleSlides.forEach((slide) => {
        gsap.fromTo(slide,
          { opacity: 0.3, y: 25 },
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

  // 5. Clipboard Helpers & Toast Notifications
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

  // 13. Contact Form Handler
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
      const body = `Hi AKU,\n\nName: ${name}\nEmail: ${email}\nCategory: ${category}\n\nMessage:\n${message}\n`;
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
});
