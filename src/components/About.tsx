import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, GraduationCap, Award, Heart, Zap, Rocket, Globe, Smartphone, Database, GitBranch, Brain, Cpu } from 'lucide-react';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  const skills = [
    { name: 'Android', icon: <Smartphone className="w-8 h-8" />, color: '#3DDC84' },
    { name: 'Flutter', icon: <Code className="w-8 h-8" />, color: '#02569B' },
    { name: 'React Native', icon: <Smartphone className="w-8 h-8" />, color: '#61DAFB' },
    { name: 'Node.js', icon: <Cpu className="w-8 h-8" />, color: '#339933' },
    { name: 'Firebase', icon: <Database className="w-8 h-8" />, color: '#FFCA28' },
    { name: 'Git', icon: <GitBranch className="w-8 h-8" />, color: '#F05032' },
    { name: 'Python', icon: <Code className="w-8 h-8" />, color: '#3776AB' },
    { name: 'React', icon: <Globe className="w-8 h-8" />, color: '#61DAFB' },
    { name: 'AI/ML', icon: <Brain className="w-8 h-8" />, color: '#FF6B6B' },
    { name: 'RAG', icon: <Brain className="w-8 h-8" />, color: '#4ECDC4' }
  ];

  const experiences = [
    {
      title: "Android Engineer / AI Product Developer",
      company: "Current Role",
      period: "Jan 2022 - Present",
      description: "Leading development of Android, Flutter, and React Native applications with focus on AI integration.",
      achievements: [
        "Designed and maintained Android and Flutter applications",
        "Integrated Android functionalities in React Native wrapper SDK",
        "Currently working on Knowledgebase and Convo AI solutions",
        "Worked on RDIA Saudi project with Python backend and React frontend"
      ],
      icon: <Rocket className="w-6 h-6" />
    },
    {
      title: "Software Developer Intern",
      company: "Previous Experience",
      period: "July 2021 - December 2021",
      description: "Developed mobile applications and worked with backend APIs and Firebase integration.",
      achievements: [
        "Designed applications for mobile phones and tablets",
        "Worked with backend API database response server",
        "Created applications with Firebase authentication and real-time database"
      ],
      icon: <Code className="w-6 h-6" />
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
  };

  return (
    <section id="about" className="section-padding relative overflow-hidden scroll-bg">
      {/* Animated background elements */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="floating-element" style={{ width: '120px', height: '120px', top: '15%', left: '5%', animationDelay: '1s' }} />
        <div className="floating-element" style={{ width: '80px', height: '80px', top: '25%', right: '10%', animationDelay: '3s' }} />
        <div className="floating-element" style={{ width: '100px', height: '100px', bottom: '15%', left: '15%', animationDelay: '5s' }} />
        <div className="floating-element" style={{ width: '60px', height: '60px', bottom: '25%', right: '20%', animationDelay: '2s' }} />
      </motion.div>

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-20"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <h2 className="text-5xl md:text-7xl font-bold">
              <span className="gradient-text">About</span>
              <br />
              <span className="text-dynamic">Me</span>
            </h2>
            <p className="text-xl text-dynamic max-w-3xl mx-auto leading-relaxed">
              Passionate software engineer with 3.5+ years of experience crafting innovative solutions
            </p>
          </motion.div>

          {/* Skills Grid */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-dynamic mb-4">Technical Expertise</h3>
              <p className="text-dynamic">Technologies I work with</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={cardVariants}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    transition: { duration: 0.2 }
                  }}
                  className="group relative"
                >
                  <div 
                    className="glass rounded-2xl p-6 text-center card-hover"
                    style={{ 
                      background: `linear-gradient(135deg, ${skill.color}20, ${skill.color}10)`,
                      borderColor: `${skill.color}30`
                    }}
                  >
                    <div className="flex justify-center mb-3 text-dynamic group-hover:text-primary-300 transition-colors">
                      {skill.icon}
                    </div>
                    <h4 className="font-semibold text-dynamic group-hover:text-primary-300 transition-colors">
                      {skill.name}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Experience Timeline */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-dynamic mb-4">Experience Journey</h3>
              <p className="text-dynamic">My professional path</p>
            </div>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="relative"
                >
                  <div className="glass rounded-3xl p-8 card-hover">
                    <div className="flex items-start space-x-6">
                      <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center flex-shrink-0">
                        {exp.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-4">
                          <h4 className="text-2xl font-bold text-dynamic">{exp.title}</h4>
                          <span className="px-3 py-1 glass text-dynamic rounded-full text-sm font-medium">
                            {exp.period}
                          </span>
                        </div>
                        <p className="text-dynamic font-medium mb-4">{exp.company}</p>
                        <p className="text-dynamic mb-6 leading-relaxed">{exp.description}</p>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start space-x-3">
                              <div className="w-2 h-2 gradient-bg rounded-full mt-2 flex-shrink-0" />
                              <span className="text-dynamic">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education & Certifications */}
          <motion.div variants={itemVariants} className="grid lg:grid-cols-2 gap-8">
            {/* Education */}
            <motion.div variants={cardVariants} className="glass rounded-3xl p-8 card-hover">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-dynamic">Education</h3>
              </div>
              <div className="space-y-4">
                <div className="border-l-4 border-l-primary-500 pl-6">
                  <h4 className="text-xl font-semibold text-dynamic">Bachelor of Computer Application (BCA)</h4>
                  <p className="text-dynamic font-medium">JAMAL MOHAMED COLLEGE</p>
                  <p className="text-dynamic opacity-70">2017 - 2020</p>
                </div>
              </div>
            </motion.div>

            {/* Certifications & Hobbies */}
            <motion.div variants={cardVariants} className="space-y-6">
              {/* Certification */}
              <div className="glass rounded-3xl p-8 card-hover">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-dynamic">Certification</h3>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 gradient-bg rounded-full"></div>
                  <span className="text-dynamic text-lg">Ethical Hacking</span>
                </div>
              </div>

              {/* Hobbies */}
              <div className="glass rounded-3xl p-8 card-hover">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-dynamic">Hobbies</h3>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 gradient-bg rounded-full"></div>
                  <span className="text-dynamic text-lg">Playing Badminton</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;