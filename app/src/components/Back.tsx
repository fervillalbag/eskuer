import React from 'react'
import { Box, Flex, Button, Text } from '@chakra-ui/react'
import { FaAngleLeft } from 'react-icons/fa'
import { useRouter } from 'next/router'
import useAuth from '../hooks/useAuth'

interface BackIprops {
  title?: string
  showButton?: boolean
}

const Back: React.FC<BackIprops> = ({ title, showButton = true }) => {
  const { user } = useAuth()
  const router = useRouter()

  return (
    <Flex alignItems="center">
      {showButton && (
        <Box>
          <Button
            minWidth="initial"
            width="50px"
            height="50px"
            backgroundColor="#F5F5F5"
            color="#3E3E3E"
            rounded="3px 3px 0 0"
            border="1px solid #3E3E3E"
            borderBottom="4px solid #3E3E3E"
            fontSize="22px"
            _focus={{ border: 0 }}
            onClick={() => {
              if (router.pathname === '/post/[id]') {
                router.push('/post')
              } else if (router.pathname === '/settings/user') {
                router.push('/settings')
              } else if (router.pathname === '/settings/name') {
                router.push('/settings/user')
              } else if (router.pathname === '/settings/email') {
                router.push('/settings/user')
              } else if (router.pathname === '/settings/password') {
                router.push('/settings/user')
              } else {
                router.back()
              }
            }}
          >
            <FaAngleLeft />
          </Button>
        </Box>
      )}
      <Flex
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        marginLeft={!showButton ? '0' : '15px'}
      >
        <Text
          fontWeight="bold"
          fontSize="18px"
          color="#3E3E3E"
          textTransform="uppercase"
        >
          {title || ''}
        </Text>

        {router.pathname === '/login' || router.pathname === '/register'
          ? null
          : !user?.email && (
              <Text
                onClick={() => router.push('/login')}
                fontWeight="semibold"
                textTransform="uppercase"
                fontSize="14px"
              >
                Iniciar sesión
              </Text>
            )}
      </Flex>
    </Flex>
  )
}

export default Back
