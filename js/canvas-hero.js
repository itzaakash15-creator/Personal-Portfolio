/**
 * AAKASH K Portfolio — Cinematic Technical Background Canvas
 * Near-black technical background with subtle atmospheric purple/indigo glow
 * and interactive delicate particle constellation.
 * Zero generic blobs or heavy 3D spheres. Optimized with IntersectionObserver.
 */

export function initCanvasHero() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
  let isVisible = true;
  let animId = null;

  // Reduced motion check
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    width = canvas.parentElement.offsetWidth || window.innerWidth;
    height = canvas.parentElement.offsetHeight || window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    initParticles();
  }

  function initParticles() {
    particles = [];
    const count = Math.floor(Math.min(width * 0.045, 60));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.4 + 0.6,
        alpha: Math.random() * 0.4 + 0.2,
        baseAlpha: Math.random() * 0.35 + 0.15,
        color: Math.random() > 0.4 ? 'rgba(168, 85, 247,' : 'rgba(99, 102, 241,'
      });
    }
  }

  // Mouse tracking on hero section
  const heroSection = canvas.closest('.hero-section') || canvas.parentElement;
  heroSection.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.targetX = e.clientX - rect.left;
    mouse.targetY = e.clientY - rect.top;
  });

  heroSection.addEventListener('mouseleave', () => {
    mouse.targetX = -1000;
    mouse.targetY = -1000;
  });

  // IntersectionObserver to pause rendering when offscreen
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animId) {
        animId = requestAnimationFrame(render);
      }
    });
  }, { threshold: 0.05 });
  observer.observe(heroSection);

  function render() {
    if (!isVisible) {
      animId = null;
      return;
    }

    // Smooth mouse lerp
    mouse.x += (mouse.targetX - mouse.x) * 0.08;
    mouse.y += (mouse.targetY - mouse.y) * 0.08;

    ctx.clearRect(0, 0, width, height);

    // 1. Draw subtle ambient purple radial glow around cursor
    if (mouse.x > 0 && mouse.y > 0) {
      const glowGrad = ctx.createRadialGradient(mouse.x, mouse.y, 10, mouse.x, mouse.y, 450);
      glowGrad.addColorStop(0, 'rgba(139, 92, 246, 0.12)');
      glowGrad.addColorStop(0.5, 'rgba(99, 102, 241, 0.04)');
      glowGrad.addColorStop(1, 'rgba(6, 6, 9, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);
    }

    // 2. Draw static subtle center atmospheric glow
    const centerGlow = ctx.createRadialGradient(width * 0.65, height * 0.4, 50, width * 0.65, height * 0.4, width * 0.7);
    centerGlow.addColorStop(0, 'rgba(121, 40, 202, 0.08)');
    centerGlow.addColorStop(0.7, 'rgba(99, 102, 241, 0.02)');
    centerGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = centerGlow;
    ctx.fillRect(0, 0, width, height);

    if (prefersReducedMotion) {
      // Just draw static dots without animation
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.alpha})`;
        ctx.fill();
      });
      return;
    }

    // 3. Render and connect particles
    const maxDist = 130;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Mouse repulsion / attraction
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const distToMouse = Math.hypot(dx, dy);

      if (distToMouse < 180) {
        const force = (180 - distToMouse) / 180;
        p.x -= (dx / distToMouse) * force * 1.5;
        p.y -= (dy / distToMouse) * force * 1.5;
        p.alpha = Math.min(0.8, p.baseAlpha + force * 0.5);
      } else {
        p.alpha += (p.baseAlpha - p.alpha) * 0.03;
      }

      // Draw particle dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color} ${p.alpha})`;
      ctx.fill();

      // Proximity line connections
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < maxDist) {
          const lineAlpha = (1 - dist / maxDist) * 0.12 * Math.min(p.alpha, p2.alpha);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(168, 85, 247, ${lineAlpha})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }

    animId = requestAnimationFrame(render);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();
  animId = requestAnimationFrame(render);
}
