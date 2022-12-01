import React from 'react';
import { Box } from '@chakra-ui/react';

export const UserIcon = ({ isActive }) => {
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
        <path
          fillRule='evenodd'
          d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
          clipRule='evenodd'
        />
      ) : (
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          fillRule='evenodd'
          d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
          clipRule='evenodd'
        />
      )}
    </Box>
  );
};
