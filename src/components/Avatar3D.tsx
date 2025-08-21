import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

interface AvatarProps {
  className?: string;
}

const AvatarModel: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const avatarRef = useRef<THREE.Group>(null);
  
  // Mouse tracking state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);
  const [clickAnimation, setClickAnimation] = useState(0);
  
  // Load the 3D model
  const { scene, animations } = useGLTF('/model.glb');
  const { actions } = useAnimations(animations, avatarRef);
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position to -1 to 1 range
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    const handleMouseClick = () => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 300);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseClick);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseClick);
    };
  }, []);

  // Play animations when model loads
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      // Play the first animation (usually idle)
      const firstAnimation = Object.keys(actions)[0];
      if (actions[firstAnimation]) {
        actions[firstAnimation].play();
      }
    }
  }, [actions]);

    useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Click animation
    if (isClicked) {
      setClickAnimation(1);
    } else {
      setClickAnimation(Math.max(0, clickAnimation - 0.08));
    }
    
    if (groupRef.current) {
      // Get scroll progress
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight * 0.8; // Scroll range for animation
      const scrollProgress = Math.min(scrollY / maxScroll, 1);
      
      // Avatar moves up and gets smaller as you scroll
      const startY = 0; // Initial position
      const endY = -2; // Final position (top)
      const currentY = startY + (endY - startY) * scrollProgress;
      
      // Avatar scales down as it moves up
      const startScale = 2; // Initial scale
      const endScale = 0.8; // Final scale (smaller)
      const currentScale = startScale + (endScale - startScale) * scrollProgress;
      
      // Apply position and scale
      groupRef.current.position.y = currentY;
      groupRef.current.scale.setScalar(currentScale);
      
      // Mouse tracking - avatar follows cursor horizontally only
      const maxRotation = 0.5;
      const mouseY = Math.max(-maxRotation, Math.min(maxRotation, mousePosition.x * 0.8));
      
      // Smooth interpolation for horizontal rotation only
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseY, 0.2);
      groupRef.current.rotation.x = 0; // Keep vertical rotation at 0
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 3D Avatar Model - Will be animated by scroll */}
      <group ref={avatarRef} position={[0, 0, 0]} scale={[2, 2, 2]}>
        <primitive object={scene} />
      </group>
    </group>
  );
};

const Avatar3D: React.FC<AvatarProps> = ({ className }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.0} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.6} color="#3b82f6" />
        <pointLight position={[0, 10, 0]} intensity={0.5} color="#06b6d4" />
        <pointLight position={[0, -10, 0]} intensity={0.3} color="#fbbf24" />
        
        <AvatarModel />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
};

export default Avatar3D;