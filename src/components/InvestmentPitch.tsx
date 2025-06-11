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

  return (
    <div className="bg-black text-white">
      {/* Logo - Enhanced with better colors */}
      <motion.div 
        className="fixed top-6 left-6 z-[200] flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.div
          className="relative"
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Brain className="w-10 h-10 text-emerald-400" />
          <motion.div
            className="absolute inset-0 bg-emerald-400/20 rounded-full blur-lg"
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
        <div className="text-2xl font-black text-emerald-400">
          FRANK
        </div>
        <div className="text-sm text-slate-400 font-medium">
          Robotics
        </div>
      </motion.div>

      {/* Section 1: Crisis - Enhanced with warmer crisis colors */}
      <section data-section="1" className="min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-900/30 via-red-900/20 to-slate-900"></div>
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
                  isFlatlining ? 'text-red-500' : 'text-rose-400'
                }`}
              />
            </motion.div>
            <motion.div 
              className="text-6xl font-mono font-bold text-rose-400"
              animate={isFlatlining ? { 
                color: ["#fb7185", "#ef4444", "#dc2626"],
                textShadow: ["0 0 10px #fb7185", "0 0 20px #ef4444", "0 0 10px #fb7185"]
              } : {}}
              transition={{ duration: 0.3, repeat: Infinity }}
            >
              {isFlatlining ? '0' : heartRate} BPM
            </motion.div>
            {isFlatlining && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-red-400 text-2xl font-bold mt-4 animate-pulse"
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
              className="text-5xl font-black text-slate-100"
              animate={showCrisisText ? {
                color: ["#f1f5f9", "#ef4444", "#f1f5f9"],
                textShadow: ["0 0 0px transparent", "0 0 20px #ef4444", "0 0 0px transparent"]
              } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            >
              Someone Dies by Suicide
            </motion.h1>
            <motion.p 
              className="text-3xl text-orange-400 font-bold"
              animate={showCrisisText ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              Every 11 Minutes
            </motion.p>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mt-8">
              Mental health crisis is killing our youth, destroying families, 
              and costing society billions. The current system isn&apos;t working.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Enhanced Problem Section with rounded borders */}
      <section data-section="2" className="min-h-screen flex items-center justify-center px-8 bg-slate-950 rounded-t-3xl">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-7xl font-black mb-8 text-slate-100"
          >
            The System Is <span className="text-red-500">BROKEN</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
          >
            <div className="bg-slate-800/60 p-6 rounded-2xl border border-rose-500/30 backdrop-blur-sm">
              <AlertTriangle className="w-12 h-12 text-rose-400 mb-4" />
              <h3 className="text-2xl font-bold text-rose-300 mb-4">Accessibility Crisis</h3>
              <ul className="space-y-2 text-slate-300">
                <li>• 6-month wait times</li>
                <li>• $200+ per session</li>
                <li>• Limited availability</li>
                <li>• Geographic barriers</li>
              </ul>
            </div>
            <div className="bg-slate-800/60 p-6 rounded-2xl border border-amber-500/30 backdrop-blur-sm">
              <AlertTriangle className="w-12 h-12 text-amber-400 mb-4" />
              <h3 className="text-2xl font-bold text-amber-300 mb-4">Outdated Methods</h3>
              <ul className="space-y-2 text-slate-300">
                <li>• One-size-fits-all therapy</li>
                <li>• No real-time crisis detection</li>
                <li>• Reactive, not proactive</li>
              </ul>
            </div>
            <div className="bg-slate-800/60 p-6 rounded-2xl border border-orange-500/30 backdrop-blur-sm">
              <AlertTriangle className="w-12 h-12 text-orange-400 mb-4" />
              <h3 className="text-2xl font-bold text-orange-300 mb-4">Growing Demand</h3>
              <ul className="space-y-2 text-slate-300">
                <li>• 50% increase in teen suicide</li>
                <li>• 30% of adults need help</li>
                <li>• Crisis calls up 600%</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Enhanced Solution Section with rounded borders */}
      <section data-section="3" className="min-h-screen flex items-center justify-center px-8 bg-gradient-to-b from-slate-950 to-slate-900 rounded-t-3xl">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-7xl font-black mb-8 text-slate-100"
          >
            Meet <motion.span 
              className="text-emerald-400"
              animate={{
                color: ["#34d399", "#22d3ee", "#3b82f6", "#34d399"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              FRANK
            </motion.span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-2xl text-slate-300 mb-8"
          >
            Friendly Robotic Anti-Nihilism Kompanion
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left"
          >
            <div className="bg-emerald-900/20 p-6 rounded-2xl border border-emerald-400/30 backdrop-blur-sm">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Brain className="w-12 h-12 text-emerald-400 mb-4" />
              </motion.div>
              <h3 className="text-2xl font-bold text-emerald-300 mb-4">AI-Powered Crisis Detection</h3>
              <ul className="space-y-2 text-slate-300">
                <li>• Real-time emotional analysis</li>
                <li>• Neural pathway mapping</li>
                <li>• Predictive intervention</li>
                <li>• 24/7 availability</li>
              </ul>
            </div>
            <div className="bg-cyan-900/20 p-6 rounded-2xl border border-cyan-400/30 backdrop-blur-sm">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Zap className="w-12 h-12 text-cyan-400 mb-4" />
              </motion.div>
              <h3 className="text-2xl font-bold text-cyan-300 mb-4">Personalized Treatment</h3>
              <ul className="space-y-2 text-slate-300">
                <li>• Individual neural patterns</li>
                <li>• Adaptive therapy protocols</li>
                <li>• Multi-modal intervention</li>
                <li>• Continuous learning</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 4: Enhanced Market Section with rounded borders */}
      <section data-section="4" className="min-h-screen flex items-center justify-center px-8 bg-gradient-to-b from-slate-900 to-indigo-950 rounded-t-3xl">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-7xl font-black mb-8 text-slate-100"
          >
            Massive <span className="text-violet-400">Market</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="bg-violet-900/20 p-8 rounded-xl border border-violet-400/30 backdrop-blur-sm">
              <motion.div 
                className="text-5xl font-black text-violet-400 mb-4"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              >
                $240B
              </motion.div>
              <div className="text-xl text-slate-100 font-bold mb-2">Mental Health Market</div>
              <div className="text-slate-300">Growing 25% annually</div>
            </div>
            <div className="bg-purple-900/20 p-8 rounded-xl border border-purple-400/30 backdrop-blur-sm">
              <motion.div 
                className="text-5xl font-black text-purple-400 mb-4"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
              >
                970M
              </motion.div>
              <div className="text-xl text-slate-100 font-bold mb-2">People Affected</div>
              <div className="text-slate-300">Worldwide mental health issues</div>
            </div>
            <div className="bg-fuchsia-900/20 p-8 rounded-xl border border-fuchsia-400/30 backdrop-blur-sm">
              <motion.div 
                className="text-5xl font-black text-fuchsia-400 mb-4"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4, type: "spring", bounce: 0.4 }}
              >
                $4.2T
              </motion.div>
              <div className="text-xl text-slate-100 font-bold mb-2">Economic Impact</div>
              <div className="text-slate-300">Lost productivity annually</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 5: Simplified CTA Section with only 3 essential buttons */}
      <section data-section="5" className="min-h-screen flex items-center justify-center px-8 py-16 bg-gradient-to-b from-indigo-950 to-slate-950">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-7xl font-black mb-8 text-slate-100"
          >
            Join the <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text animate-pulse">Revolution</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl text-slate-300 mb-12"
          >
            We&apos;re raising $10M Series A to save lives and transform mental healthcare
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-8"
          >
            {/* Three Essential Action Buttons */}
            <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link 
                  href="/showcase" 
                  className="block bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 text-slate-900 px-8 py-4 rounded-xl font-bold text-xl transition-all duration-300 shadow-xl hover:shadow-emerald-500/50 backdrop-blur-sm min-w-[280px] text-center"
                >
                  🚀 See Live Demo
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  href="/frank-technical-deck.html"
                  className="block bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 hover:from-violet-600 hover:via-purple-600 hover:to-fuchsia-600 text-white px-8 py-4 rounded-xl font-bold text-xl transition-all duration-300 shadow-xl hover:shadow-purple-500/50 backdrop-blur-sm min-w-[280px] text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📊 Download Investment Deck
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  href="/pitch"
                  className="block bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-slate-900 px-8 py-4 rounded-xl font-bold text-xl transition-all duration-300 shadow-xl hover:shadow-orange-500/50 backdrop-blur-sm min-w-[280px] text-center"
                >
                  🎯 See Pitch Page
                </Link>
              </motion.div>
            </div>

            {/* Simple Contact Information */}
            <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 p-8 rounded-xl border border-slate-600/30 mt-12 backdrop-blur-sm">
              <p className="text-xl text-slate-200 mb-4">
                <strong>Ready to invest in the future of mental healthcare?</strong>
              </p>
              <p className="text-slate-300 mb-6">
                Contact us today to learn more about investment opportunities and early access to FRANK&apos;s revolutionary platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="mailto:invest@frank-robotics.com" 
                  className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors duration-200"
                >
                  💎 invest@frank-robotics.xyz
                </a>
                <span className="hidden sm:block text-slate-500">|</span>
                <a 
                  href="mailto:contact@frank-robotics.com" 
                  className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors duration-200"
                >
                  ✉️ contact@frank-robotics.xyz
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}