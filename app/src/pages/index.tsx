import React from 'react'
import { Flex, Heading } from '@chakra-ui/react'

const Home: React.FC = () => {
  return (
    <Flex
      backgroundColor="primary.light"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Heading backgroundColor="secondary">Hello</Heading>
    </Flex>
  )
}

export default Home
