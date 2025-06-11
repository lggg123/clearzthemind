'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import NavigationBar from '@/components/NavBar';
import Financials from '@/components/Financials';
import { useEffect } from 'react';

export default function FinancialsPage() {
  // Force white background on mount
  useEffect(() => {
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.color = '#111827';
    document.documentElement.style.backgroundColor = '#ffffff';
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="bg-white text-gray-900 min-h-screen w-full overflow-x-hidden" style={{ backgroundColor: '#ffffff' }}>
      {/* Navigation */}
      <NavigationBar />

      {/* Main Content - Financials Component */}
      <div className="pt-20 bg-white">
        <Financials />
      </div>

      {/* Call to Action Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-cyan-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-black mb-6 text-gray-900"
          >
            Ready to <span className="text-cyan-500">Scale Together?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl text-cyan-600 mb-8 font-bold"
          >
            $15M Gets Us to 1,000 Lives Saved and Cash Flow Positive
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
          >
            <a
              href="mailto:invest@frank-robotics.com"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Schedule Investment Discussion
            </a>
            <Link
              href="/pitch"
              className="bg-transparent border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300"
            >
              View Full Pitch
            </Link>
            <Link
              href="/"
              className="bg-transparent border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300"
            >
              Back to Home
            </Link>
          </motion.div>

          {/* Simple stats without complex animations */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center"
            >
              <div className="text-3xl font-black mb-2 text-cyan-500">47,000</div>
              <div className="text-gray-600">Lives to Save Annually</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-center"
            >
              <div className="text-3xl font-black mb-2 text-pink-500">$14.2B</div>
              <div className="text-gray-600">Addressable Market</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center"
            >
              <div className="text-3xl font-black mb-2 text-purple-500">96x</div>
              <div className="text-gray-600">Target Return</div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
