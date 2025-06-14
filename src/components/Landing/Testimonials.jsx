import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonialsData = [
  {
    initials: 'JD',
    name: 'Jane Doe',
    role: 'E-commerce Manager',
    gradient: 'from-purple-600 to-pink-600',
    text: 'The price monitoring tool has saved us countless hours and helped us adjust our pricing strategy based on real competitor data. Highly recommend!',
    company: 'TechRetail Inc.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80'
  },
  {
    initials: 'MS',
    name: 'Michael Smith',
    role: 'Real Estate Investor',
    gradient: 'from-blue-600 to-cyan-600',
    text: 'The property data pipeline has transformed how we identify investment opportunities. The dashboard makes complex market trends easy to understand.',
    company: 'PropertyVest Capital',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80'
  },
  {
    initials: 'AR',
    name: 'Amanda Rodriguez',
    role: 'Career Counselor',
    gradient: 'from-green-600 to-teal-600',
    text: 'Our students now get career advice backed by real-time job market data. The insights from this tool have been invaluable for our counseling program.',
    company: 'CareerPath Academy',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1288&q=80'
  },
  {
    initials: 'RK',
    name: 'Robert Kim',
    role: 'Data Analyst',
    gradient: 'from-orange-600 to-red-600',
    text: 'The data automation tools have streamlined our workflow significantly. We can now focus on analysis rather than data collection.',
    company: 'DataInsight Solutions',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80'
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + testimonialsData.length) % testimonialsData.length);
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-gray-900/5 to-gray-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Client</span> Testimonials
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            What people say about working with me
          </p>
        </motion.div>

        <div className="relative h-[400px] overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full"
            >
              <div className="card-glass p-8 rounded-xl hover-scale">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-32 h-32 rounded-full overflow-hidden">
                    <img 
                      src={testimonialsData[currentIndex].image} 
                      alt={testimonialsData[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold mb-2">{testimonialsData[currentIndex].name}</h3>
                      <p className="text-purple-400 mb-1">{testimonialsData[currentIndex].role}</p>
                      <p className="text-gray-400 text-sm">{testimonialsData[currentIndex].company}</p>
                    </div>
                    <p className="text-gray-300 italic text-lg">
                      "{testimonialsData[currentIndex].text}"
                    </p>
                    <div className="mt-4 flex">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fas fa-star text-yellow-400 mr-1"></i>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-purple-500 w-8' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 