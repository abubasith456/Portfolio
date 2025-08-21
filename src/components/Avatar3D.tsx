import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface AvatarProps {
  className?: string;
}

const AvatarModel: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
    }
    
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(time * 2) * 0.1;
    }
    
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = Math.sin(time * 3) * 0.3;
    }
    
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = Math.sin(time * 3 + Math.PI) * 0.3;
    }
    
    if (leftLegRef.current) {
      leftLegRef.current.rotation.z = Math.sin(time * 2) * 0.2;
    }
    
    if (rightLegRef.current) {
      rightLegRef.current.rotation.z = Math.sin(time * 2 + Math.PI) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Head */}
      <Sphere ref={headRef} args={[0.5, 32, 32]} position={[0, 2, 0]}>
        <meshStandardMaterial color="#fbbf24" />
      </Sphere>
      
      {/* Eyes */}
      <Sphere args={[0.08, 16, 16]} position={[-0.15, 2.1, 0.4]}>
        <meshStandardMaterial color="#1f2937" />
      </Sphere>
      <Sphere args={[0.08, 16, 16]} position={[0.15, 2.1, 0.4]}>
        <meshStandardMaterial color="#1f2937" />
      </Sphere>
      
      {/* Body */}
      <Cylinder ref={bodyRef} args={[0.6, 0.6, 1.5, 32]} position={[0, 0.75, 0]}>
        <meshStandardMaterial color="#3b82f6" />
      </Cylinder>
      
      {/* Arms */}
      <Cylinder ref={leftArmRef} args={[0.15, 0.15, 1, 16]} position={[-0.8, 0.75, 0]}>
        <meshStandardMaterial color="#fbbf24" />
      </Cylinder>
      <Cylinder ref={rightArmRef} args={[0.15, 0.15, 1, 16]} position={[0.8, 0.75, 0]}>
        <meshStandardMaterial color="#fbbf24" />
      </Cylinder>
      
      {/* Legs */}
      <Cylinder ref={leftLegRef} args={[0.2, 0.2, 1.2, 16]} position={[-0.25, -0.85, 0]}>
        <meshStandardMaterial color="#1f2937" />
      </Cylinder>
      <Cylinder ref={rightLegRef} args={[0.2, 0.2, 1.2, 16]} position={[0.25, -0.85, 0]}>
        <meshStandardMaterial color="#1f2937" />
      </Cylinder>
      
      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Sphere key={i} args={[0.02, 8, 8]} position={[
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 4
        ]}>
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.5} />
        </Sphere>
      ))}
    </group>
  );
};

const Avatar3D: React.FC<AvatarProps> = ({ className }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <AvatarModel />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default Avatar3D;