import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formStatus, setFormStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('https://money-manager-ym1k.onrender.com/api/contact/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setFormStatus('success');
        setTimeout(() => {
          setFormStatus('idle');
          e.target.reset();
        }, 3000);
      } else {
        setFormStatus('idle');
        alert('Failed to send message. Please try again.');
      }
    } catch {
      setFormStatus('idle');
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Get In</span> Touch
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how I can help automate your data workflows.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card-glass rounded-2xl p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="contact-input w-full px-5 py-4 rounded-xl focus:border-purple-500" 
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="contact-input w-full px-5 py-4 rounded-xl focus:border-purple-500" 
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                className="contact-input w-full px-5 py-4 rounded-xl focus:border-purple-500" 
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">How can I help you?</label>
              <textarea 
                id="message" 
                name="message" 
                rows="5" 
                className="contact-input w-full px-5 py-4 rounded-xl focus:border-purple-500" 
                required
              ></textarea>
            </div>
            <div className="pt-4">
              <motion.button 
                type="submit" 
                className={`relative overflow-hidden group w-full md:w-auto px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  formStatus === 'success' 
                    ? 'bg-gradient-to-r from-green-600 to-teal-600' 
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={formStatus !== 'idle'}
              >
                <span className="relative z-10">
                  {formStatus === 'idle' && 'Send Message'}
                  {formStatus === 'sending' && 'Sending...'}
                  {formStatus === 'success' && 'Message Sent!'}
                  <i className={`fas ${
                    formStatus === 'idle' ? 'fa-paper-plane' :
                    formStatus === 'sending' ? 'fa-spinner fa-spin' :
                    'fa-check'
                  } ml-2`}></i>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; 