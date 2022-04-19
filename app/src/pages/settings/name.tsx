import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { NextPage } from 'next'
import { Box, Button, Input } from '@chakra-ui/react'
import { useMutation, useQuery } from '@apollo/client'

import Back from '../../components/Back'
import useAuth from '../../hooks/useAuth'
import { GET_USER } from '../../graphql/queries/user'
import { UPDATE_USER } from '../../graphql/mutations/user'
import { useRouter } from 'next/router'

const SettingName: NextPage = () => {
  const { user } = useAuth()
  const router = useRouter()

  const {
    data: dataUser,
    loading: loadingUser,
    refetch: refetchUser
  } = useQuery(GET_USER, {
    variables: {
      id: user?.id
    }
  })

  const [updateUser] = useMutation(UPDATE_USER)
  const userInfo = dataUser?.getUser || {}

  const [name, setName] = useState<string>(userInfo?.name)

  useEffect(() => {
    setName(userInfo?.name)
  }, [loadingUser])

  const handleUpdateUser = async () => {
    try {
      await updateUser({
        variables: {
          input: {
            id: userInfo?.id,
            name
          }
        }
      })
      refetchUser()
      toast.success('Nombre actualizado correctamente')
      router.push('/settings/user')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box padding="20px">
      <Box>
        <Back title="Editar nombre" />
      </Box>

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
          value={name || ''}
          onChange={e => setName(e.target.value)}
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
          color={name === userInfo?.name ? 'hsl(214, 31%, 80%)' : '#3E3E3E'}
          border="1px solid #3E3E3E"
          borderBottom="4px solid #3E3E3E"
          borderColor={
            name === userInfo?.name ? 'hsl(214, 31%, 80%)' : '#3E3E3E'
          }
          _focus={{ shadow: 0 }}
          _hover={{
            backgroundColor: '#FFF'
          }}
          width="100%"
          onClick={handleUpdateUser}
        >
          Guardar
        </Button>
      </Box>
    </Box>
  )
}

export default SettingName
