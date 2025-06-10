import { NextRequest, NextResponse } from 'next/server';
import { detectCrisisIndictators, getFrankResponse } from '@/lib/openai';
import { Profile } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { message, messages } = await request.json();

    // Mock user profile - in a real app, get this from authenticated user
    const userProfile: Profile = {
      id: 'current-user',
      email: 'user@example.com',
      full_name: 'Anonymous User',
      risk_level: 'medium',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Detect crisis indicators
    const crisisAnalysis = await detectCrisisIndictators(message);
    
    // Get Frank's response
    const frankResponse = await getFrankResponse(
      message,
      messages || [],
      userProfile
    );

    return NextResponse.json({
      response: frankResponse,
      crisisDetected: crisisAnalysis.severity === 'critical' || crisisAnalysis.severity === 'high',
      indicators: crisisAnalysis.indicators,
      sentiment: crisisAnalysis.sentiment,
      severity: crisisAnalysis.severity
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { 
        response: "I'm experiencing some technical difficulties. Are you okay? Sometimes my circuits get scrambled, but I'm still here.",
        crisisDetected: false,
        indicators: [],
        sentiment: 0,
        severity: 'low'
      },
      { status: 500 }
    );
  }
}