'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Download, Heart, AlertTriangle, Brain, Zap, Star, Clock } from 'lucide-react';
import Image from 'next/image';

export default function InvestmentPitch() {
  const [showDemo, setShowDemo] = useState(false);
  const [heartRate, setHeartRate] = useState(72);
  const [isFlatlining, setIsFlatlining] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate(prev => {
        const newRate = prev + 2;
        if (newRate > 160) {
          setIsFlatlining(true);
          return 0;
        }
        return newRate;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white overflow-hidden relative">
      {/* Enhanced Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-blue-500/15 rounded-full blur-2xl animate-pulse delay-3000"></div>
        <div className="absolute top-1/6 right-1/3 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl animate-pulse delay-4000"></div>
        
        {/* Floating geometric shapes */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`bg-shape-${i}`}
            className={`absolute w-4 h-4 ${
              i % 3 === 0 ? 'bg-cyan-400/10' : 
              i % 3 === 1 ? 'bg-purple-400/10' : 'bg-pink-400/10'
            } ${i % 2 === 0 ? 'rounded-full' : 'rotate-45'}`}
            animate={{
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 200 - 100, 0],
              rotate: [0, 360, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Logo Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="fixed top-8 left-8 z-50"
      >
        <Image 
          src="/frank-robotics-logo.svg" 
          alt="FRANK Robotics" 
          width={240} 
          height={60}
          className="filter drop-shadow-2xl"
        />
      </motion.div>

      {/* Crisis Section */}
      <section className="h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/30 via-orange-900/20 to-black"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-red-400/30 rounded-full"
              animate={{
                x: [0, Math.random() * 100, 0],
                y: [0, Math.random() * 100, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        
        <div className="text-center z-10 max-w-4xl mx-auto px-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <motion.div
              animate={{ 
                scale: isFlatlining ? [1, 1.2, 1] : [1, 1.1, 1],
                rotate: isFlatlining ? [0, 5, -5, 0] : 0
              }}
              transition={{ 
                duration: isFlatlining ? 0.5 : 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart 
                className={`w-32 h-32 mx-auto mb-4 filter drop-shadow-2xl ${
                  isFlatlining 
                    ? 'text-red-500 animate-pulse' 
                    : 'text-red-400 shadow-red-500/50'
                }`}
              />
            </motion.div>
            <motion.div 
              className={`text-6xl font-mono font-bold ${
                isFlatlining 
                  ? 'text-red-500 animate-bounce' 
                  : 'text-red-400'
              } filter drop-shadow-lg`}
              animate={{ 
                textShadow: isFlatlining 
                  ? "0 0 20px #ef4444, 0 0 40px #ef4444" 
                  : "0 0 10px #f87171"
              }}
            >
              {isFlatlining ? '0' : heartRate} BPM
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="text-center"
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-black mb-4 bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 bg-clip-text text-transparent filter drop-shadow-2xl"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ backgroundSize: "200% auto" }}
            >
              132
            </motion.h1>
            <p className="text-2xl text-red-400 font-bold mb-2">Lives lost today</p>
            <motion.p 
              className="text-lg text-gray-300 mt-2 bg-red-900/20 px-6 py-2 rounded-full border border-red-500/30"
              animate={{ borderColor: ["rgba(239, 68, 68, 0.3)", "rgba(239, 68, 68, 0.8)", "rgba(239, 68, 68, 0.3)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Every 11 minutes, someone dies by suicide
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4 }}
              className="mt-8 text-gray-400"
            >
              <p className="text-lg font-medium">Scroll to see the solution</p>
              <motion.div 
                className="text-2xl mt-2 text-cyan-400"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ↓
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="h-screen flex items-center justify-center px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/50 via-orange-950/30 to-purple-950/40"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-black mb-8 relative"
          >
            The System Is{' '}
            <motion.span 
              className="text-red-500 relative inline-block"
              animate={{ 
                textShadow: ["0 0 10px #ef4444", "0 0 30px #ef4444", "0 0 10px #ef4444"],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              BROKEN
              <motion.div
                className="absolute inset-0 bg-red-500/20 blur-xl"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <motion.div
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-red-900/40 to-red-800/20 p-8 rounded-2xl border border-red-500/50 backdrop-blur-sm relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent"></div>
              <Clock className="w-12 h-12 text-red-400 mb-4 relative z-10" />
              <div className="text-5xl font-bold text-red-400 mb-4 relative z-10">17 min</div>
              <p className="text-xl text-gray-200 relative z-10">Average crisis hotline wait time</p>
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, rotateY: -5 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-orange-900/40 to-red-800/20 p-8 rounded-2xl border border-orange-500/50 backdrop-blur-sm relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent"></div>
              <AlertTriangle className="w-12 h-12 text-orange-400 mb-4 relative z-10" />
              <div className="text-5xl font-bold text-orange-400 mb-4 relative z-10">6 months</div>
              <p className="text-xl text-gray-200 relative z-10">Wait for therapy appointment</p>
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-yellow-500"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 1 }}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50, rotateY: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              whileHover={{ scale: 1.05, rotateY: -5 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-purple-900/40 to-red-800/20 p-8 rounded-2xl border border-purple-500/50 backdrop-blur-sm relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent"></div>
              <Star className="w-12 h-12 text-purple-400 mb-4 relative z-10" />
              <div className="text-5xl font-bold text-purple-400 mb-4 relative z-10">3 AM</div>
              <p className="text-xl text-gray-200 relative z-10">When the darkness hits hardest</p>
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 1 }}
              />
            </motion.div>
          </div>

          {/* Additional statistics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">1 in 5</div>
              <div className="text-sm text-gray-400">Adults with mental illness</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">$280B</div>
              <div className="text-sm text-gray-400">Annual cost to economy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">60%</div>
              <div className="text-sm text-gray-400">Don&apos;t receive treatment</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-400">24/7</div>
              <div className="text-sm text-gray-400">Crisis happens anytime</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="h-screen flex items-center justify-center px-8 bg-gradient-to-b from-black to-blue-900/20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <Brain className="w-40 h-40 mx-auto mb-8 text-blue-400" />
            <h2 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
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

      {/* Investment Ask Section */}
      <section className="h-screen flex items-center justify-center px-8 bg-gradient-to-b from-black to-green-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
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
              className="px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-xl font-bold hover:scale-105 transition-transform flex items-center gap-3 mx-auto shadow-2xl shadow-blue-500/25"
            >
              <Play className="w-6 h-6" />
              See FRANK in Action
            </button>
            
            <a 
              href="/frank-technical-deck.html" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-6 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl text-xl font-bold hover:scale-105 transition-transform flex items-center gap-3 mx-auto shadow-2xl shadow-green-500/25"
            >
              <Download className="w-6 h-6" />
              Technical Deck
            </a>
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
