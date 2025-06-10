'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Play, Download, Users, TrendingUp, Heart, AlertTriangle, Brain, Zap } from 'lucide-react';

export default function InvestmentPitch() {
  const [showDemo, setShowDemo] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const { scrollYProgress } = useScroll();
  
  // Heart monitor animation
  const [isFlatlining, setIsFlatlining] = useState(false);
  const [heartRate, setHeartRate] = useState(72);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentSection === 0) {
        // Simulate increasing stress/crisis
        setHeartRate(prev => Math.min(prev + 2, 180));
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

  const sections = [
    'crisis',
    'problem',
    'solution', 
    'market',
    'technology',
    'business',
    'team',
    'ask'
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
  }, []);

  return (
    <div className="bg-black text-white overflow-hidden">
      {/* Section 1: Crisis - Heart Monitor */}
      <motion.section 
        style={{ opacity: opacity1 }}
        className="h-screen flex items-center justify-center relative"
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
              className={`w-32 h-32 mx-auto mb-4 ${isFlatlining ? 'text-red-500 animate-pulse' : 'text-red-400'}`}
            />
            <div className="text-6xl font-mono font-bold text-red-400">
              {isFlatlining ? '0' : heartRate} BPM
            </div>
          </motion.div>

          <div className="w-full max-w-4xl mx-auto h-32 relative mb-8">
            <svg className="w-full h-full" viewBox="0 0 800 100">
              <motion.path
                d={isFlatlining 
                  ? "M0,50 L800,50" 
                  : "M0,50 L100,50 L120,20 L140,80 L160,10 L180,50 L280,50 L300,20 L320,80 L340,10 L360,50 L460,50 L480,20 L500,80 L520,10 L540,50 L640,50 L660,20 L680,80 L700,10 L720,50 L800,50"
                }
                fill="none"
                stroke={isFlatlining ? "#ef4444" : "#f87171"}
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </svg>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="text-center"
          >
            <h1 className="text-8xl font-black mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              132
            </h1>
            <p className="text-2xl text-red-400">Lives lost today</p>
            <p className="text-lg text-gray-400 mt-2">Every 11 minutes, someone dies by suicide</p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4 }}
              className="mt-8 text-gray-500"
            >
              <p>Scroll to see the solution</p>
              <div className="animate-bounce mt-2">↓</div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Section 2: The Problem */}
      <motion.section 
        style={{ opacity: opacity2 }}
        className="h-screen flex items-center justify-center px-8"
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-red-900/20 p-8 rounded-2xl border border-red-500/30"
            >
              <div className="text-5xl font-bold text-red-400 mb-4">17 min</div>
              <p className="text-xl">Average crisis hotline wait time</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-red-900/20 p-8 rounded-2xl border border-red-500/30"
            >
              <div className="text-5xl font-bold text-red-400 mb-4">6 months</div>
              <p className="text-xl">Wait for therapy appointment</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-red-900/20 p-8 rounded-2xl border border-red-500/30"
            >
              <div className="text-5xl font-bold text-red-400 mb-4">3 AM</div>
              <p className="text-xl">When the darkness hits hardest</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Section 3: The Solution */}
      <section className="h-screen flex items-center justify-center px-8 bg-gradient-to-b from-black to-blue-900/20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <Brain className="w-40 h-40 mx-auto mb-8 text-blue-400" />
            <h2 className="text-8xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              FRANK
            </h2>
            <p className="text-2xl text-blue-400 mt-4">Friendly Robotic Anti-Nihilism Kompanion</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16"
          >
            <div className="bg-blue-900/20 p-8 rounded-2xl border border-blue-500/30">
              <Zap className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-2xl font-bold mb-4">0.3 Second Response</h3>
              <p className="text-gray-300">Always available. Never busy. Never tired.</p>
            </div>
            
            <div className="bg-blue-900/20 p-8 rounded-2xl border border-blue-500/30">
              <AlertTriangle className="w-12 h-12 text-red-400 mb-4" />
              <h3 className="text-2xl font-bold mb-4">94% Crisis Detection</h3>
              <p className="text-gray-300">AI that recognizes danger before you do.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 4: The Ask */}
      <section className="h-screen flex items-center justify-center px-8 bg-gradient-to-b from-black to-green-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-8xl font-black mb-8 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
          >
            $50M Series A
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-2xl text-gray-300 mb-12"
          >
            To save 10,000 lives in the next 12 months
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <button 
              onClick={() => setShowDemo(true)}
              className="px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-xl font-bold hover:scale-105 transition-transform flex items-center gap-3 mx-auto"
            >
              <Play className="w-6 h-6" />
              See FRANK in Action
            </button>
            
            <button className="px-12 py-6 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl text-xl font-bold hover:scale-105 transition-transform flex items-center gap-3 mx-auto">
              <Download className="w-6 h-6" />
              Download Deck
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-16 text-gray-400"
          >
            <p className="text-lg">Every second we wait, another life hangs in the balance.</p>
            <p className="text-sm mt-2">Let&apos;s build the future of mental health together.</p>
          </motion.div>
        </div>
      </section>

      {/* Demo Modal */}
      <AnimatePresence>
        {showDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8"
            onClick={() => setShowDemo(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-gray-900 rounded-2xl p-8 max-w-4xl w-full max-h-[80vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-4">FRANK Demo</h3>
                <p className="text-gray-400">Experience crisis intervention in real-time</p>
              </div>
              
              <div className="bg-black rounded-xl p-6 min-h-96 flex items-center justify-center">
                <div className="text-center">
                  <Brain className="w-24 h-24 mx-auto mb-4 text-blue-400 animate-pulse" />
                  <p className="text-xl">FRANK is initializing...</p>
                  <p className="text-gray-400 mt-2">Demo starting soon</p>
                </div>
              </div>
              
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setShowDemo(false)}
                  className="px-8 py-3 bg-gray-700 rounded-xl hover:bg-gray-600 transition-colors"
                >
                  Close Demo
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
