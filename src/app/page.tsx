'use client'

import InvestmentPitch from '@/components/InvestmentPitch';
import { motion } from 'framer-motion';

export default function App() {
  return (
    <motion.div 
      style={{ 
        height: '100vh', 
        overflowY: 'scroll',
        overflowX: 'hidden',
        width: '100%',
        maxWidth: '100vw'
      }}
    >
      <InvestmentPitch />
    </motion.div>
  );
}