import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Plane, useTexture, Text } from '@react-three/drei';
import * as THREE from 'three';

interface AvatarProps {
  className?: string;
}

const AvatarModel: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const planeRef = useRef<THREE.Mesh>(null);
  
  // Mouse tracking state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);
  const [clickAnimation, setClickAnimation] = useState(0);
  
  // Load the avatar texture
  const avatarTexture = useTexture('/avatar.png');
  
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
    
    if (planeRef.current) {
      // Subtle rotation animation
      planeRef.current.rotation.z = Math.sin(time * 0.5) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main avatar plane with texture */}
      <Plane 
        ref={planeRef}
        args={[2, 2]} 
        position={[0, 0, 0]}
      >
        <meshStandardMaterial 
          map={avatarTexture}
          transparent
          alphaTest={0.1}
          side={THREE.DoubleSide}
        />
      </Plane>
      
      {/* Glow effect behind avatar */}
      <Plane 
        args={[2.5, 2.5]} 
        position={[0, 0, -0.1]}
      >
        <meshStandardMaterial 
          color="#3b82f6" 
          transparent 
          opacity={0.3} 
          emissive="#3b82f6" 
          emissiveIntensity={0.5}
          side={THREE.DoubleSide}
        />
      </Plane>
      
      {/* Floating particles around avatar */}
      {Array.from({ length: 20 }).map((_, i) => (
        <group key={i} position={[
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 2
        ]}>
          <Plane args={[0.05, 0.05]}>
            <meshStandardMaterial 
              color="#06b6d4" 
              emissive="#06b6d4" 
              emissiveIntensity={0.8}
              transparent
              opacity={0.7}
              side={THREE.DoubleSide}
            />
          </Plane>
        </group>
      ))}
      
      {/* Click effect particles */}
      {isClicked && Array.from({ length: 12 }).map((_, i) => (
        <group key={`click-${i}`} position={[0, 0, 0]}>
          <Plane 
            args={[0.1, 0.1]} 
            position={[
              (Math.random() - 0.5) * 1.5,
              (Math.random() - 0.5) * 1.5,
              (Math.random() - 0.5) * 0.5
            ]}
          >
            <meshStandardMaterial 
              color="#fbbf24" 
              emissive="#fbbf24" 
              emissiveIntensity={1}
              transparent
              opacity={0.8}
              side={THREE.DoubleSide}
            />
          </Plane>
        </group>
      ))}
      
      {/* Energy ring effect */}
      <Plane 
        args={[3, 3]} 
        position={[0, 0, -0.2]}
      >
        <meshStandardMaterial 
          color="#06b6d4" 
          transparent 
          opacity={0.1} 
          emissive="#06b6d4" 
          emissiveIntensity={0.3}
          side={THREE.DoubleSide}
        />
      </Plane>
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