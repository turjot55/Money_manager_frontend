import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import Skills from './Skills';
import Projects from './Projects';
import Testimonials from './Testimonials';
import Contact from './Contact';
import CTA from './CTA';
import Footer from './Footer';
import CookieConsent from '../cookies/CookieConsent';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-500vh bg-gray-900">
      <Navbar />
      <main className="w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Hero />
          <Features />
          <Skills />
          <Projects />
          <Testimonials />
          <Contact />
          <CTA />
        </div>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default LandingPage;