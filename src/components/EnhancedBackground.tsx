import React from 'react';
import { motion } from 'framer-motion';

const EnhancedBackground: React.FC = () => {
  const floatingElements = [
    { size: 'w-32 h-32', top: 'top-20', left: 'left-10', delay: 0 },
    { size: 'w-24 h-24', top: 'top-40', right: 'right-20', delay: 2 },
    { size: 'w-40 h-40', bottom: 'bottom-32', left: 'left-1/4', delay: 4 },
    { size: 'w-28 h-28', bottom: 'bottom-20', right: 'right-10', delay: 6 },
    { size: 'w-36 h-36', top: 'top-1/3', left: 'left-1/3', delay: 8 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Enhanced floating elements */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.size} ${element.top || ''} ${element.left || ''} ${element.right || ''} ${element.bottom || ''}`}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8 + index * 2,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut"
          }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 backdrop-blur-sm border border-white/10" />
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

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>
    </div>
  );
};

export default EnhancedBackground;