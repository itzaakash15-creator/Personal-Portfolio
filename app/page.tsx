'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroExperience from '../components/hero/HeroExperience';
import DigiMarketrix from '../components/work/DigiMarketrix';
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

  // Global delegated click handler for any dynamic triggers or inline links
  useEffect(() => {
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

      // Smooth anchor scrolling
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (anchor) {
        const targetId = anchor.getAttribute('href')?.replace('#', '');
        if (targetId) {
          const el = document.getElementById(targetId);
          if (el) {
            e.preventDefault();
            const offset = 80;
            const top = el.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  return (
    <main className="main-content-flow">
      {/* 1. Navigation */}
      <Navbar />

      {/* 2. Locked Hero + Locked Four-Role Scroll Experience */}
      <HeroExperience />

      {/* 3. Section 01: Digi Marketrix & Talentrix */}
      <DigiMarketrix onOpenDrawer={openDrawer} onOpenProof={openProof} />

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

      {/* Atmospheric Texture Overlay */}
      <div className="atmospheric-noise" aria-hidden="true"></div>
    </main>
  );
}
