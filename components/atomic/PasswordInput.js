import React, { useState } from 'react';
import {
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { EyeIcon, EyeOffIcon } from '../../assets';
import { useController } from 'react-hook-form';

export const PasswordInput = ({
  placeholder,
  register,
  control,
  name,
  ...rest
}) => {
  const [togglePassword, setTogglePassword] = useState(false);
  const { field, fieldState } = useController({ name, control });
  return (
    <Flex flexDir='column' w='100%' gap='0.3rem'>
      <InputGroup>
        <Input
          {...rest}
          {...register(name)}
          borderColor='transparent'
          rounded='xl'
          type={togglePassword ? 'text' : 'password'}
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
      {fieldState.error && (
        <Text color='#f43f5e' ml='0.3rem'>
          {fieldState.error.message}
        </Text>
      )}
    </Flex>
  );
};
