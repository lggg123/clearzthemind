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
    <>
      <style jsx>{`
        .cta-link {
          text-decoration: none !important;
          border-width: 1px !important;
          box-sizing: border-box !important;
        }
        .cta-link:hover {
          text-decoration: none !important;
        }
        .cta-link:focus {
          text-decoration: none !important;
        }
        .cta-link:active {
          text-decoration: none !important;
        }
        .cta-link:visited {
          text-decoration: none !important;
        }
        
        /* Override any global link styles specifically for our CTA buttons */
        .cta-button-container .cta-link {
          border-width: 1px !important;
          border-style: solid !important;
          width: auto !important;
          max-width: none !important;
          min-width: fit-content !important;
          display: inline-block !important;
        }
        
        /* Specific border colors for each button */
        .cta-button-container .cta-link[href="/pitch"] {
          border-color: #111827 !important;
        }
        
        .cta-button-container .cta-link[href="/"] {
          border-color: #06b6d4 !important;
        }
      `}</style>
      <div className="bg-white text-gray-900 min-h-screen w-full overflow-x-hidden" style={{ backgroundColor: '#ffffff' }}>
      {/* Navigation */}
      <NavigationBar />

      {/* Main Content - Financials Component */}
      <div className="bg-white">
        <Financials />
      </div>

      {/* Call to Action Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-cyan-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-black mb-6 text-gray-900"
          >
            Ready to <span className="text-cyan-500">Scale Together?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl text-cyan-600 mb-8 font-bold"
          >
            $15M Gets Us to 1,000 Lives Saved and Cash Flow Positive
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="cta-button-container flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          >
            <a
              href="mailto:invest@frank-robotics.com"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              style={{
                minWidth: '200px',
                textAlign: 'center'
              }}
            >
              Schedule Investment Discussion
            </a>
            <Link
              href="/pitch"
              className="cta-link bg-transparent text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 no-underline"
              style={{
                textDecoration: 'none',
                color: '#111827',
                backgroundColor: 'transparent',
                border: '1px solid #111827',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: '#111827',
                display: 'inline-block',
                minWidth: '180px',
                textAlign: 'center',
                flex: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#111827';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = '#111827';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#111827';
                e.currentTarget.style.borderColor = '#111827';
              }}
            >
              View Full Pitch
            </Link>
            <Link
              href="/"
              className="cta-link bg-transparent text-cyan-500 hover:bg-cyan-500 hover:text-white px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 no-underline"
              style={{
                textDecoration: 'none',
                color: '#06b6d4',
                backgroundColor: 'transparent',
                border: '1px solid #06b6d4',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: '#06b6d4',
                display: 'inline-block',
                minWidth: '180px',
                textAlign: 'center',
                flex: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#06b6d4';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = '#06b6d4';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#06b6d4';
                e.currentTarget.style.borderColor = '#06b6d4';
              }}
            >
              Back to Home
            </Link>
          </motion.div>

          {/* Simple stats without complex animations */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <div
              className="text-center"
            >
              <div className="text-3xl font-black mb-2 text-cyan-500">47,000</div>
              <div className="text-gray-600">Lives to Save Annually</div>
            </div>
            <div
              className="text-center"
            >
              <div className="text-3xl font-black mb-2 text-pink-500">$14.2B</div>
              <div className="text-gray-600">Addressable Market</div>
            </div>
            <div
              className="text-center"
            >
              <div className="text-3xl font-black mb-2 text-purple-500">96x</div>
              <div className="text-gray-600">Target Return</div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
}
