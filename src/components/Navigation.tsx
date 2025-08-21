import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface NavigationProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isDark, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          <motion.div whileHover={{ scale: 1.05 }} className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold gradient-text-modern cursor-pointer ml-2 sm:ml-0 modern-text" onClick={() => scrollToSection('#home')}>
            Mohamed's Portfolio
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button key={item.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => scrollToSection(item.href)} className="text-dynamic hover:text-accent-primary transition-colors duration-300 font-medium" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                {item.name}
              </motion.button>
            ))}
            <motion.button onClick={toggleTheme} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-dynamic hover:bg-white/30 transition-all duration-300" title={`Switch to ${isDark ? 'light' : 'dark'} mode`}>
              {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-blue-600" />}
            </motion.button>
          </div>

          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsOpen(!isOpen)} className="md:hidden p-3 rounded-xl glass text-dynamic hover:bg-white/10 transition-all duration-300">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <div className="glass rounded-2xl mt-4 p-4 sm:p-6 space-y-4 mx-2 border border-white/10">
                {navItems.map((item, index) => (
                  <motion.button key={item.name} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => scrollToSection(item.href)} className="block w-full text-left text-dynamic hover:text-accent-primary transition-colors duration-300 font-medium py-3 px-4 rounded-lg hover:bg-white/5" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                    {item.name}
                  </motion.button>
                ))}
                <motion.button onClick={toggleTheme} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center space-x-3 text-dynamic hover:text-accent-primary transition-colors duration-300 font-medium py-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: navItems.length * 0.1 }}>
                  {isDark ? (
                    <>
                      <Sun className="w-5 h-5 text-yellow-400" />
                      <span>Switch to Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-5 h-5 text-blue-600" />
                      <span>Switch to Dark Mode</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;