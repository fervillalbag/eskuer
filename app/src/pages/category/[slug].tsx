import React from 'react'
import { Box, Grid, Link, Text } from '@chakra-ui/react'
import Back from '../../components/Back'
import { useRouter } from 'next/router'
import Loader from '../../components/Loader'
import Product from '../../components/Product'
import NextLink from 'next/link'
import { GET_PRODUCTS } from '../../graphql/queries/product'
import { useQuery } from '@apollo/client'

const CategoryItem: React.FC = () => {
  const {
    query: { slug }
  } = useRouter()

  const { data: productsQuery, loading: loadingProducts } = useQuery(
    GET_PRODUCTS,
    {
      fetchPolicy: 'network-only'
    }
  )

  const products = productsQuery?.getProducts || []
  const productsFilter = products.filter(item => item.category === slug)

  return (
    <Box padding="20px">
      <Box>
        <Back title={String(slug)} />
      </Box>

      <Box as="main" marginTop="15px">
        {loadingProducts ? (
          <Loader />
        ) : productsFilter.length === 0 ? (
          <Box>
            <Text>No hay productos en esta categoría</Text>
          </Box>
        ) : (
          <Grid gridTemplateColumns="repeat(2, 1fr)" gap="10px">
            {productsFilter.map(product => (
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

export default CategoryItem
