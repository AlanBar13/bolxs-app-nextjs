import React from 'react';
import { Checkbox, Flex, Text } from '@chakra-ui/react';
import { useController } from 'react-hook-form';

export const CheckBoxInput = ({
  placeholder,
  register,
  control,
  name,
  ...rest
}) => {
  const { field, fieldState } = useController({ name, control });
  return (
    <Flex flexDir='column' w='100%' gap='0.3rem'>
      <Checkbox
        {...rest}
        {...register(name)}
        colorScheme='primary'
        borderColor='primary.500'
        focusBorderColor='primary.500'
        _hover={{ borderColor: 'primary.600' }}
        _invalid={{ borderColor: '#f43f5e' }}
        isInvalid={!!fieldState.error}
        onChangeCapture={field.onChange}
        onBlur={field.onBlur}
      >
        {placeholder}
      </Checkbox>
      {fieldState.error && (
        <Text color='#f43f5e' ml='0.3rem'>
          {fieldState.error.message}
        </Text>
      )}
    </Flex>
  );
};
