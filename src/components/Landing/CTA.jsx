import React from 'react';
import { motion } from 'framer-motion';

const CTA = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(139,_92,_246,_0.1)_0,_transparent_70%)]"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-900/30 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-pink-900/30 blur-3xl"></div>
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to <span className="gradient-text">Automate</span> Your Data Tasks?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's discuss how I can help you collect, process, and visualize the data you need to make better business decisions.
          </p>
          <motion.a 
            href="#contact" 
            className="relative overflow-hidden group inline-block px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">
              Hire Me Today <i className="fas fa-arrow-right ml-2"></i>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA; 