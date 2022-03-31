import React from 'react'
import { Flex, Box, Image } from '@chakra-ui/react'

const Header: React.FC = () => {
  return (
    <Flex padding="20px" alignItems="center" justifyContent="space-between">
      <Box>
        <Image
          src="/logo.png"
          alt="Logo de Eskuer"
          width="30px"
          height="30px"
        />
      </Box>
      <Box>
        <Image
          src="/profile-fer.png"
          alt="Profile"
          width="40px"
          height="40px"
          borderRadius="full"
          border="1px solid #d9d9d9"
        />
      </Box>
    </Flex>
  )
}

export default Header
