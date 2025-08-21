import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations, Sphere } from '@react-three/drei';
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
  const [loadError, setLoadError] = useState(false);
  
  // Load the 3D model with error handling
  const { scene, animations } = useGLTF('/model.glb', true);
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
      const action = actions[firstAnimation];
      if (action && typeof action.play === 'function') {
        action.play();
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
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(time * 1.2) * 0.1;
      
      // Mouse tracking - avatar follows cursor horizontally only
      const maxRotation = 0.5;
      const mouseY = Math.max(-maxRotation, Math.min(maxRotation, mousePosition.x * 0.8));
      
      // Smooth interpolation for horizontal rotation only
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseY, 0.2);
      groupRef.current.rotation.x = 0; // Keep vertical rotation at 0
    }
  });

  // Fallback avatar if model fails to load
  const FallbackAvatar = () => (
    <group position={[0, -1, 0]} scale={[1, 1, 1]}>
      {/* Simple geometric avatar */}
      <Sphere args={[0.3, 32, 32]} position={[0, 1.5, 0]}>
        <meshStandardMaterial color="#fbbf24" />
      </Sphere>
      <Sphere args={[0.4, 32, 32]} position={[0, 0.8, 0]}>
        <meshStandardMaterial color="#3b82f6" />
      </Sphere>
      <Sphere args={[0.15, 16, 16]} position={[-0.4, 0.8, 0]}>
        <meshStandardMaterial color="#3b82f6" />
      </Sphere>
      <Sphere args={[0.15, 16, 16]} position={[0.4, 0.8, 0]}>
        <meshStandardMaterial color="#3b82f6" />
      </Sphere>
    </group>
  );

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {!scene || loadError ? (
        <FallbackAvatar />
      ) : (
        /* 3D Avatar Model - Centered and properly positioned */
        <group ref={avatarRef} position={[0, -2.3, 0]} scale={[2.5, 2.5, 2.5]}>
          <primitive object={scene} />
        </group>
      )}
    </group>
  );
};

// Preload the model to avoid loading errors
useGLTF.preload('/model.glb');

const Avatar3D: React.FC<AvatarProps> = ({ className }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
        onError={(error) => console.error('Canvas error:', error)}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.0} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.6} color="#3b82f6" />
        <pointLight position={[0, 10, 0]} intensity={0.5} color="#06b6d4" />
        <pointLight position={[0, -10, 0]} intensity={0.3} color="#fbbf24" />
        
        <React.Suspense fallback={
          <group position={[0, -1, 0]}>
            <Sphere args={[0.3, 32, 32]} position={[0, 1.5, 0]}>
              <meshStandardMaterial color="#fbbf24" />
            </Sphere>
            <Sphere args={[0.4, 32, 32]} position={[0, 0.8, 0]}>
              <meshStandardMaterial color="#3b82f6" />
            </Sphere>
          </group>
        }>
          <AvatarModel />
        </React.Suspense>
        
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