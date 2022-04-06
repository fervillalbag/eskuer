import React from 'react'
import { Box, Grid, Link } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import NextLink from 'next/link'

import Back from '../../components/Back'
import { GET_SUPERMARKETS } from '../../graphql/queries/supermarket'

const Supermarket: React.FC = () => {
  const { data: dataSupermarkets } = useQuery(GET_SUPERMARKETS)
  const supermarkets = dataSupermarkets?.getSupermarkets || []

  return (
    <Box padding="20px">
      <Box>
        <Back title="Supermercados" />
      </Box>

      <Grid gridTemplateColumns="repeat(2, 1fr)">
        {supermarkets.map(supermarket => (
          <NextLink
            href={`/supermarket/${supermarket.id}`}
            key={supermarket.id}
          >
            <Link>{supermarket.name}</Link>
          </NextLink>
        ))}
      </Grid>
    </Box>
  )
}

export default Supermarket
