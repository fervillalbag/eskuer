import React from 'react'
import NextLink from 'next/link'
import { NextPage } from 'next'
import { Box, Grid, Link, Text } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'

import Back from '../../components/Back'
import useAuth from '../../hooks/useAuth'
import Loader from '../../components/Loader'
import Product from '../../components/Product'
import { GET_LIKE_PRODUCTS_USER } from '../../graphql/queries/likeProd'
import { GET_PRODUCT } from '../../graphql/queries/product'

interface ProductsLikeComponentIprops {
  idProduct: string
}

const ProductsLikeComponent: React.FC<ProductsLikeComponentIprops> = ({
  idProduct
}) => {
  const { data: dataProduct } = useQuery(GET_PRODUCT, {
    fetchPolicy: 'network-only',
    variables: {
      id: idProduct
    }
  })

  const product = dataProduct?.getProduct || {}

  return (
    <Box>
      <NextLink href={`/product/${product?.id}`}>
        <Link display="block" _hover={{ textDecoration: 'none' }}>
          <Product key={product.id} product={product} />
        </Link>
      </NextLink>
    </Box>
  )
}

const Products: NextPage = () => {
  const { user } = useAuth()

  const { data: dataLikeProductsUser, loading: loadingLikeProductsUser } =
    useQuery(GET_LIKE_PRODUCTS_USER, {
      fetchPolicy: 'network-only',
      variables: {
        idUser: user?.id
      }
    })

  const dataLikesUser = dataLikeProductsUser?.getLikesProductsUser || []

  return (
    <Box padding="20px">
      <Box>
        <Back title="Productos guardados" />
      </Box>

      <Box as="main" marginTop="20px">
        {loadingLikeProductsUser ? (
          <Loader />
        ) : dataLikesUser.length === 0 ? (
          <Box>
            <Text>No tienes productos guardados</Text>
          </Box>
        ) : (
          <Grid gridTemplateColumns="repeat(2, 1fr)" gap="10px">
            {dataLikesUser.map(product => (
              <ProductsLikeComponent
                key={product.id}
                idProduct={product.idProduct}
              />
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  )
}

export default Products
