export interface Profile {
    id: string;
    email: string;
    full_name: string;
    risk_level: 'low' | 'medium' | 'high' | 'critical';
    created_at: string;
    updated_at: string;
}

export interface MoodEntry {
    id: string;
    user_id: string;
    mood_score: number;
    emotions: string[];
    notes: string;
    created_at: string;
}

export interface Message {
    id: string;
    user_id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    crisis_indicators: string[];
    sentiment_score: number;
    created_at: string;
}

export interface CrisisEvent {
    id: string;
    user_id: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    indicators: string[];
    intervention_type: string;
    resolved: boolean;
    created_at: string;
    resolved_at?: string;
}