import React from 'react'
import { NextPage } from 'next'
import { Box, Grid, Text } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'

import Back from '../../components/Back'
import { GET_SUPERMARKETS } from '../../graphql/queries/supermarket'
import useAuth from '../../hooks/useAuth'
import { GET_USER } from '../../graphql/queries/user'
import NotFound from '../../components/NotFound'

const SupermarketsUpdate: NextPage = () => {
  const { user } = useAuth()

  const { data: dataUser } = useQuery(GET_USER, {
    variables: {
      id: user?.id
    }
  })

  const { data: dataSupermarkets } = useQuery(GET_SUPERMARKETS, {
    fetchPolicy: 'network-only'
  })

  const supermarkets = dataSupermarkets?.getSupermarkets || []
  const userInfo = dataUser?.getUser || {}

  if (userInfo.role !== 'ADMIN') return <NotFound />

  return (
    <Box padding="20px">
      <Box>
        <Back title="Editar supermercado" />
      </Box>

      <Grid gridTemplateColumns="repeat(2, 1fr)" marginTop="25px" gap="20px">
        {supermarkets.map(supermarket => (
          <Box
            backgroundColor="#FFF"
            rounded="3px 3px 0 0"
            height="120px"
            padding="10px"
            border="1px solid #3E3E3E"
            borderBottom="4px solid #3E3E3E"
            _hover={{ textDecoration: 'none' }}
            key={supermarket.id}
          >
            <Text textTransform="uppercase" fontWeight="bold" color="#3E3E3E">
              {supermarket.name}
            </Text>
            <Text fontSize="12px" textTransform="uppercase" color="#3E3E3E">
              {supermarket.address}
            </Text>
          </Box>
        ))}
      </Grid>
    </Box>
  )
}

export default SupermarketsUpdate
