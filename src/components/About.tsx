import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, GraduationCap, Award, Heart } from 'lucide-react';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills = [
    'Android', 'Flutter', 'React Native', 'Node.js', 'Firebase', 'Git',
    'IDE - Android Studio, Visual Studio', 'RAG (Basics)', 'Python', 'React'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="section-padding relative">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              About Me
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Passionate software engineer with expertise in mobile development and AI applications
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Professional Summary */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="glass rounded-2xl p-8 card-hover">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Code className="w-6 h-6 mr-3 text-primary-400" />
                  Professional Summary
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Software developer with 3.5 years of experience in handling Android, Flutter, 
                  React & React Native, and AI Applications, with the ability to handle multiple 
                  projects simultaneously with a high degree of accuracy.
                </p>
              </div>

              {/* Education */}
              <div className="glass rounded-2xl p-8 card-hover">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <GraduationCap className="w-6 h-6 mr-3 text-primary-400" />
                  Education
                </h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-primary-500 pl-4">
                    <h4 className="text-lg font-semibold text-white">
                      Bachelor of Computer Application (BCA)
                    </h4>
                    <p className="text-primary-300">JAMAL MOHAMED COLLEGE</p>
                    <p className="text-gray-400">2017-2020</p>
                  </div>
                </div>
              </div>

              {/* Certification */}
              <div className="glass rounded-2xl p-8 card-hover">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Award className="w-6 h-6 mr-3 text-primary-400" />
                  Certification
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary-400 rounded-full"></div>
                    <span className="text-gray-300">Ethical Hacking</span>
                  </div>
                </div>
              </div>

              {/* Hobbies */}
              <div className="glass rounded-2xl p-8 card-hover">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Heart className="w-6 h-6 mr-3 text-primary-400" />
                  Hobbies
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary-400 rounded-full"></div>
                    <span className="text-gray-300">Playing Badminton</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Skills */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="glass rounded-2xl p-8 card-hover">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Technical Skills
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ delay: index * 0.1 }}
                      className="skill-badge text-center"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Experience Timeline */}
              <div className="glass rounded-2xl p-8 card-hover">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Experience
                </h3>
                <div className="space-y-6">
                  {/* Current Role */}
                  <div className="relative pl-8 border-l-4 border-primary-500">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-primary-500 rounded-full"></div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-semibold text-white">
                        Android Engineer / AI Product Developer
                      </h4>
                      <p className="text-primary-300 text-sm">Jan 2022 -- Current</p>
                      <ul className="text-gray-300 text-sm space-y-1 ml-4">
                        <li>• Design, develop and maintenance of Android and flutter applications</li>
                        <li>• Integrated Android functionalities in react native wrapper SDK</li>
                        <li>• Worked as software developer on Android, Flutter and React Native projects</li>
                        <li>• Moved to product team that is fully based on AI</li>
                        <li>• Currently working on Knowledgebase and Convo AI solutions</li>
                        <li>• Worked on RDIA Saudi project with both backend Python and frontend React development</li>
                      </ul>
                    </div>
                  </div>

                  {/* Internship */}
                  <div className="relative pl-8 border-l-4 border-primary-500">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-primary-500 rounded-full"></div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-semibold text-white">
                        Internship
                      </h4>
                      <p className="text-primary-300 text-sm">July 2021 -- December 2021</p>
                      <ul className="text-gray-300 text-sm space-y-1 ml-4">
                        <li>• Designed and developed applications for Mobile phones and tablets</li>
                        <li>• Worked on with backend API database response server</li>
                        <li>• Created application with Firebase authentication and Real-time database of Firebase</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;