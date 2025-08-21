import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden scroll-bg">
      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element" style={{ width: '150px', height: '150px', top: '10%', right: '5%', animationDelay: '0s' }} />
        <div className="floating-element" style={{ width: '100px', height: '100px', bottom: '20%', left: '10%', animationDelay: '3s' }} />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Get In</span>
            <br />
            <span className="text-dynamic">Touch</span>
          </h2>
          <p className="text-xl text-dynamic max-w-2xl mx-auto">
            Ready to collaborate? Let's discuss your next project and bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="glass rounded-3xl p-8 card-hover">
              <h3 className="text-2xl font-bold text-dynamic mb-6">Let's Connect</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 group">
                  <motion.div 
                    className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <p className="text-dynamic font-medium">Email</p>
                    <p className="text-dynamic">abubasith86@gmail.com</p>
                  </div>
                </div>

                
                <div className="flex items-center space-x-4 group">
                  <motion.div 
                    className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MapPin className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <p className="text-dynamic font-medium">Location</p>
                    <p className="text-dynamic">Perungudi, Chennai</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-8 card-hover">
              <h3 className="text-2xl font-bold text-dynamic mb-4">What I Offer</h3>
              <ul className="space-y-3 text-dynamic">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 gradient-bg rounded-full"></div>
                  <span>Mobile App Development (Android, Flutter, React Native)</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 gradient-bg rounded-full"></div>
                  <span>Web Development (React, Node.js)</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 gradient-bg rounded-full"></div>
                  <span>AI/ML Integration & RAG Solutions</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 gradient-bg rounded-full"></div>
                  <span>Firebase & Backend Development</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="glass rounded-3xl p-8 card-hover">
              <h3 className="text-2xl font-bold text-dynamic mb-6">Send Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-dynamic font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl glass border border-white/20 text-dynamic placeholder-dynamic/50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-dynamic font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl glass border border-white/20 text-dynamic placeholder-dynamic/50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-dynamic font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl glass border border-white/20 text-dynamic placeholder-dynamic/50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-4 gradient-bg rounded-xl text-white font-semibold text-lg flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;