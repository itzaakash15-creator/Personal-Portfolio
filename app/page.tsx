'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroExperience from '../components/hero/HeroExperience';
import WorkExperience from '../components/work/WorkExperience';
import PersonalBranding from '../components/work/PersonalBranding';
import WebsiteBuilder from '../components/work/WebsiteBuilder';
import LifeWithAakash from '../components/work/LifeWithAakash';
import CredibilityTrust from '../components/work/CredibilityTrust';
import ClientWork from '../components/work/ClientWork';
import Journey from '../components/work/Journey';
import FutureDirection from '../components/work/FutureDirection';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import CaseDrawers from '../components/modals/CaseDrawers';
import ProofModal from '../components/modals/ProofModal';
import Toast from '../components/ui/Toast';
import ScrollProgress from '../components/ui/ScrollProgress';
import CursorBadge from '../components/ui/CursorBadge';
import InteractiveSystem from '../components/ui/InteractiveSystem';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function HomePage() {
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null);
  const [activeProof, setActiveProof] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const openDrawer = useCallback((drawerId: string) => {
    setActiveDrawer(drawerId);
  }, []);

  const closeDrawer = useCallback(() => {
    setActiveDrawer(null);
  }, []);

  const openProof = useCallback((proofKey: string) => {
    setActiveProof(proofKey);
  }, []);

  const closeProof = useCallback(() => {
    setActiveProof(null);
  }, []);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2600);
  }, []);

  // Controlled Smooth Anchor Navigation & Active Nav Scroll-Spy
  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const navSectionMap = [
      { id: 'about', target: 'about' },
      { id: 'vision', target: 'about' },
      { id: 'proof', target: 'proof' },
      { id: 'journey', target: 'journey' },
      { id: 'creator', target: 'creator' },
      { id: 'speaking', target: 'speaking' },
      { id: 'branding', target: 'work' },
      { id: 'experience', target: 'work' },
      { id: 'work', target: 'work' },
    ];

    let isNavScrolling = false;

    const getNavLinks = () => document.querySelectorAll<HTMLAnchorElement>('.nav-link');

    function updateActiveNav() {
      if (isNavScrolling) return;
      const navLinks = getNavLinks();
      if (!navLinks.length) return;

      // In the hero top area, no section link should be active
      if (window.scrollY < 250) {
        navLinks.forEach((link) => link.classList.remove('active'));
        return;
      }

      const headerOffset = 180;
      let currentTarget: string | null = null;

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

      navLinks.forEach((link) => {
        const href = (link.getAttribute('href') || '').replace('#', '');
        link.classList.toggle('active', href === currentTarget);
      });
    }

    let navSpyTicking = false;
    const onScrollSpy = () => {
      if (!navSpyTicking) {
        requestAnimationFrame(() => {
          updateActiveNav();
          navSpyTicking = false;
        });
        navSpyTicking = true;
      }
    };
    window.addEventListener('scroll', onScrollSpy, { passive: true });
    updateActiveNav();

    // 10e. Controlled Smooth Anchor Navigation with Pin-Aware Layout Recalculation
    function scrollToAnchor(targetEl: HTMLElement, smooth = true) {
      if (!targetEl) return;

      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }

      const headerOffset = 90;
      const rect = targetEl.getBoundingClientRect();
      const targetPos = Math.max(0, rect.top + window.scrollY - headerOffset);

      // Update active nav link immediately to match target
      const targetId = targetEl.id;
      const mappedTarget = navSectionMap.find((m) => m.id === targetId)?.target || targetId;
      const navLinks = getNavLinks();
      navLinks.forEach((link) => {
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
      let startTime: number | null = null;

      function step(timestamp: number) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease in-out cubic
        const ease =
          progress < 0.5
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

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const proofTrigger = target.closest('[data-proof]') as HTMLElement | null;
      if (proofTrigger) {
        const key = proofTrigger.getAttribute('data-proof');
        if (key) {
          e.preventDefault();
          setActiveProof(key);
          return;
        }
      }

      const drawerTrigger = target.closest('[data-drawer]') as HTMLElement | null;
      if (drawerTrigger) {
        const drawerId = drawerTrigger.getAttribute('data-drawer');
        if (drawerId) {
          e.preventDefault();
          setActiveDrawer(drawerId);
          return;
        }
      }

      // Smooth anchor scrolling with pin awareness
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;
        const targetEl = document.querySelector(href) as HTMLElement | null;
        if (targetEl) {
          e.preventDefault();
          if (history.pushState) {
            history.pushState(null, '', href);
          }
          scrollToAnchor(targetEl, true);
        }
      }
    };

    document.addEventListener('click', handleGlobalClick);

    // Handle URL hash on initial page load (prevent getting trapped in pinned hero spacer)
    function handleInitialHash() {
      if (window.location.hash && window.location.hash !== '#') {
        const targetEl = document.querySelector(window.location.hash) as HTMLElement | null;
        if (targetEl) {
          if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
          }
          scrollToAnchor(targetEl, false);
          setTimeout(() => {
            scrollToAnchor(targetEl, false);
          }, 150);
          setTimeout(() => {
            scrollToAnchor(targetEl, false);
          }, 500);
        }
      }
    }

    handleInitialHash();
    const onHashChange = () => {
      if (window.location.hash && window.location.hash !== '#') {
        const targetEl = document.querySelector(window.location.hash) as HTMLElement | null;
        if (targetEl) {
          scrollToAnchor(targetEl, true);
        }
      }
    };
    window.addEventListener('hashchange', onHashChange);

    return () => {
      window.removeEventListener('scroll', onScrollSpy);
      document.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  return (
    <main className="main-content-flow">
      {/* 1. Navigation */}
      <Navbar />

      {/* 2. Locked Hero + Locked Four-Role Scroll Experience */}
      <HeroExperience />

      {/* 3. Section 01: Digi Marketrix & Talentrix */}
      <WorkExperience onOpenDrawer={openDrawer} onOpenProof={openProof} />

      {/* 4. Section 02: Personal Branding Strategist */}
      <PersonalBranding onOpenDrawer={openDrawer} onOpenProof={openProof} />

      {/* 5. Section 03: Website Builder */}
      <WebsiteBuilder onOpenDrawer={openDrawer} onOpenProof={openProof} />

      {/* 6. Section 04: Life with Aakash */}
      <LifeWithAakash onOpenProof={openProof} />

      {/* 7. Section 05: Supporting Credibility (Trust / Awards) */}
      <CredibilityTrust onOpenDrawer={openDrawer} onOpenProof={openProof} />

      {/* 8. Section 06: Clients & Production Index */}
      <ClientWork onOpenProof={openProof} />

      {/* 9. Section 07: The Progression (Journey) */}
      <Journey onOpenProof={openProof} />

      {/* 10. Section 08: Future Horizons */}
      <FutureDirection />

      {/* 11. Section 09: Contact / Collaboration */}
      <Contact onShowToast={showToast} />

      {/* 12. Footer */}
      <Footer />

      {/* Slide-over Deep Dive Case Drawers */}
      <CaseDrawers
        activeDrawerId={activeDrawer}
        onClose={closeDrawer}
        onOpenProof={openProof}
      />

      {/* Interactive Proof Modal Lightbox */}
      <ProofModal
        currentKey={activeProof}
        onClose={closeProof}
        onSelectKey={setActiveProof}
      />

      {/* Toast Feedback */}
      <Toast message={toastMessage} />

      {/* Contextual Floating Elements */}
      <ScrollProgress />
      <CursorBadge />
      <InteractiveSystem />

      {/* Atmospheric Texture Overlay */}
      <div className="atmospheric-noise" aria-hidden="true"></div>
    </main>
  );
}
