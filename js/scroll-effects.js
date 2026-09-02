/**
 * AAKASH K Portfolio — Scroll Effects, Spotlight & Counter Animations
 */

export function initScrollEffects() {
  const header = document.querySelector('.site-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  // 1. Sticky Nav Shrink on Scroll
  function handleScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Active Section Tracking
    let currentId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Spotlight Card Mouse Coordinates
  const spotlightCards = document.querySelectorAll('.spotlight-card');
  spotlightCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 3. Animated Counter for Stats
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach((stat) => {
          const target = parseInt(stat.getAttribute('data-target'), 10);
          const suffix = stat.getAttribute('data-suffix') || '';
          let current = 0;
          const duration = 1500;
          const stepTime = 30;
          const increment = target / (duration / stepTime);

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              stat.textContent = `${target}${suffix}`;
              clearInterval(timer);
            } else {
              stat.textContent = `${Math.floor(current)}${suffix}`;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-card-container');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // 4. Skills Category Filter
  const filterBtns = document.querySelectorAll('.skills-filter-btn');
  const skillTags = document.querySelectorAll('.skill-tag');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillTags.forEach((tag) => {
        const category = tag.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          tag.style.display = 'inline-flex';
          tag.style.opacity = '1';
          tag.style.transform = 'scale(1)';
        } else {
          tag.style.opacity = '0.2';
          tag.style.transform = 'scale(0.95)';
        }
      });
    });
  });
}
