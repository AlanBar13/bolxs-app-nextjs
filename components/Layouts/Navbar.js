import React from 'react';
import { motion } from 'framer-motion';
import { Box, Flex } from '@chakra-ui/react';
import { BookmarkIcon, HomeIcon, UserIcon } from '../../assets';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthUserContext';

export const Navbar = () => {
  const router = useRouter();
  const auth = useAuth();
  const Links = [
    { route: '/', Icon: HomeIcon },
    { route: '/events', Icon: BookmarkIcon },
    { route: auth.authUser ? '/user' : '/login', Icon: UserIcon },
  ];
  return (
    <motion.nav
      style={{ position: 'fixed', zIndex: 90, bottom: '1.5rem' }}
      initial={{ y: '6rem' }}
      animate={{ y: '0rem' }}
      transition={{ type: 'tween', duration: 0.3, delay: 1.5 }}>
      <Flex w='100vw' justifyContent='center'>
        <Flex
          as='ul'
          w={{ base: '100%', md: '22.3rem' }}
          mx='1rem'
          bg='rgba(13,13,13,0.8)'
          boxShadow='0 4px 10px rgba(0,0,0,0.3)'
          backdropFilter='blur(10px)'
          gap='2.5rem'
          justifyContent='center'
          p='0.62rem'
          listStyleType='none'
          rounded='1.5rem'>
          {Links.map(({ Icon, route }) => (
            <Box
              as='li'
              key={route}
              cursor='pointer'
              onClick={() => router.push(route)}>
              <Icon isActive={router.asPath === route} />
            </Box>
          ))}
        </Flex>
      </Flex>
    </motion.nav>
  );
};
