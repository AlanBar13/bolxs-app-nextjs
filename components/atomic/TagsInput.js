import React from 'react';
import {
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { PlusIcon } from '../../assets/PlusIcon';
import { MinusIcon } from '../../assets/MinusIcon';

export const TagsInput = ({
  placeholder,
  tag,
  setTag,
  tags,
  setTags,
  ...rest
}) => {
  const handleAddTag = () => {
    setTags([...tags, tag]);
    setTag('');
  };
  const handleRemoveTag = tagToRemove => {
    const newTags = tags.filter(value => value !== tagToRemove);
    setTags(newTags);
  };
  return (
    <Flex flexDir='column' w='100%' gap='1rem'>
      <InputGroup>
        <Input
          {...rest}
          borderColor='transparent'
          rounded='xl'
          type='text'
          bg='inputBg'
          color='white'
          placeholder={placeholder}
          focusBorderColor='primary.500'
          _placeholder={{ color: 'textMuted' }}
          _hover={{ borderColor: 'primary.600' }}
          autoComplete='off'
          value={tag}
          onChange={e => setTag(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddTag();
            }
          }}
        />
        <InputRightElement
          children={
            <IconButton
              variant='ghost'
              aria-label='toggle-password'
              onClick={handleAddTag}
              icon={<PlusIcon color='textMuted' size='1.5rem' />}
            />
          }
        />
      </InputGroup>
      <Flex gap='0.5rem' flexWrap='wrap'>
        {tags.map((e, i) => (
          <Flex
            key={i}
            as='span'
            bg='theme.200'
            px='0.5rem'
            py='0.2rem'
            rounded='0.35rem'
            cursor='pointer'
            gap='0.2rem'
            alignItems='center'
            onClick={() => handleRemoveTag(e)}>
            <MinusIcon color='white' size='1rem' />
            <Text
              fontWeight='bold'
              fontSize='calc(1rem, 8vw, 1.25rem)'
              color='white'>
              {e}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
