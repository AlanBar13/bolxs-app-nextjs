import React from 'react';
import * as yup from 'yup';
import { Button, Flex, Heading } from '@chakra-ui/react';
import { FastReactiveForm } from '../../../atomic/FastReactiveForm';
import { GeneralInput } from '../../../atomic/GeneralInput';
import { CheckBoxInput } from '../../../atomic/CheckBoxInput';
import { GeneralTextArea } from '../../../atomic/GeneralTextArea';

const schema = yup
  .object({
    name: yup.string().required('Nombre es requerido'),
    description: yup.string().required('Dirección es requerido'),
    initDate: yup.string().required('Fecha de Inicio es requerido'),
    endDate: yup.string().required('Fecha de Finalización es requerido'),
    ticketSell: yup
      .string()
      .required('Inicio de venta de boletos es requerido'),
    placeName: yup
      .string()
      .required('Nombre del lugar del evento es requerido'),
    placeDirection: yup
      .string()
      .required('Dirección del lugar del evento es requerido'),
    isPrivate: yup.boolean(),
  })
  .required();

export const EventForm = ({ onSubmit }) => {
  return (
    <Flex flexDir='column' gap='1.5rem' w='100%' flexShrink='0'>
      <Heading fontSize='clamp(2rem, 6vw, 2.5rem)'>
        datos generales del evento
      </Heading>
      <FastReactiveForm schema={schema} onSubmit={onSubmit}>
        <GeneralInput name='name' placeholder='Nombre' type='text' />
        <GeneralTextArea
          name='description'
          placeholder='Descripción'
          type='text'
        />
        <GeneralInput
          name='initDate'
          placeholder='Fecha de Inicio'
          hasLabel
          type='datetime-local'
        />
        <GeneralInput
          name='endDate'
          placeholder='Fecha de Finalización'
          hasLabel
          type='datetime-local'
        />
        <GeneralInput
          name='ticketSell'
          placeholder='Inicio de venta de boletos'
          hasLabel
          type='datetime-local'
        />
        <GeneralInput
          name='placeName'
          placeholder='Nombre del lugar del evento'
          type='text'
        />
        <GeneralInput
          name='placeDirection'
          placeholder='Dirección del lugar del evento'
          type='text'
        />
        <CheckBoxInput
          name='isPrivate'
          placeholder='Es un evento privado?'
          type='text'
        />
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
          Siguiente
        </Button>
      </FastReactiveForm>
    </Flex>
  );
};
