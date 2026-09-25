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

  // 3. CharacterScene: Desktop Pointer-Based Parallax Engine
  // Exact bounds: max translate X ±6px, translate Y ±4px, rotation ±1 degree
  // Smooth lerp interpolation, disabled on mobile and reduced motion
  const characterPortrait = document.getElementById('character-portrait') || document.querySelector('.character-portrait-asset');
  const heroSection = document.getElementById('hero') || document.querySelector('.home-hero-section');

  if (characterPortrait && heroSection) {
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let targetRot = 0;
    let currentX = 0;
    let currentY = 0;
    let currentRot = 0;
    let isTicking = false;
    let rafId = null;

    const isDesktop = () => window.innerWidth > 960 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function renderParallax() {
      if (!isDesktop()) {
        characterPortrait.style.transform = 'none';
        isTicking = false;
        return;
      }

      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      currentRot += (targetRot - currentRot) * 0.06;

      characterPortrait.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0) rotate(${currentRot.toFixed(2)}deg)`;

      // Continue animating until settled
      if (Math.abs(targetX - currentX) > 0.02 || Math.abs(targetY - currentY) > 0.02) {
        rafId = requestAnimationFrame(renderParallax);
      } else {
        isTicking = false;
      }
    }

    function onPointerMove(e) {
      if (!isDesktop()) return;

      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;

      // Restrained bounds: X approx ±6px, Y approx ±4px, rotation approx ±1 deg
      targetX = normX * 6;
      targetY = normY * 4;
      targetRot = normX * 1;

      if (!isTicking) {
        isTicking = true;
        rafId = requestAnimationFrame(renderParallax);
      }
    }

    function onPointerLeave() {
      if (!isDesktop()) return;
      targetX = 0;
      targetY = 0;
      targetRot = 0;
      if (!isTicking) {
        isTicking = true;
        rafId = requestAnimationFrame(renderParallax);
      }
    }

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('mouseleave', onPointerLeave, { passive: true });

    window.addEventListener('resize', () => {
      if (!isDesktop()) {
        characterPortrait.style.transform = 'none';
        targetX = 0;
        targetY = 0;
        targetRot = 0;
        currentX = 0;
        currentY = 0;
        currentRot = 0;
      }
    });
  }

  // 4. Next Section: Restrained Scroll Storytelling Animation
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.registerPlugin(ScrollTrigger);

    const statementEl = document.querySelector('.identity-huge-statement');
    if (statementEl) {
      gsap.fromTo(statementEl,
        { opacity: 0.18, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statementEl,
            start: 'top 85%',
            end: 'top 45%',
            scrub: 0.4
          }
        }
      );
    }

    const flowItems = document.querySelectorAll('.identity-flow-item');
    flowItems.forEach((item) => {
      gsap.fromTo(item,
        { opacity: 0.22, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
            end: 'top 60%',
            scrub: 0.35
          }
        }
      );
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

  // 6. Proof Vault Tab Filtering
  const filterBtns = document.querySelectorAll('.proof-filter-btn');
  const proofCards = document.querySelectorAll('.proof-card');

  if (filterBtns.length > 0 && proofCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        proofCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
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

  // 7. Subtle Desktop Magnetic Button Interaction
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.innerWidth > 960) {
    document.querySelectorAll('.btn-editorial, .nav-connect-btn').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.2;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.2;
        btn.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate3d(0, 0, 0)';
      });
    });
  }

  // 8. Contact Form Handler
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

  // 9. Dynamic Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
