import React from 'react';
import { motion } from 'framer-motion';

export default function Layout({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: '100vh',
        paddingInline: '1rem',
        paddingTop: '1.5rem',
        paddingBottom: '3.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
        marginBottom: '4rem'
      }}>
      {children}
    </motion.main>
  );
}
