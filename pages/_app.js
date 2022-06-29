import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { AuthUserProvider } from '../context/AuthUserContext'
import "../styles/date-picker.css";
import Head from 'next/head';

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
}

const theme = extendTheme({ colors, breakpoints })

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthUserProvider>
        <Head>
          <link rel="shortcut icon" href="/bolxs_icon.ico" />
        </Head>
        <Component {...pageProps} />
      </AuthUserProvider>
    </ChakraProvider>
    )
}

export default MyApp
