import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import DeveloperBackground from './components/DeveloperBackground';

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
      console.log('Loaded theme from localStorage:', savedTheme);
    } else {
      // Default to dark theme
      setIsDark(true);
      console.log('No saved theme, defaulting to dark');
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    const theme = isDark ? 'dark' : 'light';
    console.log('Applying theme:', theme);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [isDark]);

  const toggleTheme = () => {
    console.log('Toggling theme from:', isDark ? 'dark' : 'light', 'to:', !isDark ? 'dark' : 'light');
    setIsDark(!isDark);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : 'light'}`}>
      {/* Developer-themed animated background */}
      <DeveloperBackground />
      
      {/* Theme toggle */}
      <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
      
      {/* Navigation */}
      <Navigation />
      
      <main>
        <section id="home">
          <Hero />
        </section>
        
        <About />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;