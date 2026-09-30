'use client';

import { useEffect } from 'react';

export default function InteractiveSystem() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = () => window.innerWidth > 960 && !prefersReducedMotion && !isTouch;

    const cleanups: Array<() => void> = [];

    // ========================================================================
    // 1. Subtle Spotlight Tracking (Transforms only, NO full-document style invalidation)
    // ========================================================================
    const spotlightEl = document.getElementById('speaking-spotlight');
    const contactSpotlight = document.querySelector('.contact-warm-spotlight') as HTMLElement | null;

    if (isDesktop() && (spotlightEl || contactSpotlight)) {
      let targetX = 0;
      let targetY = 0;
      let curX = 0;
      let curY = 0;
      let isRunning = false;
      let rafId = 0;

      const updateSpotlight = () => {
        curX += (targetX - curX) * 0.05;
        curY += (targetY - curY) * 0.05;

        const transformStr = `translate3d(${curX.toFixed(1)}px, ${curY.toFixed(1)}px, 0)`;
        if (spotlightEl) spotlightEl.style.transform = transformStr;
        if (contactSpotlight) contactSpotlight.style.transform = transformStr;

        const diff = Math.abs(targetX - curX) + Math.abs(targetY - curY);
        if (diff > 0.05) {
          rafId = requestAnimationFrame(updateSpotlight);
        } else {
          isRunning = false;
        }
      };

      const onPointerMove = (e: MouseEvent) => {
        if (!isDesktop()) return;
        const normX = (e.clientX / window.innerWidth) * 2 - 1;
        const normY = (e.clientY / window.innerHeight) * 2 - 1;
        targetX = normX * 18;
        targetY = normY * 12;

        if (!isRunning) {
          isRunning = true;
          rafId = requestAnimationFrame(updateSpotlight);
        }
      };

      const onPointerLeave = () => {
        targetX = 0;
        targetY = 0;
        if (!isRunning) {
          isRunning = true;
          rafId = requestAnimationFrame(updateSpotlight);
        }
      };

      window.addEventListener('mousemove', onPointerMove, { passive: true });
      window.addEventListener('mouseleave', onPointerLeave, { passive: true });

      cleanups.push(() => {
        window.removeEventListener('mousemove', onPointerMove);
        window.removeEventListener('mouseleave', onPointerLeave);
        if (rafId) cancelAnimationFrame(rafId);
      });
    }

    // ========================================================================
    // 2. Desktop Magnetic Buttons (Cached Rects on Enter)
    // ========================================================================
    if (isDesktop()) {
      const magneticButtons = document.querySelectorAll<HTMLElement>(
        '.pro-btn-primary, .pro-btn-outline, .nav-connect-btn, .pro-proof-tab-btn, .pro-ctrl-btn, .btn-editorial, .btn-editorial-outline, .proof-pill-btn'
      );

      magneticButtons.forEach((btn) => {
        let isHovered = false;
        let cachedRect: DOMRect | null = null;

        const onMouseEnter = () => {
          isHovered = true;
          cachedRect = btn.getBoundingClientRect();
        };

        const onMouseMove = (e: MouseEvent) => {
          if (!isHovered) return;
          if (!cachedRect) cachedRect = btn.getBoundingClientRect();
          const x = (e.clientX - cachedRect.left - cachedRect.width / 2) * 0.18;
          const y = (e.clientY - cachedRect.top - cachedRect.height / 2) * 0.18;
          btn.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
        };

        const onMouseLeave = () => {
          isHovered = false;
          cachedRect = null;
          btn.style.transform = 'translate3d(0, 0, 0)';
        };

        btn.addEventListener('mouseenter', onMouseEnter);
        btn.addEventListener('mousemove', onMouseMove, { passive: true });
        btn.addEventListener('mouseleave', onMouseLeave);

        cleanups.push(() => {
          btn.removeEventListener('mouseenter', onMouseEnter);
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
        const onEnter = () => {
          wallItems.forEach((other) => {
            if (other === item) {
              other.classList.add('proof-focused');
              other.classList.remove('proof-dimmed');
            } else {
              other.classList.remove('proof-focused');
              other.classList.add('proof-dimmed');
            }
          });
        };
        item.addEventListener('mouseenter', onEnter);
        cleanups.push(() => item.removeEventListener('mouseenter', onEnter));
      });

      const onWallLeave = () => {
        wallItems.forEach((item) => {
          item.classList.remove('proof-focused', 'proof-dimmed');
        });
      };
      proofWall.addEventListener('mouseleave', onWallLeave);
      cleanups.push(() => proofWall.removeEventListener('mouseleave', onWallLeave));
    }

    // ========================================================================
    // 4. Project Index Preview Tracking (#clients & #other-work)
    // ========================================================================
    const projectList = document.getElementById('project-index-list');
    const projectPreviewPane = document.getElementById('project-preview-pane');
    if (projectList && projectPreviewPane && isDesktop()) {
      let targetY = 0;
      let currentY = 0;
      let isTracking = false;
      let paneRafId = 0;
      let cachedListRect: DOMRect | null = null;

      const animatePane = () => {
        currentY += (targetY - currentY) * 0.12;
        projectPreviewPane.style.transform = `translate3d(0, ${currentY.toFixed(1)}px, 0)`;

        if (Math.abs(targetY - currentY) > 0.1) {
          paneRafId = requestAnimationFrame(animatePane);
        } else {
          isTracking = false;
        }
      };

      const onListEnter = () => {
        cachedListRect = projectList.getBoundingClientRect();
      };

      const onListMove = (e: MouseEvent) => {
        if (!cachedListRect) cachedListRect = projectList.getBoundingClientRect();
        const relativeY = e.clientY - cachedListRect.top;
        const progress = (relativeY / cachedListRect.height) * 2 - 1;
        targetY = progress * 24;

        if (!isTracking) {
          isTracking = true;
          paneRafId = requestAnimationFrame(animatePane);
        }
      };

      const onListLeave = () => {
        cachedListRect = null;
        targetY = 0;
        if (!isTracking) {
          isTracking = true;
          paneRafId = requestAnimationFrame(animatePane);
        }
      };

      projectList.addEventListener('mouseenter', onListEnter);
      projectList.addEventListener('mousemove', onListMove, { passive: true });
      projectList.addEventListener('mouseleave', onListLeave);

      cleanups.push(() => {
        projectList.removeEventListener('mouseenter', onListEnter);
        projectList.removeEventListener('mousemove', onListMove);
        projectList.removeEventListener('mouseleave', onListLeave);
        if (paneRafId) cancelAnimationFrame(paneRafId);
      });
    }

    // ========================================================================
    // 5. The Journey Chronology Rail Scroll-Spy & Interactive Chapter Nav
    // ========================================================================
    const railBtns = document.querySelectorAll<HTMLElement>('.journey-rail-btn');
    const yearBlocks = document.querySelectorAll<HTMLElement>('.journey-year-block, .journey-next-transition-block');

    if (railBtns.length) {
      railBtns.forEach((btn) => {
        const onClick = (e: MouseEvent) => {
          const targetId = btn.getAttribute('data-target');
          if (!targetId) return;

          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            e.preventDefault();
            const headerOffset = 110;
            const targetY = targetEl.getBoundingClientRect().top + window.scrollY - headerOffset;
            window.scrollTo({ top: targetY, behavior: 'smooth' });
          }
        };
        btn.addEventListener('click', onClick);
        cleanups.push(() => btn.removeEventListener('click', onClick));
      });

      if ('IntersectionObserver' in window && yearBlocks.length > 0) {
        const railObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const chapterId = entry.target.id;
                railBtns.forEach((btn) => {
                  const matches = btn.getAttribute('data-target') === chapterId;
                  btn.classList.toggle('active', matches);
                });
              }
            });
          },
          {
            rootMargin: '-25% 0px -50% 0px',
            threshold: 0.1,
          }
        );

        yearBlocks.forEach((block) => railObserver.observe(block));
        cleanups.push(() => railObserver.disconnect());
      }
    }

    // ========================================================================
    // 6. Speaking Horizontal Gallery Drag Handling
    // ========================================================================
    const speakingViewport = document.querySelector<HTMLElement>('.speaking-horizontal-viewport');
    if (speakingViewport) {
      let isDown = false;
      let startX = 0;
      let scrollLeft = 0;
      let cachedOffsetLeft = 0;

      const onMouseDown = (e: MouseEvent) => {
        isDown = true;
        cachedOffsetLeft = speakingViewport.offsetLeft;
        startX = e.pageX - cachedOffsetLeft;
        scrollLeft = speakingViewport.scrollLeft;
      };

      const onMouseUp = () => {
        isDown = false;
      };

      const onMouseMove = (e: MouseEvent) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - cachedOffsetLeft;
        const walk = (x - startX) * 1.6;
        speakingViewport.scrollLeft = scrollLeft - walk;
      };

      speakingViewport.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mouseup', onMouseUp);
      speakingViewport.addEventListener('mousemove', onMouseMove);

      cleanups.push(() => {
        speakingViewport.removeEventListener('mousedown', onMouseDown);
        window.removeEventListener('mouseup', onMouseUp);
        speakingViewport.removeEventListener('mousemove', onMouseMove);
      });
    }

    // ========================================================================
    // 7. Proof Vault Tab Filtering
    // ========================================================================
    const filterBtns = document.querySelectorAll<HTMLElement>('.proof-filter-btn');
    const proofCards = document.querySelectorAll<HTMLElement>('.proof-wall-item, .proof-card');

    if (filterBtns.length && proofCards.length) {
      filterBtns.forEach((btn) => {
        const onClick = () => {
          filterBtns.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          const filter = (btn.getAttribute('data-filter') || 'all').toLowerCase();

          proofCards.forEach((card) => {
            const category = (card.getAttribute('data-category') || '').toLowerCase();
            const categories = category.split(/\s+/);
            if (filter === 'all' || categories.includes(filter)) {
              card.style.display = 'flex';
              requestAnimationFrame(() => {
                card.style.opacity = '1';
              });
            } else {
              card.style.opacity = '0';
              setTimeout(() => {
                card.style.display = 'none';
              }, 200);
            }
          });
        };
        btn.addEventListener('click', onClick);
        cleanups.push(() => btn.removeEventListener('click', onClick));
      });
    }

    // ========================================================================
    // 8. Career Progression Nodes Inspector
    // ========================================================================
    const journeyNodes = document.querySelectorAll<HTMLElement>('.journey-node');
    const panelYear = document.getElementById('panel-year');
    const panelRole = document.getElementById('panel-role');
    const panelCompany = document.getElementById('panel-company');
    const panelSkills = document.getElementById('panel-skills');
    const panelProofBtn = document.getElementById('panel-proof-btn');

    if (journeyNodes.length) {
      journeyNodes.forEach((node) => {
        const onClick = () => {
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
        };
        node.addEventListener('click', onClick);
        cleanups.push(() => node.removeEventListener('click', onClick));
      });
    }

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return null;
}
