import React, { useRef, useEffect } from 'react';
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
  const hairRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;
      groupRef.current.position.y = Math.sin(time * 2) * 0.05;
    }
    
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(time * 1.5) * 0.05;
    }
    
    if (hairRef.current) {
      hairRef.current.rotation.y = Math.sin(time * 1.5) * 0.05;
    }
    
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = Math.sin(time * 2) * 0.2;
    }
    
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = Math.sin(time * 2 + Math.PI) * 0.2;
    }
    
    if (leftLegRef.current) {
      leftLegRef.current.rotation.z = Math.sin(time * 1.5) * 0.1;
    }
    
    if (rightLegRef.current) {
      rightLegRef.current.rotation.z = Math.sin(time * 1.5 + Math.PI) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Head */}
      <Sphere ref={headRef} args={[0.4, 32, 32]} position={[0, 1.8, 0]}>
        <meshStandardMaterial color="#fbbf24" roughness={0.8} />
      </Sphere>
      
      {/* Hair */}
      <Sphere ref={hairRef} args={[0.45, 32, 32]} position={[0, 1.9, 0]}>
        <meshStandardMaterial color="#92400e" roughness={0.9} />
      </Sphere>
      
      {/* Eyes */}
      <Sphere args={[0.06, 16, 16]} position={[-0.12, 1.85, 0.35]}>
        <meshStandardMaterial color="#1f2937" />
      </Sphere>
      <Sphere args={[0.06, 16, 16]} position={[0.12, 1.85, 0.35]}>
        <meshStandardMaterial color="#1f2937" />
      </Sphere>
      
      {/* Eye highlights */}
      <Sphere args={[0.02, 8, 8]} position={[-0.14, 1.87, 0.38]}>
        <meshStandardMaterial color="#ffffff" />
      </Sphere>
      <Sphere args={[0.02, 8, 8]} position={[0.10, 1.87, 0.38]}>
        <meshStandardMaterial color="#ffffff" />
      </Sphere>
      
      {/* Nose */}
      <Sphere args={[0.03, 8, 8]} position={[0, 1.8, 0.4]}>
        <meshStandardMaterial color="#f59e0b" />
      </Sphere>
      
      {/* Mouth */}
      <Box args={[0.15, 0.02, 0.05]} position={[0, 1.7, 0.38]}>
        <meshStandardMaterial color="#dc2626" />
      </Box>
      
      {/* Body - T-shirt */}
      <Cylinder ref={bodyRef} args={[0.5, 0.5, 1.2, 32]} position={[0, 0.8, 0]}>
        <meshStandardMaterial color="#3b82f6" roughness={0.7} />
      </Cylinder>
      
      {/* Arms - T-shirt sleeves */}
      <Cylinder ref={leftArmRef} args={[0.12, 0.12, 0.8, 16]} position={[-0.65, 0.8, 0]}>
        <meshStandardMaterial color="#3b82f6" roughness={0.7} />
      </Cylinder>
      <Cylinder ref={rightArmRef} args={[0.12, 0.12, 0.8, 16]} position={[0.65, 0.8, 0]}>
        <meshStandardMaterial color="#3b82f6" roughness={0.7} />
      </Cylinder>
      
      {/* Hands */}
      <Sphere args={[0.08, 16, 16]} position={[-0.65, 0.4, 0]}>
        <meshStandardMaterial color="#fbbf24" roughness={0.8} />
      </Sphere>
      <Sphere args={[0.08, 16, 16]} position={[0.65, 0.4, 0]}>
        <meshStandardMaterial color="#fbbf24" roughness={0.8} />
      </Sphere>
      
      {/* Legs - Jeans */}
      <Cylinder ref={leftLegRef} args={[0.15, 0.15, 1.0, 16]} position={[-0.2, -0.2, 0]}>
        <meshStandardMaterial color="#1e40af" roughness={0.8} />
      </Cylinder>
      <Cylinder ref={rightLegRef} args={[0.15, 0.15, 1.0, 16]} position={[0.2, -0.2, 0]}>
        <meshStandardMaterial color="#1e40af" roughness={0.8} />
      </Cylinder>
      
      {/* Shoes */}
      <Box args={[0.25, 0.1, 0.4]} position={[-0.2, -0.7, 0.1]}>
        <meshStandardMaterial color="#1f2937" />
      </Box>
      <Box args={[0.25, 0.1, 0.4]} position={[0.2, -0.7, 0.1]}>
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
            <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.5} />
          </Box>
        </group>
      ))}
      
      {/* Glow effect around avatar */}
      <Sphere args={[1.5, 16, 16]} position={[0, 0.8, 0]}>
        <meshStandardMaterial 
          color="#3b82f6" 
          transparent 
          opacity={0.1} 
          emissive="#3b82f6" 
          emissiveIntensity={0.2} 
        />
      </Sphere>
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
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#3b82f6" />
        <pointLight position={[0, 10, 0]} intensity={0.5} color="#06b6d4" />
        
        <AvatarModel />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.8}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 2.2}
        />
      </Canvas>
    </div>
  );
};

export default Avatar3D;