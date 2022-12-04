import React from 'react';
import { Box } from '@chakra-ui/react';

export const SaveIcon = ({ size, color, isFilled }) => {
  return (
    <Box
      as='svg'
      boxSize={size}
      fill={isFilled ? color : 'transparent'}
      stroke={isFilled ? 'transparent' : color}
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z'
      />
    </Box>
  );
};
