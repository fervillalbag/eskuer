import React from 'react'
import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { ApolloProvider } from '@apollo/client'

import '../styles/globals.css'
import theme from '../styles/theme'
import client from '../config/apollo'
import { Toaster } from 'react-hot-toast'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
        <Toaster position="top-center" reverseOrder={false} />
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp
