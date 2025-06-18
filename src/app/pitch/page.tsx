'use client';

import { motion } from 'framer-motion';
import { Brain, Heart, Zap, TrendingUp, Users, DollarSign } from 'lucide-react';
import Link from 'next/link';
import NavigationBar from '@/components/NavBar';

export default function PitchPage() {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Navigation */}
      <NavigationBar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-cyan-50 to-white">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl font-black mb-6 text-gray-900"
          >
            FRANK: The Future of <span className="text-cyan-500">Mental Healthcare</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl text-gray-600 mb-8 max-w-4xl mx-auto"
          >
            Revolutionary AI-powered mental health companion that saves lives through 
            real-time crisis detection and personalized intervention.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/showcase"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-cyan-500/30 hover:scale-105"
            >
              🚀 See Live Demo
            </Link>
            <Link
              href="/financials"
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-pink-500/30 hover:scale-105"
            >
              📊 View Financials
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-black text-center mb-12 text-gray-900"
          >
            The Mental Health Crisis is <span className="text-red-500">Real</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white p-8 rounded-3xl border border-red-200 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-red-600 mb-4">1 Death Every 11 Minutes</h3>
              <p className="text-gray-600">Suicide rates have increased 50% among teens in the last decade. The current system is failing our most vulnerable.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white p-8 rounded-3xl border border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-orange-600 mb-4">970M People Affected</h3>
              <p className="text-gray-600">Nearly 1 billion people worldwide suffer from mental health issues, with limited access to effective treatment.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white p-8 rounded-3xl border border-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-yellow-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <DollarSign className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-yellow-600 mb-4">$4.2T Economic Impact</h3>
              <p className="text-gray-600">Mental health issues cost the global economy trillions in lost productivity and healthcare expenses annually.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-black text-center mb-12 text-gray-900"
          >
            FRANK: <span className="text-cyan-500">The Solution</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-bold text-cyan-600 mb-6">AI-Powered Crisis Detection</h3>
              <ul className="space-y-4 text-gray-600 text-lg">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-cyan-50 rounded-xl flex items-center justify-center mt-1 flex-shrink-0">
                    <Zap className="w-5 h-5 text-cyan-500" />
                  </div>
                  <span>Real-time emotional analysis through voice, text, and behavioral patterns</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-50 rounded-xl flex items-center justify-center mt-1 flex-shrink-0">
                    <Brain className="w-5 h-5 text-purple-500" />
                  </div>
                  <span>Neural pathway mapping for personalized intervention strategies</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-pink-50 rounded-xl flex items-center justify-center mt-1 flex-shrink-0">
                    <Heart className="w-5 h-5 text-pink-500" />
                  </div>
                  <span>24/7 availability with instant crisis response protocols</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-50 rounded-xl flex items-center justify-center mt-1 flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <span>Predictive analytics to prevent crises before they occur</span>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-cyan-50 to-blue-50 p-10 rounded-3xl border border-cyan-200 shadow-xl"
            >
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                <Brain className="w-12 h-12 text-cyan-500" />
              </div>
              <h4 className="text-2xl font-bold text-center text-cyan-700 mb-4">
                Friendly Robotic Anti-Nihilism Kompanion
              </h4>
              <p className="text-gray-600 text-center text-lg">
                FRANK combines cutting-edge AI with empathetic design to provide 
                immediate, personalized mental health support when it&apos;s needed most.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-black mb-12 text-gray-900"
          >
            Massive <span className="text-purple-500">Market Opportunity</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white p-8 rounded-3xl border border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="text-5xl font-black text-purple-500 mb-4 group-hover:scale-110 transition-transform">$240B</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Mental Health Market</h3>
              <p className="text-gray-600">Growing 25% annually with increasing demand for accessible solutions</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white p-8 rounded-3xl border border-pink-200 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="text-5xl font-black text-pink-500 mb-4 group-hover:scale-110 transition-transform">$50B</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Digital Health TAM</h3>
              <p className="text-gray-600">Total addressable market for AI-powered mental health solutions</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white p-8 rounded-3xl border border-cyan-200 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="text-5xl font-black text-cyan-500 mb-4 group-hover:scale-110 transition-transform">$10M</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Series A Funding</h3>
              <p className="text-gray-600">Investment needed to scale and save millions of lives</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 bg-gradient-to-b from-cyan-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-black mb-8 text-gray-900"
          >
            Ready to <span className="text-cyan-500">Save Lives</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8"
          >
            Join us in revolutionizing mental healthcare and preventing the next crisis.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/showcase"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl hover:scale-105"
            >
              🚀 Experience FRANK
            </Link>
            <a
              href="mailto:invest@frank-robotics.com"
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl hover:scale-105"
            >
              💎 Invest Now
            </a>
            <Link
              href="/financials"
              className="bg-transparent border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
            >
              📊 View Financials
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}