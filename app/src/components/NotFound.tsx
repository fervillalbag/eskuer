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
          rounded="2px 2px 0 0"
          padding="12px 32px"
          fontWeight="semibold"
          fontSize="1rem"
          backgroundColor="#FFF"
          color="#3E3E3E"
          textAlign="center"
          border="1px solid"
          borderBottom="4px solid"
          borderColor="#3E3E3E"
          _focus={{ shadow: 0 }}
          _hover={{
            backgroundColor: '#FFF'
          }}
        >
          Volver al inicio
        </Link>
      </NextLink>
    </Flex>
  )
}

export default NotFound
