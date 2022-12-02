import React from 'react';
import { motion } from 'framer-motion';
import { SignupForm } from './components/SignupForm';

export const SignupContent = ({requestRes}) => {
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
      <SignupForm requestRes={requestRes} />
    </motion.section>
  );
};
