'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Brain, Heart, MessageCircle, BarChart3, Shield, Zap, Activity } from 'lucide-react';
import Link from 'next/link';
import ChatInterface from '@/components/ChatInterface';
import MoodTracker from '@/components/MoodTracker';
import FrankAvatar from '@/components/FrankAvatar';
import NeuralPathwayVisualization from '@/components/NeuralPathwayVisualization';

// Define stats outside component to prevent recreation
const LIVE_STATS = [
  { 
    id: 'response-time',
    label: 'Response Time', 
    value: '0.3s', 
    color: 'from-emerald-400 to-green-500',
    bgGradient: 'from-emerald-500/20 via-green-500/15 to-emerald-400/20',
    borderColor: 'border-emerald-400/60',
    shadowColor: 'shadow-emerald-500/40',
    icon: '⚡',
    description: 'Lightning fast AI responses'
  },
  { 
    id: 'crisis-detection',
    label: 'Crisis Detection', 
    value: '94%', 
    color: 'from-blue-400 to-blue-600',
    bgGradient: 'from-blue-500/20 via-blue-600/15 to-blue-400/20',
    borderColor: 'border-blue-400/60',
    shadowColor: 'shadow-blue-500/40',
    icon: '🛡️',
    description: 'Advanced threat recognition'
  },
  { 
    id: 'uptime',
    label: 'Uptime', 
    value: '99.9%', 
    color: 'from-purple-400 to-purple-600',
    bgGradient: 'from-purple-500/20 via-purple-600/15 to-purple-400/20',
    borderColor: 'border-purple-400/60',
    shadowColor: 'shadow-purple-500/40',
    icon: '🚀',
    description: 'Always available support'
  },
  { 
    id: 'user-satisfaction',
    label: 'User Satisfaction', 
    value: '98%', 
    color: 'from-cyan-400 to-cyan-600',
    bgGradient: 'from-cyan-500/20 via-cyan-600/15 to-cyan-400/20',
    borderColor: 'border-cyan-400/60',
    shadowColor: 'shadow-cyan-500/40',
    icon: '💎',
    description: 'Exceptional user experience'
  }
];

// Define components outside to prevent recreation and flickering
const SHOWCASE_COMPONENTS = [
  {
    id: 'chat',
    name: 'FRANK Chat Interface',
    description: 'Real-time crisis detection and empathetic responses',
    icon: MessageCircle,
    color: 'blue'
  },
  {
    id: 'mood',
    name: 'Mood Tracker',
    description: 'Advanced mood analysis and pattern recognition',
    icon: BarChart3,
    color: 'purple'
  },
  {
    id: 'neural',
    name: 'Neural Pathways',
    description: 'Brain activity visualization and pathway analysis',
    icon: Activity,
    color: 'cyan'
  },
  {
    id: 'avatar',
    name: 'FRANK Avatar',
    description: 'Animated AI companion with emotional intelligence',
    icon: Brain,
    color: 'green'
  }
];

