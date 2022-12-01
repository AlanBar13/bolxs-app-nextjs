import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { EyeIcon, EyeOffIcon } from '../../../assets';

// TODO: FORM MUST BE REACTIVE
// ENSURE THAT THE LOGIN METHOD WORKS
// REFACTOR INTO SMALL COMPONENTS

export const LoginContent = ({ isLoading, login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [togglePassword, setTogglePassword] = useState(false);
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: 'easeOut', duration: 0.2 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2.5rem',
        width: '100%',
      }}>
      <Flex flexDir='column' alignItems='center' gap='1.5rem' w='100%'>
        <Input
          borderColor='transparent'
          rounded='xl'
          value={email}
          onChange={e => setEmail(e.target.value)}
          type='email'
          bg='inputBg'
          _placeholder={{ color: 'textMuted' }}
          placeholder='Correo'
          focusBorderColor='primary.500'
          _hover={{ borderColor: 'primary.600' }}
        />
        <InputGroup>
          <Input
            borderColor='transparent'
            rounded='xl'
            value={password}
            onChange={e => setPassword(e.target.value)}
            type={togglePassword ? 'text' : 'password'}
            bg='inputBg'
            _placeholder={{ color: 'textMuted' }}
            placeholder='Contraseña'
            focusBorderColor='primary.500'
            _hover={{ borderColor: 'primary.600' }}
          />
          <InputRightElement
            children={
              <IconButton
                variant='ghost'
                aria-label='toggle-password'
                onClick={() => setTogglePassword(!togglePassword)}
                icon={
                  togglePassword ? (
                    <EyeOffIcon color='textMuted' size='1.2rem' />
                  ) : (
                    <EyeIcon color='textMuted' size='1.2rem' />
                  )
                }
              />
            }
          />
        </InputGroup>
      </Flex>
      <Flex flexDir='column' alignItems='center' gap='1.5rem' w='100%'>
        <Button
          w='full'
          h='fit-content'
          variant='unstyled'
          fontFamily='heading'
          bg='theme.200'
          rounded='lg'
          fontSize='2xl'
          pt='0.6rem'
          pb='0.3rem'
          onClick={() => login()}>
          {isLoading ? <Spinner color='primary.400' /> : 'Login'}
        </Button>
      </Flex>
      <Flex flexDir='column' gap='1.5rem' w='100%'>
        <Flex gap='0.7rem' alignItems='center'>
          <Text>Olvidate tu contraseña?</Text>
          <Button variant='link' colorScheme='primary' fontWeight='normal'>
            Recordar
          </Button>
        </Flex>
      </Flex>
    </motion.section>
  );
};
