/**
 * AAKASH K Portfolio — Custom Magnetic Cursor
 * Runs only on devices with fine pointer (desktop).
 * Features smooth lerp ring + dot, magnetic attraction, and interaction scaling.
 */

export function initCursor() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let isHovered = false;
  let isMagnetic = false;
  let magneticTarget = null;
  let isVisible = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      isVisible = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    }

    // Direct update on dot for zero lag
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

    // Update global CSS mouse coordinates for spotlight cards
    document.documentElement.style.setProperty('--cursor-x', `${mouseX}px`);
    document.documentElement.style.setProperty('--cursor-y', `${mouseY}px`);
  });

  document.addEventListener('mouseleave', () => {
    isVisible = false;
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    isVisible = true;
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });

  // Smooth lerp loop for the outer ring
  function render() {
    let targetX = mouseX;
    let targetY = mouseY;

    if (isMagnetic && magneticTarget) {
      const rect = magneticTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      targetX = centerX + (mouseX - centerX) * 0.35;
      targetY = centerY + (mouseY - centerY) * 0.35;
    }

    ringX += (targetX - ringX) * 0.18;
    ringY += (targetY - ringY) * 0.18;

    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${isHovered ? 1.6 : 1})`;
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  // Attach hover scaling and magnetic snapping
  function refreshHoverListeners() {
    const interactables = document.querySelectorAll(
      'a, button, input, select, textarea, .work-card, .lab-card, .timeline-node, .skill-pill, [data-cursor="pointer"]'
    );

    interactables.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        isHovered = true;
        ring.classList.add('cursor-hover');
        dot.classList.add('cursor-hover');

        if (el.hasAttribute('data-magnetic') || el.classList.contains('btn-magnetic')) {
          isMagnetic = true;
          magneticTarget = el;
        }
      });

      el.addEventListener('mouseleave', () => {
        isHovered = false;
        isMagnetic = false;
        magneticTarget = null;
        ring.classList.remove('cursor-hover');
        dot.classList.remove('cursor-hover');
      });
    });
  }

  refreshHoverListeners();

  // Expose refresh function for dynamic content
  window.__refreshCursor = refreshHoverListeners;
}
