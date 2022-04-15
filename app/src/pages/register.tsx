import React, { useEffect, useState } from 'react'
import NextLink from 'next/link'
import toast from 'react-hot-toast'
import { Box, Input, Button, Text, Link } from '@chakra-ui/react'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'

import Back from '../components/Back'
import { REGISTER_USER } from '../graphql/mutations/user'
import useAuth from '../hooks/useAuth'

const Register: React.FC = () => {
  const [name, setName] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [password, setPassword] = useState<string | null>(null)
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null)

  const router = useRouter()
  const { user } = useAuth()

  const [createUser] = useMutation(REGISTER_USER)

  useEffect(() => {
    ;(async () => {
      if (user) {
        router.push('/')
      }
    })()
  }, [user])

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      return toast.error('Las contraseñas no coinciden')
    }

    if (!name || !email || !username || !password || !confirmPassword) {
      return toast.error('Todos los campos son obligatorios!')
    }

    try {
      await createUser({
        variables: {
          input: {
            name,
            email,
            username,
            password
          }
        }
      })
      toast.success('Usuario creado correctamente!')
      router.push('/login')
    } catch (error) {
      console.log(error)
      toast.error('Hubo un problema al crear la cuenta. Intente de nuevo!')
    }
  }

  return (
    <Box padding="20px">
      <Back title="Registrarse" />

      <Box marginTop="20px">
        <Input
          type="text"
          _focus={{ outline: 0 }}
          borderRadius="4px"
          paddingLeft="12px"
          backgroundColor="#F9F9F9"
          border="0"
          height="45px"
          placeholder="nombre"
          marginBottom="15px"
          onChange={e => setName(e.target.value)}
        />
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
          type="text"
          _focus={{ outline: 0 }}
          borderRadius="4px"
          paddingLeft="12px"
          backgroundColor="#F9F9F9"
          border="0"
          height="45px"
          placeholder="username"
          marginBottom="15px"
          onChange={e => setUsername(e.target.value)}
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
        <Input
          type="password"
          _focus={{ outline: 0 }}
          borderRadius="4px"
          paddingLeft="12px"
          backgroundColor="#F9F9F9"
          border="0"
          height="45px"
          placeholder="confirmar contraseña"
          marginBottom="15px"
          onChange={e => setConfirmPassword(e.target.value)}
        />

        <Box marginBottom="15px">
          <Text fontSize="14px" textAlign="center" color="#003049">
            ¿Ya tienes una cuenta?{' '}
            <NextLink href="/login">
              <Link fontWeight="bold">Inicia sesión</Link>
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
          color="#003049"
          border="1px solid #003049"
          borderBottom="4px solid #003049"
          _focus={{ shadow: 0 }}
          _hover={{
            backgroundColor: '#FFF'
          }}
          width="100%"
          onClick={handleRegister}
        >
          Registrarse
        </Button>
      </Box>
    </Box>
  )
}

export default Register
