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
      {/* Logo - Fixed position top-left */}
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
          <Brain className="w-10 h-10 text-green-400" />
          <motion.div
            className="absolute inset-0 bg-green-400/20 rounded-full blur-lg"
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
        <div className="text-2xl font-black bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          FRANK
        </div>
        <div className="text-sm text-gray-400 font-medium">
          Robotics
        </div>
      </motion.div>

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
      <section data-section="4" className="min-h-screen flex items-center justify-center px-8">
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
      </section>

      {/* Section 5: Ask - The Call to Action with All Buttons */}
      <section data-section="5" className="min-h-screen flex items-center justify-center px-8 py-16">
        <div className="max-w-5xl mx-auto text-center">
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
            className="space-y-8"
          >
            {/* Primary Action Buttons */}
            <div className="flex flex-col md:flex-row gap-6 justify-center mb-8">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link 
                  href="/showcase" 
                  className="block bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black px-8 py-4 mx-2 rounded-xl font-bold text-xl transition-all duration-300 shadow-xl hover:shadow-green-500/50 border-2 border-green-400/20 backdrop-blur-sm"
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
                  href="/waitlist"
                  className="block bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-4 mx-2 rounded-xl font-bold text-xl transition-all duration-300 shadow-xl hover:shadow-purple-500/50 border-2 border-purple-400/20 backdrop-blur-sm"
                >
                  💝 Join Waitlist
                </Link>
              </motion.div>
            </div>

            {/* Document & Presentation Buttons Row 1 */}
            <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
              <motion.div
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  href="/frank-technical-deck.html"
                  className="block bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black px-6 py-3 mx-2 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-yellow-500/40 border border-yellow-400/20"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📊 Download Technical Deck
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  href="/executive-summary"
                  className="block bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-black px-6 py-3 mx-2 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-cyan-500/40 border border-cyan-400/20"
                >
                  📈 Executive Summary
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  href="/financials"
                  className="block bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-black px-6 py-3 mx-2 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-emerald-500/40 border border-emerald-400/20"
                >
                  💰 View Financials
                </Link>
              </motion.div>
            </div>

            {/* Presentation & Contact Buttons Row 2 */}
            <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
              <motion.div
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  href="/pitch-video"
                  className="block bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 mx-2 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-red-500/40 border border-red-400/20"
                >
                  🎥 Watch Pitch Video
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  href="/company-presentation"
                  className="block bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-6 py-3 mx-2 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-indigo-500/40 border border-indigo-400/20"
                >
                  📋 Company Presentation
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  href="/contact"
                  className="block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 mx-2 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/40 border border-blue-400/20"
                >
                  📞 Contact Form
                </Link>
              </motion.div>
            </div>

            {/* Direct Contact & Investment Buttons */}
            <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
              <motion.div
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  href="mailto:contact@frank-robotics.com"
                  className="block bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-3 mx-2 rounded-lg font-bold text-lg transition-all duration-300 border border-gray-500/20 shadow-lg hover:shadow-gray-600/40"
                >
                  ✉️ Email Us Directly
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  href="mailto:invest@frank-robotics.com?subject=Investment%20Inquiry"
                  className="block bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-black px-6 py-3 mx-2 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-orange-500/50 border border-orange-400/20"
                >
                  💎 Investment Inquiry
                </Link>
              </motion.div>
            </div>

            {/* Call to Action Message */}
            <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-6 rounded-xl border border-purple-500/30 mt-8">
              <p className="text-xl text-gray-200 mb-4">
                <strong>Ready to save lives and transform mental healthcare?</strong>
              </p>
              <p className="text-gray-300">
                Contact us today to learn more about investment opportunities, partnerships, 
                or early access to FRANK&apos;s revolutionary mental health platform.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}