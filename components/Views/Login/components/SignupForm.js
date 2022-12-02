import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Flex, Spinner } from '@chakra-ui/react';
import { GeneralInput } from '../../../atomic/GeneralInput';
import { PasswordInput } from '../../../atomic/PasswordInput';
import { useAuth } from '../../../../context/AuthUserContext';
import { api } from '../../../../lib/api';

const schema = yup
  .object({
    name: yup.string().required('Nombre(s) es requerido').min(3, ''),
    lastname: yup.string().required('Apellido(s) es requerido').min(3, ''),
    email: yup
      .string()
      .email('Debe ser un correo valido')
      .required('Correo es requerido'),
    password1: yup
      .string()
      .required('Contraseña es requerida')
      .min(6, 'Debe tener al menos 6 caracteres'),
    password2: yup
      .string()
      .required('Debe confirmar su contraseña')
      .oneOf([yup.ref('password1')], 'Las contraseñas deben coincidir'),
  })
  .required();

export const SignupForm = ({ requestRes }) => {
  const { createUserWithEmail, isLoading } = useAuth();
  const { handleSubmit, register, control } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async ({ email, password1, name, lastname }) => {
    try {
      const fb = await createUserWithEmail(email, password1);
      const res = await fetch(`${api}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          email: fb.user.email,
          name,
          lastName: lastname,
          uid: fb.user.uid,
        },
      });
      requestRes('Usuario Creado', 'success');
    } catch (error) {
      requestRes('Error al crear usuario', 'error');
    }
  };
  return (
    <Flex as='form' w='100%' onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir='column' alignItems='center' gap='1.5rem' w='100%'>
        <Flex w='100%' gap='1.2rem'>
          <GeneralInput
            name='name'
            placeholder='Nombre(s)'
            type='text'
            register={register}
            control={control}
          />
          <GeneralInput
            name='lastname'
            placeholder='Apellido(s)'
            type='text'
            register={register}
            control={control}
          />
        </Flex>
        <GeneralInput
          name='email'
          placeholder='Correo'
          type='text'
          register={register}
          control={control}
        />
        <PasswordInput
          name='password1'
          placeholder='Contraseña'
          register={register}
          control={control}
        />
        <PasswordInput
          name='password2'
          placeholder='Confirmar Contraseña'
          register={register}
          control={control}
        />
        <Button
          w='full'
          h='fit-content'
          mt='1rem'
          type='submit'
          variant='unstyled'
          fontFamily='heading'
          bg='theme.200'
          color='white'
          rounded='lg'
          fontSize='2xl'
          pt='0.6rem'
          pb='0.3rem'>
          {isLoading ? <Spinner color='primary.400' /> : 'Registrarse'}
        </Button>
      </Flex>
    </Flex>
  );
};
