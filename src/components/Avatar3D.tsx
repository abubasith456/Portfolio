import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Cylinder, useTexture, Text } from '@react-three/drei';
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
  const leftPupilRef = useRef<THREE.Mesh>(null);
  const rightPupilRef = useRef<THREE.Mesh>(null);
  
  // Mouse tracking state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);
  const [clickAnimation, setClickAnimation] = useState(0);
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position to -1 to 1 range
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    const handleMouseClick = () => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 200);
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
      setClickAnimation(Math.max(0, clickAnimation - 0.1));
    }
    
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(time * 1.5) * 0.05;
      
      // Click reaction - slight bounce
      if (clickAnimation > 0) {
        groupRef.current.scale.setScalar(1 + clickAnimation * 0.1);
      }
    }
    
    if (headRef.current) {
      // Smooth head tracking with limits
      const maxRotation = 0.4;
      const mouseY = Math.max(-maxRotation, Math.min(maxRotation, mousePosition.x * 0.5));
      const mouseX = Math.max(-maxRotation, Math.min(maxRotation, mousePosition.y * 0.3));
      
      // Smooth interpolation
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, mouseY, 0.1);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, mouseX, 0.1);
      
      // Click reaction - head nod
      if (clickAnimation > 0) {
        headRef.current.rotation.x += Math.sin(clickAnimation * Math.PI) * 0.2;
      }
    }
    
    if (hairRef.current) {
      // Hair follows head movement
      hairRef.current.rotation.y = headRef.current?.rotation.y || 0;
      hairRef.current.rotation.x = headRef.current?.rotation.x || 0;
      
      // Hair sway animation
      hairRef.current.rotation.z = Math.sin(time * 2) * 0.02;
    }
    
    if (leftEyeRef.current && rightEyeRef.current && leftPupilRef.current && rightPupilRef.current) {
      // Blinking animation
      const blink = Math.sin(time * 2.5) > 0.9 ? 0.01 : 1;
      leftEyeRef.current.scale.y = blink;
      rightEyeRef.current.scale.y = blink;
      
      // Pupil movement - more responsive
      const pupilMoveX = mousePosition.x * 0.15;
      const pupilMoveY = mousePosition.y * 0.08;
      
      leftPupilRef.current.position.x = THREE.MathUtils.lerp(leftPupilRef.current.position.x, pupilMoveX, 0.15);
      leftPupilRef.current.position.y = THREE.MathUtils.lerp(leftPupilRef.current.position.y, pupilMoveY, 0.15);
      rightPupilRef.current.position.x = THREE.MathUtils.lerp(rightPupilRef.current.position.x, pupilMoveX, 0.15);
      rightPupilRef.current.position.y = THREE.MathUtils.lerp(rightPupilRef.current.position.y, pupilMoveY, 0.15);
      
      // Click reaction - eyes widen
      if (clickAnimation > 0) {
        const eyeScale = 1 + clickAnimation * 0.3;
        leftEyeRef.current.scale.setScalar(eyeScale);
        rightEyeRef.current.scale.setScalar(eyeScale);
      }
    }
    
    if (leftArmRef.current && rightArmRef.current) {
      // Natural arm swing
      leftArmRef.current.rotation.z = Math.sin(time * 1.2) * 0.1;
      rightArmRef.current.rotation.z = Math.sin(time * 1.2 + Math.PI) * 0.1;
      
      // Click reaction - wave
      if (clickAnimation > 0) {
        rightArmRef.current.rotation.z += Math.sin(clickAnimation * Math.PI * 2) * 0.5;
      }
    }
    
    if (leftLegRef.current && rightLegRef.current) {
      // Subtle leg movement
      leftLegRef.current.rotation.z = Math.sin(time * 1.5) * 0.05;
      rightLegRef.current.rotation.z = Math.sin(time * 1.5 + Math.PI) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Head - More realistic proportions */}
      <Sphere ref={headRef} args={[0.4, 32, 32]} position={[0, 1.7, 0]}>
        <meshStandardMaterial color="#fbbf24" roughness={0.6} />
      </Sphere>
      
      {/* Hair - More detailed anime style */}
      <group ref={hairRef} position={[0, 1.7, 0]}>
        {/* Base hair */}
        <Sphere args={[0.43, 32, 32]} position={[0, 0.05, 0]}>
          <meshStandardMaterial color="#92400e" roughness={0.7} />
        </Sphere>
        
        {/* Hair spikes - more organized */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const radius = 0.35;
          const height = 0.2 + Math.random() * 0.1;
          
          return (
            <Box 
              key={i}
              args={[0.04, height, 0.04]} 
              position={[
                Math.cos(angle) * radius,
                0.15 + Math.random() * 0.1,
                Math.sin(angle) * radius
              ]}
              rotation={[
                Math.random() * 0.3 - 0.15,
                angle + Math.random() * 0.2 - 0.1,
                Math.random() * 0.3 - 0.15
              ]}
            >
              <meshStandardMaterial color="#92400e" roughness={0.7} />
            </Box>
          );
        })}
      </group>
      
      {/* Eyes - More detailed */}
      <group position={[0, 1.7, 0.35]}>
        {/* Left Eye */}
        <Box ref={leftEyeRef} args={[0.15, 0.1, 0.02]} position={[-0.12, 0, 0]}>
          <meshStandardMaterial color="#ffffff" />
        </Box>
        <Sphere ref={leftPupilRef} args={[0.04, 16, 16]} position={[-0.12, 0, 0.01]}>
          <meshStandardMaterial color="#1f2937" />
        </Sphere>
        
        {/* Right Eye */}
        <Box ref={rightEyeRef} args={[0.15, 0.1, 0.02]} position={[0.12, 0, 0]}>
          <meshStandardMaterial color="#ffffff" />
        </Box>
        <Sphere ref={rightPupilRef} args={[0.04, 16, 16]} position={[0.12, 0, 0.01]}>
          <meshStandardMaterial color="#1f2937" />
        </Sphere>
        
        {/* Eye highlights */}
        <Sphere args={[0.015, 8, 8]} position={[-0.14, 0.02, 0.015]}>
          <meshStandardMaterial color="#ffffff" />
        </Sphere>
        <Sphere args={[0.015, 8, 8]} position={[0.10, 0.02, 0.015]}>
          <meshStandardMaterial color="#ffffff" />
        </Sphere>
      </group>
      
      {/* Eyebrows */}
      <Box args={[0.12, 0.02, 0.02]} position={[-0.12, 1.8, 0.35]} rotation={[0, 0, 0.1]}>
        <meshStandardMaterial color="#92400e" />
      </Box>
      <Box args={[0.12, 0.02, 0.02]} position={[0.12, 1.8, 0.35]} rotation={[0, 0, -0.1]}>
        <meshStandardMaterial color="#92400e" />
      </Box>
      
      {/* Nose */}
      <Sphere args={[0.025, 8, 8]} position={[0, 1.65, 0.4]}>
        <meshStandardMaterial color="#f59e0b" />
      </Sphere>
      
      {/* Mouth - Smile */}
      <Box args={[0.1, 0.02, 0.02]} position={[0, 1.55, 0.38]} rotation={[0.1, 0, 0]}>
        <meshStandardMaterial color="#dc2626" />
      </Box>
      
      {/* Body - Better proportions */}
      <Cylinder ref={bodyRef} args={[0.45, 0.35, 1.2, 32]} position={[0, 0.9, 0]}>
        <meshStandardMaterial color="#3b82f6" roughness={0.5} />
      </Cylinder>
      
      {/* Shirt collar */}
      <Cylinder args={[0.5, 0.45, 0.1, 32]} position={[0, 1.45, 0]}>
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </Cylinder>
      
      {/* Arms - Better positioning */}
      <Cylinder ref={leftArmRef} args={[0.12, 0.08, 0.8, 16]} position={[-0.6, 0.9, 0]}>
        <meshStandardMaterial color="#3b82f6" roughness={0.5} />
      </Cylinder>
      <Cylinder ref={rightArmRef} args={[0.12, 0.08, 0.8, 16]} position={[0.6, 0.9, 0]}>
        <meshStandardMaterial color="#3b82f6" roughness={0.5} />
      </Cylinder>
      
      {/* Hands - More detailed */}
      <Sphere args={[0.08, 16, 16]} position={[-0.6, 0.5, 0]}>
        <meshStandardMaterial color="#fbbf24" roughness={0.6} />
      </Sphere>
      <Sphere args={[0.08, 16, 16]} position={[0.6, 0.5, 0]}>
        <meshStandardMaterial color="#fbbf24" roughness={0.6} />
      </Sphere>
      
      {/* Legs */}
      <Cylinder ref={leftLegRef} args={[0.15, 0.12, 0.9, 16]} position={[-0.18, 0.05, 0]}>
        <meshStandardMaterial color="#1e40af" roughness={0.6} />
      </Cylinder>
      <Cylinder ref={rightLegRef} args={[0.15, 0.12, 0.9, 16]} position={[0.18, 0.05, 0]}>
        <meshStandardMaterial color="#1e40af" roughness={0.6} />
      </Cylinder>
      
      {/* Shoes */}
      <Box args={[0.25, 0.1, 0.35]} position={[-0.18, -0.4, 0.05]} rotation={[0.1, 0, 0]}>
        <meshStandardMaterial color="#1f2937" />
      </Box>
      <Box args={[0.25, 0.1, 0.35]} position={[0.18, -0.4, 0.05]} rotation={[0.1, 0, 0]}>
        <meshStandardMaterial color="#1f2937" />
      </Box>
      
      {/* Floating code particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <group key={i} position={[
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 6
        ]}>
          <Box args={[0.02, 0.02, 0.02]}>
            <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.8} />
          </Box>
        </group>
      ))}
      
      {/* Enhanced glow effect */}
      <Sphere args={[1.5, 16, 16]} position={[0, 0.9, 0]}>
        <meshStandardMaterial 
          color="#3b82f6" 
          transparent 
          opacity={0.06} 
          emissive="#3b82f6" 
          emissiveIntensity={0.4} 
        />
      </Sphere>
      
      {/* Click effect particles */}
      {isClicked && Array.from({ length: 8 }).map((_, i) => (
        <group key={`click-${i}`} position={[0, 1.7, 0]}>
          <Sphere args={[0.02, 8, 8]} position={[
            (Math.random() - 0.5) * 0.5,
            (Math.random() - 0.5) * 0.5,
            (Math.random() - 0.5) * 0.5
          ]}>
            <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={1} />
          </Sphere>
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
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#3b82f6" />
        <pointLight position={[0, 10, 0]} intensity={0.6} color="#06b6d4" />
        <pointLight position={[0, -10, 0]} intensity={0.4} color="#fbbf24" />
        
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