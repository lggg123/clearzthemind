'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, AlertTriangle, Brain, Zap, TrendingUp, Users, DollarSign } from 'lucide-react';
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
    <div className="investment-pitch-container bg-black text-white" style={{ backgroundColor: '#000000', color: '#ffffff', minHeight: '100vh' }}>
      {/* Section 1: Crisis - Enhanced with warmer crisis colors */}
      <section data-section="1" className="min-h-screen flex items-center justify-center relative py-20">
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

      {/* Section 2: Enhanced Problem Cards */}
      <section data-section="2" className="min-h-screen flex items-center justify-center px-8 py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-7xl font-black mb-16 text-center text-slate-100"
          >
            The System Is <span className="text-red-500">BROKEN</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Card 1 */}
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-red-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-12 rounded-3xl backdrop-blur-sm border-4 border-rose-400 hover:border-rose-300 shadow-2xl shadow-rose-500/30 transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl" />
                <AlertTriangle className="w-20 h-20 text-rose-400 mb-8" />
                <h3 className="text-4xl font-bold text-rose-300 mb-8" style={{ fontSize: '2.25rem' }}>Accessibility Crisis</h3>
                <ul className="space-y-4 text-slate-300 text-xl" style={{ fontSize: '1.25rem' }}>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 mt-1">•</span>
                    <span>6-month wait times</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 mt-1">•</span>
                    <span>$200+ per session</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 mt-1">•</span>
                    <span>Limited availability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 mt-1">•</span>
                    <span>Geographic barriers</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-12 rounded-3xl backdrop-blur-sm border-4 border-amber-400 hover:border-amber-300 shadow-2xl shadow-amber-500/30 transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />
                <AlertTriangle className="w-20 h-20 text-amber-400 mb-8" />
                <h3 className="text-4xl font-bold text-amber-300 mb-8" style={{ fontSize: '2.25rem' }}>Outdated Methods</h3>
                <ul className="space-y-4 text-slate-300 text-xl" style={{ fontSize: '1.25rem' }}>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1">•</span>
                    <span>One-size-fits-all therapy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1">•</span>
                    <span>No real-time crisis detection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1">•</span>
                    <span>Reactive, not proactive</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-12 rounded-3xl backdrop-blur-sm border-4 border-orange-400 hover:border-orange-300 shadow-2xl shadow-orange-500/30 transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl" />
                <AlertTriangle className="w-20 h-20 text-orange-400 mb-8" />
                <h3 className="text-4xl font-bold text-orange-300 mb-8" style={{ fontSize: '2.25rem' }}>Growing Demand</h3>
                <ul className="space-y-4 text-slate-300 text-xl" style={{ fontSize: '1.25rem' }}>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1">•</span>
                    <span>50% increase in teen suicide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1">•</span>
                    <span>30% of adults need help</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1">•</span>
                    <span>Crisis calls up 600%</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Enhanced Solution Cards */}
      <section data-section="3" className="min-h-screen flex items-center justify-center px-8 py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-7xl font-black mb-8 text-center text-slate-100"
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
            className="text-2xl text-slate-300 mb-16 text-center"
          >
            Friendly Robotic Anti-Nihilism Kompanion
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* AI Card */}
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl blur-xl opacity-25 group-hover:opacity-35 transition-opacity duration-300" />
              <div className="relative bg-gradient-to-br from-emerald-950/90 via-slate-900/90 to-slate-950/90 p-12 rounded-3xl backdrop-blur-sm border-4 border-emerald-400 hover:border-emerald-300 shadow-2xl shadow-emerald-500/30 overflow-hidden transition-all duration-300">
                <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-400/10 rounded-full blur-3xl" />
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <Brain className="w-24 h-24 text-emerald-400 mb-8" />
                </motion.div>
                <h3 className="text-4xl font-bold text-emerald-300 mb-8 relative z-10" style={{ fontSize: '2.25rem' }}>AI-Powered Crisis Detection</h3>
                <ul className="space-y-5 text-slate-300 text-xl relative z-10" style={{ fontSize: '1.25rem' }}>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                    <span>Real-time emotional analysis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                    <span>Neural pathway mapping</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                    <span>Predictive intervention</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                    <span>24/7 availability</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Treatment Card */}
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl blur-xl opacity-25 group-hover:opacity-35 transition-opacity duration-300" />
              <div className="relative bg-gradient-to-br from-cyan-950/90 via-slate-900/90 to-slate-950/90 p-12 rounded-3xl backdrop-blur-sm border-4 border-cyan-400 hover:border-cyan-300 shadow-2xl shadow-cyan-500/30 overflow-hidden transition-all duration-300">
                <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-400/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl" />
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <Zap className="w-24 h-24 text-cyan-400 mb-8" />
                </motion.div>
                <h3 className="text-4xl font-bold text-cyan-300 mb-8 relative z-10" style={{ fontSize: '2.25rem' }}>Personalized Treatment</h3>
                <ul className="space-y-5 text-slate-300 text-xl relative z-10" style={{ fontSize: '1.25rem' }}>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                    <span>Individual neural patterns</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                    <span>Adaptive therapy protocols</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                    <span>Multi-modal intervention</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                    <span>Continuous learning</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 4: Enhanced Market Cards */}
      <section data-section="4" className="min-h-screen flex items-center justify-center px-8 py-20 bg-gradient-to-b from-slate-950 via-indigo-950/30 to-slate-950">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-7xl font-black mb-16 text-center text-slate-100"
          >
            Massive <span className="text-violet-400">Market</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Market Size Card */}
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 rounded-3xl blur-xl opacity-25 group-hover:opacity-35 transition-opacity duration-300" />
              <div className="relative bg-gradient-to-br from-violet-950/90 via-slate-900/90 to-slate-950/90 market-card-spacing rounded-3xl backdrop-blur-sm border-4 border-violet-400 hover:border-violet-300 shadow-2xl shadow-violet-500/30 overflow-hidden transition-all duration-300" style={{ padding: '5rem' }}>
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-violet-400/20 rounded-full blur-2xl" />
                <DollarSign className="w-20 h-20 text-violet-400 mb-8 relative z-10" />
                <motion.div 
                  className="text-8xl font-black text-violet-400 mb-6 relative z-10"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                >
                  $240B
                </motion.div>
                <div className="text-3xl text-slate-100 font-bold mb-4 relative z-10">Mental Health Market</div>
                <div className="text-slate-300 text-xl relative z-10">Growing 25% annually</div>
              </div>
            </motion.div>

            {/* People Affected Card */}
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-3xl blur-xl opacity-25 group-hover:opacity-35 transition-opacity duration-300" />
              <div className="relative bg-gradient-to-br from-purple-950/90 via-slate-900/90 to-slate-950/90 market-card-spacing rounded-3xl backdrop-blur-sm border-4 border-purple-400 hover:border-purple-300 shadow-2xl shadow-purple-500/30 overflow-hidden transition-all duration-300" style={{ padding: '5rem' }}>
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl" />
                <Users className="w-20 h-20 text-purple-400 mb-8 relative z-10" />
                <motion.div 
                  className="text-8xl font-black text-purple-400 mb-6 relative z-10"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
                >
                  970M
                </motion.div>
                <div className="text-3xl text-slate-100 font-bold mb-4 relative z-10">People Affected</div>
                <div className="text-slate-300 text-xl relative z-10">Worldwide mental health issues</div>
              </div>
            </motion.div>

            {/* Economic Impact Card */}
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-pink-600 rounded-3xl blur-xl opacity-25 group-hover:opacity-35 transition-opacity duration-300" />
              <div className="relative bg-gradient-to-br from-fuchsia-950/90 via-slate-900/90 to-slate-950/90 market-card-spacing rounded-3xl backdrop-blur-sm border-4 border-fuchsia-400 hover:border-fuchsia-300 shadow-2xl shadow-fuchsia-500/30 overflow-hidden transition-all duration-300" style={{ padding: '5rem' }}>
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-fuchsia-400/20 rounded-full blur-2xl" />
                <TrendingUp className="w-20 h-20 text-fuchsia-400 mb-8 relative z-10" />
                <motion.div 
                  className="text-8xl font-black text-fuchsia-400 mb-6 relative z-10"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4, type: "spring", bounce: 0.4 }}
                >
                  $4.2T
                </motion.div>
                <div className="text-3xl text-slate-100 font-bold mb-4 relative z-10">Economic Impact</div>
                <div className="text-slate-300 text-xl relative z-10">Lost productivity annually</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 5: Enhanced CTA Section */}
      <section data-section="5" className="min-h-screen flex items-center justify-center px-8 py-20 bg-gradient-to-b from-slate-950 via-indigo-950/20 to-black">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-7xl font-black mb-8 text-center text-slate-100"
          >
            Join the <motion.span
              animate={{
                color: ["#fbbf24", "#f97316", "#ef4444", "#ec4899", "#a855f7", "#3b82f6", "#06b6d4", "#fbbf24"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="font-black"
            >
              Revolution
            </motion.span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl text-slate-300 mb-12 text-center"
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

            {/* Enhanced Contact Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative group mt-16"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-slate-700 to-slate-800 rounded-3xl blur-xl opacity-30 group-hover:opacity-40 transition-opacity duration-300" />
              <div className="relative bg-gradient-to-br from-slate-800/80 via-slate-900/80 to-slate-950/80 p-12 rounded-3xl backdrop-blur-sm border-4 border-emerald-400 hover:border-emerald-300 shadow-2xl shadow-emerald-500/30 transition-all duration-300">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-purple-500/10 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <p className="text-3xl text-slate-200 mb-8 font-bold text-center" style={{ fontSize: '1.875rem' }}>
                    Ready to invest in the future of mental healthcare?
                  </p>
                  <p className="text-slate-300 mb-10 text-xl text-center max-w-2xl mx-auto" style={{ fontSize: '1.25rem' }}>
                    Contact us today to learn more about investment opportunities and early access to FRANK&apos;s revolutionary platform.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <motion.a 
                      href="mailto:invest@frank-robotics.xyz" 
                      className="flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 px-6 py-3 rounded-xl border border-emerald-400/30 hover:border-emerald-400/50 transition-all duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-2xl">💎</span>
                      <span className="text-emerald-400 font-semibold text-lg">invest@frank-robotics.xyz</span>
                    </motion.a>
                    <motion.a 
                      href="mailto:contact@frank-robotics.xyz" 
                      className="flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 px-6 py-3 rounded-xl border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-2xl">✉️</span>
                      <span className="text-cyan-400 font-semibold text-lg">contact@frank-robotics.xyz</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}