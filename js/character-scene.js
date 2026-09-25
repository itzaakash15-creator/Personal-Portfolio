/**
 * AKU — CharacterScene Architecture
 * Modular 3D Character Stage & Responsive Fallback System
 *
 * Structure:
 * CharacterScene
 *  ├── responsive lighting (Warm Key, Cool Fill, Champagne Rim)
 *  ├── pointer tracking (Normalized -1 to +1, Physical Inertia)
 *  ├── scroll progress & active section states
 *  ├── model loader (/models/aku.glb)
 *  └── portrait fallback (Restored High-Quality Transparent Editorial Portrait)
 *
 * Rule: If a production GLB is unavailable, SHOW PORTRAIT FALLBACK.
 * Never generate primitive replacement geometry.
 */

(function () {
  'use strict';

  class CharacterScene {
    constructor() {
      this.mount = document.getElementById('character-3d-mount') || document.getElementById('character-3d-canvas') || document.querySelector('.character-3d-mount');
      this.fallback = document.getElementById('character-portrait');
      this.container = document.getElementById('character-scene');

      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.clock = null;
      this.modelGroup = null;
      this.model = null;
      this.mixer = null;
      this.lights = {};

      this.hasLoadedModel = false;
      this.isDesktop = false;
      this.isVisible = true;
      this.rafId = null;

      // Interaction Target & Current States
      this.pointerX = 0;
      this.pointerY = 0;
      this.targetRotY = 0;
      this.targetRotX = 0;
      this.currentRotY = 0;
      this.currentRotX = 0;

      // Scroll & Section States
      this.scrollProgress = 0;
      this.activeSection = 'hero';
      this.scrollX = 0;
      this.scrollY = 0;
      this.scrollRotY = 0;
      this.scrollScale = 1;
      this.scrollOpacity = 1;

      // Expose to window immediately for external controller coordination
      window.Character3DScene = this;

      this.init();
    }

    checkCapabilities() {
      const hasWebGL = (() => {
        try {
          const canvas = document.createElement('canvas');
          return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
          return false;
        }
      })();

      const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobile = window.innerWidth <= 960 || ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

      this.isDesktop = !isMobile && !isReducedMotion;
      return hasWebGL && typeof THREE !== 'undefined';
    }

    init() {
      // 1. Always ensure authentic editorial portrait is visible by default
      this.showPortraitFallback();

      if (!this.mount || !this.checkCapabilities()) {
        return;
      }

      this.clock = new THREE.Clock();

      // 2. Scene & Perspective Camera Setup
      this.scene = new THREE.Scene();
      const width = this.mount.clientWidth || 580;
      const height = this.mount.clientHeight || 740;

      this.camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
      this.camera.position.set(0, 0.35, 4.4);
      this.camera.lookAt(0, 0.15, 0);

      // 3. WebGL Renderer with High-End Color Management
      this.renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.15;
      this.renderer.outputEncoding = THREE.sRGBEncoding;

      this.mount.appendChild(this.renderer.domElement);
      this.renderer.domElement.style.width = '100%';
      this.renderer.domElement.style.height = '100%';
      this.renderer.domElement.style.pointerEvents = 'none';

      // 4. Studio Lighting Architecture
      this.setupLighting();

      // 5. Model Mount Group
      this.modelGroup = new THREE.Group();
      this.scene.add(this.modelGroup);

      // 6. Viewport Visibility Tracking
      this.setupVisibilityObserver();

      // 7. Resize Observer
      window.addEventListener('resize', () => this.handleResize(), { passive: true });

      // 8. Model Loader: Look for professional production GLB (/models/aku.glb)
      this.attemptModelLoad();
    }

    showPortraitFallback() {
      if (this.fallback) {
        this.fallback.style.opacity = '1';
        this.fallback.style.visibility = 'visible';
        this.fallback.style.display = 'block';
      }
      if (this.mount) {
        this.mount.style.opacity = '0';
        this.mount.style.pointerEvents = 'none';
      }
    }

    setupLighting() {
      // Warm Key Light (Soft studio champagne illumination)
      const keyLight = new THREE.DirectionalLight(0xfff1e0, 1.6);
      keyLight.position.set(2.4, 3.8, 3.2);
      this.scene.add(keyLight);
      this.lights.key = keyLight;

      // Cool Fill Light (Subtle architectural shadow soft bounce)
      const fillLight = new THREE.DirectionalLight(0xb5cbe8, 0.55);
      fillLight.position.set(-3.2, 1.2, 2.0);
      this.scene.add(fillLight);
      this.lights.fill = fillLight;

      // Champagne Rim Light (Accentuates silhouette)
      const rimLight = new THREE.DirectionalLight(0xd8c3a5, 2.4);
      rimLight.position.set(2.2, 3.0, -2.8);
      this.scene.add(rimLight);
      this.lights.rim = rimLight;

      // Ambient Charcoal Light
      const ambientLight = new THREE.AmbientLight(0x1a191f, 0.95);
      this.scene.add(ambientLight);
      this.lights.ambient = ambientLight;
    }

    attemptModelLoad() {
      // Model path prepared for incoming production asset
      const modelCandidates = ['models/aku.glb', '/models/aku.glb'];
      this.tryLoadCandidates(modelCandidates, 0);
    }

    tryLoadCandidates(candidates, index) {
      if (index >= candidates.length || typeof THREE.GLTFLoader === 'undefined') {
        // No production GLB available: strictly show authentic portrait fallback.
        // DO NOT generate any primitive geometry.
        this.showPortraitFallback();
        return;
      }

      const path = candidates[index];
      const loader = new THREE.GLTFLoader();

      loader.load(
        path,
        (gltf) => {
          this.onModelSuccessfullyLoaded(gltf);
        },
        undefined,
        () => {
          // If candidate path fails, try the next candidate
          this.tryLoadCandidates(candidates, index + 1);
        }
      );
    }

    onModelSuccessfullyLoaded(gltf) {
      while (this.modelGroup.children.length > 0) {
        this.modelGroup.remove(this.modelGroup.children[0]);
      }

      this.model = gltf.scene;
      this.model.scale.set(1.15, 1.15, 1.15);
      this.model.position.set(0, -1.25, 0);
      this.modelGroup.add(this.model);

      // Handle animations if present in GLTF
      if (gltf.animations && gltf.animations.length > 0) {
        this.mixer = new THREE.AnimationMixer(this.model);
        const action = this.mixer.clipAction(gltf.animations[0]);
        action.play();
      }

      this.hasLoadedModel = true;

      // Cross-fade: reveal 3D canvas, hide 2D portrait
      if (this.mount) {
        this.mount.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        this.mount.style.opacity = '1';
      }
      if (this.fallback) {
        this.fallback.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        this.fallback.style.opacity = '0';
      }

      // Start WebGL animation loop only once a real model is active
      if (!this.rafId) {
        this.animate();
      }
    }

    // ========================================================================
    // Model Interaction API
    // Receives external signals from pointer, scroll, and section choreography
    // ========================================================================

    setPointer(normX, normY) {
      this.pointerX = normX;
      this.pointerY = normY;

      // Target rotation limits: Y max ±4° (~0.07 rad), X max ±2° (~0.035 rad)
      this.targetRotY = normX * 0.07;
      this.targetRotX = -normY * 0.035;

      // Micro-shift lighting based on pointer
      if (this.lights.key) {
        this.lights.key.position.x = 2.4 + normX * 0.35;
        this.lights.key.position.y = 3.8 - normY * 0.25;
      }
    }

    updatePointer(normX, normY) {
      this.setPointer(normX, normY);
    }

    setScroll(scrollProgress, activeSection) {
      this.scrollProgress = scrollProgress || 0;
      this.activeSection = activeSection || 'hero';
    }

    updateScroll(scrollProgress, activeSection) {
      this.setScroll(scrollProgress, activeSection);
    }

    setScrollKinematics(x, y, rotYDeg, scale = 1, opacity = 1) {
      this.scrollX = (x || 0) * 0.012;
      this.scrollY = -(y || 0) * 0.012;
      this.scrollRotY = ((rotYDeg || 0) * Math.PI) / 180;
      this.scrollScale = scale || 1;
      this.scrollOpacity = opacity !== undefined ? opacity : 1;

      if (this.mount && this.hasLoadedModel) {
        this.mount.style.opacity = this.scrollOpacity.toFixed(3);
      }
    }

    hasModel() {
      return this.hasLoadedModel;
    }

    getModel() {
      return this.model;
    }

    loadModel(url) {
      if (!url || typeof THREE.GLTFLoader === 'undefined') return;
      const loader = new THREE.GLTFLoader();
      loader.load(url, (gltf) => {
        this.onModelSuccessfullyLoaded(gltf);
      });
    }

    setupVisibilityObserver() {
      if ('IntersectionObserver' in window && this.container) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            this.isVisible = entry.isIntersecting;
          });
        }, { threshold: 0.05 });
        observer.observe(this.container);
      }
    }

    handleResize() {
      if (!this.mount || !this.renderer || !this.camera) return;
      const isMobile = window.innerWidth <= 960 || ('ontouchstart' in window);
      this.isDesktop = !isMobile && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const width = this.mount.clientWidth || 580;
      const height = this.mount.clientHeight || 740;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      if (!this.hasLoadedModel) {
        this.showPortraitFallback();
      }
    }

    animate() {
      this.rafId = requestAnimationFrame(() => this.animate());

      // Only execute Three.js render loop if a genuine model is loaded and visible
      if (!this.hasLoadedModel || !this.isVisible || !this.renderer || !this.scene || !this.camera) return;

      const delta = this.clock ? this.clock.getDelta() : 0.016;
      if (this.mixer) {
        this.mixer.update(delta);
      }

      // Smooth damping interpolation for model rotation
      const lerp = 0.055;
      this.currentRotY += (this.targetRotY - this.currentRotY) * lerp;
      this.currentRotX += (this.targetRotX - this.currentRotX) * lerp;

      if (this.modelGroup) {
        this.modelGroup.rotation.y = this.currentRotY + this.scrollRotY;
        this.modelGroup.rotation.x = this.currentRotX;
        this.modelGroup.position.x = this.scrollX;
        this.modelGroup.position.y = this.scrollY;
        this.modelGroup.scale.setScalar(this.scrollScale);
      }

      this.renderer.render(this.scene, this.camera);
    }

    destroy() {
      if (this.rafId) cancelAnimationFrame(this.rafId);
      if (this.renderer && this.renderer.domElement && this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
    }
  }

  // Auto-instantiate on DOM load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new CharacterScene());
  } else {
    new CharacterScene();
  }
})();
