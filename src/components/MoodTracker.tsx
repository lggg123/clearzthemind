'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
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
    <div className="space-y-6">
      {/* Mood Selector */}
      <div className="glass-morphism rounded-2xl p-6">
        <h3 className="text-xl font-semibold mb-4">How are you feeling?</h3>
        
        <div className="flex justify-between items-center mb-6">
          {moodIcons.map(({ score, icon: Icon, label }) => (
            <motion.button
              key={score}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMood(score)}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-colors ${
                Math.abs(selectedMood - score) <= 1
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              <Icon className="w-8 h-8" />
              <span className="text-xs">{label}</span>
            </motion.button>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-3xl font-bold">{selectedMood}</span>
          <span className="text-muted-foreground">/10</span>
        </div>

        {/* Emotions */}
        <div className="space-y-2 mb-4">
          <p className="text-sm text-muted-foreground">What emotions are you experiencing?</p>
          <div className="flex flex-wrap gap-2">
            {emotions.map(emotion => (
              <motion.button
                key={emotion}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleEmotion(emotion)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
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
          className="w-full px-4 py-3 rounded-xl bg-muted border border-muted-foreground/20 focus:outline-none focus:border-primary transition-colors resize-none"
          rows={3}
        />

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={submitMood}
          disabled={submitted}
          className="w-full mt-4 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {submitted ? 'Mood Recorded ✓' : 'Record Mood'}
        </motion.button>
      </div>

      {/* Mood Chart */}
      <div className="glass-morphism rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Your Week</h3>
          <div className="flex items-center gap-2 text-sm">
            {selectedMood > 5 ? (
              <>
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-green-500">Improving</span>
              </>
            ) : (
              <>
                <TrendingDown className="w-4 h-4 text-destructive" />
                <span className="text-destructive">Needs attention</span>
              </>
            )}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="date" stroke="#666" />
            <YAxis domain={[0, 10]} stroke="#666" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: 'none',
                borderRadius: '8px',
              }}
            />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ fill: '#8b5cf6', r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-4 p-3 rounded-lg bg-muted">
          <p className="text-sm">
            <span className="font-medium">FRANK says:</span> "Your mood's been all over the place this week. 
            That's normal. Life's a rollercoaster, and at least you're still riding it."
          </p>
        </div>
      </div>
    </div>
  );
}