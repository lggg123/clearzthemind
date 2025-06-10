'use client';

import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

interface FrankAvatarProps {
  className?: string;
  isListening?: boolean;
  mood?: 'neutral' | 'concerned' | 'supportive';
}
export default function FrankAvatar({
  className = '',
  isListening = false,
  mood = 'neutral',
}: FrankAvatarProps) {
  const moodColors: Record<string, string> = {
    neutral: 'text-gray-500',
    concerned: 'text-yellow-500',
    supportive: 'text-green-500',
  };

  return (
    <motion.div
      className={`flex items-center justify-center ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Brain
        className={`w-12 h-12 ${moodColors[mood]} ${
          isListening ? 'animate-pulse' : ''
        }`}
      />
      {isListening && (
        <motion.div
        className="absolute inset-0 rounded-full border-4 border-primary"
        animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
        }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      />
      )}
    </motion.div>
  );
}