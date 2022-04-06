import React, { useContext } from 'react'
import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'

import { SuperContext } from '../../../context/SuperContext'
import { GET_PRICES } from '../../../graphql/queries/price'
import Back from '../../../components/Back'
import { GET_PRODUCT } from '../../../graphql/queries/product'

const ProductSupermarket: React.FC = () => {
  const router = useRouter()

  const { superSelected } = useContext(SuperContext)

  const { data: dataPrice } = useQuery(GET_PRICES, {
    variables: {
      idProduct: router?.query?.id,
      idSuper: superSelected
    }
  })

  const price = dataPrice?.getPrice || {}

  const { data: dataProduct } = useQuery(GET_PRODUCT, {
    variables: {
      id: price?.idProduct
    }
  })

  const product = dataProduct?.getProduct || {}

  return (
    <Box padding="20px">
      <Box>
        <Back title={product?.name} />
      </Box>
    </Box>
  )
}

export default ProductSupermarket
