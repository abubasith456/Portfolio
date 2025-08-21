import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import Avatar3D from './Avatar3D';

const Hero: React.FC = () => {
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
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Enhanced Background particles */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        style={{ y, opacity }}
      >
        {Array.from({ length: 80 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
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
          className="absolute top-20 left-20 w-32 h-32 border border-primary-500/20 rounded-full"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-40 right-32 w-24 h-24 border border-purple-500/20 rounded-lg"
          animate={{
            rotate: -360,
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-32 left-1/3 w-20 h-20 border border-cyan-500/20 rounded-full"
          animate={{
            rotate: 360,
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
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
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="inline-block"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-2xl">👋</span>
                </div>
              </motion.div>
              
              <h2 className="text-primary-400 font-mono text-lg">Hello, I'm</h2>
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
                  className="text-white"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                >
                  Abu Basith S
                </motion.span>
              </h1>
              <motion.h3 
                className="text-3xl md:text-4xl text-primary-300 font-semibold"
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
              className="text-xl text-gray-300 leading-relaxed max-w-lg"
            >
              Software developer with 3.5 years of experience in handling Android, 
              Flutter, React & React Native, and AI Applications, with the ability 
              to handle multiple projects simultaneously with a high degree of accuracy.
            </motion.p>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-4 text-gray-300 group">
                <motion.div 
                  className="w-12 h-12 rounded-xl bg-primary-600/20 border border-primary-500/30 flex items-center justify-center group-hover:bg-primary-500/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-5 h-5 text-primary-400" />
                </motion.div>
                <span className="text-lg">abubasith86@gmail.com</span>
              </div>
              <div className="flex items-center space-x-4 text-gray-300 group">
                <motion.div 
                  className="w-12 h-12 rounded-xl bg-primary-600/20 border border-primary-500/30 flex items-center justify-center group-hover:bg-primary-500/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-5 h-5 text-primary-400" />
                </motion.div>
                <span className="text-lg">+91 9585909514</span>
              </div>
              <div className="flex items-center space-x-4 text-gray-300 group">
                <motion.div 
                  className="w-12 h-12 rounded-xl bg-primary-600/20 border border-primary-500/30 flex items-center justify-center group-hover:bg-primary-500/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MapPin className="w-5 h-5 text-primary-400" />
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
                className="w-14 h-14 rounded-2xl bg-primary-600/20 border border-primary-500/30 flex items-center justify-center text-primary-300 hover:text-primary-400 hover:bg-primary-500/30 transition-all duration-300"
              >
                <Github className="w-7 h-7" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-2xl bg-primary-600/20 border border-primary-500/30 flex items-center justify-center text-primary-300 hover:text-primary-400 hover:bg-primary-500/30 transition-all duration-300"
              >
                <Linkedin className="w-7 h-7" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-2xl bg-primary-600/20 border border-primary-500/30 flex items-center justify-center text-primary-300 hover:text-primary-400 hover:bg-primary-500/30 transition-all duration-300"
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
                className="px-10 py-5 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl text-white font-semibold text-xl shadow-2xl hover:shadow-primary-500/25 transition-all duration-300 border border-primary-500/30"
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
              className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-purple-600/20 rounded-full blur-3xl"
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
          className="text-primary-400 hover:text-primary-300 transition-colors"
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