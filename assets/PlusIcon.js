import React from 'react';
import { Box } from '@chakra-ui/react';

export const PlusIcon = ({ size, color }) => {
  return (
    <Box
      as='svg'
      boxSize={size}
      fill={color}
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
        clipRule='evenodd'></path>
    </Box>
  );
};
