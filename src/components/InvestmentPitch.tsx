'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Play, Download, Heart, AlertTriangle, Brain, Zap } from 'lucide-react';
import Link from 'next/link';

export default function InvestmentPitch() {
  const [currentSection, setCurrentSection] = useState(0);
  const { scrollYProgress } = useScroll();

  // Heart monitor animation
  const [isFlatlining, setIsFlatlining] = useState(false);
  const [heartRate, setHeartRate] = useState(72);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentSection === 0) {
        // Simulate increasing stress/crisis
        setHeartRate((prev) => Math.min(prev + 2, 180));
        if (heartRate > 160) {
          setIsFlatlining(true);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentSection, heartRate]);

  // Scroll-triggered animations
  const opacity1 = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);

  const sections = [
    'crisis',
    'problem',
    'solution',
    'market',
    'technology',
    'business',
    'team',
    'ask',
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      const newSection = Math.floor(scrolled / windowHeight);
      setCurrentSection(Math.min(newSection, sections.length - 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections.length]);

  return (
    <div className="bg-black text-white overflow-hidden">
      <AnimatePresence>
        {/* Section 1: Crisis - Heart Monitor */}
        {currentSection === 0 && (
          <motion.section
            style={{ opacity: opacity1 }}
            className="h-screen flex items-center justify-center relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 to-black"></div>

            <div className="text-center z-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="mb-8"
              >
                <Heart
                  className={`w-32 h-32 mx-auto mb-4 ${
                    isFlatlining ? 'text-red-500 animate-pulse' : 'text-red-400'
                  }`}
                />
                <div className="text-6xl font-mono font-bold text-red-400">
                  {isFlatlining ? '0' : heartRate} BPM
                </div>
              </motion.div>

              {/* Remaining content for Section 1 */}
              ...
            </div>
          </motion.section>
        )}

        {/* Section 2: The Problem */}
        {currentSection === 1 && (
          <motion.section
            style={{ opacity: opacity2 }}
            className="h-screen flex items-center justify-center px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-6xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-7xl font-black mb-8"
              >
                The System Is <span className="text-red-500">BROKEN</span>
              </motion.h2>

              {/* Remaining content for Section 2 */}
              ...
            </div>
          </motion.section>
        )}

        {/* Add similar conditional rendering for other sections */}
        ...
      </AnimatePresence>
    </div>
  );
}