/**
 * AAKASH K Portfolio — Scroll Effects, Number Counters & Navigation Spy
 * High-performance, uses IntersectionObserver and passive scroll listeners.
 */

export function initScrollEffects() {
  const header = document.getElementById('site-header');
  const progressBar = document.getElementById('scroll-progress-bar');
  const yearElement = document.getElementById('current-year');

  // Dynamic Year
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Header Scroll State & Progress Bar
  function onScroll() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    if (header) {
      header.classList.toggle('scrolled', scrollY > 40);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Animated Number Counters using IntersectionObserver
  const counterElements = document.querySelectorAll('[data-counter-target]');
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  counterElements.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-counter-target'));
    const suffix = el.getAttribute('data-counter-suffix') || '';
    const prefix = el.getAttribute('data-counter-prefix') || '';
    const duration = parseInt(el.getAttribute('data-counter-duration') || '1600', 10);
    const isYear = target > 1900;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = isYear 
        ? Math.floor(target - (1 - easeProgress) * 50)
        : Math.floor(easeProgress * target);

      el.textContent = `${prefix}${currentVal}${progress >= 1 ? suffix : ''}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = `${prefix}${target}${suffix}`;
      }
    }

    requestAnimationFrame(update);
  }

  // Active Navigation Link Highlighting via IntersectionObserver
  const sections = document.querySelectorAll('section[id], div[id="work"], div[id="lab"]');
  const navLinks = document.querySelectorAll('.nav-link, .nav-overlay-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          link.classList.toggle('active', href === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(s => sectionObserver.observe(s));

  // Back to top button
  const backToTopBtn = document.getElementById('back-to-top');
  backToTopBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Spotlight card mouse coordinate updates
  document.querySelectorAll('.spotlight-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}
