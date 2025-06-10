'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, AlertTriangle, Brain, Zap } from 'lucide-react';
import Link from 'next/link';

export default function InvestmentPitch() {
  // Heart monitor animation
  const [isFlatlining, setIsFlatlining] = useState(false);
  const [heartRate, setHeartRate] = useState(72);
  const [showCrisisText, setShowCrisisText] = useState(false);
  const [currentSection, setCurrentSection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate((prev) => {
        const newRate = Math.min(prev + 3, 200);
        if (newRate > 160 && !isFlatlining) {
          setTimeout(() => {
            setIsFlatlining(true);
            setShowCrisisText(true);
          }, 2000);
        }
        return newRate;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isFlatlining]);

  // Scroll tracking with intersection observer
  useEffect(() => {
    const sections = document.querySelectorAll('section[data-section]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionNumber = parseInt(entry.target.getAttribute('data-section') || '1');
            setCurrentSection(sectionNumber);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Scroll-triggered animations with better transitions
  const opacity1 = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.18, 0.22, 0.38, 0.42], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.38, 0.42, 0.58, 0.62], [0, 1, 1, 0]);
  const opacity4 = useTransform(scrollYProgress, [0.58, 0.62, 0.78, 0.82], [0, 1, 1, 0]);
  const opacity5 = useTransform(scrollYProgress, [0.78, 1], [0, 1]);

  return (
    <div className="bg-black text-white">
      {/* Scroll Progress Indicator */}
      <div className="fixed top-4 right-4 z-[200] bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-gray-600">
        <div className="text-sm text-gray-300 mb-2">Section {currentSection}/5</div>
        <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-purple-400 rounded-full transition-all duration-300"
            style={{ 
              width: `${(currentSection / 5) * 100}%`
            }}
          />
        </div>
      </div>

      {/* Section 1: Crisis - Heart Monitor */}
      <section data-section="1" className="min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 to-black"></div>
        <div className="text-center z-10 px-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <motion.div
              animate={isFlatlining ? { 
                scale: [1, 1.2, 1],
                filter: ["brightness(1)", "brightness(2)", "brightness(1)"]
              } : {
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: isFlatlining ? 0.5 : 0.8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart
                className={`w-32 h-32 mx-auto mb-4 ${
                  isFlatlining ? 'text-red-500' : 'text-red-400'
                }`}
              />
            </motion.div>
            <motion.div 
              className="text-6xl font-mono font-bold text-red-400"
              animate={isFlatlining ? { 
                color: ["#ef4444", "#dc2626", "#b91c1c"],
                textShadow: ["0 0 10px #ef4444", "0 0 20px #dc2626", "0 0 10px #ef4444"]
              } : {}}
              transition={{ duration: 0.3, repeat: Infinity }}
            >
              {isFlatlining ? '0' : heartRate} BPM
            </motion.div>
            {isFlatlining && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-red-500 text-2xl font-bold mt-4 animate-pulse"
              >
                ⚠️ FLATLINE DETECTED ⚠️
              </motion.div>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="space-y-4"
          >
            <motion.h1 
              className="text-5xl font-black"
              animate={showCrisisText ? {
                color: ["#ffffff", "#ef4444", "#ffffff"],
                textShadow: ["0 0 0px transparent", "0 0 20px #ef4444", "0 0 0px transparent"]
              } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            >
              Someone Dies by Suicide
            </motion.h1>
            <motion.p 
              className="text-3xl text-red-400 font-bold"
              animate={showCrisisText ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              Every 11 Minutes
            </motion.p>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mt-8">
              Mental health crisis is killing our youth, destroying families, 
              and costing society billions. The current system isn&apos;t working.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 2: The Problem */}
      <section data-section="2" className="min-h-screen flex items-center justify-center px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-7xl font-black mb-8"
          >
            The System Is <span className="text-red-500">BROKEN</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
          >
            <div className="bg-gray-900/50 p-6 rounded-lg border border-red-500/30">
              <AlertTriangle className="w-12 h-12 text-red-400 mb-4" />
              <h3 className="text-2xl font-bold text-red-400 mb-4">Accessibility Crisis</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• 6-month wait times</li>
                <li>• $200+ per session</li>
                <li>• Limited availability</li>
                <li>• Geographic barriers</li>
              </ul>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-lg border border-red-500/30">
              <AlertTriangle className="w-12 h-12 text-red-400 mb-4" />
              <h3 className="text-2xl font-bold text-red-400 mb-4">Outdated Methods</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• One-size-fits-all therapy</li>
                <li>• No real-time crisis detection</li>
                <li>• Reactive, not proactive</li>
              </ul>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-lg border border-red-500/30">
              <AlertTriangle className="w-12 h-12 text-red-400 mb-4" />
              <h3 className="text-2xl font-bold text-red-400 mb-4">Growing Demand</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• 50% increase in teen suicide</li>
                <li>• 30% of adults need help</li>
                <li>• Crisis calls up 600%</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Solution */}
      <section data-section="3" className="min-h-screen flex items-center justify-center px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-7xl font-black mb-8"
          >
            Meet <motion.span 
              className="text-green-400"
              animate={{
                textShadow: [
                  "0 0 20px #4ade80",
                  "0 0 40px #4ade80",
                  "0 0 20px #4ade80"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              FRANK
            </motion.span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-2xl text-gray-300 mb-8"
          >
            Friendly Robotic Anti-Nihilism Kompanion
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left"
          >
            <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Brain className="w-12 h-12 text-green-400 mb-4" />
              </motion.div>
              <h3 className="text-2xl font-bold text-green-400 mb-4">AI-Powered Crisis Detection</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Real-time emotional analysis</li>
                <li>• Neural pathway mapping</li>
                <li>• Predictive intervention</li>
                <li>• 24/7 availability</li>
              </ul>
            </div>
            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Zap className="w-12 h-12 text-blue-400 mb-4" />
              </motion.div>
              <h3 className="text-2xl font-bold text-blue-400 mb-4">Personalized Treatment</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Individual neural patterns</li>
                <li>• Adaptive therapy protocols</li>
                <li>• Multi-modal intervention</li>
                <li>• Continuous learning</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 4: Market */}
      <motion.section
        style={{ 
          opacity: opacity4, 
          zIndex: currentSection === 4 ? 50 : 10,
          pointerEvents: currentSection === 4 ? 'auto' : 'none'
        }}
        className="h-screen flex items-center justify-center px-8 fixed inset-0"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-7xl font-black mb-8"
          >
            Massive <span className="text-purple-400">Market</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="bg-purple-900/20 p-8 rounded-lg border border-purple-400/30">
              <motion.div 
                className="text-5xl font-black text-purple-400 mb-4"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              >
                $240B
              </motion.div>
              <div className="text-xl text-white font-bold mb-2">Mental Health Market</div>
              <div className="text-gray-300">Growing 25% annually</div>
            </div>
            <div className="bg-purple-900/20 p-8 rounded-lg border border-purple-400/30">
              <motion.div 
                className="text-5xl font-black text-purple-400 mb-4"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
              >
                970M
              </motion.div>
              <div className="text-xl text-white font-bold mb-2">People Affected</div>
              <div className="text-gray-300">Worldwide mental health issues</div>
            </div>
            <div className="bg-purple-900/20 p-8 rounded-lg border border-purple-400/30">
              <motion.div 
                className="text-5xl font-black text-purple-400 mb-4"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4, type: "spring", bounce: 0.4 }}
              >
                $4.2T
              </motion.div>
              <div className="text-xl text-white font-bold mb-2">Economic Impact</div>
              <div className="text-gray-300">Lost productivity annually</div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Section 5: Ask */}
      <motion.section
        style={{ 
          opacity: opacity5, 
          zIndex: currentSection === 5 ? 100 : 10,
          pointerEvents: currentSection === 5 ? 'auto' : 'none'
        }}
        className="h-screen flex items-center justify-center px-8 fixed inset-0"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-7xl font-black mb-8"
          >
            Join the <span className="text-yellow-400">Revolution</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl text-gray-300 mb-12"
          >
            We&apos;re raising $10M Series A to save lives and transform mental healthcare
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-6"
          >
            {/* Primary Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link 
                href="/showcase" 
                className="bg-green-500 hover:bg-green-600 text-black px-8 py-4 rounded-lg font-bold text-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-green-500/25"
              >
                See Live Demo
              </Link>
              <Link
                href="/waitlist"
                className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-lg font-bold text-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
              >
                Join Waitlist
              </Link>
            </div>

            {/* Document & Presentation Buttons */}
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link
                href="/frank-technical-deck.html"
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Technical Deck
              </Link>
              <Link
                href="/executive-summary"
                className="bg-cyan-500 hover:bg-cyan-600 text-black px-6 py-3 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
              >
                Executive Summary
              </Link>
              <Link
                href="/financials"
                className="bg-emerald-500 hover:bg-emerald-600 text-black px-6 py-3 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
              >
                View Financials
              </Link>
            </div>

            {/* Presentation & Contact Buttons */}
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link
                href="/pitch-video"
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
              >
                Watch Pitch Video
              </Link>
              <Link
                href="/company-presentation"
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-indigo-500/25"
              >
                Company Presentation
              </Link>
              <Link
                href="/contact"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
              >
                Contact Form
              </Link>
            </div>

            {/* Direct Contact Button */}
            <div className="flex justify-center pt-4">
              <Link
                href="mailto:contact@frank-robotics.com"
                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold text-lg transition-all transform hover:scale-105 border border-gray-500 shadow-lg hover:shadow-gray-600/25"
              >
                Email Us Directly
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}