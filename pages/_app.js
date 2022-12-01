import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { AuthUserProvider } from '../context/AuthUserContext';
import '../styles/date-picker.css';
import Head from 'next/head';
import { Navbar } from '../components/Layouts/Navbar';
import { AnimatePresence } from 'framer-motion';

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
  theme: {
    100: '#8507D9',
    200: '#6503A6',
    300: '#3B0273',
    400: '#210140',
    500: '#0D0D0D',
  },
  primary: {
    50: '#d397fc',
    100: '#bf65fa',
    200: '#b44df9',
    300: '#aa34f8',
    400: '#a01bf8',
    500: '#8507D9',
    600: '#6705a8',
    700: '#58058f',
    800: '#480476',
    900: '#2a0245',
  },
  textMuted: 'rgba(84,84,94,0.8)',
  textSecondary: '#93939E',
  inputBg: 'rgba(36,36,40,0.8)',
};

const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
};

const fonts = {
  body: 'Roboto, system-ui, sans-serif',
  heading: "'Bebas Neue', Georgia, serif",
}

const styles = {
  global: () => ({
    body: {
      bg: 'radial-gradient(#3B0273,#2A0253)',
    },
  }),
};

const theme = extendTheme({ colors, breakpoints, styles, fonts });

function MyApp({ Component, pageProps, router }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthUserProvider>
        <Head>
          <link rel='shortcut icon' href='/bolxs_icon.ico' />
        </Head>
        <Navbar />
        <AnimatePresence exitBeforeEnter onExitComplete={() => window.scrollTo(0,0)}>
          <Component {...pageProps} canonical={router.route} key={router.route} />
        </AnimatePresence>
      </AuthUserProvider>
    </ChakraProvider>
  );
}

export default MyApp;
