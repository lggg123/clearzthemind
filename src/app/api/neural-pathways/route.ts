import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import type { NeuralPathway } from '@/types';

// Initialize Supabase client (use env vars for security)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  try {
    // Check if Supabase credentials are available
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('Supabase credentials not found, returning mock data');
      return NextResponse.json(getMockPathways());
    }

    // Fetch pathways from the 'neural_pathways' table
    const { data, error } = await supabase
      .from('neural_pathways')
      .select('*');

    if (error) {
      console.error('Supabase error:', error.message);
      // Return mock data if table doesn't exist or other DB error
      return NextResponse.json(getMockPathways());
    }

    // Return real data if available, otherwise mock data
    return NextResponse.json(data && data.length > 0 ? data as NeuralPathway[] : getMockPathways());
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(getMockPathways());
  }
}

// Mock data function for development/fallback
function getMockPathways(): NeuralPathway[] {
  return [
    {
      id: '1',
      user_id: 'demo-user',
      nodes: [],
      connections: [],
      dominant_emotion: 'curiosity',
      crisis_risk_level: 'low',
      activation_frequency: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      last_activated: new Date().toISOString(),
      name: 'Growth Mindset',
      label: 'Growth Mindset',
      visual_color: '#6ee7b7',
      activity_level: 0.92,
      tags: ['learning', 'resilience'],
      description: 'Pathway for embracing challenges and learning from feedback.',
      is_active: true,
    },
    {
      id: '2',
      user_id: 'demo-user',
      nodes: [],
      connections: [],
      dominant_emotion: 'calm',
      crisis_risk_level: 'low',
      activation_frequency: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      last_activated: new Date().toISOString(),
      name: 'Mindful Presence',
      label: 'Mindful Presence',
      visual_color: '#60a5fa',
      activity_level: 0.75,
      tags: ['mindfulness', 'focus'],
      description: 'Pathway for staying present and reducing anxiety.',
      is_active: false,
    },
  ];
}