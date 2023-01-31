import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import { SearchIcon } from '../../../assets';
import { useAuth } from '../../../context/AuthUserContext';
import { useRouter } from 'next/router';
import { api } from '../../../lib/api';

export const Header = ({ allEventsData }) => {
  const { authUser } = useAuth();
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');
  const [eventsFiltered, setEventsFiltered] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch(`${api}/events/search/${inputValue}`);
    const data = await response.json();
    setEventsFiltered(data);
  };

  const handleOnChange = ({ target }) => {
    setInputValue(target.value);
  };

  const seeEventDetails = longUrl => {
    router.push(`/events/${longUrl}`);
  };

  useEffect(() => {
    setEventsFiltered(
      allEventsData.filter(event =>
        event.name.toLowerCase().includes(inputValue.toLowerCase())
      ).slice(0,5)
    );
  }, [inputValue]);

  return (
    <Flex
      flexDir={{ base: 'column', md: 'row' }}
      gap='1.25rem'
      alignItems={{ md: 'center' }}
      justifyContent='space-between'>
      <Flex alignItems='center' gap='0.55rem'>
        {/* TODO: BRING MORE INFO ABOUT THE USER */}
        <Avatar name={authUser ? authUser.email : 'b'} bg='primary.500' />
        {/* <Avatar name='' bg='primary.500' src='https://bit.ly/dan-abramov' /> */}
        <Flex flexDir='column'>
          <Text color='textSecondary' fontSize='13px' lineHeight='18px'>
            Bienvenido,
          </Text>
          <Text fontWeight='bold' fontSize='22px' lineHeight='25px'>
            {authUser ? authUser.email : 'Amante de eventos'}
          </Text>
        </Flex>
      </Flex>
      <Flex as='form' onSubmit={handleSubmit} w={{ md: '22.3rem' }}>
        <InputGroup maxW={{ md: '22.3rem' }} position='relative'>
          <InputLeftElement
            pointerEvents='none'
            children={<SearchIcon color='textMuted' size='1.2rem' />}
          />
          {/* TODO: MAKE INPUT WORKS */}
          <Input
            autoComplete='off'
            borderColor='transparent'
            color='white'
            rounded='xl'
            type='text'
            bg='inputBg'
            _placeholder={{ color: 'textMuted' }}
            placeholder='Buscar banda, evento, genero...'
            focusBorderColor='primary.500'
            _hover={{ borderColor: 'primary.600' }}
            name='search'
            value={inputValue}
            onChange={handleOnChange}
          />
          {inputValue !== '' && (
            <Flex
              position='absolute'
              top='100%'
              left='0'
              right='0'
              flexDir='column'
              zIndex={99}
              p='1rem'
              rounded='md'
              border='1px'
              borderColor='transparent'
              bg='theme.300'
              _focus={{ borderColor: 'theme.100' }}
              _hover={{ borderColor: 'theme.100' }}>
              {eventsFiltered.length !== 0 ? (
                eventsFiltered.map(event => (
                  <Button
                    key={event._id}
                    role='menuitem'
                    variant='ghost'
                    colorScheme='primary'
                    display='flex'
                    height='auto'
                    py='0.5rem'
                    gap='0.5rem'
                    _focus={{
                      backgroundColor: 'rgba(180, 77, 249, 0.12)',
                      boxShadow: 'none',
                    }}
                    justifyContent='start'
                    onClick={() => seeEventDetails(event.longUrl)}>
                    <Image
                      src={event.banner}
                      alt={event.name}
                      boxSize='2.5rem'
                      objectFit='cover'
                      rounded='lg'
                      style={{ aspectRatio: 1 / 1 }}
                    />
                    <Text
                      fontWeight='normal'
                      letterSpacing='tighter'
                      fontStyle='italic'
                      fontSize='1.25rem'>
                      {event.name}
                    </Text>
                  </Button>
                ))
              ) : (
                <Button
                  role='menuitem'
                  variant='ghost'
                  colorScheme='primary'
                  display='flex'
                  height='auto'
                  py='0.5rem'
                  gap='0.5rem'
                  _focus={{
                    backgroundColor: 'rgba(180, 77, 249, 0.12)',
                    boxShadow: 'none',
                  }}
                  justifyContent='start'>
                  <Image
                    src='/generesImg/all.svg'
                    alt='some-alt'
                    boxSize='2.5rem'
                    objectFit='cover'
                    rounded='lg'
                    style={{ aspectRatio: 1 / 1 }}
                  />
                  <Text
                    fontWeight='normal'
                    letterSpacing='tighter'
                    fontStyle='italic'
                    fontSize='1.25rem'>
                    Evento no Encontrado
                  </Text>
                </Button>
              )}
            </Flex>
          )}
        </InputGroup>
      </Flex>
    </Flex>
  );
};

