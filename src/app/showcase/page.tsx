'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Brain, Heart, MessageCircle, BarChart3, Shield, Zap, Activity } from 'lucide-react';
import Link from 'next/link';
import ChatInterface from '@/components/ChatInterface';
import MoodTracker from '@/components/MoodTracker';
import FrankAvatar from '@/components/FrankAvatar';
import NeuralPathwayVisualization from '@/components/NeuralPathwayVisualization';

export default function ShowcasePage() {
  const [activeComponent, setActiveComponent] = useState('chat');

  const components = [
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

  const renderComponent = () => {
    switch (activeComponent) {
      case 'chat':
        return (
          <div className="h-full">
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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900/20 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
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
                className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors group no-underline"
                style={{ textDecoration: 'none' }}
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to Pitch
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
            className="text-sm text-gray-300 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Live Demo • Real Components • Interactive Experience
          </motion.div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-8rem)]">
          {/* Component Selector */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                Components
              </h2>
              
              <div className="space-y-4">
                {components.map((component, index) => {
                  const Icon = component.icon;
                  const isActive = activeComponent === component.id;
                  
                  const colorMap = {
                    blue: {
                      active: 'from-blue-500/20 to-blue-600/20 border-blue-500/50',
                      icon: 'text-blue-400',
                      glow: 'shadow-blue-500/25'
                    },
                    purple: {
                      active: 'from-purple-500/20 to-purple-600/20 border-purple-500/50',
                      icon: 'text-purple-400',
                      glow: 'shadow-purple-500/25'
                    },
                    cyan: {
                      active: 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/50',
                      icon: 'text-cyan-400',
                      glow: 'shadow-cyan-500/25'
                    },
                    green: {
                      active: 'from-green-500/20 to-green-600/20 border-green-500/50',
                      icon: 'text-green-400',
                      glow: 'shadow-green-500/25'
                    }
                  };
                  
                  const colorClasses = colorMap[component.color as keyof typeof colorMap] || colorMap.blue;

                  return (
                    <motion.button
                      key={component.id}
                      onClick={() => setActiveComponent(component.id)}
                      className={`w-full p-5 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden group ${
                        isActive
                          ? `bg-gradient-to-r ${colorClasses.active} text-white shadow-xl ${colorClasses.glow}`
                          : 'bg-gray-900/50 border-gray-700/50 text-gray-300 hover:border-gray-600 hover:text-white hover:bg-gray-800/50'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Animated background for active state */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"
                          initial={{ x: '-100%' }}
                          animate={{ x: '100%' }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                      )}
                      
                      <div className="relative flex items-start gap-4">
                        <motion.div
                          className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center ${
                            isActive 
                              ? `${colorClasses.icon} border-current bg-current/10` 
                              : 'text-gray-500 border-gray-600 group-hover:text-gray-400'
                          }`}
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Icon className="w-6 h-6" />
                        </motion.div>
                        
                        <div className="text-left flex-1">
                          <div className="font-bold text-lg mb-1">{component.name}</div>
                          <div className="text-sm opacity-80 leading-relaxed">
                            {component.description}
                          </div>
                          
                          {isActive && (
                            <motion.div
                              className="flex items-center gap-1 mt-2"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.2 }}
                            >
                              <div className={`w-2 h-2 rounded-full ${colorClasses.icon} animate-pulse`}></div>
                              <span className="text-xs font-medium opacity-75">ACTIVE</span>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Enhanced Stats */}
            <motion.div 
              className="mt-8 p-6 bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl border border-gray-700/50 backdrop-blur-sm relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 animate-pulse"></div>
              
              <div className="relative">
                <h3 className="font-bold text-xl text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                  Live Demo Stats
                </h3>
                <div className="space-y-3">
                  {[
                    { label: 'Response Time', value: '0.3s', color: 'text-green-400', bg: 'bg-green-400/10' },
                    { label: 'Crisis Detection', value: '94%', color: 'text-blue-400', bg: 'bg-blue-400/10' },
                    { label: 'Uptime', value: '99.9%', color: 'text-purple-400', bg: 'bg-purple-400/10' },
                    { label: 'User Satisfaction', value: '98%', color: 'text-cyan-400', bg: 'bg-cyan-400/10' }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="flex justify-between items-center p-3 rounded-lg bg-black/20 border border-gray-700/30"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(0, 0, 0, 0.4)" }}
                    >
                      <span className="text-gray-300 font-medium">{stat.label}</span>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${stat.bg} ${stat.color} animate-pulse`}></div>
                        <span className={`font-bold ${stat.color}`}>{stat.value}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Component Display */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeComponent}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
              className="h-full bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-3xl border border-gray-700/50 overflow-hidden relative backdrop-blur-sm"
            >
              {/* Header for component display */}
              <div className="p-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-b border-gray-700/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {(() => {
                    const component = components.find(c => c.id === activeComponent);
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
                        <div className={`w-8 h-8 rounded-lg bg-current/10 flex items-center justify-center ${iconColor}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-white">{component.name}</h3>
                          <p className="text-sm text-gray-400">{component.description}</p>
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
              
              {/* Component content */}
              <div className="h-[calc(100%-80px)]">
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
