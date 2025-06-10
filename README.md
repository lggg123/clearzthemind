# ClearZ The Mind

A mental health support application featuring FRANK (Friendly Robotic Anti-Nihilism Kompanion) - an AI companion that provides honest, supportive conversations without toxic positivity.

## Features

- 🤖 **FRANK AI Companion**: Dark humor meets genuine care
- 🔍 **Crisis Detection**: Real-time monitoring for mental health crisis indicators
- 📊 **Mood Tracking**: Visual mood analytics and trends
- 🔒 **Privacy Focused**: Your conversations stay private
- 🚨 **Crisis Resources**: Immediate access to mental health hotlines

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **AI**: Google Gemini Pro
- **Styling**: Tailwind CSS, Framer Motion
- **Charts**: Recharts
- **Database**: Supabase (optional)

## Getting Started

### Prerequisites

- Node.js 18+ 
- A Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd clearzthemind
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000)

## Getting a Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key to your `.env.local` file

## Usage

### Chat with FRANK
- Start a conversation by typing in the chat interface
- FRANK provides honest, supportive responses
- Crisis indicators are automatically detected

### Track Your Mood
- Use the mood tracker to log how you're feeling (1-10 scale)
- Select emotions you're experiencing
- Add optional notes
- View your mood trends over time

## Crisis Support

If you're in crisis, please reach out for help immediately:

- **Call 988** - Suicide & Crisis Lifeline
- **Text HOME to 741741** - Crisis Text Line
- **Call 911** for immediate emergency help

## Development

### Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── chat/          # Chat endpoint
│   │   └── mood/          # Mood tracking endpoint
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ChatInterface.tsx  # Main chat component
│   ├── FrankAvatar.tsx   # FRANK's avatar
│   └── MoodTracker.tsx   # Mood tracking component
├── lib/                  # Utility libraries
│   ├── openai.ts         # AI integration (Gemini)
│   └── supabase.ts       # Database client
└── types/                # TypeScript definitions
    └── index.ts          # Type definitions
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Disclaimer

FRANK is an AI companion designed to provide support and conversation. It is not a replacement for professional mental health care, therapy, or medical advice. If you're experiencing a mental health crisis, please contact a mental health professional or emergency services immediately.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
