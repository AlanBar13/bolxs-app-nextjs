import React from 'react';
import { Center, Flex, IconButton, Text } from '@chakra-ui/react';
import { CurrencyIcon, SaveIcon } from '../../../../assets';
import {
  getDay,
  getMonth,
  formatDateDayTime,
  formatPriceFixed,
} from '../../../../lib/utils';

// TODO: ADD TO KART AND SAVE EVENT

export const Ticket = ({ start_date, price, type }) => {
  return (
    <Flex
      alignItems='center'
      justifyContent='space-between'
      rounded='0.3rem'
      p='0.3rem'
      bg='inputBg'
      maxW={{ md: '21rem' }}>
      <Flex alignItems='center' gap='1rem'>
        <Center bg='textSecondary' flexDir='column' p='0.5rem' rounded='0.3rem'>
          <Text
            fontWeight='bold'
            fontSize='1rem'
            lineHeight='1rem'
            color='theme.500'>
            {getDay(start_date)}
          </Text>
          <Text
            fontWeight='bold'
            fontSize='1rem'
            lineHeight='1rem'
            textTransform='uppercase'
            color='theme.500'>
            {getMonth(start_date)}
          </Text>
        </Center>
        <Flex flexDir='column'>
          <Text
            textTransform='capitalize'
            fontSize='1rem'
            lineHeight='1rem'
            color='white'>
            {type}
          </Text>
          <Text
            textTransform='capitalize'
            fontSize='0.8rem'
            lineHeight='0.8rem'
            color='textSecondary'>
            {formatDateDayTime(start_date)}
          </Text>
          <Text fontSize='0.8rem' lineHeight='0.8rem' color='textSecondary'>
            {formatPriceFixed(price)}
          </Text>
        </Flex>
      </Flex>
      <Flex alignItems='center' gap='1rem'>
        <IconButton
          bg='theme.200'
          color='white'
          size='md'
          _hover={{ bg: 'theme.200', filter: 'brightness(1.2)' }}
          _active={{ bg: 'theme.200', filter: 'brightness(0.9)' }}
          icon={<CurrencyIcon size='1.2rem' color='white' />}
        />
        <IconButton
          bg='textSecondary'
          size='md'
          _hover={{ bg: 'textSecondary', filter: 'brightness(1.2)' }}
          _active={{ bg: 'textSecondary', filter: 'brightness(0.9)' }}
          icon={<SaveIcon size='1.2rem' color='theme.500' />}
        />
      </Flex>
    </Flex>
  );
};
