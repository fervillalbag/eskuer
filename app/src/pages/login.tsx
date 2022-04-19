import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import NextLink from 'next/link'
import { Box, Input, Button, Text, Link } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'

import Back from '../components/Back'
import { LOGIN } from '../graphql/mutations/user'
import useAuth from '../hooks/useAuth'

const Login: React.FC = () => {
  const [email, setEmail] = useState<string | null>(null)
  const [password, setPassword] = useState<string | null>(null)

  const router = useRouter()

  const { login, user } = useAuth()
  const [loginMutation] = useMutation(LOGIN)

  useEffect(() => {
    ;(async () => {
      if (user) {
        router.push('/')
      }
    })()
  }, [user])

  const handleLogin = async () => {
    if (!email || !password) {
      return toast.error('Todos los campos son obligatorios')
    }

    try {
      const response = await loginMutation({
        variables: {
          input: {
            email,
            password
          }
        }
      })

      login(response?.data?.login?.token)
      toast.success('Sesión iniciada!')
      router.push('/')
    } catch (error) {
      if (error?.message === 'User not found!') {
        return toast.error('Este usuario no existe')
      }
      if (error?.message === 'Email or passoword is incorrect!') {
        return toast.error('Email o contraseñas no válidas')
      }
      console.log(error?.message)
    }
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
          <Text fontSize="14px" textAlign="center" color="#3E3E3E">
            ¿Aún no tienes una cuenta?{' '}
            <NextLink href="/register">
              <Link fontWeight="bold">Regístrate</Link>
            </NextLink>
          </Text>
        </Box>

        <Button
          minWidth="initial"
          marginTop="5px"
          height="auto"
          padding="15px 32px"
          fontWeight="semibold"
          fontSize="1rem"
          borderRadius="4px"
          backgroundColor="#FFF"
          rounded="3px 3px 0 0"
          color="#3E3E3E"
          border="1px solid #3E3E3E"
          borderBottom="4px solid #3E3E3E"
          _focus={{ shadow: 0 }}
          _hover={{
            backgroundColor: '#FFF'
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
