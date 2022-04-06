import React from 'react'
import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'

import Back from '../../components/Back'
import { GET_SUPERMARKET } from '../../graphql/queries/supermarket'
import { GET_PRICES_ALL } from '../../graphql/queries/price'

const Supermarket: React.FC = () => {
  const router = useRouter()

  const { data: dataSupermarket } = useQuery(GET_SUPERMARKET, {
    variables: {
      id: router?.query?.id
    }
  })

  const supermarket = dataSupermarket?.getSupermarket || {}

  const { data: dataProducts } = useQuery(GET_PRICES_ALL, {
    variables: {
      idSuper: supermarket?.id
    }
  })

  const products = dataProducts?.getPrices || []
  console.log(products)

  return (
    <Box padding="20px">
      <Box>
        <Back title={supermarket?.name} />
      </Box>
    </Box>
  )
}

export default Supermarket
