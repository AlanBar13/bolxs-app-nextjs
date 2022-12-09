import { Box } from '@chakra-ui/react';
import React from 'react';

export const MinusIcon = ({ size, color }) => {
  return (
    <Box
      as='svg'
      boxSize={size}
      fill={color}
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        d='M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
        clipRule='evenodd'
      />
    </Box>
  );
};
