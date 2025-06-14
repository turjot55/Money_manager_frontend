import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const quickLinks = [
    { href: '#home', text: 'Home' },
    { href: '#projects', text: 'Projects' },
    { href: '#skills', text: 'Skills' },
    { href: '#contact', text: 'Contact' }
  ];

  const services = [
    { href: '#', text: 'Web Development' },
    { href: '#', text: 'Data Automation' },
    { href: '#', text: 'API Integration' },
    { href: '#', text: 'Data Extraction' }
  ];

  const socialLinks = [
    { 
      href: 'https://www.linkedin.com/in/turja-talukder-6a0a5a103/', 
      icon: 'fab fa-linkedin-in', 
      label: 'LinkedIn',
      color: 'hover:text-[#0077B5]'
    },
    { 
      href: 'https://www.instagram.com/turjatalukder', 
      icon: 'fab fa-instagram', 
      label: 'Instagram',
      color: 'hover:text-[#E4405F]'
    },
    { 
      href: 'https://www.facebook.com/turjot/', 
      icon: 'fab fa-facebook-f', 
      label: 'Facebook',
      color: 'hover:text-[#1877F2]'
    },
    { 
      href: 'https://twitter.com/turjatalukder', 
      icon: 'fab fa-twitter', 
      label: 'Twitter',
      color: 'hover:text-[#1DA1F2]'
    }
  ];

  return (
    <footer className="bg-gray-900/80 backdrop-blur-md border-t border-gray-800 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">
              <span className="gradient-text">Turja Talukder</span>
            </h3>
            <p className="text-gray-400 mb-6">
              Full-stack developer specializing in web development, data automation, and API integration solutions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a 
                  key={index}
                  href={link.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 transition-colors ${link.color}`}
                  whileHover={{ y: -3, scale: 1.1 }}
                  aria-label={link.label}
                >
                  <i className={`${link.icon} text-xl`}></i>
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <motion.a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                    whileHover={{ x: 5 }}
                  >
                    <i className="fas fa-chevron-right text-xs mr-2 text-purple-500"></i> {link.text}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <motion.a 
                    href={service.href} 
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                    whileHover={{ x: 5 }}
                  >
                    <i className="fas fa-chevron-right text-xs mr-2 text-purple-500"></i> {service.text}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <i className="fas fa-envelope text-purple-500 mt-1 mr-3"></i>
                <span className="text-gray-400">turjatalukder@gmail.com</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone text-purple-500 mt-1 mr-3"></i>
                <span className="text-gray-400">+880 1793-771091</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-purple-500 mt-1 mr-3"></i>
                <span className="text-gray-400">Rangamati, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Turja Talukder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 