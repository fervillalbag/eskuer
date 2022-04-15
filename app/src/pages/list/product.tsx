import React from 'react'
import { Box, Grid } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'

import Back from '../../components/Back'
import Loader from '../../components/Loader'
import Product from '../../components/Product'
import { GET_PRODUCTS } from '../../graphql/queries/product'

const ProductsUpdate: React.FC = () => {
  const { data: dataProducts, loading: loadingProducts } = useQuery(
    GET_PRODUCTS,
    {
      fetchPolicy: 'network-only'
    }
  )
  const products = dataProducts?.getProducts || []

  return (
    <Box padding="20px">
      <Box>
        <Back title="Todos los productos" />
      </Box>

      <Box as="main" marginTop="20px">
        {loadingProducts ? (
          <Loader />
        ) : (
          <Grid gridTemplateColumns="repeat(2, 1fr)" gap="10px">
            {products.map(product => (
              <Product key={product.id} product={product} />
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  )
}

export default ProductsUpdate
