/**
 * AAKASH K Portfolio — Master Application Bootstrap
 * Orchestrates the command center, navigation, modals, audio, and visual engines.
 */

import { initAudio, playOpenSound } from './audio.js';
import { initCursor } from './cursor.js';
import { initCanvasHero } from './canvas-hero.js';
import { initCommandPalette } from './command-palette.js';
import { initProjectModal } from './project-modal.js';
import { initTransformationSlider } from './transformation.js';
import { initJourney } from './journey.js';
import { initDigitalLab } from './digital-lab.js';
import { initSkills } from './skills.js';
import { initContact } from './contact.js';
import { initScrollEffects } from './scroll-effects.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Subsystems
  initAudio();
  initCursor();
  initCanvasHero();
  initCommandPalette();
  initProjectModal();
  initTransformationSlider();
  initJourney();
  initDigitalLab();
  initSkills();
  initContact();
  initScrollEffects();

  // Fullscreen Navigation Overlay (Menu Trigger)
  const menuToggleBtn = document.getElementById('nav-menu-toggle');
  const menuOverlay = document.getElementById('nav-fullscreen-overlay');
  const menuCloseBtn = document.getElementById('nav-overlay-close');
  const overlayLinks = document.querySelectorAll('.nav-overlay-link, .nav-overlay-action');

  function openMenu() {
    menuOverlay?.classList.add('active');
    menuOverlay?.setAttribute('aria-hidden', 'false');
    menuToggleBtn?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    playOpenSound();
  }

  function closeMenu() {
    menuOverlay?.classList.remove('active');
    menuOverlay?.setAttribute('aria-hidden', 'true');
    menuToggleBtn?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  menuToggleBtn?.addEventListener('click', () => {
    if (menuOverlay?.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menuCloseBtn?.addEventListener('click', closeMenu);

  overlayLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Smooth scroll with offset for internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;
      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Global Quick Shortcuts (when not inside form fields)
  window.addEventListener('keydown', (e) => {
    const isEditing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName);
    if (isEditing) return;

    if (e.key.toLowerCase() === 'w' && !e.metaKey && !e.ctrlKey) {
      document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
    } else if (e.key.toLowerCase() === 'l' && !e.metaKey && !e.ctrlKey) {
      document.querySelector('#lab')?.scrollIntoView({ behavior: 'smooth' });
    } else if (e.key.toLowerCase() === 'j' && !e.metaKey && !e.ctrlKey) {
      document.querySelector('#journey')?.scrollIntoView({ behavior: 'smooth' });
    } else if (e.key.toLowerCase() === 'c' && !e.metaKey && !e.ctrlKey) {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  });

  console.log('%cAAKASH K %c// DIGITAL COMMAND CENTER ACTIVATED', 'background: #8b5cf6; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 4px;', 'color: #a855f7; font-weight: bold;');
});
