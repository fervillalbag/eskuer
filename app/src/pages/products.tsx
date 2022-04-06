import React from 'react'
import NextLink from 'next/link'
import { Box, Grid, Link } from '@chakra-ui/react'

import Back from '../components/Back'
import Loader from '../components/Loader'
import Product from '../components/Product'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTS } from '../graphql/queries/product'

const Products: React.FC = () => {
  const { data: productsQuery, loading: loadingProducts } = useQuery(
    GET_PRODUCTS,
    {
      fetchPolicy: 'network-only'
    }
  )

  const products = productsQuery?.getProducts || []

  return (
    <Box padding="20px">
      <Box>
        <Back title="Productos" />
      </Box>

      <Box as="main" marginTop="20px">
        {loadingProducts ? (
          <Loader />
        ) : (
          <Grid gridTemplateColumns="repeat(2, 1fr)" gap="10px">
            {products.map(product => (
              <NextLink href={`/product/${product.id}`} key={product.id}>
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

export default Products
