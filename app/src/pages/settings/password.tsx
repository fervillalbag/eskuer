import React from 'react'
import { NextPage } from 'next'
import { Box, Button, Input } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'

import Back from '../../components/Back'
import useAuth from '../../hooks/useAuth'
import { GET_USER } from '../../graphql/queries/user'

const SettingPassword: NextPage = () => {
  const { user } = useAuth()

  const { data: dataUser } = useQuery(GET_USER, {
    variables: {
      id: user?.id
    }
  })

  const userInfo = dataUser?.getUser || {}
  // console.log(userInfo)

  // useEffect(() => {
  //   setEmail(userInfo?.email)
  // }, [userInfo])

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
          placeholder="introduce contraseña"
          marginBottom="15px"
          // value={email || ''}
          // onChange={e => setEmail(e.target.value)}
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
          // value={email || ''}
          // onChange={e => setEmail(e.target.value)}
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
          // color={email === userInfo?.email ? 'hsl(214, 31%, 80%)' : '#003049'}
          color={'#003049'}
          border="1px solid #003049"
          borderBottom="4px solid #003049"
          borderColor="#003049"
          // borderColor={
          //   email === userInfo?.email ? 'hsl(214, 31%, 80%)' : '#003049'
          // }
          _focus={{ shadow: 0 }}
          _hover={{
            backgroundColor: '#FFF'
          }}
          width="100%"
          // onClick={handleLogin}
        >
          Cambiar
        </Button>
      </Box>
    </Box>
  )
}

export default SettingPassword
