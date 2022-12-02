import React from 'react';
import { motion } from 'framer-motion';
import { LoginForm } from './components/LoginForm';

// TODO: METHOD TO RECOVER PASSWORD

export const LoginContent = ({ requestRes }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: 'easeOut', duration: 0.2 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2.5rem',
        width: '100%',
      }}>
      <LoginForm requestRes={requestRes} />
    </motion.section>
  );
};
