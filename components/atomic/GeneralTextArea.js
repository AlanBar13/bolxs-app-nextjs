import React from 'react';
import { Flex, Input, Text, Textarea } from '@chakra-ui/react';
import { useController } from 'react-hook-form';

export const GeneralTextArea = ({
  type,
  placeholder,
  register,
  control,
  name,
  hasLabel,
  ...rest
}) => {
  const { field, fieldState } = useController({ name, control });
  return (
    <Flex flexDir='column' w='100%' gap='0.3rem'>
      {hasLabel && <Text>{placeholder}</Text>}
      <Textarea
        {...rest}
        {...register(name)}
        borderColor='transparent'
        rounded='xl'
        type={type}
        bg='inputBg'
        color='white'
        placeholder={placeholder}
        focusBorderColor='primary.500'
        _placeholder={{ color: 'textMuted' }}
        _hover={{ borderColor: 'primary.600' }}
        _invalid={{ borderColor: '#f43f5e' }}
        isInvalid={!!fieldState.error}
        resize='vertical'
        onChange={field.onChange}
        onBlur={field.onBlur}
      />
      {fieldState.error && (
        <Text color='#f43f5e' ml='0.3rem'>
          {fieldState.error.message}
        </Text>
      )}
    </Flex>
  );
};
