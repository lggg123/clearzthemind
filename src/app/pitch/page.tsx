'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, Star, TrendingUp, Brain, Heart, Users, DollarSign, Zap } from 'lucide-react';
import './pitch-styles.css';
import NavigationBar from '@/components/NavBar';

export default function PitchPage() {
  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-30"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <NavigationBar />

      {/* Hero Section - Enhanced */}
      <section className="pt-32 pb-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="inline-block p-4 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 mb-6">
              <Brain className="w-16 h-16 text-cyan-400" />
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-7xl md:text-8xl font-black mb-8 leading-tight"
          >
            <span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
              FRANK
            </span>
            <br />
            <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              The Future of Mental Healthcare
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-5xl mx-auto leading-relaxed"
          >
            Revolutionary <span className="text-cyan-400 font-semibold">AI-powered</span> mental health companion that{' '}
            <span className="text-pink-400 font-semibold">saves lives</span> through real-time crisis detection and personalized intervention.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center"
          >
            <Link
              href="/showcase"
              className="group relative bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600 hover:from-cyan-400 hover:via-blue-400 hover:to-cyan-500 text-white no-underline px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 shadow-2xl hover:shadow-cyan-500/60 hover:scale-110 overflow-hidden transform-gpu border-2 border-cyan-400/50 hover:border-cyan-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-cyan-400/20 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center gap-3">
                <Sparkles className="w-7 h-7 animate-pulse text-cyan-200 group-hover:text-white transition-colors" />
                <span 
                  className="font-black tracking-wide"
                  style={{ 
                    // Solid white fallback with enhanced visibility
                    color: '#ffffff !important',
                    // Multiple text shadows for better contrast
                    textShadow: `
                      0 0 10px rgba(34, 211, 238, 1),
                      0 0 20px rgba(34, 211, 238, 0.8),
                      0 0 30px rgba(34, 211, 238, 0.6),
                      0 2px 4px rgba(0, 0, 0, 0.9),
                      0 4px 8px rgba(0, 0, 0, 0.8),
                      2px 2px 4px rgba(0, 0, 0, 0.9)
                    `,
                    // Additional filters for glow effect
                    filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.8)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.9))',
                    // Ensure text is always visible
                    WebkitTextStroke: '0.5px rgba(34, 211, 238, 0.3)',
                    fontWeight: '900'
                  }}
                >
                  Experience FRANK Live
                </span>
              </span>
            </Link>
            <Link
              href="/financials"
              className="group relative bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 hover:from-pink-400 hover:via-purple-400 hover:to-pink-500 text-white no-underline px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 shadow-2xl hover:shadow-pink-500/60 hover:scale-110 overflow-hidden transform-gpu"
              style={{ color: 'white' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 via-purple-400/20 to-pink-400/20 animate-pulse"></div>
              <span className="relative z-10 flex items-center gap-3">
                <Star className="w-7 h-7 animate-pulse" style={{ 
                  color: '#ffffff !important',
                  filter: 'drop-shadow(0 0 8px rgba(236, 72, 153, 0.8)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.9))'
                }} />
                <span 
                  className="font-black tracking-wide"
                  style={{ 
                    color: '#ffffff !important',
                    textShadow: `
                      0 0 10px rgba(236, 72, 153, 1),
                      0 0 20px rgba(236, 72, 153, 0.8),
                      0 0 30px rgba(236, 72, 153, 0.6),
                      0 2px 4px rgba(0, 0, 0, 0.9),
                      0 4px 8px rgba(0, 0, 0, 0.8),
                      2px 2px 4px rgba(0, 0, 0, 0.9)
                    `,
                    filter: 'drop-shadow(0 0 8px rgba(236, 72, 153, 0.8)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.9))',
                    WebkitTextStroke: '0.5px rgba(236, 72, 153, 0.3)',
                    fontWeight: '900'
                  }}
                >
                  Investment Opportunity
                </span>
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Problem Section - Enhanced */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-black text-center mb-16"
          >
            The Mental Health Crisis is{' '}
            <span 
              className="drop-shadow-lg"
              style={{ 
                color: '#f87171 !important',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
              }}
            >
              URGENT
            </span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative bg-gradient-to-br from-red-900/30 to-red-800/20 backdrop-blur border border-red-500/30 p-10 rounded-3xl shadow-2xl hover:shadow-red-500/30 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg mx-auto">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-black text-red-400 mb-6">1 Death Every 11 Minutes</h3>
                <p className="text-gray-300 text-lg leading-relaxed">Suicide rates have increased 50% among teens in the last decade. The current system is failing our most vulnerable.</p>
              </div>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative bg-gradient-to-br from-orange-900/30 to-orange-800/20 backdrop-blur border border-orange-500/30 p-10 rounded-3xl shadow-2xl hover:shadow-orange-500/30 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg mx-auto">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-black text-orange-400 mb-6">970M People Affected</h3>
                <p className="text-gray-300 text-lg leading-relaxed">Nearly 1 billion people worldwide suffer from mental health issues, with limited access to effective treatment.</p>
              </div>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 backdrop-blur border border-yellow-500/30 p-10 rounded-3xl shadow-2xl hover:shadow-yellow-500/30 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg mx-auto">
                  <DollarSign className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-black text-yellow-400 mb-6">$4.2T Economic Impact</h3>
                <p className="text-gray-300 text-lg leading-relaxed">Mental health issues cost the global economy trillions in lost productivity and healthcare expenses annually.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Solution Section - Enhanced */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/20 to-black"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-black text-center mb-16"
          >
            FRANK:{' '}
            <span 
              className="drop-shadow-lg"
              style={{ 
                background: 'linear-gradient(to right, #22d3ee, #3b82f6, #c084fc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 20px rgba(34, 211, 238, 0.5)'
              }}
            >
              The Solution
            </span>
          </motion.h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center justify-items-center lg:justify-items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 text-center lg:text-left"
            >
              <h3 
                className="text-4xl font-bold mb-8 text-center"
                style={{ 
                  background: 'linear-gradient(to right, #22d3ee, #3b82f6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 0 15px rgba(34, 211, 238, 0.4)'
                }}
              >
                AI-Powered Crisis Detection
              </h3>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-6"
              >
                {[
                  { icon: Zap, text: "Real-time emotional analysis through voice, text, and behavioral patterns", color: "cyan" },
                  { icon: Brain, text: "Neural pathway mapping for personalized intervention strategies", color: "purple" },
                  { icon: Heart, text: "24/7 availability with instant crisis response protocols", color: "pink" },
                  { icon: TrendingUp, text: "Predictive analytics to prevent crises before they occur", color: "green" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 10, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="flex items-start gap-4 group justify-center lg:justify-start"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-gray-300 text-xl leading-relaxed group-hover:text-white transition-colors text-left max-w-md">
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 backdrop-blur-xl p-12 rounded-3xl border border-cyan-500/30 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-3xl"></div>
                <div className="relative z-10 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-2xl">
                    <Brain className="w-14 h-14 text-white" />
                  </div>
                  <h4 className="text-3xl font-bold text-cyan-400 mb-6">
                    Friendly Robotic Anti-Nihilism Kompanion
                  </h4>
                  <p className="text-gray-300 text-xl leading-relaxed">
                    FRANK combines cutting-edge AI with empathetic design to provide 
                    immediate, personalized mental health support when it&apos;s needed most.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Market Opportunity - Enhanced */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-black mb-16"
          >
            Massive{' '}
            <span 
              className="drop-shadow-lg"
              style={{ 
                background: 'linear-gradient(to right, #c084fc, #f472b6, #c084fc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 20px rgba(192, 132, 252, 0.5)'
              }}
            >
              Market Opportunity
            </span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { value: "$240B", label: "Mental Health Market", desc: "Growing 25% annually with increasing demand", color: "purple" },
              { value: "$50B", label: "Digital Health TAM", desc: "Total addressable market for AI solutions", color: "pink" },
              { value: "$10M", label: "Series A Funding", desc: "Investment needed to save millions of lives", color: "cyan" }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`group relative bg-gradient-to-br from-${item.color}-900/30 to-${item.color}-800/20 backdrop-blur border border-${item.color}-500/30 p-12 rounded-3xl shadow-2xl hover:shadow-${item.color}-500/30 transition-all duration-500`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-${item.color}-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <div className={`text-6xl md:text-7xl font-black text-${item.color}-400 mb-6 group-hover:scale-110 transition-transform`}>
                    {item.value}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.label}</h3>
                  <p className="text-gray-300 text-lg">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action - Enhanced */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/30 to-black"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-black mb-8"
          >
            Ready to{' '}
            <span 
              className="drop-shadow-lg"
              style={{ 
                background: 'linear-gradient(to right, #22d3ee, #3b82f6, #22d3ee)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 20px rgba(34, 211, 238, 0.5)'
              }}
            >
              Save Lives
            </span>
            ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl text-gray-300 mb-12 leading-relaxed"
          >
            Join us in revolutionizing mental healthcare and preventing the next crisis.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col lg:flex-row gap-8 justify-center items-center max-w-6xl mx-auto"
          >
            <Link
              href="/showcase"
              className="group relative bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 hover:from-emerald-400 hover:via-cyan-400 hover:to-blue-400 text-white no-underline px-14 py-7 rounded-3xl font-black text-xl transition-all duration-300 shadow-2xl hover:shadow-emerald-500/60 hover:scale-110 overflow-hidden transform-gpu min-w-[280px] text-center"
              style={{ color: 'white' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 via-cyan-400/30 to-blue-400/30 animate-pulse"></div>
              <span className="relative z-10 flex items-center justify-center gap-4">
                <Sparkles className="w-8 h-8 animate-pulse" style={{ 
                  color: '#ffffff !important',
                  filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.8)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.9))'
                }} />
                <span 
                  style={{ 
                    color: '#ffffff !important',
                    textShadow: `
                      0 0 10px rgba(16, 185, 129, 1),
                      0 0 20px rgba(16, 185, 129, 0.8),
                      0 0 30px rgba(16, 185, 129, 0.6),
                      0 2px 4px rgba(0, 0, 0, 0.9),
                      0 4px 8px rgba(0, 0, 0, 0.8),
                      2px 2px 4px rgba(0, 0, 0, 0.9)
                    `,
                    filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.8)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.9))',
                    WebkitTextStroke: '0.5px rgba(16, 185, 129, 0.3)',
                    fontWeight: '900',
                    letterSpacing: '0.05em'
                  }}
                >
                  Experience FRANK
                </span>
              </span>
            </Link>
            
            <a
              href="mailto:invest@frank-robotics.com"
              className="group relative bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 hover:from-purple-400 hover:via-pink-400 hover:to-rose-400 text-white no-underline px-14 py-7 rounded-3xl font-black text-xl transition-all duration-300 shadow-2xl hover:shadow-purple-500/60 hover:scale-110 overflow-hidden transform-gpu min-w-[280px] text-center"
              style={{ color: 'white' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 via-pink-400/30 to-rose-400/30 animate-pulse"></div>
              <span className="relative z-10 flex items-center justify-center gap-4">
                <Star className="w-8 h-8 animate-pulse" style={{ 
                  color: '#ffffff !important',
                  filter: 'drop-shadow(0 0 8px rgba(236, 72, 153, 0.8)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.9))'
                }} />
                <span 
                  style={{ 
                    color: '#ffffff !important',
                    textShadow: `
                      0 0 10px rgba(236, 72, 153, 1),
                      0 0 20px rgba(236, 72, 153, 0.8),
                      0 0 30px rgba(236, 72, 153, 0.6),
                      0 2px 4px rgba(0, 0, 0, 0.9),
                      0 4px 8px rgba(0, 0, 0, 0.8),
                      2px 2px 4px rgba(0, 0, 0, 0.9)
                    `,
                    filter: 'drop-shadow(0 0 8px rgba(236, 72, 153, 0.8)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.9))',
                    WebkitTextStroke: '0.5px rgba(236, 72, 153, 0.3)',
                    fontWeight: '900',
                    letterSpacing: '0.05em'
                  }}
                >
                  Invest Now
                </span>
              </span>
            </a>
            
            <Link
              href="/financials"
              className="group relative bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-400 hover:via-orange-400 hover:to-red-400 text-white no-underline px-14 py-7 rounded-3xl font-black text-xl transition-all duration-300 shadow-2xl hover:shadow-amber-500/60 hover:scale-110 overflow-hidden transform-gpu min-w-[280px] text-center"
              style={{ color: 'white' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 via-orange-400/30 to-red-400/30 animate-pulse"></div>
              <span className="relative z-10 flex items-center justify-center gap-4">
                <TrendingUp className="w-8 h-8 animate-pulse" style={{ 
                  color: '#ffffff !important',
                  filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.8)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.9))'
                }} />
                <span 
                  style={{ 
                    color: '#ffffff !important',
                    textShadow: `
                      0 0 10px rgba(245, 158, 11, 1),
                      0 0 20px rgba(245, 158, 11, 0.8),
                      0 0 30px rgba(245, 158, 11, 0.6),
                      0 2px 4px rgba(0, 0, 0, 0.9),
                      0 4px 8px rgba(0, 0, 0, 0.8),
                      2px 2px 4px rgba(0, 0, 0, 0.9)
                    `,
                    filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.8)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.9))',
                    WebkitTextStroke: '0.5px rgba(245, 158, 11, 0.3)',
                    fontWeight: '900',
                    letterSpacing: '0.05em'
                  }}
                >
                  View Financials
                </span>
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
      </div>
  );
}
