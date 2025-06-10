'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Play, Download, Heart, AlertTriangle, Brain, Zap } from 'lucide-react';

export default function InvestmentPitch() {
  const [showDemo, setShowDemo] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const { scrollYProgress } = useScroll();
  
  // Heart monitor animation
  const [isFlatlining, setIsFlatlining] = useState(false);
  const [heartRate, setHeartRate] = useState(72);

  // Demo state
  const [demoStep, setDemoStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [demoMessages, setDemoMessages] = useState<Array<{role: 'user' | 'frank', text: string, timestamp: number}>>([]);

  const demoScenario = [
    { role: 'user' as const, text: "I'm having a really tough day..." },
    { role: 'frank' as const, text: "I hear you. I'm here to listen. What's making today particularly difficult?" },
    { role: 'user' as const, text: "I feel like nothing matters anymore" },
    { role: 'frank' as const, text: "That sounds incredibly painful. When you say nothing matters, can you tell me more about what's going through your mind right now?" },
    { role: 'user' as const, text: "Sometimes I think everyone would be better off without me" },
    { role: 'frank' as const, text: "🚨 CRISIS DETECTED - I'm very concerned about you. You matter deeply, and I want you to know you're not alone. Can we talk about what's brought you to this point?" }
  ];

  const startDemo = async () => {
    setDemoMessages([]);
    setDemoStep(0);
    
    for (let i = 0; i < demoScenario.length; i++) {
      const message = demoScenario[i];
      
      // Add delay before each message
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (message.role === 'frank') {
        setIsTyping(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsTyping(false);
      }
      
      setDemoMessages(prev => [...prev, { ...message, timestamp: Date.now() }]);
      setDemoStep(i + 1);
    }
  };

  useEffect(() => {
    if (showDemo && demoMessages.length === 0) {
      startDemo();
    }
  }, [showDemo]);

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
  }, [sections.length]);

  return (
    <div className="bg-black text-white overflow-hidden">
      {/* Debug indicator */}
      <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-3 py-1 rounded text-sm">
        Demo: {showDemo ? 'OPEN' : 'CLOSED'}
      </div>
      
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
              onClick={() => {
                console.log('Button clicked!');
                setShowDemo(true);
                console.log('showDemo state:', showDemo);
              }}
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
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setShowDemo(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-br from-gray-900 via-blue-900/30 to-purple-900/30 rounded-3xl p-8 max-w-5xl w-full max-h-[90vh] overflow-hidden border border-blue-500/30"
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
                
                <button
                  onClick={() => setShowDemo(false)}
                  className="text-gray-400 hover:text-white transition-colors text-2xl"
                >
                  ✕
                </button>
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
                        <p className="text-sm">{msg.text}</p>
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
                    Interactive Crisis Detection Demo
                  </div>
                  {demoMessages.some(msg => msg.text.includes('🚨')) && (
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
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
