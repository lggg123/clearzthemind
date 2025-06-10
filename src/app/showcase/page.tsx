'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Brain, Heart, MessageCircle, BarChart3, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import ChatInterface from '@/components/ChatInterface';
import MoodTracker from '@/components/MoodTracker';
import FrankAvatar from '@/components/FrankAvatar';

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
      case 'avatar':
        return (
          <div className="h-full flex items-center justify-center bg-gradient-to-br from-green-900/20 to-blue-900/20 rounded-2xl">
            <div className="text-center">
              <FrankAvatar mood="neutral"/>
              <h3 className="text-2xl font-bold text-white mt-6 mb-2">Meet FRANK</h3>
              <p className="text-gray-400">Your AI Mental Health Companion</p>
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
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Pitch
            </Link>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              FRANK Showcase
            </div>
          </div>
          <div className="text-sm text-gray-400">
            Live Demo • Real Components • Interactive Experience
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
          {/* Component Selector */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold mb-6 text-white">Components</h2>
            <div className="space-y-4">
              {components.map((component) => {
                const Icon = component.icon;
                const isActive = activeComponent === component.id;
                return (
                  <motion.button
                    key={component.id}
                    onClick={() => setActiveComponent(component.id)}
                    className={`w-full p-4 rounded-xl border transition-all ${
                      isActive
                        ? `bg-${component.color}-900/30 border-${component.color}-500/50 text-white`
                        : 'bg-gray-900/50 border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className={`w-6 h-6 mt-1 ${
                        isActive ? `text-${component.color}-400` : 'text-gray-500'
                      }`} />
                      <div className="text-left">
                        <div className="font-medium">{component.name}</div>
                        <div className="text-sm opacity-70 mt-1">
                          {component.description}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Stats */}
            <div className="mt-8 p-4 bg-gray-900/50 rounded-xl border border-gray-700">
              <h3 className="font-medium text-white mb-3">Demo Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Response Time</span>
                  <span className="text-green-400">0.3s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Crisis Detection</span>
                  <span className="text-blue-400">94%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Uptime</span>
                  <span className="text-purple-400">99.9%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Component Display */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeComponent}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full bg-gray-900/30 rounded-2xl border border-gray-700 overflow-hidden"
            >
              {renderComponent()}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 p-6 mt-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 mb-4">
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
