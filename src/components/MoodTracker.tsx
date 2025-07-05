'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Frown, 
  Meh, 
  Smile, 
  Heart,
  TrendingUp,
  Brain,
  MessageSquare,
  Sparkles,
  Zap,
  Star
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Enhanced mood icons with vibrant colors and emojis
const moodIcons = [
  { 
    score: 1, 
    icon: Frown, 
    label: 'Terrible', 
    emoji: '😭',
    color: 'from-red-500 to-red-600',
    bgColor: 'from-red-500/20 to-red-600/20',
    borderColor: 'border-red-400/60',
    textColor: 'text-red-100',
    description: 'Having a really tough time'
  },
  { 
    score: 3, 
    icon: Frown, 
    label: 'Low', 
    emoji: '😟',
    color: 'from-orange-500 to-red-500',
    bgColor: 'from-orange-500/20 to-red-500/20',
    borderColor: 'border-orange-400/60',
    textColor: 'text-orange-100',
    description: 'Feeling down today'
  },
  { 
    score: 5, 
    icon: Meh, 
    label: 'Okay', 
    emoji: '😐',
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'from-yellow-500/20 to-orange-500/20',
    borderColor: 'border-yellow-400/60',
    textColor: 'text-yellow-100',
    description: 'Just getting through'
  },
  { 
    score: 7, 
    icon: Smile, 
    label: 'Good', 
    emoji: '😊',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-400/60',
    textColor: 'text-green-100',
    description: 'Feeling pretty positive'
  },
  { 
    score: 10, 
    icon: Heart, 
    label: 'Amazing', 
    emoji: '🤩',
    color: 'from-emerald-500 to-green-500',
    bgColor: 'from-emerald-500/20 to-green-500/20',
    borderColor: 'border-emerald-400/60',
    textColor: 'text-emerald-100',
    description: 'Life feels wonderful'
  }
];

// Enhanced emotions with categories and vibrant styling
const emotionCategories = {
  positive: {
    title: 'Positive Emotions',
    icon: '✨',
    color: 'from-emerald-400 to-green-500',
    bgColor: 'from-emerald-500/10 to-green-500/10',
    borderColor: 'border-emerald-400/30',
    emotions: [
      { name: 'Joy', emoji: '😄', color: 'from-yellow-400 to-orange-400' },
      { name: 'Grateful', emoji: '🙏', color: 'from-purple-400 to-pink-400' },
      { name: 'Excited', emoji: '🎉', color: 'from-red-400 to-pink-400' },
      { name: 'Peaceful', emoji: '🕊️', color: 'from-blue-400 to-cyan-400' },
      { name: 'Confident', emoji: '💪', color: 'from-indigo-400 to-purple-400' },
      { name: 'Loved', emoji: '💝', color: 'from-pink-400 to-rose-400' }
    ]
  },
  neutral: {
    title: 'Neutral Emotions',
    icon: '⚖️',
    color: 'from-blue-400 to-cyan-500',
    bgColor: 'from-blue-500/10 to-cyan-500/10',
    borderColor: 'border-blue-400/30',
    emotions: [
      { name: 'Calm', emoji: '😌', color: 'from-slate-400 to-blue-400' },
      { name: 'Tired', emoji: '😴', color: 'from-gray-400 to-slate-400' },
      { name: 'Focused', emoji: '🎯', color: 'from-indigo-400 to-blue-400' },
      { name: 'Curious', emoji: '🤔', color: 'from-cyan-400 to-teal-400' },
      { name: 'Reflective', emoji: '🪞', color: 'from-purple-400 to-indigo-400' },
      { name: 'Content', emoji: '😇', color: 'from-green-400 to-emerald-400' }
    ]
  },
  challenging: {
    title: 'Challenging Emotions',
    icon: '🌧️',
    color: 'from-orange-400 to-red-500',
    bgColor: 'from-orange-500/10 to-red-500/10',
    borderColor: 'border-orange-400/30',
    emotions: [
      { name: 'Anxious', emoji: '😰', color: 'from-yellow-400 to-orange-400' },
      { name: 'Sad', emoji: '😢', color: 'from-blue-400 to-indigo-400' },
      { name: 'Frustrated', emoji: '😤', color: 'from-red-400 to-orange-400' },
      { name: 'Lonely', emoji: '😔', color: 'from-purple-400 to-blue-400' },
      { name: 'Overwhelmed', emoji: '🌪️', color: 'from-gray-400 to-red-400' },
      { name: 'Confused', emoji: '😵', color: 'from-indigo-400 to-purple-400' }
    ]
  }
};

// Sample mood data for chart
const moodData = [
  { date: 'Mon', mood: 6, energy: 7 },
  { date: 'Tue', mood: 4, energy: 5 },
  { date: 'Wed', mood: 7, energy: 8 },
  { date: 'Thu', mood: 5, energy: 6 },
  { date: 'Fri', mood: 8, energy: 9 },
  { date: 'Sat', mood: 9, energy: 8 },
  { date: 'Sun', mood: 7, energy: 7 }
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const toggleEmotion = (emotion: string) => {
    setSelectedEmotions(prev => 
      prev.includes(emotion) 
        ? prev.filter(e => e !== emotion)
        : [...prev, emotion]
    );
  };

  const handleSubmit = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  return (
    <div className="h-full max-w-4xl mx-auto p-6 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 rounded-2xl border border-slate-700/50 backdrop-blur-xl overflow-y-auto">
      
      {/* Enhanced Header */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div 
          className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Brain className="w-8 h-8 text-white" />
          <motion.div
            className="absolute"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-2 -right-2" />
          </motion.div>
        </motion.div>
        <motion.h2 
          className="text-2xl md:text-3xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Mood Check-In
        </motion.h2>
        <motion.p 
          className="text-gray-400 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          How are you feeling right now?
        </motion.p>
      </motion.div>

      {/* Enhanced Mood Selector */}
      <motion.div 
        className="glass-morphism rounded-3xl p-6 md:p-8 border-2 border-purple-500/20 shadow-2xl relative overflow-hidden mb-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        {/* Static background effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10"></div>
        <motion.div 
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1, delay: 0.8 }}
        />
        
        <div className="relative">
          <motion.div 
            className="flex items-center gap-3 mb-6"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div 
              className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
            >
              <Heart className="w-5 h-5 text-white" />
            </motion.div>
            <h3 className="text-xl font-bold text-white">Rate Your Mood</h3>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {moodIcons.map((mood, index) => {
              const Icon = mood.icon;
              const isSelected = selectedMood === mood.score;
              
              return (
                <motion.button
                  key={mood.score}
                  onClick={() => setSelectedMood(mood.score)}
                  className={`relative p-6 rounded-3xl border-2 transition-all duration-300 group backdrop-blur-sm ${
                    isSelected 
                      ? `bg-gradient-to-br ${mood.bgColor} ${mood.borderColor} shadow-2xl` 
                      : 'bg-slate-800/50 border-slate-600/50 hover:border-slate-500/70 hover:bg-slate-700/50'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Enhanced glow effect for selected mood */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div 
                        className={`absolute inset-0 rounded-3xl opacity-50 blur-xl bg-gradient-to-br ${mood.color}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.5, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </AnimatePresence>
                  
                  <div className="relative z-10 text-center">
                    <motion.div 
                      className="text-4xl mb-3"
                      animate={{ rotate: isSelected ? [0, 10, -10, 0] : 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {mood.emoji}
                    </motion.div>
                    <Icon className={`w-6 h-6 mx-auto mb-2 ${isSelected ? mood.textColor : 'text-gray-400'}`} />
                    <h4 className={`font-bold text-sm ${isSelected ? mood.textColor : 'text-gray-300'}`}>
                      {mood.label}
                    </h4>
                    <AnimatePresence>
                      {isSelected && (
                        <motion.p 
                          className={`text-xs mt-1 ${mood.textColor} opacity-80`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 0.8, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          {mood.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Enhanced Emotion Categories */}
      <div className="grid gap-6 mb-8">
        {Object.entries(emotionCategories).map(([key, category], categoryIndex) => (
          <motion.div 
            key={key}
            className={`glass-morphism rounded-3xl p-6 border-2 ${category.borderColor} shadow-xl relative overflow-hidden`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8 + categoryIndex * 0.2 }}
          >
            {/* Static background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${category.bgColor}`}></div>
            <motion.div 
              className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${category.color}`}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 2 + categoryIndex * 0.2, duration: 0.8 }}
            />
            
            <div className="relative">
              <motion.div 
                className="flex items-center gap-3 mb-4"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2.2 + categoryIndex * 0.2 }}
              >
                <motion.div 
                  className={`w-8 h-8 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center`}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <span className="text-lg">{category.icon}</span>
                </motion.div>
                <h3 className="text-lg font-bold text-white">{category.title}</h3>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: categoryIndex }}
                >
                  <Star className="w-4 h-4 text-yellow-400" />
                </motion.div>
              </motion.div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {category.emotions.map((emotion, emotionIndex) => {
                  const isSelected = selectedEmotions.includes(emotion.name);
                  
                  return (
                    <motion.button
                      key={emotion.name}
                      onClick={() => toggleEmotion(emotion.name)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm relative ${
                        isSelected 
                          ? `bg-gradient-to-br ${emotion.color}/20 border-white/30 shadow-xl` 
                          : 'bg-slate-800/50 border-slate-600/50 hover:border-slate-500/70 hover:bg-slate-700/50'
                      }`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 2.4 + categoryIndex * 0.2 + emotionIndex * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Glow effect for selected emotions */}
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div 
                            className={`absolute inset-0 rounded-2xl opacity-30 blur-lg bg-gradient-to-br ${emotion.color}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 0.3, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                          />
                        )}
                      </AnimatePresence>
                      
                      <div className="relative z-10 text-center">
                        <motion.div 
                          className="text-2xl mb-2"
                          animate={{ 
                            scale: isSelected ? [1, 1.2, 1] : 1,
                            rotate: isSelected ? [0, 5, -5, 0] : 0
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          {emotion.emoji}
                        </motion.div>
                        <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                          {emotion.name}
                        </span>
                        {isSelected && (
                          <motion.div
                            className="absolute -top-1 -right-1"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <Zap className="w-3 h-3 text-yellow-400" />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Enhanced Notes Section */}
      <motion.div 
        className="glass-morphism rounded-3xl p-6 md:p-8 border-2 border-blue-500/20 shadow-xl relative overflow-hidden mb-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-purple-500/10"></div>
        <motion.div 
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 3.2, duration: 0.8 }}
        />
        
        <div className="relative">
          <motion.div 
            className="flex items-center gap-3 mb-4"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 3.4 }}
          >
            <motion.div 
              className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
            >
              <MessageSquare className="w-5 h-5 text-white" />
            </motion.div>
            <h3 className="text-xl font-bold text-white">Notes & Reflections</h3>
          </motion.div>
          
          <motion.textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What's on your mind? Share your thoughts, experiences, or anything you'd like to remember about today..."
            className="w-full h-32 bg-slate-800/50 border-2 border-slate-600/50 rounded-2xl p-4 text-white placeholder-gray-400 focus:border-blue-400/70 focus:bg-slate-700/50 transition-all duration-300 resize-none backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.6 }}
            whileFocus={{ scale: 1.02 }}
          />
          
          {/* Submit Button */}
          <motion.button
            onClick={handleSubmit}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-5 h-5" />
            Save My Check-In
          </motion.button>
          
          {/* Success Message */}
          <AnimatePresence>
            {showSuccessMessage && (
              <motion.div
                className="mt-4 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-2xl flex items-center gap-3"
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Star className="w-5 h-5 text-green-400" />
                </motion.div>
                <span className="text-green-100 font-medium">
                  Your mood check-in has been saved! 🌟
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Enhanced Mood Chart */}
      <div className="glass-morphism rounded-3xl p-6 md:p-8 border-2 border-green-500/20 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></div>
        
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Weekly Mood Trends</h3>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                <span className="text-sm text-gray-300">Mood</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
                <span className="text-sm text-gray-300">Energy</span>
              </div>
            </div>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moodData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF' }}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF' }}
                  domain={[0, 10]}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    border: '1px solid #334155',
                    borderRadius: '12px',
                    color: '#F1F5F9'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="url(#moodGradient)" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="energy" 
                  stroke="url(#energyGradient)" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
                />
                <defs>
                  <linearGradient id="moodGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                  <linearGradient id="energyGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}