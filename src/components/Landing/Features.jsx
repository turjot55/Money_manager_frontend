import React, { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

const featuresData = [
  {
    title: 'Full Stack Development',
    description: 'Building modern web applications with React, TypeScript, and Next.js. Creating robust backend solutions with Spring Boot and Django.',
    icon: 'fas fa-code',
    gradient: 'from-purple-600 to-pink-600',
    svg: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <motion.path
          d="M40 100 L80 60 L120 100 L80 140 Z"
          fill="none"
          stroke="url(#gradient1)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.circle
          cx="100"
          cy="100"
          r="30"
          fill="none"
          stroke="url(#gradient2)"
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    title: 'Data Extraction',
    description: 'Automating data collection with Python, Selenium, and Playwright. Processing and analyzing data with BeautifulSoup and Scrapy.',
    icon: 'fas fa-database',
    gradient: 'from-blue-600 to-cyan-600',
    svg: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <motion.path
          d="M50 50 L150 50 L150 150 L50 150 Z"
          fill="none"
          stroke="url(#gradient3)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.path
          d="M70 70 L130 70 M70 100 L130 100 M70 130 L130 130"
          stroke="url(#gradient4)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
        <defs>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#0891B2" />
          </linearGradient>
          <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0891B2" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    title: 'Testing & Automation',
    description: 'Implementing comprehensive testing with Cypress and Storybook. Creating automated workflows for efficient development.',
    icon: 'fas fa-vial',
    gradient: 'from-green-600 to-teal-600',
    svg: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <motion.path
          d="M60 140 L140 60"
          stroke="url(#gradient5)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5 }}
        />
        <motion.circle
          cx="60"
          cy="140"
          r="10"
          fill="none"
          stroke="url(#gradient6)"
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
        <motion.circle
          cx="140"
          cy="60"
          r="10"
          fill="none"
          stroke="url(#gradient6)"
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        />
        <defs>
          <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#0D9488" />
          </linearGradient>
          <linearGradient id="gradient6" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0D9488" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    title: 'API Integration',
    description: 'Developing and integrating RESTful APIs. Working with Amazon Textract and Google Vision API for advanced data processing.',
    icon: 'fas fa-plug',
    gradient: 'from-yellow-600 to-orange-600',
    svg: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <motion.path
          d="M50 100 C50 50, 150 50, 150 100 C150 150, 50 150, 50 100"
          fill="none"
          stroke="url(#gradient7)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
        />
        <motion.path
          d="M70 100 L130 100"
          stroke="url(#gradient8)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <defs>
          <linearGradient id="gradient7" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>
          <linearGradient id="gradient8" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>
      </svg>
    )
  }
];

const Features = () => {
  const navigate = useNavigate();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };

  const handleFeatureClick = (feature) => {
    setActiveFeature(feature);
    if (!localStorage.getItem('user')) {
      setShowLoginPrompt(true);
    }
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-gray-900 to-gray-900/5 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(139,_92,_246,_0.1)_0,_transparent_70%)]"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-900/30 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-pink-900/30 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Powerful Features
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Comprehensive solutions for modern web development and data automation
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuresData.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
              onHoverStart={() => setActiveFeature(index)}
              onHoverEnd={() => setActiveFeature(null)}
            >
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50
                            transform transition-all duration-300 hover:scale-[1.02] hover:border-primary/50
                            hover:shadow-lg hover:shadow-primary/10">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-r from-primary to-secondary
                                flex items-center justify-center text-white text-xl">
                    <i className={feature.icon}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
                
                <div className="mt-6 h-40 relative">
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeFeature === index ? 1 : 0.5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.svg}
                  </motion.div>
                </div>

                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                  animate={{
                    scale: activeFeature === index ? 1.05 : 1,
                    opacity: activeFeature === index ? 0.1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <motion.button
            onClick={() => navigate('/login')}
            className="relative overflow-hidden group px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">
              Get Started Now <i className="fas fa-arrow-right ml-2"></i>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </motion.button>
          <p className="text-gray-400 mt-4">
            Join thousands of users who are already managing their time better
          </p>
        </motion.div>
      </div>

      <AnimatePresence>
        {showLoginPrompt && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div className="bg-gray-800 p-8 rounded-2xl max-w-md w-full mx-4">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 text-white">Login to Access Features</h3>
                <p className="text-gray-400 mb-6">
                  Create an account to unlock all features and start managing your time effectively
                </p>
                <div className="flex gap-4 justify-center">
                  <motion.button
                    onClick={() => navigate('/login')}
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Login
                  </motion.button>
                  <motion.button
                    onClick={() => setShowLoginPrompt(false)}
                    className="px-6 py-2 rounded-lg border border-gray-600 text-gray-300 font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Maybe Later
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isMobile && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-4 left-4 right-4 bg-gray-800/90 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 shadow-lg"
        >
          <div className="flex items-center gap-3">
            <i className="fas fa-bell text-purple-400 text-xl"></i>
            <div>
              <p className="font-semibold text-white">Enable Notifications</p>
              <p className="text-sm text-gray-400">Get timely reminders for your routines</p>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Features; 