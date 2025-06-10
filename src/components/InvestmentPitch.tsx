'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Download, Heart, AlertTriangle, Brain, Zap, Star, Clock } from 'lucide-react';
import Image from 'next/image';

export default function InvestmentPitch() {
  const [showDemo, setShowDemo] = useState(false);
  const [heartRate, setHeartRate] = useState(72);
  const [isFlatlining, setIsFlatlining] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [demoMessages, setDemoMessages] = useState<Array<{role: 'user' | 'frank', message: string, timestamp: Date}>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [crisisLevel, setCrisisLevel] = useState(0);

  // Demo scenarios
  const demoScenarios = useMemo(() => [
    {
      userMessage: "Hi FRANK, I'm having a really tough day",
      frankResponse: "I hear you. I'm here to listen. What's making today particularly difficult for you?",
      crisisLevel: 1,
      detectionTime: "0.2s"
    },
    {
      userMessage: "I feel like nothing matters anymore",
      frankResponse: "That sounds like a really heavy feeling. When you say nothing matters, can you tell me more about what's going through your mind?",
      crisisLevel: 3,
      detectionTime: "0.15s"
    },
    {
      userMessage: "Sometimes I think everyone would be better off without me",
      frankResponse: "I'm really concerned about you right now. Those thoughts must be incredibly painful. You matter, and I want you to know that you're not alone in this. Can we talk about what's brought you to this point?",
      crisisLevel: 8,
      detectionTime: "0.1s"
    },
    {
      userMessage: "I've been thinking about ending it all",
      frankResponse: "I'm very worried about you right now. Thank you for trusting me with something so important. I want you to know that there are people who care about you and want to help. Are you in a safe place right now?",
      crisisLevel: 10,
      detectionTime: "0.08s"
    }
  ], []);

  const startDemo = useCallback(async () => {
    setDemoMessages([]);
    setDemoStep(0);
    setCrisisLevel(0);
    
    for (let i = 0; i < demoScenarios.length; i++) {
      const scenario = demoScenarios[i];
      
      // Add user message
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDemoMessages(prev => [...prev, {
        role: 'user',
        message: scenario.userMessage,
        timestamp: new Date()
      }]);
      
      // Show typing indicator
      setIsTyping(true);
      setCrisisLevel(scenario.crisisLevel);
      
      // Add FRANK response
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsTyping(false);
      setDemoMessages(prev => [...prev, {
        role: 'frank',
        message: scenario.frankResponse,
        timestamp: new Date()
      }]);
      
      setDemoStep(i + 1);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }, [demoScenarios]);

  useEffect(() => {
    if (showDemo && demoMessages.length === 0) {
      startDemo();
    }
  }, [showDemo, demoMessages.length, startDemo]);

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
            <motion.button 
              onClick={() => setShowDemo(true)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-2xl text-xl font-bold transition-all duration-300 flex items-center gap-3 mx-auto shadow-2xl shadow-blue-500/30 border border-blue-400/30 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <Play className="w-6 h-6 relative z-10" />
              <span className="relative z-10">See FRANK in Action</span>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-2 h-2 bg-blue-300 rounded-full relative z-10"
              />
            </motion.button>
            
            <motion.a 
              href="/frank-technical-deck.html" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 rounded-2xl text-xl font-bold transition-all duration-300 flex items-center gap-3 mx-auto shadow-2xl shadow-green-500/30 border border-green-400/30 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <Download className="w-6 h-6 relative z-10" />
              <span className="relative z-10">Technical Deck</span>
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                📋
              </motion.div>
            </motion.a>
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
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setShowDemo(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-br from-gray-900 via-blue-900/30 to-purple-900/30 rounded-3xl p-8 max-w-6xl w-full max-h-[90vh] overflow-hidden border border-blue-500/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Demo Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">FRANK Demo</h3>
                    <p className="text-blue-400">Real-time Crisis Detection & Response</p>
                  </div>
                </div>
                
                {/* Crisis Level Indicator */}
                <div className="text-right">
                  <div className="text-sm text-gray-400 mb-1">Crisis Level</div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-3 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${
                          crisisLevel <= 2 ? 'bg-green-500' :
                          crisisLevel <= 5 ? 'bg-yellow-500' :
                          crisisLevel <= 7 ? 'bg-orange-500' :
                          'bg-red-500'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${crisisLevel * 10}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <span className={`text-xl font-bold ${
                      crisisLevel <= 2 ? 'text-green-400' :
                      crisisLevel <= 5 ? 'text-yellow-400' :
                      crisisLevel <= 7 ? 'text-orange-400' :
                      'text-red-400'
                    }`}>
                      {crisisLevel}/10
                    </span>
                  </div>
                </div>
              </div>

              {/* Chat Interface */}
              <div className="bg-black/50 rounded-2xl p-6 h-96 overflow-y-auto mb-6 border border-gray-700">
                <div className="space-y-4">
                  {demoMessages.length === 0 && !isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-12"
                    >
                      <Brain className="w-16 h-16 mx-auto mb-4 text-blue-400 animate-pulse" />
                      <p className="text-xl text-white mb-2">FRANK is ready to help</p>
                      <p className="text-gray-400">Demonstrating crisis intervention capabilities...</p>
                    </motion.div>
                  )}
                  
                  {demoMessages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                        msg.role === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-700 text-white border border-blue-500/30'
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          {msg.role === 'frank' && (
                            <Brain className="w-4 h-4 text-blue-400" />
                          )}
                          <span className="text-xs font-medium opacity-70">
                            {msg.role === 'user' ? 'User' : 'FRANK'}
                          </span>
                        </div>
                        <p className="text-sm">{msg.message}</p>
                        {msg.role === 'frank' && (
                          <div className="text-xs text-blue-400 mt-2 opacity-70">
                            Detected in {demoScenarios[Math.floor(index/2)]?.detectionTime || '0.1s'}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gray-700 text-white border border-blue-500/30 px-4 py-3 rounded-2xl">
                        <div className="flex items-center gap-2 mb-1">
                          <Brain className="w-4 h-4 text-blue-400 animate-pulse" />
                          <span className="text-xs font-medium opacity-70">FRANK</span>
                        </div>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Demo Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-400">
                    Step {demoStep} of {demoScenarios.length}
                  </div>
                  {crisisLevel > 7 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-2 px-3 py-1 bg-red-900/50 rounded-full border border-red-500"
                    >
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      <span className="text-red-400 text-sm font-medium">Emergency Protocol Activated</span>
                    </motion.div>
                  )}
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={() => startDemo()}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors text-white font-medium"
                  >
                    Restart Demo
                  </button>
                  <button
                    onClick={() => setShowDemo(false)}
                    className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors text-white font-medium"
                  >
                    Close Demo
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
