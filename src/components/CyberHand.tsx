import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import './CyberHand.css';

const gestures = [
  { name: 'Fist', action: 'Freeze cursor', id: 'fist' },
  { name: 'Open Hand', action: 'Normal cursor tracking', id: 'open_hand' },
  { name: 'Point', action: 'Precision cursor tracking', id: 'point' },
  { name: 'Two Fingers', action: 'Scroll / Draw Mode', id: 'two_fingers' },
  { name: 'Three Fingers', action: 'Open on-screen keyboard', id: 'three_fingers' },
  { name: 'Four Fingers', action: 'Take screenshot', id: 'four_fingers' },
  { name: 'Thumbs Down', action: 'Volume up', id: 'thumbs_up' },
  { name: 'Thumbs Up', action: 'Volume down', id: 'thumbs_down' },
  { name: 'L-Shape', action: 'Right-click', id: 'l_shape' },
  { name: 'Pinch', action: 'Left-click', id: 'pinch' }
];

const PI = Math.PI;
const CURL = [PI / 2, PI / 2, PI / 2];
const STRAIGHT = [0, 0, 0];
const PINCH_INDEX = [PI / 6, PI / 4, PI / 4];
const PINCH_THUMB = [0, PI / 6, 0]; // Thumb rotates differently due to base angle

const getGestureRotations = (gestureId: string) => {
  const state = {
    thumb: STRAIGHT,
    index: STRAIGHT,
    middle: STRAIGHT,
    ring: STRAIGHT,
    pinky: STRAIGHT,
    wrist: [0, 0, 0],
  };

  switch (gestureId) {
    case 'fist':
      state.thumb = CURL;
      state.index = state.middle = state.ring = state.pinky = CURL;
      break;
    case 'open_hand':
      // All straight, thumb extended out naturally
      break;
    case 'point':
      state.thumb = CURL;
      state.middle = state.ring = state.pinky = CURL;
      break;
    case 'two_fingers':
      state.thumb = CURL;
      state.ring = state.pinky = CURL;
      break;
    case 'three_fingers':
      state.thumb = CURL;
      state.pinky = CURL;
      break;
    case 'four_fingers':
      state.thumb = CURL;
      break;
    case 'thumbs_up':
      state.index = state.middle = state.ring = state.pinky = CURL;
      state.thumb = STRAIGHT;
      state.wrist = [0, 0, -PI / 2];
      break;
    case 'thumbs_down':
      state.index = state.middle = state.ring = state.pinky = CURL;
      state.thumb = STRAIGHT;
      state.wrist = [0, 0, PI / 2];
      break;
    case 'l_shape':
      state.thumb = STRAIGHT;
      state.middle = state.ring = state.pinky = CURL;
      break;
    case 'pinch':
      state.index = PINCH_INDEX;
      state.thumb = PINCH_THUMB;
      state.middle = state.ring = state.pinky = CURL;
      break;
  }
  return state;
};

// Premium Holographic / Glass Material
const handMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x034f6e, // Deeper teal core
  emissive: 0x06b6d4, // Cyan glow
  emissiveIntensity: 0.15,
  roughness: 0.15,
  metalness: 0.1,
  transmission: 0.9, // Glassy
  thickness: 2.0, // Volume for refraction
  clearcoat: 1.0,
  clearcoatRoughness: 0.1,
  ior: 1.5,
});

interface FingerProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  targets: number[];
  thickness: number; // Base thickness to taper from
  segments: number; // 2 for thumb, 3 for others
}

const Finger = ({ position, rotation, scale, targets, thickness, segments }: FingerProps) => {
  const baseRef = useRef<THREE.Group>(null);
  const midRef = useRef<THREE.Group>(null);
  const topRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const lerpSpeed = 10;
    if (baseRef.current) baseRef.current.rotation.x = THREE.MathUtils.lerp(baseRef.current.rotation.x, targets[0], delta * lerpSpeed);
    if (midRef.current) midRef.current.rotation.x = THREE.MathUtils.lerp(midRef.current.rotation.x, targets[1] || 0, delta * lerpSpeed);
    if (topRef.current) topRef.current.rotation.x = THREE.MathUtils.lerp(topRef.current.rotation.x, targets[2] || 0, delta * lerpSpeed);
  });

  const l1 = 0.8;
  const l2 = 0.6;
  const l3 = 0.5;
  const r1 = thickness;
  const r2 = thickness * 0.85;
  const r3 = thickness * 0.7;
  const r4 = thickness * 0.6;

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <group ref={baseRef}>
        {/* Proximal phalanx */}
        <mesh position={[0, l1/2, 0]} material={handMaterial}>
          <cylinderGeometry args={[r2, r1, l1, 16]} />
        </mesh>
        {/* Joint */}
        <mesh position={[0, l1, 0]} material={handMaterial}>
          <sphereGeometry args={[r2 * 1.05, 16, 16]} />
        </mesh>
        
        <group position={[0, l1, 0]} ref={midRef}>
          {/* Middle phalanx */}
          <mesh position={[0, l2/2, 0]} material={handMaterial}>
            <cylinderGeometry args={[r3, r2, l2, 16]} />
          </mesh>
          
          {segments > 2 && (
            <>
              {/* Joint */}
              <mesh position={[0, l2, 0]} material={handMaterial}>
                <sphereGeometry args={[r3 * 1.05, 16, 16]} />
              </mesh>
              <group position={[0, l2, 0]} ref={topRef}>
                {/* Distal phalanx */}
                <mesh position={[0, l3/2, 0]} material={handMaterial}>
                  <cylinderGeometry args={[r4, r3, l3, 16]} />
                </mesh>
                {/* Fingertip rounded cap */}
                <mesh position={[0, l3, 0]} material={handMaterial}>
                  <sphereGeometry args={[r4, 16, 16]} />
                </mesh>
              </group>
            </>
          )}
          {segments === 2 && (
            /* Thumb tip rounded cap */
            <mesh position={[0, l2, 0]} material={handMaterial}>
              <sphereGeometry args={[r3, 16, 16]} />
            </mesh>
          )}
        </group>
      </group>
    </group>
  );
};

