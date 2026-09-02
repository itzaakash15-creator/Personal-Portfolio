/**
 * AAKASH K Portfolio — Main Application Bootstrap
 */

import { initCursor } from './cursor.js';
import { initCanvasOrb } from './canvas-orb.js';
import { initTransformationSlider } from './transformation.js';
import { initProjectModal } from './project-modal.js';
import { initScrollEffects } from './scroll-effects.js';
import { initContact } from './contact.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Core Systems
  initCursor();
  initCanvasOrb();
  initTransformationSlider();
  initProjectModal();
  initScrollEffects();
  initContact();

  // Mobile Navigation Drawer
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mobileOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-menu-overlay a');

  function toggleMobileMenu() {
    mobileToggle?.classList.toggle('open');
    mobileOverlay?.classList.toggle('open');
    document.body.style.overflow = mobileOverlay?.classList.contains('open') ? 'hidden' : '';
  }

  mobileToggle?.addEventListener('click', toggleMobileMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileToggle?.classList.remove('open');
      mobileOverlay?.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
        });
      }
    });
  });
});
