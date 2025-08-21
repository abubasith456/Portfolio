import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Cylinder, useTexture } from '@react-three/drei';
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
  const hairRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  
  // Mouse tracking state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position to -1 to 1 range
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.1;
      groupRef.current.position.y = Math.sin(time * 1.5) * 0.03;
    }
    
    if (headRef.current) {
      // Combine gentle swaying with mouse tracking
      const swayY = Math.sin(time * 1) * 0.03;
      const mouseY = mousePosition.x * 0.3; // Head follows mouse horizontally
      const mouseX = mousePosition.y * 0.2; // Head tilts based on mouse vertically
      
      headRef.current.rotation.y = swayY + mouseY;
      headRef.current.rotation.x = mouseX;
    }
    
    if (hairRef.current) {
      // Hair follows head movement
      const swayY = Math.sin(time * 1) * 0.03;
      const mouseY = mousePosition.x * 0.3;
      const mouseX = mousePosition.y * 0.2;
      
      hairRef.current.rotation.y = swayY + mouseY;
      hairRef.current.rotation.x = mouseX;
    }
    
    if (leftEyeRef.current && rightEyeRef.current) {
      // Blinking animation
      const blink = Math.sin(time * 3) > 0.8 ? 0.01 : 0.08;
      leftEyeRef.current.scale.y = blink;
      rightEyeRef.current.scale.y = blink;
      
      // Eyes follow mouse more subtly
      const eyeFollowX = mousePosition.x * 0.1;
      const eyeFollowY = mousePosition.y * 0.05;
      
      leftEyeRef.current.position.x = -0.1 + eyeFollowX;
      leftEyeRef.current.position.y = eyeFollowY;
      rightEyeRef.current.position.x = 0.1 + eyeFollowX;
      rightEyeRef.current.position.y = eyeFollowY;
    }
    
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = Math.sin(time * 1.5) * 0.15;
    }
    
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = Math.sin(time * 1.5 + Math.PI) * 0.15;
    }
    
    if (leftLegRef.current) {
      leftLegRef.current.rotation.z = Math.sin(time * 1.2) * 0.08;
    }
    
    if (rightLegRef.current) {
      rightLegRef.current.rotation.z = Math.sin(time * 1.2 + Math.PI) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Head - Anime style */}
      <Sphere ref={headRef} args={[0.35, 32, 32]} position={[0, 1.6, 0]}>
        <meshStandardMaterial color="#fbbf24" roughness={0.7} />
      </Sphere>
      
      {/* Hair - Anime style spiky hair */}
      <group ref={hairRef} position={[0, 1.6, 0]}>
        {/* Main hair */}
        <Sphere args={[0.38, 32, 32]} position={[0, 0.05, 0]}>
          <meshStandardMaterial color="#92400e" roughness={0.8} />
        </Sphere>
        {/* Hair spikes */}
        {Array.from({ length: 8 }).map((_, i) => (
          <Box 
            key={i}
            args={[0.05, 0.15, 0.05]} 
            position={[
              (Math.random() - 0.5) * 0.3,
              0.2 + Math.random() * 0.1,
              (Math.random() - 0.5) * 0.3
            ]}
            rotation={[
              Math.random() * 0.5,
              Math.random() * Math.PI * 2,
              Math.random() * 0.5
            ]}
          >
            <meshStandardMaterial color="#92400e" roughness={0.8} />
          </Box>
        ))}
      </group>
      
      {/* Eyes - Large anime style */}
      <group position={[0, 1.6, 0.3]}>
        <Box ref={leftEyeRef} args={[0.12, 0.08, 0.02]} position={[-0.1, 0, 0]}>
          <meshStandardMaterial color="#1f2937" />
        </Box>
        <Box ref={rightEyeRef} args={[0.12, 0.08, 0.02]} position={[0.1, 0, 0]}>
          <meshStandardMaterial color="#1f2937" />
        </Box>
        
        {/* Eye highlights */}
        <Sphere args={[0.02, 8, 8]} position={[-0.12, 0.02, 0.01]}>
          <meshStandardMaterial color="#ffffff" />
        </Sphere>
        <Sphere args={[0.02, 8, 8]} position={[0.08, 0.02, 0.01]}>
          <meshStandardMaterial color="#ffffff" />
        </Sphere>
      </group>
      
      {/* Nose - Small anime style */}
      <Sphere args={[0.02, 8, 8]} position={[0, 1.55, 0.35]}>
        <meshStandardMaterial color="#f59e0b" />
      </Sphere>
      
      {/* Mouth - Simple anime style */}
      <Box args={[0.08, 0.02, 0.02]} position={[0, 1.45, 0.35]}>
        <meshStandardMaterial color="#dc2626" />
      </Box>
      
      {/* Body - Casual shirt */}
      <Cylinder ref={bodyRef} args={[0.4, 0.4, 1.0, 32]} position={[0, 0.8, 0]}>
        <meshStandardMaterial color="#3b82f6" roughness={0.6} />
      </Cylinder>
      
      {/* Arms - Shirt sleeves */}
      <Cylinder ref={leftArmRef} args={[0.1, 0.1, 0.7, 16]} position={[-0.55, 0.8, 0]}>
        <meshStandardMaterial color="#3b82f6" roughness={0.6} />
      </Cylinder>
      <Cylinder ref={rightArmRef} args={[0.1, 0.1, 0.7, 16]} position={[0.55, 0.8, 0]}>
        <meshStandardMaterial color="#3b82f6" roughness={0.6} />
      </Cylinder>
      
      {/* Hands */}
      <Sphere args={[0.06, 16, 16]} position={[-0.55, 0.45, 0]}>
        <meshStandardMaterial color="#fbbf24" roughness={0.7} />
      </Sphere>
      <Sphere args={[0.06, 16, 16]} position={[0.55, 0.45, 0]}>
        <meshStandardMaterial color="#fbbf24" roughness={0.7} />
      </Sphere>
      
      {/* Legs - Jeans */}
      <Cylinder ref={leftLegRef} args={[0.12, 0.12, 0.8, 16]} position={[-0.15, 0.1, 0]}>
        <meshStandardMaterial color="#1e40af" roughness={0.7} />
      </Cylinder>
      <Cylinder ref={rightLegRef} args={[0.12, 0.12, 0.8, 16]} position={[0.15, 0.1, 0]}>
        <meshStandardMaterial color="#1e40af" roughness={0.7} />
      </Cylinder>
      
      {/* Shoes */}
      <Box args={[0.2, 0.08, 0.3]} position={[-0.15, -0.3, 0.05]}>
        <meshStandardMaterial color="#1f2937" />
      </Box>
      <Box args={[0.2, 0.08, 0.3]} position={[0.15, -0.3, 0.05]}>
        <meshStandardMaterial color="#1f2937" />
      </Box>
      
      {/* Floating code particles */}
      {Array.from({ length: 25 }).map((_, i) => (
        <group key={i} position={[
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 5
        ]}>
          <Box args={[0.015, 0.015, 0.015]}>
            <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.6} />
          </Box>
        </group>
      ))}
      
      {/* Glow effect around avatar */}
      <Sphere args={[1.2, 16, 16]} position={[0, 0.8, 0]}>
        <meshStandardMaterial 
          color="#3b82f6" 
          transparent 
          opacity={0.08} 
          emissive="#3b82f6" 
          emissiveIntensity={0.3} 
        />
      </Sphere>
    </group>
  );
};

const Avatar3D: React.FC<AvatarProps> = ({ className }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 65 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={1.0} color="#3b82f6" />
        <pointLight position={[0, 10, 0]} intensity={0.8} color="#06b6d4" />
        
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