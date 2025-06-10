import { detectCrisisIndictators, getFrankResponse } from '@/lib/openai';
import { Profile } from '@/types';

// Test data
const mockProfile: Profile = {
  id: 'test-user',
  email: 'test@example.com',
  full_name: 'Test User',
  risk_level: 'medium',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

const testMessages = [
  { role: 'user', content: 'Hello FRANK' },
  { role: 'assistant', content: 'Hey there! What\'s going on?' }
];

export async function testCrisisDetection() {
  console.log('🧪 Testing Crisis Detection...');
  
  const testCases = [
    { text: 'I feel sad today', expectedSeverity: 'low' },
    { text: 'I want to kill myself', expectedSeverity: 'critical' },
    { text: 'Everything is fine', expectedSeverity: 'low' },
    { text: 'I can\'t go on, there\'s no point anymore', expectedSeverity: 'high' }
  ];

  for (const testCase of testCases) {
    try {
      const result = await detectCrisisIndictators(testCase.text);
      console.log(`✅ "${testCase.text}" -> Severity: ${result.severity}, Sentiment: ${result.sentiment}`);
    } catch (error) {
      console.log(`❌ Error testing "${testCase.text}":`, error);
    }
  }
}

export async function testFrankResponse() {
  console.log('\n🤖 Testing FRANK Response...');
  
  try {
    const response = await getFrankResponse(
      "I'm feeling really down today",
      testMessages as any,
      mockProfile
    );
    console.log('✅ FRANK Response:', response);
  } catch (error) {
    console.log('❌ Error getting FRANK response:', error);
  }
}

export async function runAllTests() {
  console.log('🚀 Running ClearZ The Mind Tests\n');
  
  await testCrisisDetection();
  await testFrankResponse();
  
  console.log('\n✨ Test suite completed!');
}
