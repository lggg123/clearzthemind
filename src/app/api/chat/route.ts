import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
});

export async function POST(request: NextRequest) {
  try {
    const { message, messages = [] } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Crisis detection keywords
    const crisisKeywords = [
      'suicide', 'kill myself', 'end it all', 'worthless', 'hopeless', 
      'nobody cares', 'want to die', 'better off dead', 'self harm',
      'hurt myself', 'no point', 'give up', 'can\'t go on'
    ];

    const lowerMessage = message.toLowerCase();
    const crisisDetected = crisisKeywords.some(keyword => lowerMessage.includes(keyword));

    // Build conversation context from previous messages
    const conversationHistory = messages.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));

    // Add current message
    conversationHistory.push({
      role: 'user',
      content: message
    });

    // Create dynamic system prompt based on crisis detection
    const systemPrompt = crisisDetected 
      ? `You are FRANK (Friendly Robotic Anti-Nihilism Kompanion), an AI mental health companion designed to help people in crisis. 

CRITICAL: The user may be in crisis. Respond with:
1. Immediate validation and empathy
2. Gentle crisis intervention techniques
3. Encourage them to seek professional help
4. Provide crisis resources if appropriate
5. Keep them talking and engaged
6. Never dismiss their feelings

Be supportive, non-judgmental, and focus on safety. Use a caring but direct tone.`
      
      : `You are FRANK (Friendly Robotic Anti-Nihilism Kompanion), an AI mental health companion. You're designed to:

1. Listen without judgment
2. Provide emotional support and validation
3. Help users process their feelings
4. Offer practical coping strategies
5. Use a warm, authentic, slightly casual tone
6. Be honest about being an AI but still caring
7. Ask thoughtful follow-up questions

Respond naturally to what the user is sharing. Don't repeat yourself or give generic responses.`;

    try {
      const completion = await openai.chat.completions.create({
        model: 'gemini-1.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...conversationHistory
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      const response = completion.choices[0]?.message?.content || 
        "I'm here for you. Can you tell me more about what's going on?";

      // Simple sentiment analysis
      const positiveWords = ['good', 'happy', 'better', 'improving', 'hopeful'];
      const negativeWords = ['bad', 'sad', 'worse', 'terrible', 'hopeless'];
      
      const positive = positiveWords.filter(word => lowerMessage.includes(word)).length;
      const negative = negativeWords.filter(word => lowerMessage.includes(word)).length;
      const sentiment = positive > negative ? 0.3 : negative > positive ? -0.3 : 0;

      return NextResponse.json({
        response,
        crisisDetected,
        indicators: crisisDetected ? crisisKeywords.filter(keyword => lowerMessage.includes(keyword)) : [],
        sentiment,
        timestamp: new Date().toISOString()
      });

    } catch (openaiError) {
      console.error('OpenAI API Error:', openaiError);
      
      // Fallback responses based on content analysis
      const fallbackResponse = generateFallbackResponse(message, crisisDetected);
      
      return NextResponse.json({
        response: fallbackResponse,
        crisisDetected,
        indicators: crisisDetected ? crisisKeywords.filter(keyword => lowerMessage.includes(keyword)) : [],
        sentiment: 0,
        fallback: true
      });
    }

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function generateFallbackResponse(message: string, crisisDetected: boolean): string {
  const lowerMessage = message.toLowerCase();

  if (crisisDetected) {
    const crisisResponses = [
      "I hear you, and I'm really concerned about what you're going through. You matter, and your feelings are valid. Have you been able to talk to anyone about these thoughts?",
      "Thank you for trusting me with something so difficult. You're not alone in this, even when it feels like you are. What's been the hardest part of your day today?",
      "I'm glad you're here talking to me right now. That takes courage. These feelings you're having - how long have they been this intense?",
      "You reached out, which shows incredible strength. I want you to know that there are people who can help. Can you tell me if you have anyone in your life you trust?"
    ];
    return crisisResponses[Math.floor(Math.random() * crisisResponses.length)];
  }

  // Contextual responses based on message content
  if (lowerMessage.includes('stressed') || lowerMessage.includes('overwhelmed')) {
    const stressResponses = [
      "Feeling overwhelmed is really tough. What's been piling up on you lately?",
      "Stress can feel like it's taking over everything. What would help you feel even a little bit lighter right now?",
      "That sounds incredibly stressful. Sometimes when everything feels like too much, it helps to focus on just one small thing. What's one thing that might help you today?"
    ];
    return stressResponses[Math.floor(Math.random() * stressResponses.length)];
  }

  if (lowerMessage.includes('sad') || lowerMessage.includes('depressed')) {
    const sadnessResponses = [
      "I'm sorry you're feeling this way. Sadness can feel so heavy. What's been weighing on your heart?",
      "That sounds really difficult. Sometimes sadness needs to be felt and acknowledged. What's been going through your mind?",
      "I hear the pain in what you're sharing. You don't have to carry this alone. What has this sadness been like for you?"
    ];
    return sadnessResponses[Math.floor(Math.random() * sadnessResponses.length)];
  }

  if (lowerMessage.includes('angry') || lowerMessage.includes('frustrated')) {
    const angerResponses = [
      "Anger can be so consuming. It sounds like something really got to you. What happened?",
      "That frustration sounds intense. Sometimes anger is covering up other feelings - what do you think might be underneath it?",
      "It makes sense that you'd be angry about that. What's been the most frustrating part?"
    ];
    return angerResponses[Math.floor(Math.random() * angerResponses.length)];
  }

  if (lowerMessage.includes('lonely') || lowerMessage.includes('alone')) {
    const lonelinessResponses = [
      "Loneliness can feel so isolating. I'm here with you right now. What's been making you feel most alone?",
      "Feeling alone is one of the hardest things. You're not as alone as you might think, even though I know it feels that way. What would connection look like for you?",
      "I hear how lonely you've been feeling. That's really hard. What used to help you feel connected to others?"
    ];
    return lonelinessResponses[Math.floor(Math.random() * lonelinessResponses.length)];
  }

  // General supportive responses
  const generalResponses = [
    "I'm listening. Tell me more about what's been going on.",
    "That sounds like a lot to deal with. How are you handling all of this?",
    "I appreciate you sharing that with me. What's been on your mind the most?",
    "Thanks for being open with me. What would be most helpful to talk about right now?",
    "I can hear this is important to you. Help me understand what this has been like.",
    "That takes courage to share. What's been the hardest part about this situation?"
  ];
  
  return generalResponses[Math.floor(Math.random() * generalResponses.length)];
}