import React from 'react'
import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { ApolloProvider } from '@apollo/client'
import { Toaster } from 'react-hot-toast'

import theme from '../styles/theme'
import client from '../config/apollo'
import UserProvider from '../context/UserContext'

import '../styles/globals.css'
import 'react-lazy-load-image-component/src/effects/blur.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
          <Toaster position="top-center" reverseOrder={false} />
        </ChakraProvider>
      </UserProvider>
    </ApolloProvider>
  )
}

export default MyApp
