/**
 * AKU — Genuine 3D Character Scene Architecture
 * Technology: Three.js PBR Engine with GLTF Loader & Procedural Editorial Character
 * Features:
 * - Studio Lighting (Warm Key Light, Cool Fill, Champagne Rim Light)
 * - Authentic Physical Materials (Charcoal Wool Blazer, White Dress Shirt, Gold Watch, Curly Hair)
 * - Weighted Physical Pointer Tracking (Rotation Y ±4°, Rotation X ±2°, Light Shift)
 * - Organic Idle Animation (Subtle Breathing & Shoulder Sway)
 * - Scroll Kinematics Synchronization (Hero -> Identity -> Roles -> Work Transition)
 * - Viewport Visibility Caching (Pauses WebGL outside viewport)
 * - Automatic Fallback on Mobile / Touch / Reduced Motion
 */

(function () {
  'use strict';

  class CharacterScene {
    constructor() {
      this.mount = document.getElementById('character-3d-canvas') || document.getElementById('character-3d-mount') || document.querySelector('.character-3d-mount');
      this.fallback = document.getElementById('character-portrait');
      this.container = document.getElementById('character-scene');
      window.Character3DScene = this;
      
      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.clock = null;
      this.modelGroup = null;
      this.characterBody = null;
      this.chestMesh = null;
      this.lights = {};
      
      this.targetRotY = 0;
      this.targetRotX = 0;
      this.currentRotY = 0;
      this.currentRotX = 0;
      
      this.scrollX = 0;
      this.scrollY = 0;
      this.scrollRotY = 0;
      this.scrollScale = 1;
      this.scrollOpacity = 1;
      
      this.isDesktop = false;
      this.isVisible = true;
      this.rafId = null;
      this.isInitialized = false;

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
      if (!this.mount) return;
      if (!this.checkCapabilities()) {
        // Keep authentic editorial fallback portrait active
        if (this.fallback) this.fallback.style.opacity = '1';
        return;
      }

      this.clock = new THREE.Clock();

      // 1. Scene & Camera Setup
      this.scene = new THREE.Scene();
      const width = this.mount.clientWidth || 580;
      const height = this.mount.clientHeight || 740;

      this.camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
      this.camera.position.set(0, 0.35, 4.4);
      this.camera.lookAt(0, 0.15, 0);

      // 2. High-Performance WebGL Renderer with Tone Mapping
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
      this.renderer.shadowMap.enabled = false; // Keep high FPS

      this.mount.appendChild(this.renderer.domElement);
      this.renderer.domElement.style.width = '100%';
      this.renderer.domElement.style.height = '100%';
      this.renderer.domElement.style.objectFit = 'contain';
      this.renderer.domElement.style.pointerEvents = 'none';

      // 3. Studio Lighting Architecture
      this.setupLighting();

      // 4. Model Construction (GLB Loader + Editorial Procedural PBR Fallback)
      this.setupModel();

      // 5. Interaction Listeners
      this.setupInteractions();

      // 6. Viewport Visibility Tracking
      this.setupVisibilityObserver();

      this.isInitialized = true;
      window.Character3DScene = this;

      // Start render loop
      this.animate();

      // Cross-fade with portrait fallback for smooth transition
      setTimeout(() => {
        if (this.fallback && this.isDesktop) {
          this.fallback.style.transition = 'opacity 0.6s ease';
          this.fallback.style.opacity = '0';
        }
      }, 300);
    }

    setupLighting() {
      // Warm Key Light (Soft studio champagne illumination from front-left)
      const keyLight = new THREE.DirectionalLight(0xfff1e0, 1.6);
      keyLight.position.set(2.4, 3.8, 3.2);
      this.scene.add(keyLight);
      this.lights.key = keyLight;

      // Cool Fill Light (Subtle architectural shadow soft bounce)
      const fillLight = new THREE.DirectionalLight(0xb5cbe8, 0.55);
      fillLight.position.set(-3.2, 1.2, 2.0);
      this.scene.add(fillLight);
      this.lights.fill = fillLight;

      // Champagne Rim Light (Accentuates silhouette, shoulders and curly hair)
      const rimLight = new THREE.DirectionalLight(0xd8c3a5, 2.6);
      rimLight.position.set(2.2, 3.0, -2.8);
      this.scene.add(rimLight);
      this.lights.rim = rimLight;

      // Ambient Charcoal Light (Prevents crushed pitch-black shadows)
      const ambientLight = new THREE.AmbientLight(0x1a191f, 0.95);
      this.scene.add(ambientLight);
      this.lights.ambient = ambientLight;
    }

    setupModel() {
      this.modelGroup = new THREE.Group();
      this.scene.add(this.modelGroup);

      // Check if external GLB asset exists
      let loadedExternal = false;
      if (typeof THREE.GLTFLoader !== 'undefined') {
        const loader = new THREE.GLTFLoader();
        loader.load(
          'assets/aku_character.glb',
          (gltf) => {
            // Remove procedural model if external loads successfully
            while (this.modelGroup.children.length > 0) {
              this.modelGroup.remove(this.modelGroup.children[0]);
            }
            const model = gltf.scene;
            model.scale.set(1.15, 1.15, 1.15);
            model.position.set(0, -1.3, 0);
            this.modelGroup.add(model);
            loadedExternal = true;
          },
          undefined,
          () => {
            // Fallback cleanly to procedural editorial character
          }
        );
      }

      if (!loadedExternal) {
        this.buildProceduralEditorialModel();
      }
    }

    buildProceduralEditorialModel() {
      // Materials System (High-End Editorial PBR Materials)
      const blazerMat = new THREE.MeshStandardMaterial({
        color: 0x121214,
        roughness: 0.72,
        metalness: 0.12,
        flatShading: false
      });

      const lapelMat = new THREE.MeshStandardMaterial({
        color: 0x19191d,
        roughness: 0.55,
        metalness: 0.18
      });

      const shirtMat = new THREE.MeshStandardMaterial({
        color: 0xf6f4ee,
        roughness: 0.42,
        metalness: 0.02
      });

      const skinMat = new THREE.MeshStandardMaterial({
        color: 0xa87852,
        roughness: 0.62,
        metalness: 0.03
      });

      const hairMat = new THREE.MeshStandardMaterial({
        color: 0x08080a,
        roughness: 0.88,
        metalness: 0.05
      });

      const facialHairMat = new THREE.MeshStandardMaterial({
        color: 0x0a0a0c,
        roughness: 0.92,
        metalness: 0.0
      });

      const watchMat = new THREE.MeshStandardMaterial({
        color: 0xd8c3a5,
        metalness: 0.92,
        roughness: 0.22
      });

      const characterContainer = new THREE.Group();
      characterContainer.position.set(0, -1.15, 0);

      // --- 1. Torso & Tailored Blazer ---
      const chestGeo = new THREE.CylinderGeometry(0.58, 0.48, 1.05, 24);
      chestGeo.scale(1.15, 1.0, 0.75);
      this.chestMesh = new THREE.Mesh(chestGeo, blazerMat);
      this.chestMesh.position.set(0, 0.8, 0);
      characterContainer.add(this.chestMesh);

      // Shirt Inset (V-Neck Collared Dress Shirt)
      const shirtGeo = new THREE.BufferGeometry();
      const shirtVerts = new Float32Array([
        -0.14, 1.32, 0.26,
         0.14, 1.32, 0.26,
         0.0,  0.72, 0.28
      ]);
      shirtGeo.setAttribute('position', new THREE.BufferAttribute(shirtVerts, 3));
      shirtGeo.computeVertexNormals();
      const shirtMesh = new THREE.Mesh(shirtGeo, shirtMat);
      characterContainer.add(shirtMesh);

      // Blazer Lapels (Left & Right)
      const lapelLeftGeo = new THREE.BoxGeometry(0.18, 0.65, 0.08);
      lapelLeftGeo.rotateZ(0.22);
      const lapelLeft = new THREE.Mesh(lapelLeftGeo, lapelMat);
      lapelLeft.position.set(-0.22, 0.95, 0.27);
      characterContainer.add(lapelLeft);

      const lapelRightGeo = new THREE.BoxGeometry(0.18, 0.65, 0.08);
      lapelRightGeo.rotateZ(-0.22);
      const lapelRight = new THREE.Mesh(lapelRightGeo, lapelMat);
      lapelRight.position.set(0.22, 0.95, 0.27);
      characterContainer.add(lapelRight);

      // --- 2. Signature Folded Arms Pose ---
      // Right Upper Arm
      const rightArmGeo = new THREE.CylinderGeometry(0.18, 0.16, 0.68, 16);
      rightArmGeo.rotateZ(-0.35);
      const rightArm = new THREE.Mesh(rightArmGeo, blazerMat);
      rightArm.position.set(-0.62, 0.88, 0.05);
      characterContainer.add(rightArm);

      // Left Upper Arm
      const leftArmGeo = new THREE.CylinderGeometry(0.18, 0.16, 0.68, 16);
      leftArmGeo.rotateZ(0.35);
      const leftArm = new THREE.Mesh(leftArmGeo, blazerMat);
      leftArm.position.set(0.62, 0.88, 0.05);
      characterContainer.add(leftArm);

      // Folded Forearms Across Chest (Left Over Right)
      const lowerArmLeftGeo = new THREE.CylinderGeometry(0.16, 0.15, 0.72, 16);
      lowerArmLeftGeo.rotateZ(1.57);
      lowerArmLeftGeo.rotateY(0.15);
      const lowerArmLeft = new THREE.Mesh(lowerArmLeftGeo, blazerMat);
      lowerArmLeft.position.set(0.04, 0.58, 0.38);
      characterContainer.add(lowerArmLeft);

      const lowerArmRightGeo = new THREE.CylinderGeometry(0.16, 0.15, 0.72, 16);
      lowerArmRightGeo.rotateZ(1.57);
      lowerArmRightGeo.rotateY(-0.15);
      const lowerArmRight = new THREE.Mesh(lowerArmRightGeo, blazerMat);
      lowerArmRight.position.set(-0.04, 0.52, 0.32);
      characterContainer.add(lowerArmRight);

      // Hands Tucked In Under Biceps
      const leftHandGeo = new THREE.SphereGeometry(0.11, 16, 16);
      leftHandGeo.scale(1.2, 0.8, 0.9);
      const leftHand = new THREE.Mesh(leftHandGeo, skinMat);
      leftHand.position.set(-0.42, 0.56, 0.33);
      characterContainer.add(leftHand);

      const rightHandGeo = new THREE.SphereGeometry(0.11, 16, 16);
      rightHandGeo.scale(1.2, 0.8, 0.9);
      const rightHand = new THREE.Mesh(rightHandGeo, skinMat);
      rightHand.position.set(0.40, 0.52, 0.28);
      characterContainer.add(rightHand);

      // Gold Watch On Left Wrist
      const watchGeo = new THREE.CylinderGeometry(0.17, 0.17, 0.06, 24);
      watchGeo.rotateZ(1.57);
      const watchMesh = new THREE.Mesh(watchGeo, watchMat);
      watchMesh.position.set(0.28, 0.58, 0.39);
      characterContainer.add(watchMesh);

      // --- 3. Neck & Editorial Head Anatomy ---
      const neckGeo = new THREE.CylinderGeometry(0.17, 0.19, 0.35, 18);
      const neck = new THREE.Mesh(neckGeo, skinMat);
      neck.position.set(0, 1.38, 0.05);
      characterContainer.add(neck);

      // Head Base with Strong Jawline
      const headGroup = new THREE.Group();
      headGroup.position.set(0, 1.72, 0.08);

      const headGeo = new THREE.SphereGeometry(0.33, 24, 24);
      headGeo.scale(0.88, 1.15, 0.96);
      const headMesh = new THREE.Mesh(headGeo, skinMat);
      headGroup.add(headMesh);

      // Jaw & Chin Definition
      const chinGeo = new THREE.CylinderGeometry(0.12, 0.18, 0.26, 16);
      chinGeo.scale(1.2, 1.0, 0.9);
      const chin = new THREE.Mesh(chinGeo, skinMat);
      chin.position.set(0, -0.22, 0.14);
      headGroup.add(chin);

      // Distinctive Groomed Facial Hair (Beard & Mustache)
      const beardGeo = new THREE.SphereGeometry(0.24, 18, 18);
      beardGeo.scale(0.92, 0.85, 0.85);
      const beard = new THREE.Mesh(beardGeo, facialHairMat);
      beard.position.set(0, -0.16, 0.16);
      headGroup.add(beard);

      // Expressive Facial Features (Nose Bridge)
      const noseGeo = new THREE.ConeGeometry(0.06, 0.16, 12);
      noseGeo.rotateX(0.2);
      const nose = new THREE.Mesh(noseGeo, skinMat);
      nose.position.set(0, 0.02, 0.32);
      headGroup.add(nose);

      // --- 4. Distinctive Thick Curly Black Hairstyle ---
      // Sculpted layered cluster curls covering top, crown, and sides
      const hairGroup = new THREE.Group();
      const curlGeo = new THREE.SphereGeometry(0.11, 12, 12);

      const curlPositions = [
        // Front Curls
        [0.0, 0.36, 0.18], [-0.15, 0.34, 0.17], [0.15, 0.34, 0.17],
        [-0.26, 0.28, 0.14], [0.26, 0.28, 0.14],
        // Crown Curls
        [0.0, 0.42, 0.02], [-0.16, 0.40, 0.04], [0.16, 0.40, 0.04],
        [-0.28, 0.34, -0.02], [0.28, 0.34, -0.02],
        // Top-Back Curls
        [0.0, 0.38, -0.14], [-0.18, 0.35, -0.12], [0.18, 0.35, -0.12],
        // Volume Layers
        [-0.08, 0.44, 0.08], [0.08, 0.44, 0.08],
        [-0.32, 0.18, 0.02], [0.32, 0.18, 0.02],
        [-0.29, 0.06, -0.08], [0.29, 0.06, -0.08],
        [0.0, 0.26, -0.22], [-0.15, 0.22, -0.20], [0.15, 0.22, -0.20]
      ];

      curlPositions.forEach(pos => {
        const curl = new THREE.Mesh(curlGeo, hairMat);
        curl.position.set(pos[0], pos[1], pos[2]);
        const s = 0.85 + Math.random() * 0.4;
        curl.scale.set(s, s * 0.95, s);
        hairGroup.add(curl);
      });

      // Hair Base Helm for Seamless Density
      const hairBaseGeo = new THREE.SphereGeometry(0.35, 20, 20);
      hairBaseGeo.scale(0.92, 1.05, 0.98);
      const hairBase = new THREE.Mesh(hairBaseGeo, hairMat);
      hairBase.position.set(0, 0.12, -0.04);
      hairGroup.add(hairBase);

      headGroup.add(hairGroup);
      characterContainer.add(headGroup);

      this.characterBody = characterContainer;
      this.modelGroup.add(characterContainer);
    }

    setupInteractions() {
      // Desktop Pointer Tracking with Weight and Inertia
      const onPointerMove = (e) => {
        if (!this.isDesktop) return;

        const normX = (e.clientX / window.innerWidth) * 2 - 1;
        const normY = (e.clientY / window.innerHeight) * 2 - 1;

        // Exact limits: Rotation Y max ±4° (~0.07 rad), Rotation X max ±2° (~0.035 rad)
        this.targetRotY = normX * 0.07;
        this.targetRotX = -normY * 0.035;

        // Key Light responds slightly to pointer movement (1-2%)
        if (this.lights.key) {
          this.lights.key.position.x = 2.4 + normX * 0.35;
          this.lights.key.position.y = 3.8 - normY * 0.25;
        }

        // Camera position micro-shift
        if (this.camera) {
          this.camera.position.x = normX * 0.08;
          this.camera.position.y = 0.35 - normY * 0.05;
        }
      };

      const onPointerLeave = () => {
        if (!this.isDesktop) return;
        this.targetRotY = 0;
        this.targetRotX = 0;
        if (this.camera) {
          this.camera.position.x = 0;
          this.camera.position.y = 0.35;
        }
        if (this.lights.key) {
          this.lights.key.position.set(2.4, 3.8, 3.2);
        }
      };

      window.addEventListener('mousemove', onPointerMove, { passive: true });
      window.addEventListener('mouseleave', onPointerLeave, { passive: true });

      // Resize handler
      window.addEventListener('resize', () => {
        this.handleResize();
      }, { passive: true });
    }

    handleResize() {
      if (!this.mount || !this.renderer || !this.camera) return;
      const isMobile = window.innerWidth <= 960 || ('ontouchstart' in window);
      this.isDesktop = !isMobile;

      const width = this.mount.clientWidth || 580;
      const height = this.mount.clientHeight || 740;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      if (!this.isDesktop && this.fallback) {
        this.fallback.style.opacity = '1';
      }
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

    setScrollKinematics(x, y, rotYDeg, scale = 1, opacity = 1) {
      this.scrollX = (x || 0) * 0.012;
      this.scrollY = -(y || 0) * 0.012;
      this.scrollRotY = ((rotYDeg || 0) * Math.PI) / 180;
      this.scrollScale = scale || 1;
      this.scrollOpacity = opacity !== undefined ? opacity : 1;
    }

    animate() {
      this.rafId = requestAnimationFrame(() => this.animate());

      // Only calculate and render when visible in viewport
      if (!this.isVisible || !this.renderer || !this.scene || !this.camera) return;

      const time = this.clock ? this.clock.getElapsedTime() : 0;

      // 1. Organic Idle Animation (Subtle Breathing & Shoulder Posture Shift)
      if (this.characterBody) {
        const breathY = Math.sin(time * 1.5) * 0.004;
        const swayX = Math.cos(time * 0.9) * 0.002;
        this.characterBody.position.y = -1.15 + breathY;
        this.characterBody.rotation.z = swayX;

        if (this.chestMesh) {
          const breathScale = 1.0 + Math.sin(time * 1.5) * 0.003;
          this.chestMesh.scale.set(1.15 * breathScale, 1.0, 0.75 * breathScale);
        }
      }

      // 2. Smooth Lerp Interpolation for Pointer Orientation (Physical Weight)
      const lerp = 0.055;
      this.currentRotY += (this.targetRotY - this.currentRotY) * lerp;
      this.currentRotX += (this.targetRotX - this.currentRotX) * lerp;

      if (this.modelGroup) {
        // Combined Pointer + Scroll Orientations
        this.modelGroup.rotation.y = this.currentRotY + this.scrollRotY;
        this.modelGroup.rotation.x = this.currentRotX;
        
        // Scroll Translations & Scaling
        this.modelGroup.position.x = this.scrollX;
        this.modelGroup.position.y = this.scrollY;
        this.modelGroup.scale.setScalar(this.scrollScale);

        // Opacity via material / renderer
        if (this.mount) {
          this.mount.style.opacity = this.scrollOpacity.toFixed(3);
        }
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

  // Auto-init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new CharacterScene());
  } else {
    new CharacterScene();
  }
})();
