import React from 'react'
import { Flex, Box, Image } from '@chakra-ui/react'

import { User } from '../interfaces/User'
import { useRouter } from 'next/router'

interface HeaderIprops {
  user: User
}

const Header: React.FC<HeaderIprops> = ({ user }) => {
  const router = useRouter()

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
      <Box
        onClick={() => {
          if (!user.email) {
            router.push('/login')
          } else {
            router.push('/settings/user')
          }
        }}
      >
        <Image
          src={!user?.avatar ? '/profile-avatar.png' : user?.avatar}
          alt="Profile"
          width="40px"
          height="40px"
          borderRadius="full"
        />
      </Box>
    </Flex>
  )
}

export default Header
