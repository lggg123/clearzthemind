'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Building, Users, Target, Globe, Award, TrendingUp, Zap, Shield } from 'lucide-react';

export default function CompanyPresentationPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 p-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Pitch
            </Link>
            <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Company Presentation
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          {/* Hero Section */}
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-6xl font-black mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
            >
              FRANK Robotics
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-3xl text-gray-300 mb-4"
            >
              Friendly Robotic Anti-Nihilism Kompanion
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              Revolutionizing mental healthcare through AI-powered crisis intervention and 24/7 emotional support
            </motion.p>
          </div>

          {/* Company Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <Building className="w-8 h-8 text-indigo-400" />
                <h2 className="text-3xl font-bold text-indigo-400">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-300 mb-6">
                To eliminate preventable mental health crises through accessible, intelligent, and compassionate AI technology that provides immediate support when people need it most.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Target className="w-6 h-6 text-purple-400 mt-1" />
                  <div>
                    <h3 className="font-bold text-white mb-1">Vision</h3>
                    <p className="text-gray-400">A world where no one faces mental health crises alone</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-6 h-6 text-purple-400 mt-1" />
                  <div>
                    <h3 className="font-bold text-white mb-1">Impact</h3>
                    <p className="text-gray-400">Preventing suicides and improving mental wellness globally</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-8 h-8 text-purple-400" />
                <h2 className="text-3xl font-bold text-purple-400">Company Facts</h2>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-purple-400 mb-1">2024</div>
                  <div className="text-gray-300">Founded</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400 mb-1">15+</div>
                  <div className="text-gray-300">Team Members</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400 mb-1">94%</div>
                  <div className="text-gray-300">AI Accuracy</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400 mb-1">24/7</div>
                  <div className="text-gray-300">Availability</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400 mb-1">$10M</div>
                  <div className="text-gray-300">Series A Target</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400 mb-1">0.3s</div>
                  <div className="text-gray-300">Response Time</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Core Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 p-8 rounded-xl border border-blue-500/30"
          >
            <h2 className="text-4xl font-bold text-blue-400 mb-8 text-center">Core Technologies</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-blue-400 mb-3">Crisis Detection AI</h3>
                <p className="text-gray-300">Advanced natural language processing to identify crisis situations in real-time with 94% accuracy</p>
              </div>
              <div className="text-center">
                <div className="bg-cyan-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-cyan-400 mb-3">Neural Pathway Mapping</h3>
                <p className="text-gray-300">Personalized brain activity analysis to understand individual mental health patterns and triggers</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-purple-400 mb-3">Predictive Intervention</h3>
                <p className="text-gray-300">Proactive mental health support that intervenes before crises reach critical stages</p>
              </div>
            </div>
          </motion.div>

          {/* Product Suite */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="bg-gray-900/50 p-8 rounded-xl border border-green-500/30">
              <h3 className="text-2xl font-bold text-green-400 mb-4">FRANK Home</h3>
              <div className="text-4xl font-bold text-green-400 mb-4">$5,000</div>
              <ul className="space-y-2 text-gray-300 mb-6">
                <li>• Personal AI companion</li>
                <li>• 24/7 crisis monitoring</li>
                <li>• Family integration</li>
                <li>• Basic neural mapping</li>
                <li>• Emergency escalation</li>
              </ul>
              <div className="text-sm text-gray-400">Perfect for individuals and families seeking consistent mental health support</div>
            </div>

            <div className="bg-gray-900/50 p-8 rounded-xl border border-blue-500/30">
              <h3 className="text-2xl font-bold text-blue-400 mb-4">FRANK Clinical</h3>
              <div className="text-4xl font-bold text-blue-400 mb-4">$15,000</div>
              <ul className="space-y-2 text-gray-300 mb-6">
                <li>• Professional-grade AI</li>
                <li>• Advanced analytics</li>
                <li>• Therapist integration</li>
                <li>• Clinical reporting</li>
                <li>• HIPAA compliance</li>
              </ul>
              <div className="text-sm text-gray-400">Designed for healthcare providers and clinical settings</div>
            </div>

            <div className="bg-gray-900/50 p-8 rounded-xl border border-purple-500/30">
              <h3 className="text-2xl font-bold text-purple-400 mb-4">FRANK Enterprise</h3>
              <div className="text-4xl font-bold text-purple-400 mb-4">$25,000</div>
              <ul className="space-y-2 text-gray-300 mb-6">
                <li>• Multi-user platform</li>
                <li>• Custom AI training</li>
                <li>• White-label options</li>
                <li>• Enterprise security</li>
                <li>• API integrations</li>
              </ul>
              <div className="text-sm text-gray-400">Built for large organizations and healthcare systems</div>
            </div>
          </motion.div>

          {/* Market Position */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="bg-gray-900/50 p-8 rounded-xl border border-gray-700"
          >
            <h2 className="text-4xl font-bold text-white mb-8 text-center">Market Position & Competitive Advantage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">What Sets Us Apart</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <Award className="w-5 h-5 text-yellow-400 mt-1" />
                    <span><strong>First-to-Market:</strong> Only AI companion with real-time crisis detection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Award className="w-5 h-5 text-yellow-400 mt-1" />
                    <span><strong>Proven Technology:</strong> 94% accuracy in crisis identification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Award className="w-5 h-5 text-yellow-400 mt-1" />
                    <span><strong>Humanoid Design:</strong> Physical presence increases trust and engagement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Award className="w-5 h-5 text-yellow-400 mt-1" />
                    <span><strong>Scalable Platform:</strong> B2B2C model for rapid market penetration</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">Market Opportunity</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/30 p-4 rounded-lg border border-cyan-500/30">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">$240B</div>
                    <div className="text-gray-300 text-sm">Global Market Size</div>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg border border-cyan-500/30">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">25%</div>
                    <div className="text-gray-300 text-sm">Annual Growth Rate</div>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg border border-cyan-500/30">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">970M</div>
                    <div className="text-gray-300 text-sm">People Affected</div>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg border border-cyan-500/30">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">90%</div>
                    <div className="text-gray-300 text-sm">Underserved</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Leadership Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 p-8 rounded-xl border border-gray-700"
          >
            <h2 className="text-4xl font-bold text-white mb-8 text-center">Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">GL</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">George Lugo</h3>
                <p className="text-blue-400 font-semibold mb-3">Founder & CEO</p>
                <p className="text-gray-400 text-sm">Visionary leader with deep understanding of mental health challenges and AI technology applications</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">AI</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">AI Engineering Team</h3>
                <p className="text-green-400 font-semibold mb-3">Technical Leadership</p>
                <p className="text-gray-400 text-sm">World-class AI/ML engineers specializing in natural language processing and crisis detection</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">CA</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Clinical Advisory</h3>
                <p className="text-purple-400 font-semibold mb-3">Medical Expertise</p>
                <p className="text-gray-400 text-sm">Board-certified mental health professionals ensuring clinical accuracy and safety</p>
              </div>
            </div>
          </motion.div>

          {/* Company Milestones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="bg-gray-900/50 p-8 rounded-xl border border-gray-700"
          >
            <h2 className="text-4xl font-bold text-white mb-8 text-center">Company Milestones & Roadmap</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-green-900/30 p-6 rounded-lg border border-green-500/30">
                <div className="text-2xl font-bold text-green-400 mb-2">2024 Q4</div>
                <h3 className="font-bold text-white mb-2">Foundation</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Company founded</li>
                  <li>• Core team assembled</li>
                  <li>• Initial prototype</li>
                  <li>• Crisis detection MVP</li>
                </ul>
              </div>
              <div className="bg-blue-900/30 p-6 rounded-lg border border-blue-500/30">
                <div className="text-2xl font-bold text-blue-400 mb-2">2025 Q2</div>
                <h3 className="font-bold text-white mb-2">Development</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Series A funding</li>
                  <li>• Advanced AI models</li>
                  <li>• Clinical partnerships</li>
                  <li>• Beta testing program</li>
                </ul>
              </div>
              <div className="bg-purple-900/30 p-6 rounded-lg border border-purple-500/30">
                <div className="text-2xl font-bold text-purple-400 mb-2">2025 Q4</div>
                <h3 className="font-bold text-white mb-2">Launch</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• First 200 units</li>
                  <li>• Market entry</li>
                  <li>• FDA approval process</li>
                  <li>• Healthcare partnerships</li>
                </ul>
              </div>
              <div className="bg-yellow-900/30 p-6 rounded-lg border border-yellow-500/30">
                <div className="text-2xl font-bold text-yellow-400 mb-2">2026+</div>
                <h3 className="font-bold text-white mb-2">Scale</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• National expansion</li>
                  <li>• International markets</li>
                  <li>• Series B preparation</li>
                  <li>• Global impact</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 0.6 }}
            className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 p-8 rounded-xl border border-indigo-500/30 text-center"
          >
            <h2 className="text-4xl font-bold text-indigo-400 mb-6">Join the Mental Health Revolution</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Partner with FRANK Robotics to transform mental healthcare and save lives through innovative AI technology
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
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
                Partner With Us
              </Link>
              <Link
                href="/waitlist"
                className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-lg font-bold text-xl transition-all transform hover:scale-105"
              >
                Join Waitlist
              </Link>
              <Link
                href="/"
                className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg font-bold text-xl transition-all transform hover:scale-105"
              >
                Back to Pitch
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
