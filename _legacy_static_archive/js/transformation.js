/**
 * AAKASH K Portfolio — Interactive Before/After Transformation Slider
 * Demonstrates the 5-video transformation in framing, lighting, and perceived value.
 * Supports mouse drag, touch drag, and keyboard navigation.
 */

export function initTransformationSlider() {
  const container = document.querySelector('.transformation-slider-container');
  if (!container) return;

  const handle = container.querySelector('.slider-handle');
  const beforeImg = container.querySelector('.slider-img-before');
  if (!handle || !beforeImg) return;

  let isDragging = false;
  let currentPercentage = 50;

  function updateSlider(percentage) {
    const clamped = Math.max(0, Math.min(100, percentage));
    currentPercentage = clamped;

    // Clip before image to percentage
    beforeImg.style.clipPath = `polygon(0 0, ${clamped}% 0, ${clamped}% 100%, 0 100%)`;
    handle.style.left = `${clamped}%`;
  }

  function handleMove(clientX) {
    const rect = container.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const percentage = (offsetX / rect.width) * 100;
    updateSlider(percentage);
  }

  // Pointer events for desktop & touch
  container.addEventListener('pointerdown', (e) => {
    isDragging = true;
    container.setPointerCapture(e.pointerId);
    handleMove(e.clientX);
  });

  container.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  });

  function stopDrag(e) {
    if (isDragging) {
      isDragging = false;
      try {
        container.releasePointerCapture(e.pointerId);
      } catch (err) {}
    }
  }

  container.addEventListener('pointerup', stopDrag);
  container.addEventListener('pointercancel', stopDrag);

  // Keyboard accessibility
  handle.setAttribute('tabindex', '0');
  handle.setAttribute('role', 'slider');
  handle.setAttribute('aria-valuenow', '50');
  handle.setAttribute('aria-valuemin', '0');
  handle.setAttribute('aria-valuemax', '100');
  handle.setAttribute('aria-label', 'Transformation Before and After split');

  handle.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      updateSlider(currentPercentage - 5);
      handle.setAttribute('aria-valuenow', currentPercentage.toString());
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      updateSlider(currentPercentage + 5);
      handle.setAttribute('aria-valuenow', currentPercentage.toString());
    }
  });

  // Initial setup at 50%
  updateSlider(50);
}
