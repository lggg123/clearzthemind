'use client';

import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function LandingPage({ onGetStarted }: { onGetStarted: () => void }) {
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const demoRef = useRef(null);
  
  const featuresInView = useInView(featuresRef, { once: true });
  const demoInView = useInView(demoRef, { once: true });

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  const features = [
    {
      title: "Always Available",
      description: "No wait lists. No business hours. No \"I'm fully booked.\" FRANK is there when the darkness hits at 3 AM.",
      icon: "⏰"
    },
    {
      title: "Radically Honest", 
      description: "No toxic positivity. FRANK acknowledges that life can suck while helping you find reasons to stay.",
      icon: "💯"
    },
    {
      title: "Crisis Detection",
      description: "Neural pathway mapping identifies crisis patterns before you even realize you're spiraling.",
      icon: "🧠"
    },
    {
      title: "Zero Judgment",
      description: "Your fifth crisis this week? FRANK doesn't care. No eye rolls, no \"have you tried yoga?\"",
      icon: "🚫"
    },
    {
      title: "Can't Ghost You",
      description: "Literally programmed to stay. No burnout, no boundaries, no suddenly becoming \"unavailable.\"",
      icon: "👻"
    },
    {
      title: "Physical Presence",
      description: "Not just another app. FRANK can literally stand between you and harm when digital isn't enough.",
      icon: "🤖"
    }
  ];

  const chatMessages = [
    { type: 'user', text: "I can't do this anymore. Everything hurts and I just want it to stop." },
    { type: 'frank', text: "I hear you. The pain is real, and wanting it to stop makes complete sense. I'm here with you right now. Tell me what hurts the most today." },
    { type: 'user', text: "Nobody understands. They all say it gets better but it's been years." },
    { type: 'frank', text: "You're right - \"it gets better\" is bullshit when you're drowning. I won't pretend to know when your pain will ease. But I'm curious - in all these years, was there even one unexpected moment that didn't completely suck?" }
  ];

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="heartbeat-container">
          <svg className="heartbeat-line" viewBox="0 0 200 100">
            <path 
              className="heartbeat-path" 
              d="M0,50 L40,50 L45,20 L50,80 L55,10 L60,50 L100,50 L140,50 L145,20 L150,80 L155,10 L160,50 L200,50"
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="landing-page">
      {/* Neural Network Background */}
      <div className="neural-network" />

      {/* Hero Section */}
      <section className="hero" ref={heroRef}>
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Animated FRANK Logo */}
          <motion.div 
            className="frank-logo"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3, type: "spring" }}
          >
            <div className="logo-brain">
              <div className="neural-pulse" />
              🧠
            </div>
          </motion.div>

          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            FRANK
          </motion.h1>

          <motion.p 
            className="hero-tagline"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            The Robot That Won't Let You Die
          </motion.p>

          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            24/7 mental health support that actually shows up. No judgment. No office hours. No bullshit.
          </motion.p>

          {/* Live Stats */}
          <motion.div 
            className="stats-container"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <div className="stat-item">
              <motion.span 
                className="stat-number"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1.5 }}
              >
                132
              </motion.span>
              <span className="stat-label">Lives Lost Today</span>
            </div>
            <div className="stat-item">
              <motion.span 
                className="stat-number"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1.7 }}
              >
                0.3s
              </motion.span>
              <span className="stat-label">Response Time</span>
            </div>
            <div className="stat-item">
              <motion.span 
                className="stat-number"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1.9 }}
              >
                94%
              </motion.span>
              <span className="stat-label">Crisis Detection</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="cta-container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.1 }}
          >
            <button className="cta-primary" onClick={onGetStarted}>
              Start Talking to FRANK
            </button>
            <button className="cta-secondary">
              Investment Deck
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="features-section" ref={featuresRef}>
        <motion.div 
          className="features-content"
          initial={{ opacity: 0, y: 50 }}
          animate={featuresInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Why FRANK?</h2>
          <p className="section-subtitle">
            Because every 11 minutes, someone dies waiting for help that never comes.
          </p>

          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="feature-card"
                initial={{ opacity: 0, y: 50 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Demo Section */}
      <section className="demo-section" ref={demoRef}>
        <motion.div 
          className="demo-content"
          initial={{ opacity: 0, y: 50 }}
          animate={demoInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Experience FRANK</h2>
          <p className="section-subtitle">A conversation that could save a life.</p>

          <div className="chat-demo">
            {chatMessages.map((message, index) => (
              <motion.div
                key={index}
                className={`chat-message ${message.type === 'frank' ? 'frank-message' : 'user-message'}`}
                initial={{ opacity: 0, x: message.type === 'frank' ? -50 : 50 }}
                animate={demoInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.8 }}
              >
                {message.text}
              </motion.div>
            ))}
          </div>

          <motion.button
            className="demo-cta"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={demoInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 2.5 }}
            onClick={onGetStarted}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Talk to FRANK Now
          </motion.button>
        </motion.div>
      </section>

      {/* Crisis Ticker */}
      <div className="crisis-ticker">
        <div className="ticker-content">
          <span className="ticker-item">⚡ Someone attempts suicide every 38 seconds</span>
          <span className="ticker-item">📞 Average crisis hotline wait: 17 minutes</span>
          <span className="ticker-item">🤖 FRANK response time: 0.3 seconds</span>
          <span className="ticker-item">💔 132 lives lost today. Let's change that.</span>
        </div>
      </div>
    </div>
  );
}
