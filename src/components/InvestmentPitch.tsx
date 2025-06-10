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
  const opacity3 = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const opacity4 = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const opacity5 = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);

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

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="space-y-4"
              >
                <h1 className="text-5xl font-black">
                  Someone Dies by Suicide
                </h1>
                <p className="text-3xl text-red-400 font-bold">
                  Every 11 Minutes
                </p>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto mt-8">
                  Mental health crisis is killing our youth, destroying families, 
                  and costing society billions. The current system isn't working.
                </p>
              </motion.div>
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
                    <li>• Limited personalization</li>
                  </ul>
                </div>
                
                <div className="bg-gray-900/50 p-6 rounded-lg border border-red-500/30">
                  <AlertTriangle className="w-12 h-12 text-red-400 mb-4" />
                  <h3 className="text-2xl font-bold text-red-400 mb-4">Growing Demand</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• 1 in 4 adults affected</li>
                    <li>• Youth rates increasing 25%</li>
                    <li>• Pandemic accelerated crisis</li>
                    <li>• Therapist shortage worsening</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* Section 3: Solution */}
        {currentSection === 2 && (
          <motion.section
            style={{ opacity: opacity3 }}
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
                Meet <span className="text-green-500">FRANK</span>
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <div className="bg-green-900/20 p-8 rounded-lg border border-green-500/30">
                  <Brain className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-green-400 mb-4">AI-Powered Companion</h3>
                  <p className="text-gray-300">
                    24/7 availability, real-time crisis detection, and personalized therapeutic interventions
                    powered by advanced neural networks and emotional intelligence.
                  </p>
                </div>
                
                <div className="bg-blue-900/20 p-8 rounded-lg border border-blue-500/30">
                  <Zap className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-blue-400 mb-4">Instant Support</h3>
                  <p className="text-gray-300">
                    No waiting lists, no appointments. Get immediate support when you need it most,
                    with crisis intervention capabilities that can save lives.
                  </p>
                </div>
              </motion.div>

              {/* Demo Video Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-12"
              >
                <div className="bg-gray-900/50 p-8 rounded-lg border border-gray-700">
                  <h3 className="text-2xl font-bold mb-6">See FRANK in Action</h3>
                  <div className="flex justify-center gap-4">
                    <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
                      <Play className="w-5 h-5" />
                      Watch Demo
                    </button>
                    <Link href="/chat" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
                      Try FRANK Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* Section 4: Market Opportunity */}
        {currentSection === 3 && (
          <motion.section
            style={{ opacity: opacity4 }}
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
                <span className="text-yellow-500">$240B</span> Market
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-500/30">
                  <div className="text-4xl font-bold text-yellow-400 mb-2">$240B</div>
                  <div className="text-xl text-yellow-300 mb-2">Global Mental Health</div>
                  <div className="text-gray-300">Growing 16% annually</div>
                </div>
                
                <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-500/30">
                  <div className="text-4xl font-bold text-purple-400 mb-2">970M</div>
                  <div className="text-xl text-purple-300 mb-2">People Affected</div>
                  <div className="text-gray-300">Worldwide with mental health disorders</div>
                </div>
                
                <div className="bg-orange-900/20 p-6 rounded-lg border border-orange-500/30">
                  <div className="text-4xl font-bold text-orange-400 mb-2">$4.2T</div>
                  <div className="text-xl text-orange-300 mb-2">Economic Impact</div>
                  <div className="text-gray-300">Lost productivity annually</div>
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* Section 5: Technology & Investment Ask */}
        {currentSection >= 4 && (
          <motion.section
            style={{ opacity: opacity5 }}
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
                Join the <span className="text-blue-500">Revolution</span>
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
              >
                <div className="bg-blue-900/20 p-8 rounded-lg border border-blue-500/30">
                  <Brain className="w-12 h-12 text-blue-400 mb-4" />
                  <h3 className="text-2xl font-bold text-blue-400 mb-4">Advanced AI Technology</h3>
                  <ul className="text-left text-gray-300 space-y-2">
                    <li>• Neural pathway analysis</li>
                    <li>• Real-time sentiment detection</li>
                    <li>• Crisis intervention algorithms</li>
                    <li>• Personalized therapeutic responses</li>
                  </ul>
                </div>
                
                <div className="bg-green-900/20 p-8 rounded-lg border border-green-500/30">
                  <Zap className="w-12 h-12 text-green-400 mb-4" />
                  <h3 className="text-2xl font-bold text-green-400 mb-4">Seeking $2M Seed</h3>
                  <ul className="text-left text-gray-300 space-y-2">
                    <li>• Scale AI infrastructure</li>
                    <li>• Expand clinical partnerships</li>
                    <li>• Regulatory compliance</li>
                    <li>• Team growth & development</li>
                  </ul>
                </div>
              </motion.div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="space-y-6"
              >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-lg">
                  <h3 className="text-3xl font-bold mb-4">Ready to Save Lives?</h3>
                  <p className="text-xl mb-6">
                    Join us in revolutionizing mental health care and preventing the next tragedy.
                  </p>
                  <div className="flex justify-center gap-4">
                    <button className="bg-white text-black px-8 py-3 rounded-lg flex items-center gap-2 font-bold hover:bg-gray-100 transition-colors">
                      <Download className="w-5 h-5" />
                      Download Pitch Deck
                    </button>
                    <Link href="/contact" className="bg-transparent border-2 border-white px-8 py-3 rounded-lg flex items-center gap-2 font-bold hover:bg-white hover:text-black transition-colors">
                      Schedule Meeting
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}