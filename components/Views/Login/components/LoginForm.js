import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { FastReactiveForm } from '../../../atomic/FastReactiveForm';
import { GeneralInput } from '../../../atomic/GeneralInput';
import { PasswordInput } from '../../../atomic/PasswordInput';
import { Button, Checkbox, Flex, Spinner, Text } from '@chakra-ui/react';
import { useAuth } from '../../../../context/AuthUserContext';

const schema = yup
  .object({
    email: yup
      .string()
      .email('Debe ser un correo valido')
      .required('Correo es requerido'),
    password: yup
      .string()
      .required('Contraseña es requerida')
      .min(6, 'Debe tener al menos 6 caracteres'),
  })
  .required();

export const LoginForm = ({ requestRes }) => {
  const { signInWithEmail, isLoading } = useAuth();
  const [wantToRemember, setWantToRemember] = useState(false);
  const [isSearchingForCredentials, setIsSearchingForCredentials] =
    useState(true);
  const [defaultValues, setDefaultValues] = useState({
    email: '',
    password: '',
  });

  const searchForCredentials = () => {
    const email = localStorage.getItem('bolx-email');
    const password = localStorage.getItem('bolx-password');
    if (email && password) {
      setDefaultValues({ email, password });
    }
    setIsSearchingForCredentials(false);
  };
  const saveCredentialsInLocalStorage = (email, password) => {
    localStorage.setItem('bolx-email', email);
    localStorage.setItem('bolx-password', password);
  };
  const onSubmit = async ({ email, password }) => {
    try {
      if (wantToRemember) {
        saveCredentialsInLocalStorage(email, password);
      }
      await signInWithEmail(email, password);
      requestRes('Bienvenido', 'success');
    } catch (error) {
      const errorCode = error.code;
      switch (errorCode) {
        case 'auth/user-not-found':
          requestRes('Usuario no encontrado', 'error');
          break;
        case 'auth/wrong-password':
          requestRes('Contraseña incorrecta', 'error');
          break;
        default:
          requestRes(
            'Error en el servidor',
            'error',
            'Vuelve a intentarlo más tarde'
          );
      }
    }
  };
  useEffect(() => {
    searchForCredentials();
  }, []);

  return (
    <>
      {!isSearchingForCredentials && (
        <FastReactiveForm
          onSubmit={onSubmit}
          schema={schema}
          defaultValues={defaultValues}>
          <GeneralInput name='email' placeholder='Correo' type='email' />
          <PasswordInput name='password' placeholder='Contraseña' />
          <Button
            w='full'
            h='fit-content'
            mt='1rem'
            type='submit'
            variant='unstyled'
            fontFamily='heading'
            color='white'
            rounded='lg'
            fontSize='2xl'
            pt='0.6rem'
            pb='0.3rem'
            bg='theme.200'
            _hover={{ filter: 'brightness(1.2)' }}
            _active={{ filter: 'brightness(0.9)' }}>
            {isLoading ? <Spinner color='primary.400' /> : 'Login'}
          </Button>
        </FastReactiveForm>
      )}
      <Flex flexDir='column' gap='1.5rem' w='100%'>
        <Flex gap='0.7rem' alignItems='center'>
          <Checkbox
            colorScheme='primary'
            color='white'
            onChange={() => setWantToRemember(!wantToRemember)}>
            Recordarme en este navegador
          </Checkbox>
        </Flex>
        <Flex gap='0.7rem' alignItems='center'>
          <Text>Olvidate tu contraseña?</Text>
          <Button variant='link' colorScheme='primary' fontWeight='normal'>
            Recordar
          </Button>
        </Flex>
      </Flex>
    </>
  );
};
