import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthUserContext';
import { Button, Flex, Image, useToast, Center, Box } from '@chakra-ui/react';
import { LoginContent } from '../components/Views/Login/LoginContent';
import { CustomToast } from '../components/atomic/CustomToast';
import { AnimatePresence } from 'framer-motion';
import { SignupContent } from '../components/Views/Login/SignupContent';
import SEO from '../components/seo';
import Layout from '../components/Layouts/layoutAuth';

export default function Login() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const toast = useToast();
  const toastIdRef = useRef();

  const closeToast = () =>
    toastIdRef.current && toast.close(toastIdRef.current);
  const requestRes = (title, type, desc) => {
    toastIdRef.current = toast({
      position: 'top-right',
      duration: 2500,
      render: () => (
        <CustomToast title={title} desc={desc} close={closeToast} type={type} />
      ),
    });
  };
  const { authUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authUser) {
      router.push('/');
    }
  }, [authUser, router]);

  return (
    <>
      <SEO
        title='Bolxs!!'
        description='Platoforma para la creacion y compra de tickets para eventos de todo tipo'
      />
      <Layout>
        <Center bgImage='/seats.png' bgRepeat='no-repeat' bgSize='cover'>
          <Flex
            w='100%'
            maxW='28rem'
            minH='100vh'
            px='1rem'
            pt={{ base: '4.3rem', lg: '5.5rem' }}
            pb='8rem'
            flexDir='column'
            gap='2.5rem'
            alignItems='center'>
            <Flex flexDir='column' alignItems='center' gap='1.5rem' w='100%'>
              <Image src='/logo-bx.svg' />
              <Flex w='100%' bg='inputBg' p='2px' gap='2px'>
                <Button
                  w='full'
                  bg={isLoginForm ? 'transparent' : 'textMuted'}
                  color='textSecondary'
                  fontWeight='normal'
                  _hover={{ filter: 'brightness(1.2)' }}
                  _active={{ filter: 'brightness(0.9)' }}
                  onClick={() => setIsLoginForm(false)}>
                  Registrarse
                </Button>
                <Button
                  w='full'
                  bg={isLoginForm ? 'textMuted' : 'transparent'}
                  color='textSecondary'
                  fontWeight='normal'
                  _hover={{ filter: 'brightness(1.2)' }}
                  _active={{ filter: 'brightness(0.9)' }}
                  onClick={() => setIsLoginForm(true)}>
                  Login
                </Button>
              </Flex>
            </Flex>
            <AnimatePresence exitBeforeEnter>
              {isLoginForm ? (
                <LoginContent key={0} requestRes={requestRes} />
              ) : (
                <SignupContent key={1} requestRes={requestRes} />
              )}
            </AnimatePresence>
          </Flex>
        </Center>
      </Layout>
    </>
  );
}
