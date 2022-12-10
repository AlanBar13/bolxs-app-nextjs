import React, { useState } from 'react';
import { Flex, Input, Text } from '@chakra-ui/react';
import { useController } from 'react-hook-form';

export const FileInput = ({
  placeholder,
  register,
  control,
  name,
  onChange,
  ...rest
}) => {
  const { field, fieldState } = useController({ name, control });
  const [fileName, setFileName] = useState('');
  const localOnChange = e => {
    if (e.target.files[0].size < 2000000) field.onChange(e);
    onChange(e);
    setFileName(e.target.files[0].name);
  };
  return (
    <Flex flexDir='column' w='100%' gap='0.3rem'>
      <label
        className={`file-input-label ${fileName !== '' && 'has-file'}`}
        style={{ borderColor: fieldState.error ? '#f43f5e' : '#8507d9' }}>
        <Text color={fieldState.error ? '#f43f5e' : 'white'} ml='0.3rem'>
          {fieldState.error
            ? fieldState.error.message
            : fileName !== ''
            ? fileName
            : 'Da click y selecciona una imagen'}
        </Text>
        <Input
          {...rest}
          {...register(name)}
          display='none'
          borderColor='transparent'
          rounded='xl'
          type='file'
          accept='image/png, image/jpg, image/jpeg, image/tiff, image/webp, image/psd'
          bg='inputBg'
          color='white'
          focusBorderColor='primary.500'
          _placeholder={{ color: 'textMuted' }}
          _hover={{ borderColor: 'primary.600' }}
          _invalid={{ borderColor: '#f43f5e' }}
          isInvalid={!!fieldState.error}
          autoComplete='off'
          onChange={localOnChange}
          onBlur={field.onBlur}
        />
      </label>
    </Flex>
  );
};
