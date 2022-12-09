import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Flex } from '@chakra-ui/react';

export const FastReactiveForm = ({
  defaultValues,
  children,
  schema,
  onSubmit,
  needReset,
}) => {
  const { handleSubmit, register, control, reset } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const localSubmit = data => {
    onSubmit(data);
    needReset && reset();
  };
  return (
    <Flex as='form' w='100%' onSubmit={handleSubmit(localSubmit)}>
      <Flex flexDir='column' alignItems='center' gap='1.5rem' w='100%'>
        {React.Children.map(children, child => {
          return child.props.name
            ? React.createElement(child.type, {
                ...{
                  ...child.props,
                  register,
                  control,
                  key: child.props.name,
                },
              })
            : child;
        })}
      </Flex>
    </Flex>
  );
};
