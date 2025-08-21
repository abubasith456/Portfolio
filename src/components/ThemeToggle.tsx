import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, toggleTheme }) => {
  const handleToggle = () => {
    console.log('Theme toggle clicked, current theme:', isDark ? 'dark' : 'light');
    toggleTheme();
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <motion.button
        onClick={handleToggle}
        className="relative w-16 h-8 bg-gray-300 dark:bg-gray-600 rounded-full p-1 cursor-pointer transition-colors duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        <motion.div
          className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
          initial={false}
          animate={{ x: isDark ? 32 : 0 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 500, damping: 30 }}
        >
          {isDark ? (
            <Moon className="w-3 h-3 text-blue-600" />
          ) : (
            <Sun className="w-3 h-3 text-yellow-500" />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
};

export default ThemeToggle;