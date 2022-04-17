import React from 'react'
import { Box, Grid } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'

import Back from '../../components/Back'
import Loader from '../../components/Loader'
import Product from '../../components/Product'
import { GET_PRODUCTS } from '../../graphql/queries/product'
import useAuth from '../../hooks/useAuth'
import NotFound from '../../components/NotFound'
import { GET_USER } from '../../graphql/queries/user'

const ProductsUpdate: React.FC = () => {
  const { user } = useAuth()

  const { data: dataUser } = useQuery(GET_USER, {
    variables: {
      id: user?.id
    }
  })

  const { data: dataProducts, loading: loadingProducts } = useQuery(
    GET_PRODUCTS,
    {
      fetchPolicy: 'network-only'
    }
  )
  const products = dataProducts?.getProducts || []
  const userInfo = dataUser?.getUser || {}

  if (userInfo.role !== 'ADMIN') return <NotFound />

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
