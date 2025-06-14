import React from 'react';
import { motion } from 'framer-motion';

const projectsData = [
  {
    type: 'WEB SCRAPING',
    title: 'E-commerce Price Monitor',
    color: 'purple',
    technologies: ['Python', 'Scrapy', 'MongoDB', 'Flask'],
    problem: 'A retail client needed to track competitor pricing across multiple e-commerce sites but manual checking was time-consuming and inconsistent.',
    solution: 'Built a distributed scraping system that monitors 50+ product pages daily, stores historical data, and alerts when prices drop below thresholds.',
    svg: (
      <svg viewBox="0 0 400 200" className="w-full h-full">
        {/* Price Chart */}
        <motion.path
          d="M40 160 L80 140 L120 150 L160 120 L200 130 L240 100 L280 110 L320 90 L360 100"
          stroke="url(#priceGradient)"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
        />
        {/* Data Points */}
        {[40, 80, 120, 160, 200, 240, 280, 320, 360].map((x, i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={160 - (i * 10)}
            r="4"
            fill="url(#priceGradient)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.2 }}
          />
        ))}
        {/* Price Tags */}
        <motion.rect
          x="100"
          y="40"
          width="200"
          height="40"
          rx="8"
          fill="rgba(139,92,246,0.1)"
          stroke="url(#priceGradient)"
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        />
        <motion.text
          x="200"
          y="65"
          textAnchor="middle"
          fill="url(#priceGradient)"
          fontSize="16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          Price Alert
        </motion.text>
        <defs>
          <linearGradient id="priceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    type: 'DATA PIPELINE',
    title: 'Real Estate Data Pipeline',
    color: 'blue',
    technologies: ['Node.js', 'Puppeteer', 'PostgreSQL', 'D3.js'],
    problem: 'A property investment firm needed comprehensive market data but available APIs were expensive and incomplete.',
    solution: 'Developed a JavaScript-based scraper that collects property listings, processes location data, and visualizes trends on an interactive dashboard.',
    svg: (
      <svg viewBox="0 0 400 200" className="w-full h-full">
        {/* Map Grid */}
        <motion.rect
          x="40"
          y="40"
          width="320"
          height="120"
          rx="8"
          fill="rgba(59,130,246,0.1)"
          stroke="url(#mapGradient)"
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        {/* Map Points */}
        {[
          { x: 100, y: 80 },
          { x: 200, y: 60 },
          { x: 300, y: 100 },
          { x: 150, y: 120 },
          { x: 250, y: 90 }
        ].map((point, i) => (
          <motion.g key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}>
            <motion.circle
              cx={point.x}
              cy={point.y}
              r="6"
              fill="url(#mapGradient)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
            />
            <motion.circle
              cx={point.x}
              cy={point.y}
              r="12"
              fill="none"
              stroke="url(#mapGradient)"
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.5 }}
              transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
            />
          </motion.g>
        ))}
        {/* Connection Lines */}
        <motion.path
          d="M100 80 L200 60 L300 100 L150 120 L250 90"
          stroke="url(#mapGradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />
        <defs>
          <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    type: 'JOB ANALYTICS',
    title: 'Job Market Analytics Tool',
    color: 'green',
    technologies: ['Python', 'Selenium', 'FastAPI', 'React'],
    problem: 'Career counselors needed data-driven insights about emerging job trends and skill requirements.',
    solution: 'Created a web app that aggregates job postings, analyzes skill frequency, and provides visual reports on market demand by location and industry.',
    svg: (
      <svg viewBox="0 0 400 200" className="w-full h-full">
        {/* Bar Chart */}
        {[40, 100, 160, 220, 280, 340].map((x, i) => (
          <motion.rect
            key={i}
            x={x}
            y={160 - (i * 20)}
            width="40"
            height={i * 20}
            fill="url(#jobGradient)"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            transformOrigin="bottom"
          />
        ))}
        {/* Skill Tags */}
        {[
          { x: 60, y: 40, text: 'Python' },
          { x: 120, y: 40, text: 'React' },
          { x: 180, y: 40, text: 'Node.js' },
          { x: 240, y: 40, text: 'SQL' },
          { x: 300, y: 40, text: 'AWS' }
        ].map((tag, i) => (
          <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 1 + i * 0.1 }}>
            <motion.rect
              x={tag.x - 30}
              y={tag.y - 15}
              width="60"
              height="30"
              rx="15"
              fill="rgba(16,185,129,0.1)"
              stroke="url(#jobGradient)"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 1 + i * 0.1 }}
            />
            <motion.text
              x={tag.x}
              y={tag.y + 5}
              textAnchor="middle"
              fill="url(#jobGradient)"
              fontSize="12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.2 + i * 0.1 }}
            >
              {tag.text}
            </motion.text>
          </motion.g>
        ))}
        <defs>
          <linearGradient id="jobGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#14B8A6" />
          </linearGradient>
        </defs>
      </svg>
    )
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Featured</span> Projects
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real-world solutions I've built to automate data workflows
          </p>
        </motion.div>
        
        {projectsData.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="card-glass rounded-2xl overflow-hidden mb-16 hover-scale"
          >
            <div className="md:flex">
              <div className="md:w-1/2 p-8 md:p-12">
                <div className="flex items-center mb-4">
                  <div className={`w-3 h-3 rounded-full bg-${project.color}-500 mr-2`}></div>
                  <span className={`text-sm text-${project.color}-400`}>{project.type}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{project.title}</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="skill-chip px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mb-6">
                  <h4 className="font-semibold text-lg mb-2 text-purple-400">Problem:</h4>
                  <p className="text-gray-400 mb-4">{project.problem}</p>
                </div>
                <div className="mb-8">
                  <h4 className="font-semibold text-lg mb-2 text-purple-400">Solution:</h4>
                  <p className="text-gray-400">{project.solution}</p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <motion.a 
                    href="#" 
                    className={`relative overflow-hidden group px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-${project.color}-600 to-${project.color}-600 hover:from-${project.color}-700 hover:to-${project.color}-700 transition-all duration-300`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">
                      <i className="fab fa-github mr-2"></i> View Code
                    </span>
                  </motion.a>
                  <motion.a 
                    href="#" 
                    className="px-6 py-3 rounded-lg font-medium border border-gray-700 hover:border-purple-500 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className="fas fa-external-link-alt mr-2"></i> Live Demo
                  </motion.a>
                </div>
              </div>
              <div className="md:w-1/2 flex items-center justify-center p-4 md:p-8">
                <div className="relative w-full max-w-md">
                  <div className={`absolute -inset-1 bg-gradient-to-r from-${project.color}-600 to-${project.color}-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-300`}></div>
                  <div className="relative bg-gray-900/50 rounded-lg overflow-hidden">
                    {project.svg}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects; 