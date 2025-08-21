import React, { useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DeveloperBackground from './components/DeveloperBackground';

const App: React.FC = () => {
  useEffect(() => {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }, []);

  return (
    <div className={'min-h-screen light'}>
      {/* Developer-themed animated background */}
      <DeveloperBackground />

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