export default function ShowcasePage() {
  const [activeComponent, setActiveComponent] = useState('chat');

  const [screenSize, setScreenSize] = useState('desktop');

  useEffect(() => {
    const checkScreenSize = () => {
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        setScreenSize('mobile');
      } else {
        setScreenSize('desktop');
      }
    };

    checkScreenSize();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkScreenSize);
      return () => window.removeEventListener('resize', checkScreenSize);
    }
  }, []);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'chat':
        return (
          <div className="h-full max-md:fixed max-md:inset-0 max-md:z-50">
            <ChatInterface />
          </div>
        );
      case 'mood':
        return (
          <div className="h-full">
            <MoodTracker />
          </div>
        );
      case 'neural':
        return (
          <div className="h-full">
            <NeuralPathwayVisualization />
          </div>
        );
      case 'avatar':
        return (
          <div className="h-full flex items-center justify-center bg-gradient-to-br from-green-900/20 to-blue-900/20 rounded-2xl">
            <div className="text-center">
              <FrankAvatar mood="neutral"/>
              <h3 className="text-2xl font-bold text-white mt-6 mb-2">Meet FRANK</h3>
              <p style={{ color: '#9ca3af' }}>Your AI Mental Health Companion</p>
              <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
                <div className="bg-black/30 p-4 rounded-xl border border-green-500/30">
                  <Heart className="w-8 h-8 text-red-400 mb-2" />
                  <div className="text-sm text-gray-300">Emotional Intelligence</div>
                </div>
                <div className="bg-black/30 p-4 rounded-xl border border-blue-500/30">
                  <Shield className="w-8 h-8 text-blue-400 mb-2" />
                  <div className="text-sm text-gray-300">Crisis Detection</div>
                </div>
                <div className="bg-black/30 p-4 rounded-xl border border-purple-500/30">
                  <Zap className="w-8 h-8 text-yellow-400 mb-2" />
                  <div className="text-sm text-gray-300">Instant Response</div>
                </div>
                <div className="bg-black/30 p-4 rounded-xl border border-pink-500/30">
                  <Brain className="w-8 h-8 text-pink-400 mb-2" />
                  <div className="text-sm text-gray-300">AI Powered</div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-3/4 left-1/3 w-48 h-48 bg-pink-500/15 rounded-full blur-3xl animate-pulse delay-3000"></div>
        
        {/* Enhanced floating particles */}
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Neural network lines */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      </div>

      {/* Header */}
      <div className="relative bg-gradient-to-r from-blue-900/60 via-purple-900/60 to-cyan-900/60 p-6 border-b border-gray-700/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/"
                className="flex items-center gap-2 group no-underline"
                style={{ color: '#9ca3af', textDecoration: 'none' }}
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform group-hover:text-cyan-400" />
                <span className="group-hover:text-cyan-400 transition-colors">Back to Pitch</span>
              </Link>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
            >
              FRANK Interactive Showcase
            </motion.div>
          </div>
          <motion.div 
            className="text-sm flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ color: '#9ca3af' }}
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Live Demo • Real Components • Interactive Experience
          </motion.div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto p-2 sm:p-6 pt-4 sm:pt-12">
        {/* Mobile Component Selector - Horizontal Bar */}
        {screenSize === 'mobile' && (
          <div className="mb-4">
          <motion.div 
            className="flex justify-between items-center gap-1 bg-gradient-to-r from-blue-900/60 via-purple-900/60 to-cyan-900/60 rounded-xl p-2 border border-gray-700/50 backdrop-blur-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {SHOWCASE_COMPONENTS.map((component) => {
              const Icon = component.icon;
              const isActive = activeComponent === component.id;
              return (
                <motion.button
                  key={component.id}
                  onClick={() => setActiveComponent(component.id)}
                  className={`flex-1 flex flex-col items-center justify-center py-3 px-2 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-br from-blue-500/30 to-purple-500/30 shadow-lg border border-blue-400/30' 
                      : 'hover:bg-white/10'
                  }`}
                  whileTap={{ scale: 0.95 }}
                  aria-label={component.name}
                >
                  <Icon 
                    className={`w-6 h-6 mb-1 ${
                      isActive 
                        ? component.color === 'blue' ? 'text-blue-300' 
                          : component.color === 'purple' ? 'text-purple-300'
                          : component.color === 'cyan' ? 'text-cyan-300'
                          : 'text-green-300'
                        : 'text-gray-400'
                    }`} 
                  />
                  <span className={`text-[10px] font-medium ${
                    isActive ? 'text-white' : 'text-gray-400'
                  }`}>
                    {component.name.split(' ')[0]}
                  </span>
                  {isActive && (
                    <motion.div
                      className="w-1 h-1 bg-white rounded-full mt-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        </div>
        )}

        <div className={`grid gap-2 md:gap-8 h-[calc(100vh-8rem)] sm:h-[calc(100vh-10rem)] md:h-[calc(100vh-12rem)] ${screenSize === 'desktop' ? 'grid-cols-4' : 'grid-cols-1'}`}>
          {/* Component Selector - Desktop Only */}
          {screenSize === 'desktop' && (
          <div className="col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-3xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 flex items-center gap-4">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden"
                  animate={{ 
                    boxShadow: [
                      "0 0 30px rgba(59, 130, 246, 0.6), 0 0 60px rgba(147, 51, 234, 0.4)",
                      "0 0 40px rgba(147, 51, 234, 0.7), 0 0 80px rgba(34, 211, 238, 0.5)", 
                      "0 0 30px rgba(34, 211, 238, 0.6), 0 0 60px rgba(59, 130, 246, 0.4)"
                    ] 
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  whileHover={{ scale: 1.1, rotate: 180 }}
                >
                  {/* Animated gradient overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  <Brain className="w-7 h-7 text-white relative z-10 drop-shadow-lg" />
                </motion.div>
                <span className="font-black tracking-tight">AI Components</span>
              </h2>
              
              <div className="space-y-4">                {SHOWCASE_COMPONENTS.map((component) => {
                  const Icon = component.icon;
                  const isActive = activeComponent === component.id;
                  
                  const colorClasses = {
                    blue: {
                      active: 'from-blue-500/50 via-blue-600/40 to-blue-400/50',
                      hover: 'from-blue-500/30 via-blue-600/20 to-blue-400/30',
                      base: 'from-blue-500/08 via-blue-600/05 to-blue-400/08',
                      border: {
                        active: '#3b82f6',
                        hover: '#3b82f6', 
                        base: 'rgba(59, 130, 246, 0.3)'
                      },
                      shadow: {
                        active: '0 25px 50px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                        hover: '0 20px 45px rgba(59, 130, 246, 0.3), 0 0 30px rgba(59, 130, 246, 0.2)',
                        base: '0 10px 30px rgba(59, 130, 246, 0.1), 0 0 20px rgba(59, 130, 246, 0.05)'
                      },
                      icon: {
                        bg: { active: 'rgba(59, 130, 246, 0.3)', base: 'rgba(15, 23, 42, 0.8)' },
                        border: { active: '#60a5fa', base: 'rgba(71, 85, 105, 0.5)' },
                        color: { active: '#ffffff', base: '#93c5fd' },
                        shadow: { active: '0 12px 30px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)', base: '0 6px 15px rgba(0, 0, 0, 0.3)' },
                        glow: 'drop-shadow(0 0 20px rgba(59,130,246,1))'
                      },
                      activeIndicator: { bg: '#60a5fa', shadow: '0 0 15px #60a5fa' }
                    },
                    purple: {
                      active: 'from-purple-500/50 via-purple-600/40 to-purple-400/50',
                      hover: 'from-purple-500/30 via-purple-600/20 to-purple-400/30',
                      base: 'from-purple-500/08 via-purple-600/05 to-purple-400/08',
                      border: {
                        active: '#8b5cf6',
                        hover: '#8b5cf6',
                        base: 'rgba(139, 92, 246, 0.3)'
                      },
                      shadow: {
                        active: '0 25px 50px rgba(139, 92, 246, 0.4), 0 0 40px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                        hover: '0 20px 45px rgba(139, 92, 246, 0.3), 0 0 30px rgba(139, 92, 246, 0.2)',
                        base: '0 10px 30px rgba(139, 92, 246, 0.1), 0 0 20px rgba(139, 92, 246, 0.05)'
                      },
                      icon: {
                        bg: { active: 'rgba(139, 92, 246, 0.3)', base: 'rgba(15, 23, 42, 0.8)' },
                        border: { active: '#a78bfa', base: 'rgba(71, 85, 105, 0.5)' },
                        color: { active: '#ffffff', base: '#c4b5fd' },
                        shadow: { active: '0 12px 30px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)', base: '0 6px 15px rgba(0, 0, 0, 0.3)' },
                        glow: 'drop-shadow(0 0 20px rgba(139,92,246,1))'
                      },
                      activeIndicator: { bg: '#a78bfa', shadow: '0 0 15px #a78bfa' }
                    },
                    cyan: {
                      active: 'from-cyan-500/50 via-cyan-600/40 to-cyan-400/50',
                      hover: 'from-cyan-500/30 via-cyan-600/20 to-cyan-400/30',
                      base: 'from-cyan-500/08 via-cyan-600/05 to-cyan-400/08',
                      border: {
                        active: '#06b6d4',
                        hover: '#06b6d4',
                        base: 'rgba(6, 182, 212, 0.3)'
                      },
                      shadow: {
                        active: '0 25px 50px rgba(6, 182, 212, 0.4), 0 0 40px rgba(6, 182, 212, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                        hover: '0 20px 45px rgba(6, 182, 212, 0.3), 0 0 30px rgba(6, 182, 212, 0.2)',
                        base: '0 10px 30px rgba(6, 182, 212, 0.1), 0 0 20px rgba(6, 182, 212, 0.05)'
                      },
                      icon: {
                        bg: { active: 'rgba(6, 182, 212, 0.3)', base: 'rgba(15, 23, 42, 0.8)' },
                        border: { active: '#22d3ee', base: 'rgba(71, 85, 105, 0.5)' },
                        color: { active: '#ffffff', base: '#67e8f9' },
                        shadow: { active: '0 12px 30px rgba(6, 182, 212, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)', base: '0 6px 15px rgba(0, 0, 0, 0.3)' },
                        glow: 'drop-shadow(0 0 20px rgba(6,182,212,1))'
                      },
                      activeIndicator: { bg: '#22d3ee', shadow: '0 0 15px #22d3ee' }
                    },
                    green: {
                      active: 'from-green-500/50 via-green-600/40 to-green-400/50',
                      hover: 'from-green-500/30 via-green-600/20 to-green-400/30',
                      base: 'from-green-500/08 via-green-600/05 to-green-400/08',
                      border: {
                        active: '#10b981',
                        hover: '#10b981',
                        base: 'rgba(16, 185, 129, 0.3)'
                      },
                      shadow: {
                        active: '0 25px 50px rgba(16, 185, 129, 0.4), 0 0 40px rgba(16, 185, 129, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                        hover: '0 20px 45px rgba(16, 185, 129, 0.3), 0 0 30px rgba(16, 185, 129, 0.2)',
                        base: '0 10px 30px rgba(16, 185, 129, 0.1), 0 0 20px rgba(16, 185, 129, 0.05)'
                      },
                      icon: {
                        bg: { active: 'rgba(16, 185, 129, 0.3)', base: 'rgba(15, 23, 42, 0.8)' },
                        border: { active: '#34d399', base: 'rgba(71, 85, 105, 0.5)' },
                        color: { active: '#ffffff', base: '#86efac' },
                        shadow: { active: '0 12px 30px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)', base: '0 6px 15px rgba(0, 0, 0, 0.3)' },
                        glow: 'drop-shadow(0 0 20px rgba(16,185,129,1))'
                      },
                      activeIndicator: { bg: '#34d399', shadow: '0 0 15px #34d399' }
                    }
                  };

                  const colors = colorClasses[component.color as keyof typeof colorClasses] || colorClasses.blue;

                  return (
                    <button
                      key={component.id}
                      onClick={() => setActiveComponent(component.id)}
                      className="w-full p-7 rounded-3xl border-2 transition-all duration-700 relative overflow-hidden group backdrop-blur-lg text-white shadow-2xl"
                      style={{
                        background: isActive 
                          ? `linear-gradient(135deg, ${colors.active})` 
                          : `linear-gradient(135deg, ${colors.base})`,
                        borderColor: isActive ? colors.border.active : colors.border.base,
                        boxShadow: isActive ? colors.shadow.active : colors.shadow.base,
                        transform: isActive ? 'translateY(-4px)' : 'translateY(0)',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = `linear-gradient(135deg, ${colors.hover})`;
                          e.currentTarget.style.boxShadow = colors.shadow.hover;
                          e.currentTarget.style.borderColor = colors.border.hover;
                          e.currentTarget.style.transform = 'translateY(-6px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = `linear-gradient(135deg, ${colors.base})`;
                          e.currentTarget.style.boxShadow = colors.shadow.base;
                          e.currentTarget.style.borderColor = colors.border.base;
                          e.currentTarget.style.transform = 'translateY(0)';
                        }
                      }}
                    >
                      {/* Enhanced animated background for active state */}
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-50" />
                      )}
                      
                      <div className="relative flex items-start gap-5">
                        <div
                          className="w-16 h-16 rounded-3xl border-3 flex items-center justify-center backdrop-blur-lg transition-all duration-500 relative overflow-hidden"
                          style={{
                            backgroundColor: isActive ? colors.icon.bg.active : colors.icon.bg.base,
                            borderColor: isActive ? colors.icon.border.active : colors.icon.border.base,
                            color: isActive ? colors.icon.color.active : colors.icon.color.base,
                            boxShadow: isActive ? colors.icon.shadow.active : colors.icon.shadow.base,
                            filter: isActive ? colors.icon.glow : 'none'
                          }}
                        >
                          <Icon className="w-8 h-8 relative z-10 drop-shadow-lg" />
                        </div>
                        
                        <div className="text-left flex-1">
                          <div className="font-black text-2xl mb-3 tracking-tight leading-none">{component.name}</div>
                          <div className="text-base opacity-90 leading-relaxed font-medium" style={{
                            color: isActive 
                              ? '#e2e8f0' 
                              : '#94a3b8'
                          }}>
                            {component.description}
                          </div>
                          
                          {isActive && (
                            <div className="flex items-center gap-3 mt-4 px-3 py-2 rounded-full bg-gradient-to-r from-white/10 to-white/5 border border-white/20 backdrop-blur-sm">
                              <div 
                                className="w-3 h-3 rounded-full shadow-lg relative"
                                style={{
                                  backgroundColor: colors.activeIndicator.bg,
                                  boxShadow: colors.activeIndicator.shadow
                                }}
                              >
                              </div>
                              <span className="text-sm font-black tracking-widest text-white drop-shadow-lg">ACTIVE</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Enhanced Stats */}
            <motion.div 
              className="mt-10 p-8 bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 rounded-3xl border-2 border-slate-700/50 backdrop-blur-xl relative overflow-hidden shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              style={{
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Animated background gradients */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 animate-pulse"></div>
              <motion.div 
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
                animate={{ x: [-100, 100] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              />
              
              <div className="relative">
                <h3 className="font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-6 flex items-center gap-3">
                  <motion.div
                    className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <BarChart3 className="w-5 h-5 text-white drop-shadow" />
                  </motion.div>
                  Live Demo Stats
                </h3>
                <div className="space-y-4">
                  {LIVE_STATS.map((stat, index) => (
                    <motion.div
                      key={stat.id}
                      className={`relative p-5 rounded-3xl bg-gradient-to-br ${stat.bgGradient} border-2 ${stat.borderColor} backdrop-blur-sm overflow-hidden group cursor-pointer`}
                      initial={{ opacity: 0, x: -40, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ delay: 1.1 + index * 0.15, type: "spring", stiffness: 300, damping: 20 }}
                      whileHover={{ 
                        scale: 1.05, 
                        y: -5,
                        transition: { duration: 0.2, type: "spring", stiffness: 400 }
                      }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        boxShadow: `0 10px 30px rgba(0, 0, 0, 0.2), 0 0 20px rgba(${
                          stat.shadowColor.includes('emerald') ? '16, 185, 129' :
                          stat.shadowColor.includes('blue') ? '59, 130, 246' :
                          stat.shadowColor.includes('purple') ? '139, 92, 246' :
                          '6, 182, 212'
                        }, 0.3)`
                      }}
                    >
                      {/* Animated background gradient */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `radial-gradient(circle at 50% 50%, rgba(${
                            stat.bgGradient.includes('emerald') ? '16, 185, 129' :
                            stat.bgGradient.includes('blue') ? '59, 130, 246' :
                            stat.bgGradient.includes('purple') ? '139, 92, 246' :
                            '6, 182, 212'
                          }, 0.3), transparent 70%)`
                        }}
                        animate={{
                          background: [
                            `radial-gradient(circle at 30% 40%, rgba(${
                              stat.color.includes('emerald') ? '16, 185, 129' :
                              stat.color.includes('blue') ? '59, 130, 246' :
                              stat.color.includes('purple') ? '139, 92, 246' :
                              '6, 182, 212'
                            }, 0.3), transparent 70%)`,
                            `radial-gradient(circle at 70% 60%, rgba(${
                              stat.color.includes('emerald') ? '16, 185, 129' :
                              stat.color.includes('blue') ? '59, 130, 246' :
                              stat.color.includes('purple') ? '139, 92, 246' :
                              '6, 182, 212'
                            }, 0.3), transparent 70%)`,
                            `radial-gradient(circle at 30% 40%, rgba(${
                              stat.color.includes('emerald') ? '16, 185, 129' :
                              stat.color.includes('blue') ? '59, 130, 246' :
                              stat.color.includes('purple') ? '139, 92, 246' :
                              '6, 182, 212'
                            }, 0.3), transparent 70%)`
                          ]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                      
                      {/* Sparkling effect */}
                      <motion.div
                        className="absolute top-2 right-2 text-2xl"
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ 
                          rotate: { duration: 6, repeat: Infinity, ease: "linear" },
                          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        }}
                      >
                        ✨
                      </motion.div>
                      
                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <motion.div 
                            className="text-3xl"
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            {stat.icon}
                          </motion.div>
                          <div>
                            <h4 className="font-black text-xl text-white mb-1">{stat.label}</h4>
                            <p className="text-sm text-gray-300 opacity-90">{stat.description}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <motion.div 
                            className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            {stat.value}
                          </motion.div>
                          <motion.div 
                            className="flex items-center gap-1 justify-end mt-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 + index * 0.1 }}
                          >
                            <motion.div 
                              key={`${stat.id}-dot-1`}
                              className={`w-2 h-2 rounded-full bg-gradient-to-r ${stat.color}`}
                              animate={{ 
                                scale: [1, 1.3, 1],
                                opacity: [0.6, 1, 0.6]
                              }}
                              transition={{ 
                                duration: 1.5, 
                                repeat: Infinity,
                                delay: index * 0.2
                              }}
                            />
                            <motion.div 
                              key={`${stat.id}-dot-2`}
                              className={`w-1 h-1 rounded-full bg-gradient-to-r ${stat.color}`}
                              animate={{ 
                                scale: [1, 1.5, 1],
                                opacity: [0.4, 0.8, 0.4]
                              }}
                              transition={{ 
                                duration: 1.8, 
                                repeat: Infinity,
                                delay: index * 0.3 + 0.5
                              }}
                            />
                            <motion.div 
                              key={`${stat.id}-dot-3`}
                              className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${stat.color}`}
                              animate={{ 
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 0.9, 0.5]
                              }}
                              transition={{ 
                                duration: 2.2, 
                                repeat: Infinity,
                                delay: index * 0.4 + 1
                              }}
                            />
                          </motion.div>
                        </div>
                      </div>
                      
                      {/* Progress bar effect */}
                      <motion.div 
                        key={`${stat.id}-progress`}
                        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 1.3 + index * 0.1, duration: 1.5, ease: "easeOut" }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          )}

          {/* Enhanced Component Display */}
          <div className={`${screenSize === 'desktop' ? 'col-span-3' : 'col-span-1'}`}>
            <motion.div
              key={activeComponent}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
              className="h-full bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-xl md:rounded-3xl border border-gray-700/50 overflow-hidden relative backdrop-blur-sm"
            >
              {/* Header for component display - Show for non-chat components */}
              {activeComponent !== 'chat' && (
                <div className="p-3 md:p-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-b border-gray-700/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const component = SHOWCASE_COMPONENTS.find(c => c.id === activeComponent);
                      if (!component) return null;
                      const Icon = component.icon;
                      const colorMap = {
                        blue: 'text-blue-400',
                        purple: 'text-purple-400',
                        cyan: 'text-cyan-400',
                        green: 'text-green-400'
                      };
                      const iconColor = colorMap[component.color as keyof typeof colorMap] || 'text-blue-400';
                      
                      return (
                        <>
                          <div className={`w-6 h-6 md:w-8 md:h-8 rounded-lg bg-current/10 flex items-center justify-center ${iconColor}`}>
                            <Icon className="w-4 h-4 md:w-5 md:h-5" />
                          </div>
                          <div>
                            <h3 className="font-bold text-white text-sm md:text-base">{component.name}</h3>
                            <p className="text-xs md:text-sm text-gray-400">{component.description}</p>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-400 font-medium">LIVE</span>
                  </div>
                </div>
              )}
              
              {/* Component content */}
              <div className={`${activeComponent === 'chat' ? 'h-full' : 'h-[calc(100%-70px)]'}`}>
                {renderComponent()}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 p-6 mt-8">
        <div className="max-w-7xl mx-auto text-center">
          <p style={{ color: '#9ca3af' }} className="mb-4">
            All components are fully functional and connected to live AI systems
          </p>
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400">AI Online</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-blue-400">Crisis Detection Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-purple-400">Real-time Analytics</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
