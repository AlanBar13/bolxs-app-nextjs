import React from 'react';
import { motion } from 'framer-motion';

export const LargeEntranceAnimation = () => {
  return (
    <>
      <motion.span
        style={{
          position: 'fixed',
          top: '0',
          left: '60%',
          height: '100vh',
          backgroundColor: '#2A0253',
          zIndex: 99
        }}
        initial={{ width: '0vh' }}
        animate={{ width: ['40vw', '0vw'] }}
        transition={{ ease: 'easeOut', duration: 1 }}
      />
      <motion.span
        style={{
          position: 'fixed',
          top: '0',
          right: '40%',
          height: '100vh',
          backgroundColor: '#2A0253',
          zIndex: 99
        }}
        initial={{ width: '0vh' }}
        animate={{ width: ['60vw', '0vw'] }}
        transition={{ ease: 'easeOut', duration: 1 }}
      />
    </>
  );
};
