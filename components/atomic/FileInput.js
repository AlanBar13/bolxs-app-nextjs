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
  const [fileName, setFileName] = useState('')
  const localOnChange = e => {
    onChange(e);
    field.onChange(e);
    setFileName(e.target.files[0].name)
  };
  return (
    <Flex flexDir='column' w='100%' gap='0.3rem'>
      <label className={`file-input-label ${fileName !== '' && 'has-file'}`}>
        {fileName !== '' ? fileName : 'Da click y selecciona una imagen'}
        <Input
          {...rest}
          {...register(name)}
          display='none'
          borderColor='transparent'
          rounded='xl'
          type='file'
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
      {fieldState.error && (
        <Text color='#f43f5e' ml='0.3rem'>
          {fieldState.error.message}
        </Text>
      )}
    </Flex>
  );
};
