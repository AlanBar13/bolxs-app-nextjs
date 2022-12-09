import React, { useState } from 'react';
import * as yup from 'yup';
import { Button, Flex, Heading, Image, Input, Text } from '@chakra-ui/react';
import { FastReactiveForm } from '../../../atomic/FastReactiveForm';
import { FileInput } from '../../../atomic/FileInput';

const schema = yup
  .object({
    poster: yup.string().required('Poster es requerido'),
  })
  .required();

export const PosterForm = ({ onSubmit }) => {
  const [image, setImage] = useState('');
  const [file, setFile] = useState();
  const onImageChange = e => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
    }
  };
  const localOnSubmit = data => {
    const newData = { ...data, poster: file };
    onSubmit(newData);
  };
  return (
    <Flex flexDir='column' gap='1.5rem' w='100%' flexShrink='0'>
      <Heading fontSize='clamp(2rem, 6vw, 2.5rem)'>
        Agrega el cartel del evento
      </Heading>
      <Text color='textSecondary' fontStyle='italic'>
        Recomendamos ampleamente que el cartel tenga un Aspect Ratio de 2/3 para
        una mejor visualización dentro de la plataforma
      </Text>
      {image !== '' && (
        <Flex w='100%' justifyContent='center'>
          <Image
            src={`${image}`}
            alt='event-banner'
            rounded='0.2rem'
            objectFit='cover'
            w='192px'
            h='288px'
            transition='ease-out'
            transitionDuration='300ms'
            style={{ aspectRatio: 2 / 3 }}
          />
        </Flex>
      )}
      <FastReactiveForm schema={schema} onSubmit={localOnSubmit}>
        <FileInput name='poster' onChange={onImageChange} />
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
