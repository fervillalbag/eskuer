import React from 'react'
import { Box, Grid, Link, Text } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import NextLink from 'next/link'

import Back from '../../components/Back'
import { GET_SUPERMARKETS } from '../../graphql/queries/supermarket'

const Supermarket: React.FC = () => {
  const { data: dataSupermarkets } = useQuery(GET_SUPERMARKETS, {
    fetchPolicy: 'network-only'
  })
  const supermarkets = dataSupermarkets?.getSupermarkets || []

  return (
    <Box padding="20px">
      <Box>
        <Back title="Supermercados" />
      </Box>

      <Grid gridTemplateColumns="repeat(2, 1fr)" marginTop="25px" gap="20px">
        {supermarkets.map(supermarket => (
          <NextLink
            href={`/supermarket/${supermarket.id}`}
            key={supermarket.id}
          >
            <Link
              backgroundColor="#FFF"
              rounded="3px 3px 0 0"
              height="120px"
              padding="10px"
              border="1px solid #3E3E3E"
              borderBottom="4px solid #3E3E3E"
              _hover={{ textDecoration: 'none' }}
            >
              <Text
                // fontSize="14px"
                textTransform="uppercase"
                fontWeight="bold"
                color="#3E3E3E"
              >
                {supermarket.name}
              </Text>
              <Text fontSize="12px" textTransform="uppercase" color="#3E3E3E">
                {supermarket.address}
              </Text>
            </Link>
          </NextLink>
        ))}
      </Grid>
    </Box>
  )
}

export default Supermarket
