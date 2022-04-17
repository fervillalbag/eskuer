import React from 'react'
import NextLink from 'next/link'
import { Box, Grid, Link } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'

import Back from '../../../components/Back'
import Loader from '../../../components/Loader'
import Product from '../../../components/Product'
import { GET_PRODUCTS } from '../../../graphql/queries/product'
import { GET_USER } from '../../../graphql/queries/user'
import useAuth from '../../../hooks/useAuth'
import NotFound from '../../../components/NotFound'

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
        <Back title="Edita un producto" />
      </Box>

      <Box as="main" marginTop="20px">
        {loadingProducts ? (
          <Loader />
        ) : (
          <Grid gridTemplateColumns="repeat(2, 1fr)" gap="10px">
            {products.map(product => (
              <NextLink href={`/update/product/${product.id}`} key={product.id}>
                <Link display="block" _hover={{ textDecoration: 'none' }}>
                  <Product key={product.id} product={product} />
                </Link>
              </NextLink>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  )
}

export default ProductsUpdate
