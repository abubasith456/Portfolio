import React, { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DeveloperBackground from './components/DeveloperBackground';

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDark = saved ? saved === 'dark' : prefersDark;
    setIsDark(initialDark);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark((d) => !d);

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : 'light'}`}>
      <DeveloperBackground />
      <Navigation isDark={isDark} toggleTheme={toggleTheme} />
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