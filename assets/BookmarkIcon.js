import React from 'react';
import { Box } from '@chakra-ui/react';

export const BookmarkIcon = ({ isActive }) => {
  return (
    <Box
      as='svg'
      boxSize='2.5rem'
      fill={isActive ? '#8507D9' : 'transparent'}
      stroke={isActive ? 'transparent' : '#6503A6'}
      _hover={{
        filter: 'drop-shadow(0 0 11px rgba(133,7,217,1))',
      }}
      transition='ease-in-out'
      transitionDuration='300ms'
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'>
      {isActive ? (
        <path d='M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z' />
      ) : (
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z'
        />
      )}
    </Box>
  );
};
