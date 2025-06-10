import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import type { NeuralPathway } from '@/types';

// Initialize Supabase client (use env vars for security)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: NextRequest) {
  // Fetch pathways from the 'neural_pathways' table
  const { data, error } = await supabase
    .from('neural_pathways')
    .select('*');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Optionally: validate/transform data to match NeuralPathway[]
  return NextResponse.json(data as NeuralPathway[]);
}