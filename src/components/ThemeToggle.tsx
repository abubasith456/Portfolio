import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, toggleTheme }) => {
  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Theme toggle clicked, current theme:', isDark ? 'dark' : 'light');
    toggleTheme();
  };

  return (
    <div className="fixed top-4 right-4 z-[9999] md:top-6 md:right-6">
      <button
        onClick={handleToggle}
        onTouchStart={handleToggle}
        className="relative w-14 h-8 md:w-16 md:h-8 bg-gray-300 dark:bg-gray-600 rounded-full p-1 cursor-pointer transition-colors duration-300 border-2 border-gray-400 dark:border-gray-500 hover:border-gray-500 dark:hover:border-gray-400"
        style={{ touchAction: 'manipulation' }}
        title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        <motion.div
          className="absolute top-0.5 left-0.5 w-6 h-6 md:w-7 md:h-7 bg-white rounded-full shadow-lg flex items-center justify-center"
          initial={false}
          animate={{ x: isDark ? 24 : 0 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 500, damping: 30 }}
        >
          {isDark ? (
            <Moon className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
          ) : (
            <Sun className="w-3 h-3 md:w-4 md:h-4 text-yellow-500" />
          )}
        </motion.div>
      </button>
    </div>
  );
};

export default ThemeToggle;