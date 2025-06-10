'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Brain, Users, Target, TrendingUp } from 'lucide-react';

export default function ExecutiveSummaryPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 p-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Pitch
            </Link>
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Executive Summary
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
              className="text-6xl font-black mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
            >
              FRANK Robotics
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-2xl text-gray-300 mb-8"
            >
              Executive Summary & Investment Opportunity
            </motion.p>
          </div>

          {/* Key Metrics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <div className="bg-gradient-to-br from-red-900/30 to-red-700/30 p-6 rounded-xl border border-red-500/30">
              <div className="text-4xl font-black text-red-400 mb-2">47K</div>
              <div className="text-red-300 font-semibold">Annual Suicides</div>
              <div className="text-gray-400 text-sm">One every 11 minutes</div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-700/30 p-6 rounded-xl border border-blue-500/30">
              <div className="text-4xl font-black text-blue-400 mb-2">$240B</div>
              <div className="text-blue-300 font-semibold">Market Size</div>
              <div className="text-gray-400 text-sm">Global mental health</div>
            </div>
            <div className="bg-gradient-to-br from-green-900/30 to-green-700/30 p-6 rounded-xl border border-green-500/30">
              <div className="text-4xl font-black text-green-400 mb-2">94%</div>
              <div className="text-green-300 font-semibold">Accuracy</div>
              <div className="text-gray-400 text-sm">Crisis detection</div>
            </div>
            <div className="bg-gradient-to-br from-purple-900/30 to-purple-700/30 p-6 rounded-xl border border-purple-500/30">
              <div className="text-4xl font-black text-purple-400 mb-2">$10M</div>
              <div className="text-purple-300 font-semibold">Series A</div>
              <div className="text-gray-400 text-sm">Funding round</div>
            </div>
          </motion.div>

          {/* Main Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Problem & Solution */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="space-y-8"
            >
              <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="w-8 h-8 text-red-400" />
                  <h2 className="text-3xl font-bold text-red-400">The Problem</h2>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span><strong>47,000 Americans</strong> die by suicide annually (one every 11 minutes)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span><strong>Crisis Response Failures:</strong> 6-month wait times, $200+ per session</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span><strong>Youth Crisis:</strong> 50% increase in teen suicide rates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span><strong>Scale Problem:</strong> 970M people affected worldwide</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <Brain className="w-8 h-8 text-green-400" />
                  <h2 className="text-3xl font-bold text-green-400">The Solution</h2>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong>24/7 AI Companion:</strong> Humanoid robot with 0.3s response time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong>Crisis Detection:</strong> Real-time emotional analysis & intervention</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong>Neural Mapping:</strong> Individual brain pattern analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong>Predictive Care:</strong> Proactive intervention before crisis</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Market & Business Model */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="space-y-8"
            >
              <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="w-8 h-8 text-purple-400" />
                  <h2 className="text-3xl font-bold text-purple-400">Market Opportunity</h2>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span><strong>$240B Market:</strong> Global mental health growing 25% annually</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span><strong>970M People:</strong> Affected by mental health issues worldwide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span><strong>$4.2T Impact:</strong> Economic cost of mental health crisis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span><strong>Underserved:</strong> 90% lack access to quality care</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-8 h-8 text-blue-400" />
                  <h2 className="text-3xl font-bold text-blue-400">Business Model</h2>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span><strong>B2B2C Model:</strong> Healthcare systems, schools, employers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span><strong>SaaS Subscription:</strong> $50-200/month per user</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span><strong>Hardware Sales:</strong> $5,000-15,000 per unit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span><strong>API Licensing:</strong> Third-party integrations</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Investment Ask */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 p-8 rounded-xl border border-yellow-500/30 text-center"
          >
            <h2 className="text-4xl font-bold text-yellow-400 mb-4">Investment Ask</h2>
            <p className="text-2xl text-gray-300 mb-6">
              <strong>$10M Series A</strong> to accelerate development and scale manufacturing
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div>
                <h3 className="text-xl font-bold text-yellow-400 mb-2">Use of Funds</h3>
                <ul className="space-y-1 text-gray-300">
                  <li>• 40% R&D & AI Development</li>
                  <li>• 30% Manufacturing Scale</li>
                  <li>• 20% Market Expansion</li>
                  <li>• 10% Team Growth</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-yellow-400 mb-2">Milestones</h3>
                <ul className="space-y-1 text-gray-300">
                  <li>• FDA approval process</li>
                  <li>• 200 unit manufacturing</li>
                  <li>• 10 healthcare partnerships</li>
                  <li>• Series B readiness</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-yellow-400 mb-2">Team</h3>
                <ul className="space-y-1 text-gray-300">
                  <li>• George Lugo (Founder/CEO)</li>
                  <li>• AI/ML Engineering Team</li>
                  <li>• Clinical Advisory Board</li>
                  <li>• Mental Health Specialists</li>
                </ul>
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
