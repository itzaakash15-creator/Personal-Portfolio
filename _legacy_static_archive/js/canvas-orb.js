/**
 * AAKASH K Portfolio — Interactive Hero Canvas Orb & Particles
 * Renders glowing electric violet orb fields and micro-particles with cursor reactivity.
 */

export function initCanvasOrb() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, dpr;
  let animationFrameId;

  // Track mouse position with smoothing
  let mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    targetX: window.innerWidth / 2,
    targetY: window.innerHeight / 2,
  };

  function resize() {
    dpr = window.devicePixelRatio || 1;
    width = canvas.parentElement.offsetWidth;
    height = canvas.parentElement.offsetHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }

  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    if (e.clientY <= rect.bottom && e.clientY >= rect.top) {
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    }
  });

  // Particle System
  const particleCount = 45;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.45,
      speedY: (Math.random() - 0.5) * 0.45,
      alpha: Math.random() * 0.6 + 0.2,
      pulsing: Math.random() * Math.PI,
    });
  }

  let time = 0;

  function render() {
    time += 0.015;

    // Smooth cursor interpolation
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    ctx.clearRect(0, 0, width, height);

    // 1. Primary Glow Orb (Follows cursor smoothly)
    const orbRadius = Math.min(width, height) * 0.42;
    const orbGrad = ctx.createRadialGradient(
      mouse.x,
      mouse.y,
      0,
      mouse.x,
      mouse.y,
      orbRadius
    );
    orbGrad.addColorStop(0, 'rgba(168, 85, 247, 0.18)');
    orbGrad.addColorStop(0.4, 'rgba(121, 40, 202, 0.09)');
    orbGrad.addColorStop(0.8, 'rgba(79, 23, 135, 0.03)');
    orbGrad.addColorStop(1, 'transparent');

    ctx.fillStyle = orbGrad;
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, orbRadius, 0, Math.PI * 2);
    ctx.fill();

    // 2. Secondary Ambient Ambient Wave Orb (Organic breathing movement)
    const waveX = width * 0.5 + Math.sin(time * 0.6) * 120;
    const waveY = height * 0.4 + Math.cos(time * 0.4) * 80;
    const waveRadius = Math.min(width, height) * 0.5;

    const waveGrad = ctx.createRadialGradient(
      waveX,
      waveY,
      0,
      waveX,
      waveY,
      waveRadius
    );
    waveGrad.addColorStop(0, 'rgba(192, 132, 252, 0.12)');
    waveGrad.addColorStop(0.5, 'rgba(147, 51, 234, 0.05)');
    waveGrad.addColorStop(1, 'transparent');

    ctx.fillStyle = waveGrad;
    ctx.beginPath();
    ctx.arc(waveX, waveY, waveRadius, 0, Math.PI * 2);
    ctx.fill();

    // 3. Floating Light Particles
    particles.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;

      // Wrap around edges
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Parallax effect from mouse
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      let px = p.x;
      let py = p.y;

      if (dist < 180) {
        const force = (180 - dist) / 180;
        px -= (dx / dist) * force * 15;
        py -= (dy / dist) * force * 15;
      }

      p.pulsing += 0.02;
      const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulsing));

      ctx.fillStyle = `rgba(216, 180, 254, ${currentAlpha})`;
      ctx.beginPath();
      ctx.arc(px, py, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    animationFrameId = requestAnimationFrame(render);
  }

  // Optimize performance: pause canvas when hero is out of view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!animationFrameId) {
          animationFrameId = requestAnimationFrame(render);
        }
      } else {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    });
  }, { threshold: 0.05 });

  observer.observe(canvas);
}
