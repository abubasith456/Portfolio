import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, toggleTheme }) => {
  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed top-6 right-6 z-50 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 shadow-lg"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        {isDark ? (
          <Sun className="w-6 h-6 text-yellow-400" />
        ) : (
          <Moon className="w-6 h-6 text-blue-600" />
        )}
      </motion.div>
      
      {/* Toggle switch indicator */}
      <motion.div
        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 rounded-full bg-white/20"
        initial={false}
        animate={{
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'
        }}
      >
        <motion.div
          className="w-3 h-3 rounded-full bg-white shadow-md"
          initial={false}
          animate={{
            x: isDark ? 0 : 20,
            backgroundColor: isDark ? '#ffffff' : '#1e293b'
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;