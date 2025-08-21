import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MapPin, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        time: new Date().toLocaleString()
      };

      await emailjs.send(
        'service_2ca6m9l',
        'template_25bzbbp',
        templateParams,
        'DSBcYORjRnG6QqDRQ'
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Email error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
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
          <h2 className="text-5xl md:text-7xl font-bold mb-6 modern-text">
            <span className="gradient-text-modern text-glow">Get In</span>
            <br />
            <span className="text-dynamic text-shadow-modern">Touch</span>
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
                    <p className="text-dynamic">mohamedabu.basith@gmail.com</p>
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
                    className="w-full px-4 py-4 sm:py-3 rounded-xl glass border border-white/20 text-dynamic placeholder-dynamic/50 focus:outline-none focus:ring-2 focus:ring-accent-primary transition-all duration-300 text-base"
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
                    className="w-full px-4 py-4 sm:py-3 rounded-xl glass border border-white/20 text-dynamic placeholder-dynamic/50 focus:outline-none focus:ring-2 focus:ring-accent-primary transition-all duration-300 text-base"
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
                    className="w-full px-4 py-4 sm:py-3 rounded-xl glass border border-white/20 text-dynamic placeholder-dynamic/50 focus:outline-none focus:ring-2 focus:ring-accent-primary transition-all duration-300 resize-none text-base"
                    placeholder="Tell me about your project..."
                  />
                </div>
                
                {submitStatus === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-600 text-center font-medium"
                  >
                    ✅ Message sent successfully!
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-600 text-center font-medium"
                  >
                    ❌ Failed to send message. Please try again.
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`w-full px-6 py-4 rounded-xl text-white font-semibold text-lg flex items-center justify-center space-x-2 transition-all duration-300 btn-enhanced ${
                    isSubmitting 
                      ? 'bg-gray-500 cursor-not-allowed' 
                      : 'hover:shadow-lg'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
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