-- ClearZ The Mind Database Schema
-- Run this in your Supabase SQL editor

-- Enable Row Level Security
ALTER DATABASE postgres SET "auth.jwt_secret" = 'your-jwt-secret';

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    risk_level TEXT CHECK (risk_level IN ('low', 'medium', 'high', 'critical')) DEFAULT 'medium',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mood entries table
CREATE TABLE IF NOT EXISTS mood_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    mood_score INTEGER CHECK (mood_score >= 1 AND mood_score <= 10),
    emotions TEXT[] DEFAULT '{}',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    role TEXT CHECK (role IN ('user', 'assistant', 'system')) NOT NULL,
    content TEXT NOT NULL,
    crisis_indicators TEXT[] DEFAULT '{}',
    sentiment_score DECIMAL(3,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crisis events table
CREATE TABLE IF NOT EXISTS crisis_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')) NOT NULL,
    indicators TEXT[] DEFAULT '{}',
    intervention_type TEXT,
    resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_mood_entries_user_id ON mood_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_mood_entries_created_at ON mood_entries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_user_id ON messages(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_crisis_events_user_id ON crisis_events(user_id);
CREATE INDEX IF NOT EXISTS idx_crisis_events_severity ON crisis_events(severity);

-- Row Level Security Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE crisis_events ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (id = auth.uid()::uuid);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (id = auth.uid()::uuid);

-- Policies for mood_entries
CREATE POLICY "Users can view own mood entries" ON mood_entries
    FOR SELECT USING (user_id = auth.uid()::uuid);

CREATE POLICY "Users can insert own mood entries" ON mood_entries
    FOR INSERT WITH CHECK (user_id = auth.uid()::uuid);

-- Policies for messages
CREATE POLICY "Users can view own messages" ON messages
    FOR SELECT USING (user_id = auth.uid()::uuid);

CREATE POLICY "Users can insert own messages" ON messages
    FOR INSERT WITH CHECK (user_id = auth.uid()::uuid);

-- Policies for crisis_events
CREATE POLICY "Users can view own crisis events" ON crisis_events
    FOR SELECT USING (user_id = auth.uid()::uuid);

CREATE POLICY "System can insert crisis events" ON crisis_events
    FOR INSERT WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically create crisis events
CREATE OR REPLACE FUNCTION check_crisis_indicators()
RETURNS TRIGGER AS $$
BEGIN
    -- If message has high-severity crisis indicators, create a crisis event
    IF array_length(NEW.crisis_indicators, 1) > 0 AND NEW.sentiment_score < -0.5 THEN
        INSERT INTO crisis_events (user_id, severity, indicators, intervention_type)
        VALUES (
            NEW.user_id,
            CASE 
                WHEN array_length(NEW.crisis_indicators, 1) > 2 THEN 'critical'
                WHEN NEW.sentiment_score < -0.8 THEN 'high'
                ELSE 'medium'
            END,
            NEW.crisis_indicators,
            'ai_detected'
        );
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to check for crisis indicators on message insert
CREATE TRIGGER check_crisis_on_message_insert
    AFTER INSERT ON messages
    FOR EACH ROW EXECUTE FUNCTION check_crisis_indicators();
