'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, AlertTriangle } from 'lucide-react';
import FrankAvatar from './FrankAvatar';
import { Message } from '@/types';

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [crisisDetected, setCrisisDetected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setIsLoading(true);

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
    <div className="flex flex-col h-[500px] md:h-[600px] lg:h-[650px] w-full glass-morphism rounded-2xl p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-3 md:gap-4">
          <FrankAvatar 
            isListening={isLoading} 
            mood={crisisDetected ? 'concerned' : 'neutral'}
            className="w-10 h-10 md:w-12 md:h-12"
          />
          <div>
            <h2 className="text-xl md:text-2xl font-bold">FRANK</h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Here to listen, no judgment, no BS
            </p>
          </div>
        </div>
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
  );
}