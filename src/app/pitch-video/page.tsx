'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Play, Video, Download } from 'lucide-react';

export default function PitchVideoPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900/50 to-pink-900/50 p-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Pitch
            </Link>
            <div className="text-2xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
              Investment Pitch Video
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          {/* Title Section */}
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-6xl font-black mb-6 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent"
            >
              FRANK Pitch Video
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-2xl text-gray-300 mb-8"
            >
              Watch our comprehensive investment presentation
            </motion.p>
          </div>

          {/* Video Player Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-gray-900/50 p-8 rounded-xl border border-gray-700"
          >
            <div className="relative w-full max-w-4xl mx-auto">
              <div className="aspect-video bg-black rounded-lg overflow-hidden border border-gray-600">
                <iframe
                  src="https://www.youtube.com/embed/wCi-Vt77m2A?si=LnWz5_RHd2phGVnf"
                  title="FRANK Robotics - Investment Pitch Video"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>

          {/* Video Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <Video className="w-8 h-8 text-red-400" />
                <h2 className="text-3xl font-bold text-red-400">What You&apos;ll Learn</h2>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span><strong>The Crisis:</strong> Mental health emergency statistics and current system failures</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span><strong>FRANK Solution:</strong> How our AI companion addresses the crisis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span><strong>Technology Deep Dive:</strong> Neural pathways, crisis detection, and AI capabilities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span><strong>Market Opportunity:</strong> $240B addressable market and growth projections</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span><strong>Business Model:</strong> Revenue streams and unit economics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span><strong>Investment Ask:</strong> $10M Series A funding requirements</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <Play className="w-8 h-8 text-green-400" />
                <h2 className="text-3xl font-bold text-green-400">Video Details</h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Duration</span>
                  <span className="text-green-400 font-bold">12 minutes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Format</span>
                  <span className="text-green-400 font-bold">HD Video</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Presenter</span>
                  <span className="text-green-400 font-bold">George Lugo, CEO</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Target Audience</span>
                  <span className="text-green-400 font-bold">Investors</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Last Updated</span>
                  <span className="text-green-400 font-bold">December 2024</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Additional Resources</h3>
                <div className="space-y-3">
                  <Link
                    href="/frank-technical-deck.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Technical Architecture Deck
                  </Link>
                  <Link
                    href="/executive-summary"
                    className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Executive Summary
                  </Link>
                  <Link
                    href="/financials"
                    className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Financial Projections
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Key Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-8 rounded-xl border border-purple-500/30"
          >
            <h2 className="text-4xl font-bold text-purple-400 mb-8 text-center">Key Investment Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-black text-purple-400 mb-2">47K</div>
                <div className="text-white font-bold mb-1">Annual Deaths</div>
                <div className="text-gray-400 text-sm">Suicide crisis in US</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-purple-400 mb-2">$240B</div>
                <div className="text-white font-bold mb-1">Market Size</div>
                <div className="text-gray-400 text-sm">Mental health sector</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-purple-400 mb-2">94%</div>
                <div className="text-white font-bold mb-1">Accuracy</div>
                <div className="text-gray-400 text-sm">Crisis detection</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-purple-400 mb-2">$10M</div>
                <div className="text-white font-bold mb-1">Series A</div>
                <div className="text-gray-400 text-sm">Funding target</div>
              </div>
            </div>
          </motion.div>

          {/* Chapters/Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="bg-gray-900/50 p-8 rounded-xl border border-gray-700"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Video Timeline</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-black/30 rounded-lg border border-gray-600">
                <span className="text-red-400 font-mono font-bold">0:00</span>
                <span className="text-white font-bold">Introduction & Crisis Overview</span>
                <span className="text-gray-400 flex-1">Mental health crisis statistics and urgency</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-black/30 rounded-lg border border-gray-600">
                <span className="text-red-400 font-mono font-bold">2:30</span>
                <span className="text-white font-bold">The FRANK Solution</span>
                <span className="text-gray-400 flex-1">AI companion technology and capabilities</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-black/30 rounded-lg border border-gray-600">
                <span className="text-red-400 font-mono font-bold">5:15</span>
                <span className="text-white font-bold">Technology Deep Dive</span>
                <span className="text-gray-400 flex-1">Neural pathways and crisis detection algorithms</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-black/30 rounded-lg border border-gray-600">
                <span className="text-red-400 font-mono font-bold">7:45</span>
                <span className="text-white font-bold">Market Opportunity</span>
                <span className="text-gray-400 flex-1">$240B market size and growth projections</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-black/30 rounded-lg border border-gray-600">
                <span className="text-red-400 font-mono font-bold">9:30</span>
                <span className="text-white font-bold">Business Model & Financials</span>
                <span className="text-gray-400 flex-1">Revenue streams and unit economics</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-black/30 rounded-lg border border-gray-600">
                <span className="text-red-400 font-mono font-bold">11:00</span>
                <span className="text-white font-bold">Investment Ask & Next Steps</span>
                <span className="text-gray-400 flex-1">$10M Series A and call to action</span>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="flex flex-col md:flex-row gap-4 justify-center pt-8"
          >
            <Link 
              href="/showcase" 
              className="bg-green-500 hover:bg-green-600 text-black px-8 py-4 rounded-lg font-bold text-xl transition-all transform hover:scale-105"
            >
              See Live Demo
            </Link>
            <Link
              href="/contact"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-xl transition-all transform hover:scale-105"
            >
              Schedule Meeting
            </Link>
            <Link
              href="/"
              className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg font-bold text-xl transition-all transform hover:scale-105"
            >
              Back to Pitch
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
