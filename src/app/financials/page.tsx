'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, DollarSign, TrendingUp, Users, Target, BarChart3, PieChart } from 'lucide-react';

export default function FinancialsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900/50 to-green-900/50 p-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Pitch
            </Link>
            <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              Financial Projections
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
          {/* Title Section */}
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-6xl font-black mb-6 bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent"
            >
              FRANK Financial Model
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-2xl text-gray-300 mb-8"
            >
              SaaS-like Unit Economics with Hardware Defensibility
            </motion.p>
          </div>

          {/* Revenue Projections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-gradient-to-br from-emerald-900/30 to-green-900/30 p-8 rounded-xl border border-emerald-500/30"
          >
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="w-8 h-8 text-emerald-400" />
              <h2 className="text-4xl font-bold text-emerald-400">Revenue Projections</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="text-3xl font-black text-emerald-400 mb-2">2025</div>
                <div className="text-xl text-white font-bold mb-1">$2M</div>
                <div className="text-gray-400 text-sm">Pilot Programs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-emerald-400 mb-2">2026</div>
                <div className="text-xl text-white font-bold mb-1">$15M</div>
                <div className="text-gray-400 text-sm">Market Entry</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-emerald-400 mb-2">2027</div>
                <div className="text-xl text-white font-bold mb-1">$65M</div>
                <div className="text-gray-400 text-sm">Scale Phase</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-emerald-400 mb-2">2028</div>
                <div className="text-xl text-white font-bold mb-1">$180M</div>
                <div className="text-gray-400 text-sm">Expansion</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-emerald-400 mb-2">2029</div>
                <div className="text-xl text-white font-bold mb-1">$400M</div>
                <div className="text-gray-400 text-sm">Market Leader</div>
              </div>
            </div>
          </motion.div>

          {/* Revenue Streams */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="bg-gray-900/50 p-8 rounded-xl border border-blue-500/30">
              <div className="flex items-center gap-3 mb-6">
                <DollarSign className="w-8 h-8 text-blue-400" />
                <h3 className="text-2xl font-bold text-blue-400">SaaS Subscriptions</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Individual Plan</span>
                  <span className="text-blue-400 font-bold">$50/month</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Family Plan</span>
                  <span className="text-blue-400 font-bold">$120/month</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Enterprise</span>
                  <span className="text-blue-400 font-bold">$200/month</span>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">Revenue Share</span>
                    <span className="text-blue-400 font-bold">60%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 p-8 rounded-xl border border-purple-500/30">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-8 h-8 text-purple-400" />
                <h3 className="text-2xl font-bold text-purple-400">Hardware Sales</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Home Unit</span>
                  <span className="text-purple-400 font-bold">$5,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Clinical Unit</span>
                  <span className="text-purple-400 font-bold">$15,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Enterprise Unit</span>
                  <span className="text-purple-400 font-bold">$25,000</span>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">Revenue Share</span>
                    <span className="text-purple-400 font-bold">25%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 p-8 rounded-xl border border-cyan-500/30">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="w-8 h-8 text-cyan-400" />
                <h3 className="text-2xl font-bold text-cyan-400">API & Licensing</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">API Calls</span>
                  <span className="text-cyan-400 font-bold">$0.10/call</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">White Label</span>
                  <span className="text-cyan-400 font-bold">$100K/year</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Data Insights</span>
                  <span className="text-cyan-400 font-bold">$50K/year</span>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">Revenue Share</span>
                    <span className="text-cyan-400 font-bold">15%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Unit Economics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div className="bg-gray-900/50 p-8 rounded-xl border border-green-500/30">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-8 h-8 text-green-400" />
                <h3 className="text-3xl font-bold text-green-400">SaaS Unit Economics</h3>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-green-400 mb-1">$1,800</div>
                    <div className="text-gray-300">Annual LTV</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400 mb-1">$180</div>
                    <div className="text-gray-300">CAC</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-green-400 mb-1">10:1</div>
                    <div className="text-gray-300">LTV:CAC Ratio</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400 mb-1">6 months</div>
                    <div className="text-gray-300">Payback Period</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-green-400 mb-1">85%</div>
                    <div className="text-gray-300">Gross Margin</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400 mb-1">95%</div>
                    <div className="text-gray-300">Retention Rate</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 p-8 rounded-xl border border-orange-500/30">
              <div className="flex items-center gap-3 mb-6">
                <PieChart className="w-8 h-8 text-orange-400" />
                <h3 className="text-3xl font-bold text-orange-400">Market Penetration</h3>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-orange-400 mb-1">970M</div>
                    <div className="text-gray-300">Total Addressable</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-400 mb-1">120M</div>
                    <div className="text-gray-300">Serviceable Market</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-orange-400 mb-1">15M</div>
                    <div className="text-gray-300">Initial Target</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-400 mb-1">2.5%</div>
                    <div className="text-gray-300">5-Year Penetration</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-orange-400 mb-1">$240B</div>
                    <div className="text-gray-300">Market Size</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-400 mb-1">25%</div>
                    <div className="text-gray-300">Growth Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Funding & Use of Funds */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 p-8 rounded-xl border border-yellow-500/30"
          >
            <h2 className="text-4xl font-bold text-yellow-400 mb-8 text-center">$10M Series A Allocation</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-black text-yellow-400 mb-2">40%</div>
                <div className="text-xl text-white font-bold mb-2">$4M</div>
                <div className="text-gray-300">R&D & AI Development</div>
                <ul className="text-sm text-gray-400 mt-2 space-y-1">
                  <li>• Advanced AI models</li>
                  <li>• Crisis detection algorithms</li>
                  <li>• Neural pathway mapping</li>
                </ul>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-yellow-400 mb-2">30%</div>
                <div className="text-xl text-white font-bold mb-2">$3M</div>
                <div className="text-gray-300">Manufacturing Scale</div>
                <ul className="text-sm text-gray-400 mt-2 space-y-1">
                  <li>• Production facilities</li>
                  <li>• Supply chain setup</li>
                  <li>• Quality systems</li>
                </ul>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-yellow-400 mb-2">20%</div>
                <div className="text-xl text-white font-bold mb-2">$2M</div>
                <div className="text-gray-300">Market Expansion</div>
                <ul className="text-sm text-gray-400 mt-2 space-y-1">
                  <li>• Sales & marketing</li>
                  <li>• Partnership development</li>
                  <li>• Market penetration</li>
                </ul>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-yellow-400 mb-2">10%</div>
                <div className="text-xl text-white font-bold mb-2">$1M</div>
                <div className="text-gray-300">Team Growth</div>
                <ul className="text-sm text-gray-400 mt-2 space-y-1">
                  <li>• Key hires</li>
                  <li>• Advisory board</li>
                  <li>• Operational scaling</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Key Metrics Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="bg-gray-900/50 p-8 rounded-xl border border-gray-700"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Key Performance Indicators</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">120%</div>
                <div className="text-gray-300 text-sm">Net Revenue Retention</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">$180</div>
                <div className="text-gray-300 text-sm">Customer Acquisition Cost</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">$1,800</div>
                <div className="text-gray-300 text-sm">Customer Lifetime Value</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400 mb-1">85%</div>
                <div className="text-gray-300 text-sm">Gross Margin</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400 mb-1">6 mo</div>
                <div className="text-gray-300 text-sm">Payback Period</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400 mb-1">95%</div>
                <div className="text-gray-300 text-sm">Customer Retention</div>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="flex flex-col md:flex-row gap-4 justify-center pt-8"
          >
            <Link 
              href="/executive-summary" 
              className="bg-emerald-500 hover:bg-emerald-600 text-black px-8 py-4 rounded-lg font-bold text-xl transition-all transform hover:scale-105"
            >
              Executive Summary
            </Link>
            <Link
              href="/contact"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-xl transition-all transform hover:scale-105"
            >
              Discuss Investment
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
