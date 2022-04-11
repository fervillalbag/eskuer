import React, { useContext } from 'react'
import { Box, Grid, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'

import Back from '../../components/Back'
import { GET_SUPERMARKET } from '../../graphql/queries/supermarket'
import { GET_PRICES_ALL } from '../../graphql/queries/price'
import Product from '../../components/Product'
import { GET_PRODUCT } from '../../graphql/queries/product'
import { SuperContext } from '../../context/SuperContext'

const ProductItem = ({ product }) => {
  const router = useRouter()
  const { setSuperSelected } = useContext(SuperContext)

  const { data: dataProduct } = useQuery(GET_PRODUCT, {
    fetchPolicy: 'network-only',
    variables: {
      id: product?.idProduct
    }
  })

  const productInfo = dataProduct?.getProduct || {}

  return (
    <Box
      onClick={() => {
        setSuperSelected(product?.idSuper)
        router.push(`/supermarket/product/${productInfo.id}`)
      }}
    >
      <Product product={productInfo} />
    </Box>
  )
}

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

  return (
    <Box padding="20px">
      <Box>
        <Back title={supermarket?.name} />

        <Grid gridTemplateColumns="repeat(2, 1fr)" gap="10px" marginTop="20px">
          {products.length === 0 ? (
            <Box gridColumn="1/4">
              <Text>No existen productos en este supermercado</Text>
            </Box>
          ) : (
            products.map(product => (
              <ProductItem key={product.id} product={product} />
            ))
          )}
        </Grid>
      </Box>
    </Box>
  )
}

export default Supermarket
