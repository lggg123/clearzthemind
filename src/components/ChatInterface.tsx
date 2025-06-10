'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, AlertTriangle, Activity, Brain, Zap } from 'lucide-react';
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
  };

  return (
    <div className="flex h-[500px] md:h-[600px] lg:h-[650px] w-full glass-morphism rounded-2xl p-4 md:p-6">
      {/* Main Chat Column */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div className="flex items-center gap-3 md:gap-4">
            <FrankAvatar 
              isListening={isLoading} 
              mood={crisisDetected ? 'concerned' : mapEmotionalStateToMood(neuralActivity.emotionalState)}
              className="w-10 h-10 md:w-12 md:h-12"
            />
            <div>
              <h2 className="text-xl md:text-2xl font-bold">FRANK</h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Here to listen, no judgment, no BS
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Neural Activity Indicator */}
            {neuralActivity.pathwayActive && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-lg px-3 py-1"
              >
                <Activity className="w-4 h-4 text-blue-400 animate-pulse" />
                <div className="text-xs">
                  <div className="text-blue-400 font-medium">Neural Activity</div>
                  <div className="text-gray-400">{neuralActivity.emotionalState}</div>
                </div>
              </motion.div>
            )}
            
            {crisisDetected && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 text-destructive"
              >
                <AlertTriangle className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-xs md:text-sm font-medium hidden sm:inline">Crisis Support Active</span>
                <span className="text-xs md:text-sm font-medium sm:hidden">Crisis</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 md:space-y-4 mb-3 md:mb-4 px-1">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[70%] p-3 md:p-4 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : 'bg-muted'
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm md:text-base">{message.content}</p>
                  {message.crisis_indicators.length > 0 && (
                    <div className="mt-2 text-xs opacity-70">
                      ⚠️ Crisis indicators detected
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-muted p-3 md:p-4 rounded-2xl">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex gap-2 md:gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Tell me what's really going on..."
            className="flex-1 px-3 md:px-4 py-2 md:py-3 rounded-xl bg-muted border border-muted-foreground/20 focus:outline-none focus:border-primary transition-colors text-sm md:text-base"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="px-4 md:px-6 py-2 md:py-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Send className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>

        {/* Crisis Resources */}
        {crisisDetected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-3 md:mt-4 p-3 md:p-4 rounded-xl bg-destructive/20 border border-destructive/30"
          >
            <p className="text-sm font-medium mb-2">
              I&apos;m here for you. If you need immediate human support:
            </p>
            <div className="space-y-1 text-xs md:text-sm">
              <p>🆘 Crisis Hotline: 988</p>
              <p>💬 Crisis Text Line: Text HOME to 741741</p>
              <p>🏥 Or call 911 for immediate help</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Neural Pathway Sidebar */}
      <div className="w-64 hidden lg:block">
        <div className="bg-black/20 border border-gray-700 rounded-xl p-4 h-full">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-blue-400" />
            <h3 className="font-semibold text-white">Neural Activity</h3>
          </div>
          
          {neuralActivity.pathwayActive ? (
            <div className="space-y-4">
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-blue-400">Pathway Active</span>
                </div>
                <div className="text-xs text-gray-400">{neuralActivity.pathwayActive}</div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-white">Active Nodes:</div>
                {neuralActivity.activeNodes.map((node, index) => (
                  <motion.div
                    key={node}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2 text-xs"
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-300">{node}</span>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Risk Level</span>
                  <span className={`font-medium ${
                    neuralActivity.riskLevel === 'critical' ? 'text-red-400' :
                    neuralActivity.riskLevel === 'high' ? 'text-orange-400' :
                    neuralActivity.riskLevel === 'medium' ? 'text-yellow-400' :
                    'text-green-400'
                  }`}>
                    {neuralActivity.riskLevel}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Emotional State</span>
                  <span className="text-purple-400">{neuralActivity.emotionalState}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 text-sm py-8">
              <Brain className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <div>Neural pathways at rest</div>
              <div className="text-xs mt-1">Start chatting to see brain activity</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}