import React, { useState } from 'react'
import NextLink from 'next/link'
import { Box, Input, Button, Text, Link } from '@chakra-ui/react'

import Back from '../components/Back'

const Login: React.FC = () => {
  const [email, setEmail] = useState<string | null>(null)
  const [password, setPassword] = useState<string | null>(null)

  const handleLogin = async () => {
    console.log({ email, password })
  }

  return (
    <Box padding="20px">
      <Back title="Iniciar sesión" />

      <Box marginTop="20px">
        <Input
          type="email"
          _focus={{ outline: 0 }}
          borderRadius="4px"
          paddingLeft="12px"
          backgroundColor="#F9F9F9"
          border="0"
          height="45px"
          placeholder="email"
          marginBottom="15px"
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          type="password"
          _focus={{ outline: 0 }}
          borderRadius="4px"
          paddingLeft="12px"
          backgroundColor="#F9F9F9"
          border="0"
          height="45px"
          placeholder="contraseña"
          marginBottom="15px"
          onChange={e => setPassword(e.target.value)}
        />

        <Box marginBottom="15px">
          <Text fontSize="14px" textAlign="center" color="#003049">
            ¿Aún no tienes una cuenta?{' '}
            <NextLink href="/register">
              <Link fontWeight="bold">Regístrate</Link>
            </NextLink>
          </Text>
        </Box>

        <Button
          minWidth="initial"
          height="auto"
          padding="15px 32px"
          fontWeight="semibold"
          fontSize="1rem"
          borderRadius="4px"
          backgroundColor="#003049"
          color="#FFF"
          _focus={{ shadow: 0 }}
          _hover={{
            backgroundColor: '#003049'
          }}
          width="100%"
          onClick={handleLogin}
        >
          Iniciar sesión
        </Button>
      </Box>
    </Box>
  )
}

export default Login
