'use client';

import { useEffect } from 'react';

export default function InteractiveSystem() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = () => window.innerWidth > 960 && !prefersReducedMotion && !isTouch;

    // ========================================================================
    // 1. Centralized Spatial Pointer & Depth Parallax Engine
    // Sets CSS custom properties on documentElement:
    // --depth-bg-x, --depth-bg-y, --depth-mid-x, --depth-mid-y, --tilt-x, --tilt-y, --depth-fg-x, --depth-fg-y
    // ========================================================================
    const root = document.documentElement;
    const spotlightEl = document.getElementById('speaking-spotlight');
    const contactSpotlight = document.querySelector('.contact-warm-spotlight') as HTMLElement | null;

    const spatialState = {
      bgX: 0, bgY: 0, targetBgX: 0, targetBgY: 0,
      midX: 0, midY: 0, tiltX: 0, tiltY: 0, targetMidX: 0, targetMidY: 0, targetTiltX: 0, targetTiltY: 0,
      fgX: 0, fgY: 0, targetFgX: 0, targetFgY: 0,
      spotlightX: 0, spotlightY: 0, targetSpotlightX: 0, targetSpotlightY: 0,
    };

    let isSpatialRunning = false;
    const lerp = 0.065;

    function updateSpatial() {
      spatialState.bgX += (spatialState.targetBgX - spatialState.bgX) * lerp;
      spatialState.bgY += (spatialState.targetBgY - spatialState.bgY) * lerp;
      spatialState.midX += (spatialState.targetMidX - spatialState.midX) * lerp;
      spatialState.midY += (spatialState.targetMidY - spatialState.midY) * lerp;
      spatialState.tiltX += (spatialState.targetTiltX - spatialState.tiltX) * lerp;
      spatialState.tiltY += (spatialState.targetTiltY - spatialState.tiltY) * lerp;
      spatialState.fgX += (spatialState.targetFgX - spatialState.fgX) * lerp;
      spatialState.fgY += (spatialState.targetFgY - spatialState.fgY) * lerp;
      spatialState.spotlightX += (spatialState.targetSpotlightX - spatialState.spotlightX) * (lerp * 0.8);
      spatialState.spotlightY += (spatialState.targetSpotlightY - spatialState.spotlightY) * (lerp * 0.8);

      root.style.setProperty('--depth-bg-x', `${spatialState.bgX.toFixed(2)}px`);
      root.style.setProperty('--depth-bg-y', `${spatialState.bgY.toFixed(2)}px`);
      root.style.setProperty('--depth-mid-x', `${spatialState.midX.toFixed(2)}px`);
      root.style.setProperty('--depth-mid-y', `${spatialState.midY.toFixed(2)}px`);
      root.style.setProperty('--tilt-x', `${spatialState.tiltX.toFixed(2)}deg`);
      root.style.setProperty('--tilt-y', `${spatialState.tiltY.toFixed(2)}deg`);
      root.style.setProperty('--depth-fg-x', `${spatialState.fgX.toFixed(2)}px`);
      root.style.setProperty('--depth-fg-y', `${spatialState.fgY.toFixed(2)}px`);

      if (spotlightEl) {
        spotlightEl.style.transform = `translate3d(${spatialState.spotlightX.toFixed(2)}px, ${spatialState.spotlightY.toFixed(2)}px, 0)`;
      }
      if (contactSpotlight) {
        contactSpotlight.style.transform = `translate3d(${spatialState.spotlightX.toFixed(2)}px, ${spatialState.spotlightY.toFixed(2)}px, 0)`;
      }

      const diff = Math.abs(spatialState.targetBgX - spatialState.bgX) +
                   Math.abs(spatialState.targetBgY - spatialState.bgY) +
                   Math.abs(spatialState.targetMidX - spatialState.midX) +
                   Math.abs(spatialState.targetMidY - spatialState.midY) +
                   Math.abs(spatialState.targetFgX - spatialState.fgX) +
                   Math.abs(spatialState.targetFgY - spatialState.fgY);

      if (diff > 0.005) {
        requestAnimationFrame(updateSpatial);
      } else {
        isSpatialRunning = false;
      }
    }

    const onPointerMoveSpatial = (e: MouseEvent) => {
      if (!isDesktop()) return;
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;

      spatialState.targetBgX = normX * 1.8;
      spatialState.targetBgY = normY * 1.2;
      spatialState.targetMidX = normX * 4.2;
      spatialState.targetMidY = normY * 3.0;
      spatialState.targetTiltX = -normY * 1.4;
      spatialState.targetTiltY = normX * 1.4;
      spatialState.targetFgX = normX * 6.5;
      spatialState.targetFgY = normY * 4.5;
      spatialState.targetSpotlightX = normX * 22;
      spatialState.targetSpotlightY = normY * 14;

      if (!isSpatialRunning) {
        isSpatialRunning = true;
        requestAnimationFrame(updateSpatial);
      }
    };

    const onPointerLeaveSpatial = () => {
      spatialState.targetBgX = 0; spatialState.targetBgY = 0;
      spatialState.targetMidX = 0; spatialState.targetMidY = 0;
      spatialState.targetTiltX = 0; spatialState.targetTiltY = 0;
      spatialState.targetFgX = 0; spatialState.targetFgY = 0;
      spatialState.targetSpotlightX = 0; spatialState.targetSpotlightY = 0;

      if (!isSpatialRunning) {
        isSpatialRunning = true;
        requestAnimationFrame(updateSpatial);
      }
    };

    window.addEventListener('mousemove', onPointerMoveSpatial, { passive: true });
    window.addEventListener('mouseleave', onPointerLeaveSpatial, { passive: true });

    // ========================================================================
    // 2. Desktop Magnetic Button Interaction
    // ========================================================================
    const magneticCleanups: Array<() => void> = [];
    if (!prefersReducedMotion && window.innerWidth > 960) {
      const magneticButtons = document.querySelectorAll<HTMLElement>(
        '.pro-btn-primary, .pro-btn-outline, .nav-connect-btn, .pro-proof-tab-btn, .pro-ctrl-btn, .btn-editorial, .btn-editorial-outline, .proof-pill-btn'
      );

      magneticButtons.forEach((btn) => {
        const onMouseMove = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) * 0.18;
          const y = (e.clientY - rect.top - rect.height / 2) * 0.18;
          btn.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
        };
        const onMouseLeave = () => {
          btn.style.transform = 'translate3d(0, 0, 0)';
        };

        btn.addEventListener('mousemove', onMouseMove);
        btn.addEventListener('mouseleave', onMouseLeave);
        magneticCleanups.push(() => {
          btn.removeEventListener('mousemove', onMouseMove);
          btn.removeEventListener('mouseleave', onMouseLeave);
        });
      });
    }

    // ========================================================================
    // 3. Proof Over Promises: Spatial Evidence Wall (Focus & Recede)
    // ========================================================================
    const proofWall = document.getElementById('proof-wall');
    if (proofWall) {
      const wallItems = proofWall.querySelectorAll<HTMLElement>('.proof-wall-item');
      wallItems.forEach((item) => {
        item.addEventListener('mouseenter', () => {
          wallItems.forEach((other) => {
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

      proofWall.addEventListener('mouseleave', () => {
        wallItems.forEach((item) => {
          item.classList.remove('proof-focused', 'proof-dimmed');
        });
      });
    }

    // ========================================================================
    // 4. Interactive Project Index Preview System (#clients & #other-work)
    // ========================================================================
    const projectRows = document.querySelectorAll<HTMLElement>('.horizontal-project-row, .index-row-item');
    const previewImg = (document.getElementById('editorial-preview-img') || document.getElementById('project-preview-img')) as HTMLImageElement | null;
    const previewCat = document.getElementById('editorial-preview-cat') || document.getElementById('project-preview-cat');
    const previewTitle = document.getElementById('editorial-preview-title') || document.getElementById('project-preview-title');
    const previewScope = document.getElementById('editorial-preview-scope');

    if (projectRows.length && previewImg) {
      projectRows.forEach((row) => {
        const updatePreview = () => {
          projectRows.forEach((r) => r.classList.remove('active-index'));
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

    // Project Index Smooth Spatial Preview Tracking
    const projectList = document.getElementById('project-index-list');
    const projectPreviewPane = document.getElementById('project-preview-pane');
    if (projectList && projectPreviewPane && window.innerWidth > 960) {
      let targetY = 0;
      let currentY = 0;
      let isTracking = false;

      const animatePane = () => {
        currentY += (targetY - currentY) * 0.1;
        projectPreviewPane.style.transform = `translate3d(0, ${currentY.toFixed(2)}px, 0)`;

        if (Math.abs(targetY - currentY) > 0.1) {
          requestAnimationFrame(animatePane);
        } else {
          isTracking = false;
        }
      };

      projectList.addEventListener('mousemove', (e) => {
        const rect = projectList.getBoundingClientRect();
        const relativeY = e.clientY - rect.top;
        const progress = (relativeY / rect.height) * 2 - 1;
        targetY = progress * 24;

        if (!isTracking) {
          isTracking = true;
          requestAnimationFrame(animatePane);
        }
      }, { passive: true });

      projectList.addEventListener('mouseleave', () => {
        targetY = 0;
        if (!isTracking) {
          isTracking = true;
          requestAnimationFrame(animatePane);
        }
      });
    }

    // ========================================================================
    // 5. The Journey Chronology Rail Scroll-Spy & Interactive Chapter Nav
    // ========================================================================
    const railBtns = document.querySelectorAll<HTMLElement>('.journey-rail-btn');
    const yearBlocks = document.querySelectorAll<HTMLElement>('.journey-year-block, .journey-next-transition-block');

    if (railBtns.length) {
      railBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const targetId = btn.getAttribute('data-target');
          if (!targetId) return;

          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            e.preventDefault();
            const headerOffset = 110;
            const targetY = targetEl.getBoundingClientRect().top + window.scrollY - headerOffset;
            window.scrollTo({ top: targetY, behavior: 'smooth' });
          }
        });
      });

      if ('IntersectionObserver' in window && yearBlocks.length > 0) {
        const railObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const chapterId = entry.target.id;
              railBtns.forEach((btn) => {
                const matches = btn.getAttribute('data-target') === chapterId;
                btn.classList.toggle('active', matches);
              });
            }
          });
        }, {
          rootMargin: '-25% 0px -50% 0px',
          threshold: 0.1,
        });

        yearBlocks.forEach((block) => railObserver.observe(block));
      }
    }

    // ========================================================================
    // 6. Motivational Speaking Horizontal Gallery Drag & Wheel Handling
    // ========================================================================
    const speakingViewport = document.querySelector<HTMLElement>('.speaking-horizontal-viewport');
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

    // ========================================================================
    // 7. Proof Vault Tab Filtering
    // ========================================================================
    const filterBtns = document.querySelectorAll<HTMLElement>('.proof-filter-btn');
    const proofCards = document.querySelectorAll<HTMLElement>('.proof-wall-item, .proof-card');

    if (filterBtns.length && proofCards.length) {
      filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          filterBtns.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          const filter = (btn.getAttribute('data-filter') || 'all').toLowerCase();

          proofCards.forEach((card) => {
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

    // ========================================================================
    // 8. Interactive Journey System (Career Progression & Inspector Panel)
    // ========================================================================
    const journeyNodes = document.querySelectorAll<HTMLElement>('.journey-node');
    const panelYear = document.getElementById('panel-year');
    const panelRole = document.getElementById('panel-role');
    const panelCompany = document.getElementById('panel-company');
    const panelSkills = document.getElementById('panel-skills');
    const panelProofBtn = document.getElementById('panel-proof-btn');

    if (journeyNodes.length) {
      journeyNodes.forEach((node) => {
        node.addEventListener('click', () => {
          journeyNodes.forEach((n) => n.classList.remove('active'));
          node.classList.add('active');

          const year = node.getAttribute('data-year') || '';
          const role = node.getAttribute('data-role') || '';
          const company = node.getAttribute('data-company') || '';
          const rawSkills = node.getAttribute('data-skills') || '';
          const skills = rawSkills.split(',').map((s) => s.trim()).filter(Boolean);
          const proofKey = node.getAttribute('data-proof') || '';

          if (panelYear) panelYear.textContent = year;
          if (panelRole) panelRole.textContent = role;
          if (panelCompany) panelCompany.textContent = company;

          if (panelSkills) {
            panelSkills.innerHTML = skills.map((skill) => `<span class="editorial-role-tag">${skill.toUpperCase()}</span>`).join('');
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

    return () => {
      window.removeEventListener('mousemove', onPointerMoveSpatial);
      window.removeEventListener('mouseleave', onPointerLeaveSpatial);
      magneticCleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return null;
}
