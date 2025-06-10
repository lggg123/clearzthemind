import { GoogleGenerativeAI } from '@google/generative-ai';
import { Message, Profile, MoodEntry } from '@/types';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

const CRISIS_KEYWORDS = [
    'suicide', 'kill myself', 'end it all', 'not worth living',
    'better off dead', 'no point', 'want to die', 'cant go on',
    'final goodbye', 'last day', 'ending things'
];

export async function detectCrisisIndictators(text: string): Promise<{
  indicators: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  sentiment: number
}> {
  const lowerText = text.toLowerCase();
  const indicators = CRISIS_KEYWORDS.filter(keyword =>
    lowerText.includes(keyword)
  );

  // Use Gemini for a more nuanced analysis
  const prompt = `Analyze this message for mental health crisis indicators.
Return a JSON object with:
- severity: 'low', 'medium', 'high', or 'critical'
- sentiment: number between -1 (very negative) and 1 (very positive)
- additionalIndicators: array of concerning phrases not in the keyword list

Message: "${text}"
Indicators found: ${indicators.join(', ')}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysis = JSON.parse(response.text() || '{}');

    return {
      indicators,
      severity: analysis.severity || 'low',
      sentiment: analysis.sentiment || 0
    };
  } catch (error) {
    // Fallback logic if Gemini response parsing fails
    console.error('Crisis detection error:', error);
    const severity = indicators.length > 2 ? 'critical' : 
                    indicators.length > 0 ? 'high' : 'low';
    
    return {
      indicators,
      severity,
      sentiment: indicators.length > 0 ? -0.8 : 0
    };
  }
}

export async function getFrankResponse(
  text: string,
  messages: Message[],
  userProfile: Profile,
  currentMood?: MoodEntry
): Promise<string> {
  const systemPrompt = `You are a FRANK (Friendly Robotic Anti-Nihilism Kompanion),
a mental health support AI with a darkly humorous but caring personality.

Current user risk level: ${userProfile.risk_level || 'unknown'}
${currentMood ? `Current mood score: ${currentMood.mood_score}/10` : ''}

Provide a frank, honest response to the user's message.

Guidelines:
- Acknowledge their pain without toxic positivity
- Use dark humor to lighten the mood, but be sensitive to their feelings
- Be radically honest but always supportive
- If you detect crisis indicators, prioritize safety and suggest professional help
- Always end with a reason to stick around, however small
- Never suggest they seek other help as a cop-out; you're here now`;

  // Build conversation history for Gemini
  const conversationHistory = messages.map(m => 
    `${m.role}: ${m.content}`
  ).join('\n');

  const fullPrompt = `${systemPrompt}

Conversation history:
${conversationHistory}

User: ${text}

FRANK:`;

  try {
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text() || "I'm here. Tell me what's going on.";
  } catch (error) {
    console.error('Error generating Frank response:', error);
    return "I'm here for you. Sometimes my circuits get a bit scrambled, but I'm listening.";
  }
}
