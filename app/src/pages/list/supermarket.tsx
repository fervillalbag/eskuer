import React from 'react'
import { NextPage } from 'next'
import { Box, Grid, Text } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'

import Back from '../../components/Back'
import { GET_SUPERMARKETS } from '../../graphql/queries/supermarket'

const SupermarketsUpdate: NextPage = () => {
  const { data: dataSupermarkets } = useQuery(GET_SUPERMARKETS, {
    fetchPolicy: 'network-only'
  })

  const supermarkets = dataSupermarkets?.getSupermarkets || []

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
            border="1px solid #003049"
            borderBottom="4px solid #003049"
            _hover={{ textDecoration: 'none' }}
            key={supermarket.id}
          >
            <Text textTransform="uppercase" fontWeight="bold" color="#003049">
              {supermarket.name}
            </Text>
            <Text fontSize="12px" textTransform="uppercase" color="#003049">
              {supermarket.address}
            </Text>
          </Box>
        ))}
      </Grid>
    </Box>
  )
}

export default SupermarketsUpdate
