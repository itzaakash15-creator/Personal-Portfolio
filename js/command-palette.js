/**
 * AAKASH K Portfolio — Command Palette (⌘K / Ctrl+K)
 * Modern developer/product command center with search, keyboard navigation,
 * and quick actions.
 */

import { playOpenSound, toggleSound } from './audio.js';

export function initCommandPalette() {
  const palette = document.getElementById('command-palette');
  const input = document.getElementById('command-input');
  const list = document.getElementById('command-list');
  const triggers = document.querySelectorAll('[data-action="open-palette"]');
  const closeBtn = document.getElementById('command-close-btn');

  if (!palette || !input || !list) return;

  let activeIndex = 0;
  let visibleItems = [];

  const commands = [
    {
      id: 'work',
      category: 'Navigation',
      label: 'View Work',
      detail: 'Selected client case studies & digital deliverables',
      icon: '💼',
      action: () => scrollToSection('#work')
    },
    {
      id: 'experience',
      category: 'Navigation',
      label: 'View Experience',
      detail: 'Digi Marketrix internship & creative history',
      icon: '⚡',
      action: () => scrollToSection('#experience')
    },
    {
      id: 'lab',
      category: 'Navigation',
      label: 'Open Digital Lab',
      detail: 'Hardware, AI & Data Science, ESP32 & SIH projects',
      icon: '🧪',
      action: () => scrollToSection('#lab')
    },
    {
      id: 'journey',
      category: 'Navigation',
      label: 'Explore Journey',
      detail: 'Creator → Builder timeline from 2020 to Future',
      icon: '🧭',
      action: () => scrollToSection('#journey')
    },
    {
      id: 'about',
      category: 'Navigation',
      label: 'About Aakash',
      detail: 'Philosophy, education at Rathinam & background',
      icon: '👤',
      action: () => scrollToSection('#about')
    },
    {
      id: 'vision',
      category: 'Navigation',
      label: 'Explore The Vision',
      detail: 'Services → Systems → Products roadmap',
      icon: '🔭',
      action: () => scrollToSection('#vision')
    },
    {
      id: 'contact',
      category: 'Contact',
      label: 'Contact Aakash',
      detail: 'Send a message or schedule a consultation',
      icon: '✉️',
      action: () => scrollToSection('#contact')
    },
    {
      id: 'copy-email',
      category: 'Actions',
      label: 'Copy Email Address',
      detail: 'itzaakash15@gmail.com',
      icon: '📋',
      action: () => {
        navigator.clipboard.writeText('itzaakash15@gmail.com');
        showToast('Email copied to clipboard: itzaakash15@gmail.com');
      }
    },
    {
      id: 'linkedin',
      category: 'Socials',
      label: 'View LinkedIn',
      detail: 'Connect with Aakash K on LinkedIn',
      icon: '🔗',
      action: () => window.open('https://www.linkedin.com/in/aakash-k-028a2b389/', '_blank')
    },
    {
      id: 'github',
      category: 'Socials',
      label: 'View GitHub',
      detail: 'Explore repositories & code @itzaakash15-creator',
      icon: '🐙',
      action: () => window.open('https://github.com/itzaakash15-creator', '_blank')
    },
    {
      id: 'instagram',
      category: 'Socials',
      label: 'Instagram (@life.with_aakash)',
      detail: 'Personal branding reels & video content',
      icon: '📸',
      action: () => window.open('https://www.instagram.com/life.with_aakash/', '_blank')
    },
    {
      id: 'sound',
      category: 'System',
      label: 'Toggle Audio Feedback (SFX)',
      detail: 'Enable or disable interactive synthesizer clicks',
      icon: '🔊',
      action: () => {
        const enabled = toggleSound();
        showToast(enabled ? 'Audio feedback enabled' : 'Audio feedback muted');
      }
    }
  ];

  function openPalette() {
    palette.classList.add('active');
    palette.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    input.value = '';
    renderList(commands);
    setTimeout(() => input.focus(), 50);
    playOpenSound();
  }

  function closePalette() {
    palette.classList.remove('active');
    palette.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function scrollToSection(selector) {
    closePalette();
    const el = document.querySelector(selector);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }

  function renderList(items) {
    visibleItems = items;
    activeIndex = 0;
    list.innerHTML = '';

    if (items.length === 0) {
      list.innerHTML = `
        <div class="palette-empty">
          <span>No commands found for "${input.value}"</span>
          <span class="palette-hint">Try searching "work", "lab", "email", or "github"</span>
        </div>
      `;
      return;
    }

    let currentCategory = '';
    items.forEach((item, index) => {
      if (item.category !== currentCategory) {
        currentCategory = item.category;
        const catHeader = document.createElement('div');
        catHeader.className = 'palette-category-label';
        catHeader.textContent = currentCategory;
        list.appendChild(catHeader);
      }

      const el = document.createElement('div');
      el.className = `palette-item ${index === activeIndex ? 'selected' : ''}`;
      el.setAttribute('data-index', index);
      el.innerHTML = `
        <span class="palette-item-icon">${item.icon}</span>
        <div class="palette-item-info">
          <span class="palette-item-title">${highlightMatch(item.label, input.value)}</span>
          <span class="palette-item-desc">${item.detail}</span>
        </div>
        <span class="palette-item-enter" aria-hidden="true">↵</span>
      `;

      el.addEventListener('mouseenter', () => {
        setActiveIndex(index);
      });

      el.addEventListener('click', () => {
        item.action();
        closePalette();
      });

      list.appendChild(el);
    });
  }

  function setActiveIndex(idx) {
    if (visibleItems.length === 0) return;
    activeIndex = (idx + visibleItems.length) % visibleItems.length;
    const itemEls = list.querySelectorAll('.palette-item');
    itemEls.forEach((el) => {
      const elIdx = parseInt(el.getAttribute('data-index'), 10);
      el.classList.toggle('selected', elIdx === activeIndex);
      if (elIdx === activeIndex) {
        el.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  function highlightMatch(text, query) {
    if (!query) return text;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  // Filter on input
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) {
      renderList(commands);
      return;
    }
    const filtered = commands.filter((cmd) => {
      return (
        cmd.label.toLowerCase().includes(q) ||
        cmd.detail.toLowerCase().includes(q) ||
        cmd.category.toLowerCase().includes(q)
      );
    });
    renderList(filtered);
  });

  // Keyboard navigation inside input
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(activeIndex + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(activeIndex - 1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (visibleItems[activeIndex]) {
        visibleItems[activeIndex].action();
        closePalette();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closePalette();
    }
  });

  // Global keyboard shortcut: ⌘K or Ctrl+K
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (palette.classList.contains('active')) {
        closePalette();
      } else {
        openPalette();
      }
    } else if (e.key === 'Escape' && palette.classList.contains('active')) {
      closePalette();
    }
  });

  // Triggers
  triggers.forEach((btn) => btn.addEventListener('click', openPalette));
  closeBtn?.addEventListener('click', closePalette);

  // Close on backdrop click
  palette.addEventListener('click', (e) => {
    if (e.target === palette) closePalette();
  });

  function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    if (toast && toastMsg) {
      toastMsg.textContent = msg;
      toast.classList.add('visible');
      setTimeout(() => toast.classList.remove('visible'), 2400);
    }
  }
}
