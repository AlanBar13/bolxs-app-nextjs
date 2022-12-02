import React from 'react';
import { Flex, Input, Text } from '@chakra-ui/react';
import { useController } from 'react-hook-form';

export const GeneralInput = ({
  type,
  placeholder,
  register,
  control,
  name,
  ...rest
}) => {
  const { field, fieldState } = useController({ name, control });
  return (
    <Flex flexDir='column' w='100%' gap='0.3rem'>
      <Input
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
        autoComplete='off'
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
