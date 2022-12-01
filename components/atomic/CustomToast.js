import React from 'react';
import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import {
  CheckCircle,
  ExclamationCircle,
  InformationCircle,
  XCircle,
  XIcon,
} from '../../assets';

export const CustomToast = ({ title, desc, close, type }) => {
  let theme;
  switch (type) {
    case 'success':
      theme = '#10b981';
      break;
    case 'error':
      theme = '#f43f5e';
      break;
    case 'warning':
      theme = '#f59e0b';
      break;
    case 'info':
      theme = '#3b82f6';
      break;

    default:
      theme = '#10b981';
      break;
  }
  return (
    <Flex maxW='20rem' bg='theme.400' p='0.7rem' rounded='md' flexDir='column'>
      <Flex justifyContent='space-between' alignItems='center'>
        <Flex gap='0.6rem' alignItems='center'>
          {type === 'success' ? (
            <CheckCircle size='1.7rem' color={theme} />
          ) : type === 'error' ? (
            <XCircle size='1.7rem' color={theme} />
          ) : type === 'warning' ? (
            <ExclamationCircle size='1.7rem' color={theme} />
          ) : type === 'info' ? (
            <InformationCircle size='1.7rem' color={theme} />
          ) : (
            <CheckCircle size='1.7rem' color={theme} />
          )}
          <Text fontWeight='bold' color={theme}>
            {title}
          </Text>
        </Flex>
        <IconButton
          variant='ghost'
          size='xs'
          onClick={close}
          aria-label='close-toast'
          icon={<XIcon size='1rem' color='#93939E' />}
        />
      </Flex>
      {desc && (
        <Flex gap='0.6rem'>
          <Box boxSize='1.7rem' flexShrink='0' />
          <Text>{desc}</Text>
        </Flex>
      )}
    </Flex>
  );
};
