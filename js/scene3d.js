/**
 * AKU — Premium 3D Character Scene & Scroll-Driven Storytelling Engine
 * Built with Three.js & GSAP ScrollTrigger
 * 
 * Features:
 * - Dimensional depth-stage with dynamic fashion/editorial lighting
 * - Subtle cursor-driven perspective lerp (X: ±4°, Y: ±3°)
 * - Organic idle breathing animation
 * - Architectural depth geometry behind the character
 * - ScrollTrigger-driven transition into "I DON'T FIT INTO ONE BOX"
 * - High-performance viewport culling & graceful WebGL fallback
 */

(function () {
  'use strict';

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Check WebGL support
  function hasWebGL() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  const container = document.getElementById('hero-3d-stage');
  const fallbackImg = document.getElementById('hero-fallback-portrait');

  if (!container || !hasWebGL() || prefersReducedMotion || typeof THREE === 'undefined') {
    if (fallbackImg) {
      fallbackImg.style.opacity = '1';
    }
    return;
  }

  // Configuration
  const CONFIG = {
    portraitSrc: 'assets/aakash_authentic_portrait.png',
    maxRotX: 0.069, // ~4 degrees
    maxRotY: 0.052, // ~3 degrees
    lerpFactor: 0.05,
    goldColor: 0xd8c3a5,
    champagneColor: 0xe8d7be,
    charcoalBg: 0x0a0a0c
  };

  // Dimensions
  let width = container.clientWidth || 600;
  let height = container.clientHeight || 750;
  let isMobile = window.innerWidth <= 960;

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
  camera.position.set(0, 0, 4.8);

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const canvasEl = renderer.domElement;
  canvasEl.className = 'scene-3d-canvas';
  canvasEl.style.position = 'absolute';
  canvasEl.style.top = '0';
  canvasEl.style.left = '0';
  canvasEl.style.width = '100%';
  canvasEl.style.height = '100%';
  canvasEl.style.opacity = '0';
  canvasEl.style.transition = 'opacity 0.8s ease-in-out';
  canvasEl.style.pointerEvents = 'none';
  container.appendChild(canvasEl);

  // Group for the 3D character + architectural depth elements
  const characterGroup = new THREE.Group();
  scene.add(characterGroup);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xf5f2eb, 0.7);
  scene.add(ambientLight);

  // Key Light (Upper Left warm champagne directional)
  const keyLight = new THREE.DirectionalLight(CONFIG.champagneColor, 1.4);
  keyLight.position.set(-2.5, 3.5, 3);
  scene.add(keyLight);

  // Rim Light (Upper Right cool-white silhouette light)
  const rimLight = new THREE.DirectionalLight(0xffffff, 1.1);
  rimLight.position.set(2.8, 2.2, -1.8);
  scene.add(rimLight);

  // Interactive Cursor Point Light (Subtle specular reflections on blazer & watch)
  const cursorLight = new THREE.PointLight(CONFIG.goldColor, 0.9, 8);
  cursorLight.position.set(0, 0, 2.5);
  scene.add(cursorLight);

  // Architectural Background Depth: Sleek Minimalist Ring
  const ringGeo = new THREE.TorusGeometry(1.65, 0.006, 16, 100);
  const ringMat = new THREE.MeshBasicMaterial({
    color: CONFIG.goldColor,
    transparent: true,
    opacity: 0.28
  });
  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.position.set(0, 0.05, -0.45);
  ringMesh.rotation.x = Math.PI * 0.08;
  ringMesh.rotation.y = Math.PI * 0.12;
  scene.add(ringMesh);

  // Subtle curved backdrop arc
  const arcGeo = new THREE.TorusGeometry(2.1, 0.003, 16, 80, Math.PI * 0.8);
  const arcMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.12
  });
  const arcMesh = new THREE.Mesh(arcGeo, arcMat);
  arcMesh.position.set(-0.2, -0.3, -0.6);
  arcMesh.rotation.z = Math.PI * 0.25;
  scene.add(arcMesh);

  // Texture & Character Mesh
  const textureLoader = new THREE.TextureLoader();
  let characterMesh = null;
  let customUniforms = null;

  textureLoader.load(
    CONFIG.portraitSrc,
    function (texture) {
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;

      // Aspect ratio of portrait
      const imgAspect = texture.image.width / texture.image.height;
      const meshHeight = 3.65;
      const meshWidth = meshHeight * imgAspect;

      // High-density segmented plane for organic depth and breathing curvature
      const planeGeo = new THREE.PlaneGeometry(meshWidth, meshHeight, 48, 48);

      // Custom Shader for Editorial Lighting, Dimensional Depth & Breathing
      customUniforms = {
        uTexture: { value: texture },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uGold: { value: new THREE.Color(CONFIG.goldColor) },
        uFadeBottom: { value: 1.0 }
      };

      const vertexShader = `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float uTime;
        uniform vec2 uMouse;

        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          
          vec3 pos = position;

          // Organic breathing cycle: subtle chest/torso expansion
          float breathingWeight = smoothstep(0.15, 0.7, uv.y) * (1.0 - smoothstep(0.85, 1.0, uv.y));
          float breath = sin(uTime * 1.6) * 0.018 * breathingWeight;
          pos.z += breath;

          // Subtle organic depth curvature across X axis
          float curve = (1.0 - (uv.x - 0.5) * (uv.x - 0.5) * 4.0) * 0.04;
          pos.z += curve;

          vPosition = (modelViewMatrix * vec4(pos, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `;

      const fragmentShader = `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform sampler2D uTexture;
        uniform vec3 uGold;
        uniform vec2 uMouse;
        uniform float uFadeBottom;

        void main() {
          vec4 tex = texture2D(uTexture, vUv);
          if (tex.a < 0.02) discard;

          // Editorial high-contrast and luminance grading
          vec3 color = tex.rgb;
          color = pow(color, vec3(1.04));

          // Subtle Champagne rim light on edges
          vec3 viewDir = normalize(-vPosition);
          float fresnel = pow(1.0 - max(dot(viewDir, vec3(0.0, 0.0, 1.0)), 0.0), 3.5);
          color += uGold * fresnel * 0.22;

          // Seamless bottom fade into charcoal ground
          float bottomFade = smoothstep(0.0, 0.16, vUv.y);
          float alpha = tex.a * bottomFade * uFadeBottom;

          gl_FragColor = vec4(color, alpha);
        }
      `;

      const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: customUniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide
      });

      characterMesh = new THREE.Mesh(planeGeo, shaderMaterial);
      characterMesh.position.set(0, -0.15, 0);
      characterGroup.add(characterMesh);

      // Fade in 3D canvas and smoothly hide static fallback
      canvasEl.style.opacity = '1';
      if (fallbackImg) {
        fallbackImg.style.opacity = '0';
      }

      // Initialize ScrollTrigger coordination
      setupScrollStorytelling();
    },
    undefined,
    function (err) {
      console.warn('3D Texture load fallback:', err);
      if (fallbackImg) fallbackImg.style.opacity = '1';
    }
  );

  // Mouse tracking state
  let mouseX = 0;
  let mouseY = 0;
  let targetRotX = 0;
  let targetRotY = 0;
  let currentRotX = 0;
  let currentRotY = 0;

  function onMouseMove(e) {
    if (isMobile) return;
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

    mouseX = Math.max(-1, Math.min(1, x));
    mouseY = Math.max(-1, Math.min(1, y));

    targetRotY = mouseX * CONFIG.maxRotY;
    targetRotX = -mouseY * CONFIG.maxRotX;

    // Shift point light slightly with mouse
    cursorLight.position.x = mouseX * 1.5;
    cursorLight.position.y = -mouseY * 1.2;
  }

  window.addEventListener('mousemove', onMouseMove, { passive: true });

  // Viewport resize handling
  function onResize() {
    if (!container) return;
    width = container.clientWidth || 600;
    height = container.clientHeight || 750;
    isMobile = window.innerWidth <= 960;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  window.addEventListener('resize', onResize);

  // Viewport intersection culling (only render when visible)
  let isVisible = true;
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });
    observer.observe(container);
  }

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    if (!isVisible) return;

    const elapsedTime = clock.getElapsedTime();

    // Lerp character rotation
    currentRotX += (targetRotX - currentRotX) * CONFIG.lerpFactor;
    currentRotY += (targetRotY - currentRotY) * CONFIG.lerpFactor;

    characterGroup.rotation.x = currentRotX;
    characterGroup.rotation.y = currentRotY;

    // Subtle idle floating sway
    characterGroup.position.y = Math.sin(elapsedTime * 0.9) * 0.025;

    // Rotate architectural ring subtly
    ringMesh.rotation.z = elapsedTime * 0.08;

    // Update shader uniforms
    if (customUniforms) {
      customUniforms.uTime.value = elapsedTime;
      customUniforms.uMouse.value.set(mouseX, mouseY);
    }

    renderer.render(scene, camera);
  }

  animate();

  // Scroll-Driven 3D Storytelling
  function setupScrollStorytelling() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const identitySection = document.getElementById('identity-sequence');
    const heroTitle = document.querySelector('.hero-main-title');
    const heroEyebrow = document.querySelector('.hero-eyebrow');
    const heroStatement = document.querySelector('.hero-statement-box');

    if (!identitySection) return;

    // Timeline for transitioning from Hero into "I DON'T FIT INTO ONE BOX"
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        endTrigger: '#identity-sequence',
        end: 'bottom bottom',
        scrub: 1
      }
    });

    // 1. As visitor begins scrolling, fade hero typography smoothly
    if (heroTitle && heroStatement) {
      tl.to([heroEyebrow, heroTitle, heroStatement], {
        opacity: 0,
        y: -40,
        stagger: 0.05,
        duration: 0.3
      }, 0);
    }

    // 2. Character camera pan & gentle orientation shift
    tl.to(camera.position, {
      z: 5.2,
      y: 0.25,
      duration: 0.6,
      ease: 'none'
    }, 0.1);

    tl.to(characterGroup.rotation, {
      y: 0.08,
      duration: 0.6,
      ease: 'none'
    }, 0.1);

    // 3. Sequential Reveal of the 4 Pillars in #identity-sequence
    const pillars = document.querySelectorAll('.identity-pillar-item');
    if (pillars.length > 0) {
      pillars.forEach((pillar, idx) => {
        gsap.fromTo(pillar, 
          { opacity: 0.2, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            scrollTrigger: {
              trigger: pillar,
              start: 'top 80%',
              end: 'top 45%',
              scrub: 0.5
            }
          }
        );
      });
    }
  }

})();
