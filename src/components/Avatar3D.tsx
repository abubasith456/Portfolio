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
  
  // Load the 3D model (replace 'avatar.glb' with your actual filename)
  const { scene, animations } = useGLTF('/avatar.glb');
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
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(time * 1.2) * 0.1;
      
      // Mouse tracking - avatar follows cursor
      const maxRotation = 0.3;
      const mouseY = Math.max(-maxRotation, Math.min(maxRotation, mousePosition.x * 0.4));
      const mouseX = Math.max(-maxRotation, Math.min(maxRotation, mousePosition.y * 0.2));
      
      // Smooth interpolation for rotation
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseY, 0.1);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouseX, 0.1);
      
      // Click reaction - bounce and scale
      if (clickAnimation > 0) {
        const bounce = Math.sin(clickAnimation * Math.PI * 2) * 0.2;
        groupRef.current.position.y += bounce;
        groupRef.current.scale.setScalar(1 + clickAnimation * 0.2);
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 3D Avatar Model */}
      <group ref={avatarRef} position={[0, 0, 0]} scale={[1, 1, 1]}>
        <primitive object={scene} />
      </group>
      
      {/* Floating particles around avatar */}
      {Array.from({ length: 15 }).map((_, i) => (
        <group key={i} position={[
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 2
        ]}>
          <mesh>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial 
              color="#06b6d4" 
              emissive="#06b6d4" 
              emissiveIntensity={0.6}
              transparent
              opacity={0.5}
            />
          </mesh>
        </group>
      ))}
      
      {/* Click effect particles */}
      {isClicked && Array.from({ length: 12 }).map((_, i) => (
        <group key={`click-${i}`} position={[0, 0, 0]}>
          <mesh position={[
            (Math.random() - 0.5) * 1.5,
            (Math.random() - 0.5) * 1.5,
            (Math.random() - 0.5) * 0.5
          ]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial 
              color="#fbbf24" 
              emissive="#fbbf24" 
              emissiveIntensity={1}
              transparent
              opacity={0.8}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};

const Avatar3D: React.FC<AvatarProps> = ({ className }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 60 }}
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