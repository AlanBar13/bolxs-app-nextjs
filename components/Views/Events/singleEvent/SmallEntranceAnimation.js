import React from 'react';
import { motion } from 'framer-motion';

export const SmallEntranceAnimation = () => {
  return (
    <>
      <motion.span
        style={{
          position: 'fixed',
          bottom: '60%',
          left: '0',
          width: '100vw',
          backgroundColor: '#2A0253',
          zIndex: 99
        }}
        initial={{ height: '0vh' }}
        animate={{ height: ['40vh', '0vh'] }}
        transition={{ ease: 'easeOut', duration: 1 }}
      />
      <motion.span
        style={{
          position: 'fixed',
          top: '40%',
          left: '0',
          transformOrigin: 'center',
          width: '100vw',
          backgroundColor: '#2A0253',
          zIndex: 99
        }}
        initial={{ height: '0vh' }}
        animate={{ height: ['60vh', '0vh'] }}
        transition={{ ease: 'easeOut', duration: 1 }}
      />
    </>
  );
};
