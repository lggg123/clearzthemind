'use client';

import { useState } from 'react';
import { motion } from 'fra        <div className="mood-selector-grid">
          {moodIcons.map(({ score, icon: Icon, label }) => (
            <motion.button
              key={score}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMood(score)}
              className={`mood-button ${
                Math.abs(selectedMood - score) <= 1 ? 'selected' : ''
              }`}
            >
              <Icon className="w-6 h-6 md:w-8 md:h-8 mb-1" />
              <span className="text-xs font-medium">{label}</span>
            </motion.button>
          ))} { 
  Frown, 
  Meh, 
  Smile, 
  Heart,
  TrendingDown,
  TrendingUp 
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const moodIcons = [
  { score: 1, icon: Frown, label: 'Terrible' },
  { score: 3, icon: Meh, label: 'Low' },
  { score: 5, icon: Meh, label: 'Okay' },
  { score: 7, icon: Smile, label: 'Good' },
  { score: 10, icon: Heart, label: 'Great' },
];

const emotions = [
  'Anxious', 'Depressed', 'Angry', 'Hopeful', 
  'Tired', 'Motivated', 'Lonely', 'Content'
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<number>(5);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Mock data for chart
  const mockData = [
    { date: 'Mon', mood: 3 },
    { date: 'Tue', mood: 4 },
    { date: 'Wed', mood: 2 },
    { date: 'Thu', mood: 5 },
    { date: 'Fri', mood: 4 },
    { date: 'Sat', mood: 6 },
    { date: 'Today', mood: selectedMood },
  ];

  const submitMood = async () => {
    try {
      await fetch('/api/mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mood_score: selectedMood,
          emotions: selectedEmotions,
          notes
        }),
      });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Error submitting mood:', error);
    }
  };

  const toggleEmotion = (emotion: string) => {
    setSelectedEmotions(prev =>
      prev.includes(emotion)
        ? prev.filter(e => e !== emotion)
        : [...prev, emotion]
    );
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Mood Selector */}
      <div className="glass-morphism rounded-2xl p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">How are you feeling?</h3>
        
        <div className="flex justify-between items-center mb-4 md:mb-6">
          {moodIcons.map(({ score, icon: Icon, label }) => (
            <motion.button
              key={score}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMood(score)}
              className={`mood-button flex flex-col items-center gap-1 md:gap-2 p-2 md:p-3 rounded-xl transition-colors ${
                Math.abs(selectedMood - score) <= 1
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              <Icon className="w-6 h-6 md:w-8 md:h-8" />
              <span className="text-xs">{label}</span>
            </motion.button>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3 md:gap-4 mb-4 md:mb-6">
          <span className="text-2xl md:text-3xl font-bold">{selectedMood}</span>
          <span className="text-muted-foreground text-lg md:text-xl">/10</span>
        </div>

        {/* Emotions */}
        <div className="space-y-2 mb-3 md:mb-4">
          <p className="text-sm text-muted-foreground">What emotions are you experiencing?</p>
          <div className="flex flex-wrap gap-2">
            {emotions.map(emotion => (
              <motion.button
                key={emotion}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleEmotion(emotion)}
                className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm transition-colors ${
                  selectedEmotions.includes(emotion)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted-foreground/20'
                }`}
              >
                {emotion}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any thoughts you want to share? (optional)"
          className="w-full px-3 md:px-4 py-2 md:py-3 rounded-xl bg-muted border border-muted-foreground/20 focus:outline-none focus:border-primary transition-colors resize-none text-sm md:text-base"
          rows={3}
        />

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={submitMood}
          disabled={submitted}
          className="w-full mt-3 md:mt-4 px-4 md:px-6 py-2 md:py-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 text-sm md:text-base"
        >
          {submitted ? 'Mood Recorded ✓' : 'Record Mood'}
        </motion.button>
      </div>

      {/* Mood Chart */}
      <div className="glass-morphism rounded-2xl p-4 md:p-6">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <h3 className="text-lg md:text-xl font-semibold">Your Week</h3>
          <div className="flex items-center gap-2 text-xs md:text-sm">
            {selectedMood > 5 ? (
              <>
                <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
                <span className="text-green-500 hidden sm:inline">Improving</span>
                <span className="text-green-500 sm:hidden">↗</span>
              </>
            ) : (
              <>
                <TrendingDown className="w-3 h-3 md:w-4 md:h-4 text-destructive" />
                <span className="text-destructive hidden sm:inline">Needs attention</span>
                <span className="text-destructive sm:hidden">↘</span>
              </>
            )}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="date" stroke="#666" fontSize={12} />
            <YAxis domain={[0, 10]} stroke="#666" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: 'none',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ fill: '#8b5cf6', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-3 md:mt-4 p-2 md:p-3 rounded-lg bg-muted">
          <p className="text-xs md:text-sm">
            <span className="font-medium">FRANK says:</span> &quot;Your mood&apos;s been all over the place this week. 
            That&apos;s normal. Life&apos;s a rollercoaster, and at least you&apos;re still riding it.&quot;
          </p>
        </div>
      </div>
    </div>
  );
}