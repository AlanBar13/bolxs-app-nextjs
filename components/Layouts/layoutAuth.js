import React from 'react';
import { motion } from 'framer-motion';

export default function LayoutAuth({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
      }}>
      {children}
    </motion.main>
  );
}
