/**
 * AAKASH K Portfolio — Custom Desktop Cursor
 * Implements smooth lerp physics, button magnetism, and custom hover states.
 */

export function initCursor() {
  // Disable on touch / mobile devices
  if (window.matchMedia('(hover: none) or (pointer: coarse)').matches) {
    return;
  }

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';

  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let dotX = mouseX;
  let dotY = mouseY;
  let isHovering = false;
  let isProjectHover = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // RAF Smooth loop
  function render() {
    // Dot moves instantly
    dotX += (mouseX - dotX) * 0.75;
    dotY += (mouseY - dotY) * 0.75;
    dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;

    // Ring lags with lerp for organic fluid motion
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  // Hover detection
  function attachHoverListeners() {
    // Interactive clickable items
    const clickables = document.querySelectorAll('a, button, input, textarea, .spotlight-card, .skills-filter-btn');
    clickables.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        ring.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        ring.classList.remove('cursor-hover');
      });
    });

    // Work project cards trigger VIEW ↗ cursor
    const projectCards = document.querySelectorAll('.work-card');
    projectCards.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        ring.classList.add('cursor-view');
        dot.style.opacity = '0';
      });
      el.addEventListener('mouseleave', () => {
        ring.classList.remove('cursor-view');
        dot.style.opacity = '1';
      });
    });
  }

  attachHoverListeners();

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });
}
