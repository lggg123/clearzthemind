'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ChatInterface from './ChatInterface';
import MoodTracker from './MoodTracker';
import { LogOut, User, Settings } from 'lucide-react';

interface MainAppProps {
  onSignOut: () => void;
}

export default function MainApp({ onSignOut }: MainAppProps) {
  const [activeTab, setActiveTab] = useState<'chat' | 'mood'>('chat');

  return (
    <div className="main-app">
      {/* App Header */}
      <motion.header 
        className="app-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="header-left">
          <div className="app-logo">
            <span className="logo-icon">🧠</span>
            <span className="logo-text">FRANK</span>
          </div>
          <span className="status-indicator">
            <span className="status-dot"></span>
            Online & Ready
          </span>
        </div>

        <div className="header-center">
          <nav className="app-nav">
            <button
              className={`nav-tab ${activeTab === 'chat' ? 'active' : ''}`}
              onClick={() => setActiveTab('chat')}
            >
              💬 Chat
            </button>
            <button
              className={`nav-tab ${activeTab === 'mood' ? 'active' : ''}`}
              onClick={() => setActiveTab('mood')}
            >
              📊 Mood
            </button>
          </nav>
        </div>

        <div className="header-right">
          <button className="header-btn">
            <Settings className="w-5 h-5" />
          </button>
          <button className="header-btn">
            <User className="w-5 h-5" />
          </button>
          <button className="header-btn sign-out" onClick={onSignOut}>
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="app-main">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="app-content"
        >
          {activeTab === 'chat' ? (
            <div className="chat-view">
              <ChatInterface />
            </div>
          ) : (
            <div className="mood-view">
              <MoodTracker />
            </div>
          )}
        </motion.div>
      </main>

      {/* Crisis Banner */}
      <motion.div 
        className="crisis-banner"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <span className="crisis-text">
          🚨 Crisis? Call 988 • Text HOME to 741741 • Chat with FRANK anytime
        </span>
      </motion.div>
    </div>
  );
}
