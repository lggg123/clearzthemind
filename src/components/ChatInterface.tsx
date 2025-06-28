'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, AlertTriangle, Activity, Brain, Zap, MessageSquare } from 'lucide-react';
import FrankAvatar from './FrankAvatar';
import { Message } from '@/types';

type EmotionalState = 'neutral' | 'stressed' | 'sad' | 'angry' | 'fearful' | 'crisis';
type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
type FrankMood = 'neutral' | 'concerned' | 'supportive';

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [crisisDetected, setCrisisDetected] = useState(false);
  const [neuralActivity, setNeuralActivity] = useState<{
    pathwayActive: string | null;
    emotionalState: EmotionalState;
    riskLevel: RiskLevel;
    activeNodes: string[];
  }>({
    pathwayActive: null,
    emotionalState: 'neutral',
    riskLevel: 'low',
    activeNodes: []
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Map emotional states to Frank's mood
  const mapEmotionalStateToMood = (state: EmotionalState): FrankMood => {
    switch (state) {
      case 'crisis':
      case 'stressed':
      case 'sad':
      case 'angry':
      case 'fearful':
        return 'concerned';
      case 'neutral':
      default:
        return 'neutral';
    }
  };

  const analyzeNeuralPathways = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    // Detect emotional patterns and neural pathways
    let pathwayActive = null;
    let emotionalState: EmotionalState = 'neutral';
    let riskLevel: RiskLevel = 'low';
    let activeNodes: string[] = [];

    // Crisis indicators
    const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'worthless', 'hopeless', 'nobody cares'];
    const stressKeywords = ['stressed', 'overwhelmed', 'anxious', 'pressure', 'can\'t handle'];
    const sadnessKeywords = ['sad', 'depressed', 'lonely', 'empty', 'hurt'];
    const angerKeywords = ['angry', 'furious', 'hate', 'frustrated', 'mad'];
    const fearKeywords = ['scared', 'afraid', 'terrified', 'worried', 'panic'];

    if (crisisKeywords.some(keyword => lowerMessage.includes(keyword))) {
      pathwayActive = 'crisis-pathway';
      emotionalState = 'crisis';
      riskLevel = 'critical';
      activeNodes = ['hopelessness', 'self-harm ideation', 'isolation'];
    } else if (stressKeywords.some(keyword => lowerMessage.includes(keyword))) {
      pathwayActive = 'stress-anxiety';
      emotionalState = 'stressed';
      riskLevel = 'medium';
      activeNodes = ['stress', 'anxiety', 'overthinking'];
    } else if (sadnessKeywords.some(keyword => lowerMessage.includes(keyword))) {
      pathwayActive = 'sadness-pathway';
      emotionalState = 'sad';
      riskLevel = 'medium';
      activeNodes = ['sadness', 'loneliness', 'withdrawal'];
    } else if (angerKeywords.some(keyword => lowerMessage.includes(keyword))) {
      pathwayActive = 'anger-pathway';
      emotionalState = 'angry';
      riskLevel = 'medium';
      activeNodes = ['anger', 'frustration', 'aggression'];
    } else if (fearKeywords.some(keyword => lowerMessage.includes(keyword))) {
      pathwayActive = 'fear-pathway';
      emotionalState = 'fearful';
      riskLevel = 'medium';
      activeNodes = ['fear', 'anxiety', 'avoidance'];
    }

    setNeuralActivity({
      pathwayActive,
      emotionalState,
      riskLevel,
      activeNodes
    });

    // Reset neural activity after 5 seconds
    setTimeout(() => {
      setNeuralActivity({
        pathwayActive: null,
        emotionalState: 'neutral',
        riskLevel: 'low',
        activeNodes: []
      });
    }, 5000);
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setIsLoading(true);

    // Simulate neural pathway analysis based on message content
    analyzeNeuralPathways(userMessage);

    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      user_id: 'current-user',
      role: 'user',
      content: userMessage,
      crisis_indicators: [],
      sentiment_score: 0,
      created_at: new Date().toISOString()
    }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, messages }),
      });

      const data = await response.json();
      
      if (data.crisisDetected) {
        setCrisisDetected(true);
      }

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        user_id: 'frank',
        role: 'assistant',
        content: data.response,
        crisis_indicators: data.indicators || [],
        sentiment_score: data.sentiment || 0,
        created_at: new Date().toISOString()
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };  return (
    <>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
        }
      `}</style>
      
      <div className={`
        flex h-screen sm:h-[500px] md:h-[600px] lg:h-[650px] w-full glass-morphism rounded-none sm:rounded-2xl p-2 sm:p-4 md:p-6 relative overflow-hidden
        max-sm:fixed max-sm:inset-0 max-sm:z-50 max-sm:bg-black/95 max-sm:backdrop-blur-xl
      `}>
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>
          {neuralActivity.pathwayActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10"
            />
          )}
          {/* Floating particles */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full hidden md:block"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Main Chat Column */}
        <div className="flex flex-col flex-1 relative max-sm:h-full">
          {/* Header */}
          <motion.div 
            className={`
              flex items-center justify-between mb-3 sm:mb-4 md:mb-6 p-2 sm:p-3 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20
              max-sm:sticky max-sm:top-0 max-sm:z-10 max-sm:bg-black/90 max-sm:border-white/10
            `}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
          <div className="flex items-center gap-3 md:gap-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FrankAvatar 
                isListening={isLoading} 
                mood={crisisDetected ? 'concerned' : mapEmotionalStateToMood(neuralActivity.emotionalState)}
                className="w-12 h-12 md:w-14 md:h-14"
              />
            </motion.div>
            <div>
              <motion.h2 
                className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                FRANK
              </motion.h2>
              <motion.p 
                className="text-sm md:text-base text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Your AI therapist • {isLoading ? 'Thinking...' : 'Here for you 24/7'}
              </motion.p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Neural Activity Indicator */}
            <AnimatePresence>
              {neuralActivity.pathwayActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 20 }}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg px-3 py-2 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                      scale: { duration: 1, repeat: Infinity }
                    }}
                  >
                    <Activity className="w-4 h-4 text-blue-400" />
                  </motion.div>
                  <div className="text-xs">
                    <div className="text-blue-400 font-medium">Neural Activity</div>
                    <div className="text-gray-400 capitalize">{neuralActivity.emotionalState}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <AnimatePresence>
              {crisisDetected && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2 text-destructive bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ 
                      duration: 0.5, 
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <AlertTriangle className="w-4 h-4 md:w-5 md:h-5" />
                  </motion.div>
                  <span className="text-xs md:text-sm font-medium hidden sm:inline">Crisis Support Active</span>
                  <span className="text-xs md:text-sm font-medium sm:hidden">Crisis</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-2 sm:space-y-3 md:space-y-4 mb-3 md:mb-4 px-1 custom-scrollbar max-sm:pb-32">
          <AnimatePresence mode="popLayout">
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center"
                >
                  <Brain className="w-8 h-8 text-blue-400" />
                </motion.div>
                <p className="text-muted-foreground text-lg mb-2">Hi there! I&apos;m FRANK.</p>
                <p className="text-sm text-muted-foreground/70 max-w-md mx-auto">
                  I&apos;m here to listen without judgment. Share what&apos;s on your mind, and let&apos;s work through it together.
                </p>
                <div className="flex flex-wrap gap-2 justify-center mt-6">
                  {[
                    "I&apos;m feeling overwhelmed...",
                    "I need someone to talk to",
                    "Help me understand my emotions"
                  ].map((suggestion) => (
                    <motion.button
                      key={suggestion}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setInput(suggestion)}
                      className="text-xs px-3 py-2 rounded-full bg-white/50 border border-white/20 text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
            
            {messages.map((message) => (
              <motion.div
                key={message.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`max-w-[90%] sm:max-w-[85%] md:max-w-[70%] p-2 sm:p-3 md:p-4 rounded-2xl relative text-sm sm:text-base ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white ml-auto shadow-lg shadow-blue-500/20'
                      : 'bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="absolute -left-3 top-3 w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                      <Brain className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <p className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">{message.content}</p>
                  {message.crisis_indicators.length > 0 && (
                    <motion.div 
                      className="mt-2 text-xs opacity-70 flex items-center gap-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.7 }}
                      transition={{ delay: 0.3 }}
                    >
                      <AlertTriangle className="w-3 h-3" />
                      Crisis indicators detected
                    </motion.div>
                  )}
                  <div className="text-xs opacity-50 mt-1">
                    {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex justify-start"
              >
                <div className="bg-white/70 backdrop-blur-sm border border-white/20 p-3 md:p-4 rounded-2xl relative shadow-lg">
                  <div className="absolute -left-3 top-3 w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Brain className="w-3 h-3 text-white" />
                    </motion.div>
                  </div>
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-2 h-2 bg-blue-500 rounded-full"
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.4, 1, 0.4]
                        }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Enhanced Input Area */}
        <motion.div 
          className="p-2 sm:p-4 md:p-6 lg:p-8 rounded-t-2xl sm:rounded-2xl bg-gradient-to-r from-white/60 via-white/50 to-white/60 backdrop-blur-md border border-white/30 shadow-xl max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:z-20 max-sm:bg-black/90 max-sm:border-white/10"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Input Section Header */}
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4 md:mb-6">
            <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-100 sm:text-gray-800">Share what&apos;s on your mind</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-300 sm:text-gray-600">FRANK is here to listen and support you</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6">
            {/* Enhanced Text Input */}
            <div className="flex-1 relative">
              <motion.textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Tell me what's really going on... I'm here to listen without judgment. Take your time and share as much or as little as you'd like."
                className="w-full h-20 sm:h-24 md:h-32 lg:h-40 px-3 sm:px-5 md:px-6 lg:px-7 py-3 sm:py-4 md:py-5 lg:py-6 rounded-2xl bg-white/90 border-2 border-white/40 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500/60 transition-all text-sm sm:text-base md:text-lg lg:text-xl placeholder-gray-500 resize-none leading-relaxed shadow-inner max-sm:bg-white/95 max-sm:text-gray-800"
                style={{
                  fontSize: 'clamp(16px, 2.5vw, 20px)',
                  lineHeight: '1.6'
                }}
                disabled={isLoading}
                whileFocus={{ scale: 1.01 }}
              />
              
              {/* Character Count and Tips */}
              <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 flex items-center gap-2 sm:gap-3">
                {input.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-xs sm:text-sm text-gray-500 bg-white/70 px-2 py-1 rounded-full"
                  >
                    {input.length}/1000
                  </motion.div>
                )}
                
                {/* Helpful Tips */}
                <motion.div
                  className="text-xs text-gray-400 bg-white/60 px-2 sm:px-3 py-1 rounded-full hidden sm:block"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Press Enter to send • Shift+Enter for new line
                </motion.div>
              </div>
            </div>

            {/* Enhanced Send Button */}
            <div className="flex flex-row sm:flex-col justify-between">
              <motion.button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="flex-1 sm:flex-none sm:w-full md:w-auto px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 md:py-5 lg:py-6 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 text-white hover:from-blue-600 hover:via-purple-600 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-blue-500/30 font-bold text-sm sm:text-base md:text-lg lg:text-xl min-h-[50px] sm:min-h-[60px] md:min-h-[80px] lg:min-h-[100px] flex items-center justify-center gap-2 sm:gap-3"
                whileHover={{ 
                  scale: isLoading || !input.trim() ? 1 : 1.05,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: isLoading || !input.trim() ? 1 : 0.95 }}
              >
                <motion.div
                  animate={isLoading ? { rotate: 360 } : {}}
                  transition={isLoading ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
                </motion.div>
                <span className="hidden sm:inline">
                  {isLoading ? 'Thinking...' : 'Send Message'}
                </span>
                <span className="sm:hidden">
                  {isLoading ? 'Thinking...' : 'Send'}
                </span>
              </motion.button>

              {/* Quick Suggestion Buttons for Desktop/Tablet */}
              <div className="hidden md:flex flex-col gap-2 mt-4">
                <p className="text-xs text-gray-500 text-center mb-2">Quick starts:</p>
                {[
                  "I'm feeling overwhelmed",
                  "I need someone to talk to",
                  "Help me understand my emotions"
                ].map((suggestion, index) => (
                  <motion.button
                    key={suggestion}
                    onClick={() => setInput(suggestion)}
                    className="text-xs px-3 py-2 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-blue-100 hover:to-purple-100 hover:text-blue-700 transition-all border border-gray-200 hover:border-blue-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
              
              {/* Quick Suggestion Buttons for Mobile */}
              <div className="flex sm:hidden gap-2 mt-3 ml-3">
                <motion.button
                  onClick={() => setInput("I'm feeling overwhelmed")}
                  className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200"
                  whileTap={{ scale: 0.95 }}
                >
                  Overwhelmed
                </motion.button>
                <motion.button
                  onClick={() => setInput("I need someone to talk to")}
                  className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200"
                  whileTap={{ scale: 0.95 }}
                >
                  Need to talk
                </motion.button>
              </div>
            </div>
          </div>

          {/* Encouragement Text */}
          <motion.div
            className="mt-2 sm:mt-4 md:mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-xs sm:text-sm md:text-base text-gray-300 sm:text-gray-600 leading-relaxed">
              Remember: This is a safe space. Share as much or as little as you&apos;re comfortable with. 
              <span className="text-blue-400 sm:text-blue-600 font-medium"> FRANK is here to support you.</span>
            </p>
          </motion.div>
        </motion.div>

        {/* Crisis Resources */}
        <AnimatePresence>
          {crisisDetected && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="mt-3 md:mt-4 p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/30 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="flex items-start gap-3"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity
                  }}
                >
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                </motion.div>
                <div>
                  <p className="text-sm font-medium mb-3 text-red-700">
                    I&apos;m here for you. If you need immediate human support:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs md:text-sm">
                    <motion.div 
                      className="flex items-center gap-2 p-2 rounded-lg bg-white/50"
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="text-lg">🆘</span>
                      <div>
                        <div className="font-medium">Crisis Hotline</div>
                        <div className="text-red-600 font-bold">988</div>
                      </div>
                    </motion.div>
                    <motion.div 
                      className="flex items-center gap-2 p-2 rounded-lg bg-white/50"
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="text-lg">💬</span>
                      <div>
                        <div className="font-medium">Crisis Text</div>
                        <div className="text-red-600 font-bold">Text HOME to 741741</div>
                      </div>
                    </motion.div>
                    <motion.div 
                      className="flex items-center gap-2 p-2 rounded-lg bg-white/50"
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="text-lg">🏥</span>
                      <div>
                        <div className="font-medium">Emergency</div>
                        <div className="text-red-600 font-bold">Call 911</div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Neural Pathway Sidebar - Hidden on Mobile */}
      <div className="w-64 hidden lg:block md:mr-4">
        <motion.div 
          className="bg-gradient-to-br from-gray-900/80 to-blue-900/60 backdrop-blur-md border border-gray-700/50 rounded-xl p-4 h-full relative overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
          </div>
          
          <motion.div 
            className="flex items-center gap-2 mb-4 relative"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              animate={{ 
                rotate: neuralActivity.pathwayActive ? 360 : 0,
                scale: neuralActivity.pathwayActive ? [1, 1.1, 1] : 1
              }}
              transition={{ 
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 1, repeat: Infinity }
              }}
            >
              <Brain className="w-5 h-5 text-blue-400" />
            </motion.div>
            <h3 className="font-semibold text-white">Neural Activity</h3>
          </motion.div>
          
          <AnimatePresence mode="wait">
            {neuralActivity.pathwayActive ? (
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <motion.div 
                  className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg p-3 backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Zap className="w-4 h-4 text-blue-400" />
                    </motion.div>
                    <span className="text-sm font-medium text-blue-400">Pathway Active</span>
                  </div>
                  <div className="text-xs text-gray-300 capitalize">
                    {neuralActivity.pathwayActive.replace('-', ' ')}
                  </div>
                </motion.div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-white flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Active Nodes:
                  </div>
                  <div className="space-y-1">
                    {neuralActivity.activeNodes.map((node, index) => (
                      <motion.div
                        key={node}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2 text-xs p-2 rounded-lg bg-white/5"
                        whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                      >
                        <motion.div 
                          className="w-2 h-2 bg-blue-400 rounded-full"
                          animate={{ 
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity,
                            delay: index * 0.2
                          }}
                        />
                        <span className="text-gray-300 capitalize">{node.replace('-', ' ')}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <motion.div 
                    className="bg-white/5 rounded-lg p-3"
                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  >
                    <div className="flex justify-between items-center text-xs mb-2">
                      <span className="text-gray-400">Risk Level</span>
                      <motion.span 
                        className={`font-medium px-2 py-1 rounded text-xs ${
                          neuralActivity.riskLevel === 'critical' ? 'text-red-400 bg-red-500/20' :
                          neuralActivity.riskLevel === 'high' ? 'text-orange-400 bg-orange-500/20' :
                          neuralActivity.riskLevel === 'medium' ? 'text-yellow-400 bg-yellow-500/20' :
                          'text-green-400 bg-green-500/20'
                        }`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {neuralActivity.riskLevel}
                      </motion.span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400">Emotional State</span>
                      <motion.span 
                        className="text-purple-400 capitalize px-2 py-1 rounded bg-purple-500/20"
                        whileHover={{ scale: 1.05 }}
                      >
                        {neuralActivity.emotionalState}
                      </motion.span>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="text-xs text-gray-500 bg-white/5 rounded-lg p-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center gap-1 mb-1">
                      <Activity className="w-3 h-3" />
                      Real-time analysis
                    </div>
                    Neural pathways will reset in {Math.floor(Math.random() * 5) + 1}s
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                className="text-center text-gray-500 text-sm py-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center"
                >
                  <Brain className="w-6 h-6 opacity-50" />
                </motion.div>
                <div className="font-medium mb-1">Neural pathways at rest</div>
                <div className="text-xs text-gray-600">Start chatting to see brain activity</div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
    </>
  );
}