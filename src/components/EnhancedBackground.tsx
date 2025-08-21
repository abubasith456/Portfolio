import React from 'react';
import { motion } from 'framer-motion';

const EnhancedBackground: React.FC = () => {
  const floatingElements = [
    { size: 'w-40 h-40', top: 'top-16', left: 'left-8', delay: 0, duration: 12 },
    { size: 'w-32 h-32', top: 'top-32', right: 'right-16', delay: 2, duration: 15 },
    { size: 'w-48 h-48', bottom: 'bottom-24', left: 'left-1/3', delay: 4, duration: 18 },
    { size: 'w-36 h-36', bottom: 'bottom-16', right: 'right-8', delay: 6, duration: 14 },
    { size: 'w-44 h-44', top: 'top-1/4', left: 'left-1/4', delay: 8, duration: 16 },
    { size: 'w-28 h-28', top: 'top-1/2', right: 'right-1/3', delay: 10, duration: 13 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Enhanced floating elements */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.size} ${element.top || ''} ${element.left || ''} ${element.right || ''} ${element.bottom || ''}`}
          animate={{
            y: [0, -40, -20, 0],
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.2, 0.8, 1.1, 1],
            opacity: [0.1, 0.3, 0.2, 0.25, 0.1],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut"
          }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-accent-primary/15 to-accent-secondary/15 backdrop-blur-md border border-white/20 shadow-2xl" />
        </motion.div>
      ))}

      {/* Particle effects */}
      {[...Array(20)].map((_, index) => (
        <motion.div
          key={`particle-${index}`}
          className="absolute w-1 h-1 bg-accent-primary/60 rounded-full"
          animate={{
            y: [100, -100],
            x: [Math.random() * 100, Math.random() * 100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Modern grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full modern-grid" />
      </div>
      
      {/* Enhanced particle effects */}
      {[...Array(30)].map((_, index) => (
        <motion.div
          key={`particle-${index}`}
          className="absolute w-1 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full"
          animate={{
            y: [100, -100],
            x: [Math.random() * 100, Math.random() * 100],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 6,
            ease: "linear"
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(0.5px)',
          }}
        />
      ))}
    </div>
  );
};

export default EnhancedBackground;