const PalmShape = () => {
  // Create a rounded wedge shape for the palm
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    const widthTop = 2.4;
    const widthBottom = 1.6;
    const height = 2.5;
    const radius = 0.3;
    
    // Start bottom left
    s.moveTo(-widthBottom/2 + radius, -height/2);
    // Line to bottom right
    s.lineTo(widthBottom/2 - radius, -height/2);
    s.quadraticCurveTo(widthBottom/2, -height/2, widthBottom/2 + 0.1, -height/2 + radius);
    // Line to top right
    s.lineTo(widthTop/2, height/2 - radius);
    s.quadraticCurveTo(widthTop/2 + 0.1, height/2, widthTop/2 - radius, height/2);
    // Line to top left
    s.lineTo(-widthTop/2 + radius, height/2);
    s.quadraticCurveTo(-widthTop/2 - 0.1, height/2, -widthTop/2, height/2 - radius);
    // Line to bottom left
    s.lineTo(-widthBottom/2 - 0.1, -height/2 + radius);
    s.quadraticCurveTo(-widthBottom/2, -height/2, -widthBottom/2 + radius, -height/2);
    
    return s;
  }, []);

  const extrudeSettings = {
    depth: 0.5,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 2,
    bevelSize: 0.1,
    bevelThickness: 0.1,
  };

  return (
    <mesh material={handMaterial} position={[0, 1.25, -0.25]}>
      <extrudeGeometry args={[shape, extrudeSettings]} />
    </mesh>
  );
};

const HandModel = ({ gestureId }: { gestureId: string }) => {
  const wristRef = useRef<THREE.Group>(null);
  const targetState = getGestureRotations(gestureId);

  useFrame((state, delta) => {
    if (wristRef.current) {
      wristRef.current.rotation.z = THREE.MathUtils.lerp(wristRef.current.rotation.z, targetState.wrist[2], delta * 5);
      wristRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05; // Gentle breathing
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={wristRef} position={[0, -1.5, 0]}>
        
        {/* Palm */}
        <PalmShape />
        
        {/* Inner Holographic Glow / Sparkles inside the palm */}
        <pointLight position={[0, 1.5, 0.2]} intensity={0.5} color="#06b6d4" distance={3} />
        <Sparkles position={[0, 1.5, 0]} scale={[2, 2.5, 0.5]} count={20} size={2} speed={0.4} color="#06b6d4" opacity={0.5} />
        
        {/* Thumb (attached to side, angled outwards and slightly forward) */}
        <Finger position={[-1.2, 0.5, 0.2]} rotation={[0, -PI/6, PI / 4]} scale={1.2} targets={targetState.thumb} thickness={0.24} segments={2} />
        
        {/* Index Finger */}
        <Finger position={[-0.9, 2.5, 0]} rotation={[0, 0, 0]} scale={1} targets={targetState.index} thickness={0.2} segments={3} />
        
        {/* Middle Finger (longest) */}
        <Finger position={[-0.3, 2.55, 0]} rotation={[0, 0, 0]} scale={1.1} targets={targetState.middle} thickness={0.21} segments={3} />
        
        {/* Ring Finger */}
        <Finger position={[0.3, 2.5, 0]} rotation={[0, 0, 0]} scale={1.02} targets={targetState.ring} thickness={0.19} segments={3} />
        
        {/* Pinky Finger (shortest and thinnest) */}
        <Finger position={[0.9, 2.35, 0]} rotation={[0, 0, 0]} scale={0.85} targets={targetState.pinky} thickness={0.17} segments={3} />
      </group>
    </Float>
  );
};

export const CyberHand: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % gestures.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const current = gestures[currentIndex];

  return (
    <div className="cyber-hand-container">
      <div className="hud-ring"></div>
      <div className="hud-ring inner"></div>
      
      <div className="hand-wrapper">
        <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }}>
          {/* Soft ambient and rim lighting */}
          <ambientLight intensity={1.2} color="#ffffff" />
          <spotLight position={[5, 10, 5]} angle={0.3} penumbra={1} intensity={2} color="#ffffff" />
          
          {/* Rim lights to highlight the silhouette */}
          <pointLight position={[-10, 5, -5]} intensity={4} color="#06b6d4" distance={20} />
          <pointLight position={[10, -5, -5]} intensity={3} color="#f59e0b" distance={20} />

          <Environment preset="city" />
          
          <HandModel gestureId={current.id} />
          <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} color="#06b6d4" />
        </Canvas>
      </div>

      <div className="gesture-info glass-panel">
        <div className="gesture-name font-mono text-cyan text-glow-cyan">{current.name}</div>
        <div className="gesture-action text-secondary">{current.action}</div>
      </div>

      <div className="gesture-indicators">
        {gestures.map((g, i) => (
          <button 
            key={g.id}
            className={`indicator ${i === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(i)}
            aria-label={g.name}
          />
        ))}
      </div>
    </div>
  );
};
