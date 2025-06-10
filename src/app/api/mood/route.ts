import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { mood_score, emotions, notes } = await request.json();

    // In a real app, save to Supabase database
    // For now, just return success
    
    return NextResponse.json({
      success: true,
      message: 'Mood logged successfully',
      data: {
        mood_score,
        emotions,
        notes,
        created_at: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Mood API error:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to log mood'
      },
      { status: 500 }
    );
  }
}
