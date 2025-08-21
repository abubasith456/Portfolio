import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Mail, Phone, MapPin, Github, Linkedin, Facebook, Instagram, Download } from 'lucide-react';
import Avatar3D from './Avatar3D';

const Hero: React.FC = () => {
  // Ensure page starts at top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const scrollToNext = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container-custom section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent-primary rounded-full animate-pulse"></div>
                <span className="text-dynamic-secondary font-mono text-sm tracking-wider">SOFTWARE ENGINEER</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <motion.span 
                  className="gradient-text"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  Mohamed
                </motion.span>
                <br />
                <motion.span 
                  className="text-dynamic"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                >
                  Abu Basith S
                </motion.span>
              </h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="text-xl md:text-2xl text-dynamic-secondary leading-relaxed max-w-lg"
              >
                Crafting innovative digital solutions with cutting-edge technologies. 
                Specialized in mobile development, AI integration, and creating seamless 
                user experiences that make a difference.
              </motion.p>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-4 text-dynamic-secondary group">
                <motion.div 
                  className="w-12 h-12 rounded-xl glass flex items-center justify-center group-hover:scale-110 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-5 h-5 text-on-glass" />
                </motion.div>
                <span className="text-lg">abubasith86@gmail.com</span>
              </div>

              <div className="flex items-center space-x-4 text-dynamic-secondary group">
                <motion.div 
                  className="w-12 h-12 rounded-xl glass flex items-center justify-center group-hover:scale-110 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MapPin className="w-5 h-5 text-on-glass" />
                </motion.div>
                <span className="text-lg">Perungudi, Chennai</span>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="flex space-x-4"
            >
              <motion.a
                href="https://www.facebook.com/abu.basith46"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-dynamic-secondary hover:text-accent-primary transition-all duration-300"
              >
                <Facebook className="w-7 h-7" />
              </motion.a>
              <motion.a
                href="https://in.linkedin.com/in/abu-basith-16903796"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-dynamic-secondary hover:text-accent-primary transition-all duration-300"
              >
                <Linkedin className="w-7 h-7" />
              </motion.a>
              <motion.a
                href="https://github.com/abubasith456"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-dynamic-secondary hover:text-accent-primary transition-all duration-300"
              >
                <Github className="w-7 h-7" />
              </motion.a>
              <motion.a
                href="https://instagram.com/dusky_boy_abu?igshid=OGQ5ZDc2ODk2ZA=="
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-dynamic-secondary hover:text-accent-primary transition-all duration-300"
              >
                <Instagram className="w-7 h-7" />
              </motion.a>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 gradient-bg rounded-2xl text-white font-semibold text-lg shadow-2xl hover:shadow-primary-500/25 transition-all duration-300 border border-white/20 flex items-center justify-center space-x-2"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span>Get In Touch</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass rounded-2xl text-dynamic font-semibold text-lg border border-white/20 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download CV</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right side - 3D Avatar */}
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
            className="h-[800px] relative"
            style={{ scale }}
          >
            <motion.div 
              className="absolute inset-0 rounded-full blur-3xl"
              style={{
                background: `linear-gradient(45deg, var(--accent-primary), var(--accent-secondary))`,
                opacity: 0.3,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <Avatar3D className="w-full h-full" />
          </motion.div>
        </div>
      </div>

      {/* Enhanced Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          onClick={scrollToNext}
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-dynamic-secondary hover:text-accent-primary transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronDown className="w-10 h-10" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;