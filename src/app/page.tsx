'use-client'

import { motion } from 'framer-motion';

export default function App() {
  return (
    <motion.div style={{ height: '100vh', overflowY: 'scroll' }}>
      <InvestmentPitch />
    </motion.div>
  );
}