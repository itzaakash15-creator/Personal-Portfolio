'use client';

import React, { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  url: string;
  onLoaded?: () => void;
  onError?: () => void;
}

function Model({ url, onLoaded, onError }: ModelProps) {
  const group = useRef<THREE.Group>(null);
  
  try {
    const gltf = useGLTF(url);
    
    useEffect(() => {
      if (gltf) {
        onLoaded?.();
      }
    }, [gltf, onLoaded]);

    useFrame((state) => {
      if (!group.current) return;
      // Gentle subtle breathing/pointer sway
      const pointer = state.pointer;
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.15, 0.05);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.08, 0.05);
    });

    return (
      <group ref={group} position={[0, -1.2, 0]}>
        <primitive object={gltf.scene} scale={1.8} />
      </group>
    );
  } catch (err) {
    onError?.();
    return null;
  }
}

class ModelErrorBoundary extends React.Component<
  { fallback: React.ReactNode; onError?: () => void; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError?.();
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default function CharacterScene() {
  const [modelAvailable, setModelAvailable] = useState<boolean>(false);
  const [hasChecked, setHasChecked] = useState<boolean>(false);

  useEffect(() => {
    // Check if the production model exists in /models/aakash.glb or /models/aku.glb
    fetch('/models/aakash.glb', { method: 'HEAD' })
      .then((res) => {
        if (res.ok && res.headers.get('content-type')?.includes('model')) {
          setModelAvailable(true);
        } else {
          // Check fallback aku.glb
          return fetch('/models/aku.glb', { method: 'HEAD' }).then((r) => {
            if (r.ok && r.headers.get('content-type')?.includes('model')) {
              setModelAvailable(true);
            } else {
              setModelAvailable(false);
            }
          });
        }
      })
      .catch(() => {
        setModelAvailable(false);
      })
      .finally(() => {
        setHasChecked(true);
      });
  }, []);

  if (!hasChecked || !modelAvailable) {
    // Isolated: return null so DOM relies 100% on the authentic high-resolution portrait
    return null;
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    >
      <Canvas
        camera={{ position: [0, 0.35, 4.4], fov: 34 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
      >
        <ambientLight intensity={0.4} color="#ffffff" />
        <directionalLight position={[2.4, 3.8, 3.2]} intensity={1.6} color="#fff1e0" />
        <directionalLight position={[-2.8, 1.2, 2.0]} intensity={0.8} color="#9ec5ff" />
        <directionalLight position={[0.0, 3.5, -3.0]} intensity={2.2} color="#f0d590" />
        <ModelErrorBoundary fallback={null} onError={() => setModelAvailable(false)}>
          <Suspense fallback={null}>
            <Model url="/models/aakash.glb" onError={() => setModelAvailable(false)} />
          </Suspense>
        </ModelErrorBoundary>
      </Canvas>
    </div>
  );
}
