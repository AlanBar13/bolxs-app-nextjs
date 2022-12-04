import React from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { formatDateSpanish } from '../../../../lib/utils';

export const MainSection = ({ eventName, status, desc, startDate }) => {
  return (
    <Flex flexDir='column' gap='1rem'>
      <Heading fontSize='clamp(3rem, 8vw, 6rem)'>{eventName}</Heading>
      <Flex gap='1rem' alignItems='center'>
        <Text
          fontSize='calc(1rem, 8vw, 1.25rem)'
          textTransform='capitalize'
          color='textSecondary'>
          {formatDateSpanish(startDate)}
        </Text>
        <Box as='span' bg='#BF94DC' px='1rem' py='0.2rem' rounded='1.25rem'>
          <Text
            fontWeight='bold'
            fontSize='calc(1rem, 8vw, 1.25rem)'
            textTransform='uppercase'
            color='theme.200'>
            {status}
          </Text>
        </Box>
      </Flex>
      <Flex flexDir='column'>
        <Text
          fontSize='calc(1rem, 8vw, 1.25rem)'
          color='white'
          fontWeight='bold'>
          Auditorio Josefa Ortiz de Dominguez
        </Text>
        <Text fontSize='calc(1rem, 8vw, 1.25rem)' color='textSecondary'>
          Queretaro, Queretaro
        </Text>
      </Flex>
      <Flex flexDir='column' mt='1rem'>
        <Text fontSize='calc(1rem, 8vw, 1.25rem)' color='textSecondary'>
          {desc}
        </Text>
      </Flex>
    </Flex>
  );
};
