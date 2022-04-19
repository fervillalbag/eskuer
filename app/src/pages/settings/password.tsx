import React, { useState } from 'react'
import { NextPage } from 'next'
import { Box, Button, Input } from '@chakra-ui/react'
import { useMutation, useQuery } from '@apollo/client'
import toast from 'react-hot-toast'

import Back from '../../components/Back'
import useAuth from '../../hooks/useAuth'
import { GET_USER } from '../../graphql/queries/user'
import { UPDATE_USER } from '../../graphql/mutations/user'
import { useRouter } from 'next/router'

const SettingPassword: NextPage = () => {
  const { user, logout } = useAuth()
  const router = useRouter()

  const { data: dataUser, refetch: refetchUser } = useQuery(GET_USER, {
    variables: {
      id: user?.id
    }
  })

  const userInfo = dataUser?.getUser || {}
  const [updateUser] = useMutation(UPDATE_USER)

  const [password, setPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')

  const handleUpdateUser = async () => {
    if (!password || !newPassword) {
      return toast.error('Ambos campos son obligatorios')
    }

    if (password !== newPassword) {
      return toast.error('Las contraseñas no coinciden')
    }

    try {
      await updateUser({
        variables: {
          input: {
            id: userInfo?.id,
            password
          }
        }
      })

      refetchUser()
      toast.success('Contraseña actualizada correctamente')
      router.push('/')
      logout()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box padding="20px">
      <Box>
        <Back title="Editar contraseña" />
      </Box>

      <Box marginTop="20px">
        <Input
          type="password"
          _focus={{ outline: 0 }}
          borderRadius="4px"
          paddingLeft="12px"
          backgroundColor="#F9F9F9"
          border="0"
          height="45px"
          placeholder="introduce una nueva contraseña"
          marginBottom="15px"
          value={password || ''}
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
          value={newPassword || ''}
          onChange={e => setNewPassword(e.target.value)}
        />

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
          // color={email === userInfo?.email ? 'hsl(214, 31%, 80%)' : '#3E3E3E'}
          color={'#3E3E3E'}
          border="1px solid #3E3E3E"
          borderBottom="4px solid #3E3E3E"
          borderColor="#3E3E3E"
          // borderColor={
          //   email === userInfo?.email ? 'hsl(214, 31%, 80%)' : '#3E3E3E'
          // }
          _focus={{ shadow: 0 }}
          _hover={{
            backgroundColor: '#FFF'
          }}
          width="100%"
          onClick={handleUpdateUser}
        >
          Cambiar
        </Button>
      </Box>
    </Box>
  )
}

export default SettingPassword
