import React from 'react'
import NextLink from 'next/link'
import { Text, Link, Flex } from '@chakra-ui/react'

const NotFound: React.FC = () => {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100vh"
      overflow="hidden"
      padding="20px"
    >
      <Text marginBottom="10px">Página no encontrada</Text>
      <NextLink href="/">
        <Link
          display="inline-block"
          height="auto"
          padding="15px 32px"
          fontWeight="semibold"
          fontSize="1rem"
          borderRadius="4px"
          backgroundColor="#003049"
          color="#FFF"
          textAlign="center"
          _focus={{ shadow: 0 }}
          _hover={{
            backgroundColor: '#003049'
          }}
        >
          Volver al inicio
        </Link>
      </NextLink>
    </Flex>
  )
}

export default NotFound
