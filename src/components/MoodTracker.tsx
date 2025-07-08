'use client';

import { useState } from 'react';
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
    <div className="mood-tracker-container w-full p-6">
      <div className="max-w-4xl mx-auto pb-12 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 rounded-2xl border border-slate-700/50 backdrop-blur-xl p-6">
        
        {/* Scroll to Top Button */}
        <button 
          onClick={() => {
            // Try multiple scroll targets
            const scrollableContainer = document.querySelector('.mood-tracker-container');
            if (scrollableContainer) {
              scrollableContainer.scrollTop = 0;
            } else {
              const parentContainer = document.querySelector('.mood-view') || document.querySelector('.app-content');
              if (parentContainer) {
                parentContainer.scrollTop = 0;
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }
          }}
          className="fixed top-20 right-6 z-50 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 font-bold text-xl tracking-widest drop-shadow-lg"
          title="Scroll to Top - Click to see mood buttons"
        >
          ↑
        </button>
        
        {/* Enhanced Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 hover:rotate-6 transition-transform duration-300 relative">
            <Brain className="w-8 h-8 text-white" />
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-4 h-4 text-yellow-300" />
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent tracking-tight drop-shadow-2xl premium-text-gradient">
              Advanced Mood Analysis
            </h1>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-lg tracking-wide text-enhanced">
              Mood Check-In
            </h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium tracking-wide text-enhanced">
              Take a moment to reflect on your current emotional state and mental well-being
            </p>
            <div className="mt-2 flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <p className="text-purple-300/80 text-sm font-semibold tracking-widest uppercase text-enhanced">
                ✨ Premium Mental Health Tracking ✨
              </p>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

      {/* Enhanced Mood Selector */}
      <div className="glass-morphism rounded-3xl p-6 md:p-8 border-2 border-purple-500/20 shadow-2xl relative overflow-hidden mb-8">
        {/* Static background effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500" />
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg">
              <Heart className="w-6 h-6 text-white drop-shadow-sm" />
            </div>
            <h3 className="text-2xl font-bold text-white drop-shadow-md tracking-wide">Rate Your Mood</h3>
            <div className="ml-auto">
              <span className="text-purple-300/70 text-sm font-semibold tracking-wider uppercase">Daily Check-In</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {moodIcons.map((mood) => {
              const Icon = mood.icon;
              const isSelected = selectedMood === mood.score;
              
              return (
                <button
                  key={mood.score}
                  onClick={() => setSelectedMood(mood.score)}
                  className={`relative p-6 rounded-3xl border-2 transition-all duration-300 group backdrop-blur-sm hover:scale-105 ${
                    isSelected 
                      ? `bg-gradient-to-br ${mood.bgColor} ${mood.borderColor} shadow-2xl scale-105` 
                      : 'bg-slate-800/50 border-slate-600/50 hover:border-slate-500/70 hover:bg-slate-700/50'
                  }`}
                >
                  {/* Enhanced glow effect for selected mood */}
                  {isSelected && (
                    <div className={`absolute inset-0 rounded-3xl opacity-50 blur-xl bg-gradient-to-br ${mood.color}`} />
                  )}
                  
                  <div className="relative z-10 text-center">
                    <div className="text-4xl md:text-5xl mb-3 drop-shadow-lg">{mood.emoji}</div>
                    <Icon className={`w-7 h-7 mx-auto mb-3 drop-shadow-sm ${isSelected ? mood.textColor : 'text-gray-400'}`} />
                    <h4 className={`font-bold text-base md:text-lg tracking-wide drop-shadow-sm ${isSelected ? mood.textColor : 'text-gray-300'}`}>
                      {mood.label}
                    </h4>
                    {isSelected && (
                      <p className={`text-sm mt-2 font-medium leading-relaxed tracking-wide ${mood.textColor} opacity-90 drop-shadow-sm`}>
                        {mood.description}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enhanced Emotion Categories */}
      <div className="grid gap-6 mb-8">
        {Object.entries(emotionCategories).map(([key, category]) => (
          <div 
            key={key}
            className={`glass-morphism rounded-3xl p-6 border-2 ${category.borderColor} shadow-xl relative overflow-hidden`}
          >
            {/* Static background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${category.bgColor}`}></div>
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${category.color}`} />
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center hover:scale-110 hover:rotate-12 transition-transform duration-300 shadow-lg`}>
                  <span className="text-xl drop-shadow-sm">{category.icon}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-md tracking-wide">{category.title}</h3>
                <div className="animate-pulse ml-auto">
                  <Star className="w-5 h-5 text-yellow-400 drop-shadow-sm" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {category.emotions.map((emotion) => {
                  const isSelected = selectedEmotions.includes(emotion.name);
                  
                  return (
                    <button
                      key={emotion.name}
                      onClick={() => toggleEmotion(emotion.name)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm hover:scale-105 relative ${
                        isSelected 
                          ? `bg-gradient-to-br ${emotion.color}/20 border-white/30 shadow-xl scale-105` 
                          : 'bg-slate-800/50 border-slate-600/50 hover:border-slate-500/70 hover:bg-slate-700/50'
                      }`}
                    >
                      {/* Glow effect for selected emotions */}
                      {isSelected && (
                        <div className={`absolute inset-0 rounded-2xl opacity-30 blur-lg bg-gradient-to-br ${emotion.color}`} />
                      )}
                      
                      <div className="relative z-10 text-center">
                        <div className="text-2xl md:text-3xl mb-2 drop-shadow-md">{emotion.emoji}</div>
                        <span className={`text-sm md:text-base font-semibold tracking-wide drop-shadow-sm ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                          {emotion.name}
                        </span>
                        {isSelected && (
                          <div className="absolute -top-1 -right-1">
                            <Zap className="w-4 h-4 text-yellow-400 drop-shadow-lg animate-pulse" />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Notes Section */}
      <div className="glass-morphism rounded-3xl p-6 md:p-8 border-2 border-blue-500/20 shadow-xl relative overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-purple-500/10"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500" />
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg">
              <MessageSquare className="w-6 h-6 text-white drop-shadow-sm" />
            </div>
            <h3 className="text-2xl font-bold text-white drop-shadow-md tracking-wide">Notes & Reflections</h3>
            <div className="ml-auto">
              <span className="text-cyan-300/70 text-sm font-semibold tracking-wider uppercase">Personal Insights</span>
            </div>
          </div>
          
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What's on your mind? Share your thoughts, experiences, or anything you'd like to remember about today..."
            className="w-full h-32 bg-slate-800/50 border-2 border-slate-600/50 rounded-2xl p-4 text-white placeholder-gray-400 focus:border-blue-400/70 focus:bg-slate-700/50 focus:scale-[1.01] transition-all duration-300 resize-none backdrop-blur-sm font-medium text-base leading-relaxed tracking-wide drop-shadow-sm"
          />
          
          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="mt-4 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-3 tracking-wide drop-shadow-md"
          >
            <Sparkles className="w-6 h-6 drop-shadow-sm" />
            Save My Check-In
          </button>
          
          {/* Success Message */}
          {showSuccessMessage && (
            <div className="mt-4 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-2xl flex items-center gap-3 animate-fade-in">
              <div className="animate-spin">
                <Star className="w-6 h-6 text-green-400 drop-shadow-lg" />
              </div>
              <span className="text-green-100 font-semibold text-lg tracking-wide drop-shadow-sm">
                Your mood check-in has been saved! 🌟
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Mood Chart */}
      <div className="glass-morphism rounded-3xl p-6 md:p-8 border-2 border-green-500/20 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></div>
        
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg">
                <TrendingUp className="w-6 h-6 text-white drop-shadow-sm" />
              </div>
              <h3 className="text-2xl font-bold text-white drop-shadow-md tracking-wide">Weekly Mood Trends</h3>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full shadow-lg"></div>
                <span className="text-base font-semibold text-gray-300 tracking-wide">Mood</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full shadow-lg"></div>
                <span className="text-base font-semibold text-gray-300 tracking-wide">Energy</span>
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
    </div>
  );
}