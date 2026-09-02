/**
 * AAKASH K Portfolio — Before / After Interactive Transformation Slider
 * Provides smooth dragging, touch handling, and accessibility keys.
 */

export function initTransformationSlider() {
  const container = document.querySelector('.transformation-slider-container');
  if (!container) return;

  let isDragging = false;

  function updatePosition(clientX) {
    const rect = container.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    let percentage = (offsetX / rect.width) * 100;

    // Clamp between 3% and 97% for clean visuals
    percentage = Math.max(3, Math.min(97, percentage));

    container.style.setProperty('--slider-pos', `${percentage}%`);
  }

  // Mouse Events
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    updatePosition(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch Events for Mobile / Tablet
  container.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      updatePosition(e.touches[0].clientX);
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    updatePosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Keyboard navigation for accessibility
  container.setAttribute('tabindex', '0');
  container.setAttribute('role', 'slider');
  container.setAttribute('aria-label', 'Before and after video transformation comparison slider');
  container.setAttribute('aria-valuemin', '0');
  container.setAttribute('aria-valuemax', '100');
  container.setAttribute('aria-valuenow', '50');

  container.addEventListener('keydown', (e) => {
    const current = parseFloat(getComputedStyle(container).getPropertyValue('--slider-pos')) || 50;
    if (e.key === 'ArrowLeft') {
      const next = Math.max(5, current - 5);
      container.style.setProperty('--slider-pos', `${next}%`);
      container.setAttribute('aria-valuenow', next);
    } else if (e.key === 'ArrowRight') {
      const next = Math.min(95, current + 5);
      container.style.setProperty('--slider-pos', `${next}%`);
      container.setAttribute('aria-valuenow', next);
    }
  });
}
