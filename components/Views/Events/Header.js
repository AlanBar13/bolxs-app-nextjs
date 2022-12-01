import React from 'react';
import {
  Avatar,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import { SearchIcon } from '../../../assets';

export const Header = () => {
  return (
    <Flex
      flexDir={{ base: 'column', md: 'row' }}
      gap='1.25rem'
      alignItems={{ md: 'center' }}
      justifyContent='space-between'>
      <Flex alignItems='center' gap='0.55rem'>
        <Avatar name='' bg='primary.500' src='https://bit.ly/dan-abramov' />
        <Flex flexDir='column'>
          <Text color='textSecondary' fontSize='13px' lineHeight='18px'>
            Bienvenido,
          </Text>
          <Text fontWeight='bold' fontSize='22px' lineHeight='25px'>
            Amante de eventos
          </Text>
        </Flex>
      </Flex>
      <InputGroup maxW={{ md: '22.3rem' }}>
        <InputLeftElement
          pointerEvents='none'
          children={<SearchIcon color='textMuted' size='1.2rem' />}
        />
		{/* TODO: MAKE INPUT WORKS */}
        <Input
          borderColor='transparent'
          rounded='xl'
          type='text'
          bg='inputBg'
          _placeholder={{ color: 'textMuted' }}
          placeholder='Buscar banda, evento, genero...'
          focusBorderColor='primary.500'
          _hover={{ borderColor: 'primary.600' }}
        />
      </InputGroup>
    </Flex>
  );
};
