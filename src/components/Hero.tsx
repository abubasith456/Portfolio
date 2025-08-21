import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import Avatar3D from './Avatar3D';

const Hero: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['rgba(59, 130, 246, 0.1)', 'rgba(139, 92, 246, 0.1)', 'rgba(6, 182, 212, 0.1)']
  );

  const scrollToNext = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden scroll-bg">
      {/* Dynamic background based on scroll */}
      <motion.div 
        className="absolute inset-0"
        style={{ backgroundColor }}
      />

      {/* Enhanced Background particles */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        style={{ y, opacity }}
      >
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          />
        ))}
      </motion.div>

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y, opacity }}
      >
        <motion.div
          className="floating-element"
          style={{
            width: '200px',
            height: '200px',
            top: '10%',
            left: '10%',
            animationDelay: '0s',
          }}
        />
        <motion.div
          className="floating-element"
          style={{
            width: '150px',
            height: '150px',
            top: '20%',
            right: '15%',
            animationDelay: '2s',
          }}
        />
        <motion.div
          className="floating-element"
          style={{
            width: '100px',
            height: '100px',
            bottom: '20%',
            left: '20%',
            animationDelay: '4s',
          }}
        />
      </motion.div>

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
              <h2 className="text-dynamic font-mono text-lg">Hello, I'm</h2>
              <h1 className="text-6xl md:text-8xl font-bold leading-tight">
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
              <motion.h3 
                className="text-3xl md:text-4xl text-dynamic font-semibold"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
              >
                Software Engineer
              </motion.h3>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="text-xl text-dynamic leading-relaxed max-w-lg"
            >
              Crafting innovative digital solutions with cutting-edge technologies. 
              Specialized in mobile development, AI integration, and creating seamless 
              user experiences that make a difference.
            </motion.p>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-4 text-dynamic group">
                <motion.div 
                  className="w-12 h-12 rounded-xl glass flex items-center justify-center group-hover:scale-110 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-5 h-5" />
                </motion.div>
                <span className="text-lg">abubasith86@gmail.com</span>
              </div>
              <div className="flex items-center space-x-4 text-dynamic group">
                <motion.div 
                  className="w-12 h-12 rounded-xl glass flex items-center justify-center group-hover:scale-110 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-5 h-5" />
                </motion.div>
                <span className="text-lg">+91 9585909514</span>
              </div>
              <div className="flex items-center space-x-4 text-dynamic group">
                <motion.div 
                  className="w-12 h-12 rounded-xl glass flex items-center justify-center group-hover:scale-110 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MapPin className="w-5 h-5" />
                </motion.div>
                <span className="text-lg">Perungudi, Chennai</span>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.8 }}
              className="flex space-x-4"
            >
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-dynamic hover:scale-110 transition-all duration-300"
              >
                <Github className="w-7 h-7" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-dynamic hover:scale-110 transition-all duration-300"
              >
                <Linkedin className="w-7 h-7" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-dynamic hover:scale-110 transition-all duration-300"
              >
                <Twitter className="w-7 h-7" />
              </motion.a>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9, duration: 0.8 }}
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 gradient-bg rounded-2xl text-white font-semibold text-xl shadow-2xl hover:shadow-primary-500/25 transition-all duration-300 border border-white/20"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get In Touch
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right side - 3D Avatar */}
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
            className="h-[700px] relative"
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
          className="text-dynamic hover:text-primary-300 transition-colors"
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