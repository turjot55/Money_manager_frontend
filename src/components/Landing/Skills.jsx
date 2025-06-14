import React from 'react';
import { motion } from 'framer-motion';

const skillsData = [
  {
    title: 'Full Stack Development',
    color: 'purple',
    skills: [
      { name: 'React', icon: 'fab fa-react' },
      { name: 'TypeScript', icon: 'fab fa-js' },
      { name: 'Next.js', icon: 'fab fa-node-js' },
      { name: 'Spring Boot', icon: 'fab fa-java' }
    ],
    svg: (
      <svg viewBox="0 0 400 200" className="w-full h-full">
        {/* Stack Layers */}
        {[0, 1, 2, 3].map((i) => (
          <motion.rect
            key={i}
            x={40 + i * 20}
            y={40 + i * 20}
            width="320 - i * 40"
            height="120 - i * 20"
            rx="8"
            fill="rgba(139,92,246,0.1)"
            stroke="url(#stackGradient)"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
          />
        ))}
        {/* Code Symbols */}
        {[
          { x: 100, y: 80, text: '< />' },
          { x: 200, y: 100, text: '{}' },
          { x: 300, y: 120, text: '[]' }
        ].map((symbol, i) => (
          <motion.text
            key={i}
            x={symbol.x}
            y={symbol.y}
            textAnchor="middle"
            fill="url(#stackGradient)"
            fontSize="24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 + i * 0.2 }}
          >
            {symbol.text}
          </motion.text>
        ))}
        <defs>
          <linearGradient id="stackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    title: 'Backend Development',
    color: 'blue',
    skills: [
      { name: 'Django', icon: 'fab fa-python' },
      { name: 'Java', icon: 'fab fa-java' },
      { name: 'Node.js', icon: 'fab fa-node-js' },
      { name: 'PostgreSQL', icon: 'fas fa-database' }
    ],
    svg: (
      <svg viewBox="0 0 400 200" className="w-full h-full">
        {/* Server Architecture */}
        <motion.rect
          x="40"
          y="40"
          width="320"
          height="120"
          rx="8"
          fill="rgba(59,130,246,0.1)"
          stroke="url(#backendGradient)"
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        {/* Database Icons */}
        {[80, 160, 240, 320].map((x, i) => (
          <motion.g key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}>
            <motion.circle
              cx={x}
              cy="100"
              r="20"
              fill="rgba(59,130,246,0.2)"
              stroke="url(#backendGradient)"
              strokeWidth="2"
            />
            <motion.path
              d={`M${x-10} 100 L${x+10} 100 M${x} 90 L${x} 110`}
              stroke="url(#backendGradient)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
            />
          </motion.g>
        ))}
        <defs>
          <linearGradient id="backendGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    title: 'Testing & Automation',
    color: 'green',
    skills: [
      { name: 'Cypress', icon: 'fas fa-vial' },
      { name: 'Playwright', icon: 'fas fa-robot' },
      { name: 'Selenium', icon: 'fas fa-cogs' },
      { name: 'Storybook', icon: 'fas fa-book' }
    ],
    svg: (
      <svg viewBox="0 0 400 200" className="w-full h-full">
        {/* Test Flow */}
        <motion.path
          d="M40 100 L100 60 L160 140 L220 80 L280 120 L340 100"
          stroke="url(#testGradient)"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
        />
        {/* Test Points */}
        {[40, 100, 160, 220, 280, 340].map((x, i) => (
          <motion.g key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}>
            <motion.circle
              cx={x}
              cy={100 - (i % 2 ? 40 : -40)}
              r="8"
              fill="url(#testGradient)"
            />
            <motion.circle
              cx={x}
              cy={100 - (i % 2 ? 40 : -40)}
              r="16"
              fill="none"
              stroke="url(#testGradient)"
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.5 }}
              transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
            />
          </motion.g>
        ))}
        <defs>
          <linearGradient id="testGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#14B8A6" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    title: 'Data Extraction',
    color: 'yellow',
    skills: [
      { name: 'BeautifulSoup', icon: 'fas fa-spider' },
      { name: 'Scrapy', icon: 'fas fa-spider' },
      { name: 'Amazon Textract', icon: 'fab fa-aws' },
      { name: 'Google Vision', icon: 'fab fa-google' }
    ],
    svg: (
      <svg viewBox="0 0 400 200" className="w-full h-full">
        {/* Document Processing */}
        <motion.rect
          x="40"
          y="40"
          width="320"
          height="120"
          rx="8"
          fill="rgba(234,179,8,0.1)"
          stroke="url(#dataGradient)"
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        {/* Text Lines */}
        {[60, 80, 100, 120, 140].map((y, i) => (
          <motion.line
            key={i}
            x1="60"
            y1={y}
            x2="340"
            y2={y}
            stroke="url(#dataGradient)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
          />
        ))}
        {/* Processing Icons */}
        {[
          { x: 80, y: 160, icon: 'M70 160 L90 160 M80 150 L80 170' },
          { x: 200, y: 160, icon: 'M190 160 L210 160 M200 150 L200 170' },
          { x: 320, y: 160, icon: 'M310 160 L330 160 M320 150 L320 170' }
        ].map((icon, i) => (
          <motion.path
            key={i}
            d={icon.icon}
            stroke="url(#dataGradient)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 1 + i * 0.2 }}
          />
        ))}
        <defs>
          <linearGradient id="dataGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
      </svg>
    )
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6 bg-gradient-to-b from-gray-900 to-gray-900/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Technical</span> Expertise
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Full-stack development and data automation solutions
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillsData.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="card-glass p-8 rounded-xl hover-scale"
            >
              <div className="flex items-center mb-6">
                <div className={`w-14 h-14 rounded-full bg-${skill.color}-900/30 flex items-center justify-center mr-4`}>
                  <i className={`${skill.skills[0].icon} text-2xl text-${skill.color}-400`}></i>
                </div>
                <h3 className="text-xl font-semibold">{skill.title}</h3>
              </div>
              <div className="mb-6">
                <div className="relative h-48 overflow-hidden bg-gray-900/50 rounded-lg">
                  {skill.svg}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {skill.skills.map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ scale: 1.05 }}
                    className="skill-chip flex items-center gap-2 px-3 py-2 rounded-lg"
                  >
                    <i className={`${item.icon} text-${skill.color}-400`}></i>
                    <span className="text-sm">{item.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills; 