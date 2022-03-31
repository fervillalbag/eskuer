import React from 'react'
import NextLink from 'next/link'
import { Box, Flex, Heading, Link, Text, Image, Grid } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'

import Product from '../components/Product'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import Header from '../components/Header'
import { GET_PRODUCTS } from '../graphql/queries/product'

const Home: React.FC = () => {
  const { data: productsQuery, loading: loadingProducts } = useQuery(
    GET_PRODUCTS,
    {
      fetchPolicy: 'network-only'
    }
  )
  const products = productsQuery?.getProducts || []

  return (
    <Box minHeight="100vh">
      <Header />

      <Box padding="0 20px">
        <Image
          src="/ad.jpeg"
          width="100%"
          height="140px"
          objectFit="cover"
          alt=""
          borderRadius="2px"
        />
      </Box>

      <Box marginTop="20px" paddingLeft="20px">
        <Heading
          fontWeight="bold"
          textTransform="uppercase"
          fontSize="16px"
          marginBottom="10px"
          color="#003049"
        >
          Categorías
        </Heading>

        <Box overflowY="hidden" className="no-scrollbar">
          <Flex className="no-scrollbar" overflowX="scroll" width="max-content">
            <Flex
              as="article"
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="150px"
              backgroundColor="#FDF0D5"
              padding="10px"
              rounded="2px"
              marginRight="15px"
            >
              <Text color="#003049" fontWeight="semibold">
                Alimentos
              </Text>
            </Flex>
            <Flex
              as="article"
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="150px"
              backgroundColor="#FDF0D5"
              padding="10px"
              rounded="2px"
              marginRight="15px"
            >
              <Text color="#003049" fontWeight="semibold">
                Bebidas
              </Text>
            </Flex>
            <Flex
              as="article"
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="150px"
              backgroundColor="#FDF0D5"
              padding="10px"
              rounded="2px"
              marginRight="15px"
            >
              <Text color="#003049" fontWeight="semibold">
                Bazar
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Box>

      <Box padding="20px 20px 90px 20px" marginTop="5px">
        <Heading
          fontWeight="bold"
          textTransform="uppercase"
          fontSize="16px"
          marginBottom="10px"
          color="#003049"
        >
          Productos
        </Heading>

        <Grid gridTemplateColumns="repeat(2, 1fr)" gap="2rem">
          <Box width="100%" height="100px" backgroundColor="#333"></Box>
          <Box width="100%" height="100px" backgroundColor="#333"></Box>
          <Box width="100%" height="100px" backgroundColor="#333"></Box>
          <Box width="100%" height="100px" backgroundColor="#333"></Box>
          <Box width="100%" height="100px" backgroundColor="#333"></Box>
          <Box width="100%" height="100px" backgroundColor="#333"></Box>
        </Grid>

        <Box as="main" marginTop="15px">
          {loadingProducts ? (
            <Loader />
          ) : (
            products.map(product => (
              <NextLink href={`/product/${product.id}`} key={product.id}>
                <Link _hover={{ textDecoration: 'none' }}>
                  <Product key={product.id} product={product} />
                </Link>
              </NextLink>
            ))
          )}
        </Box>
      </Box>

      <Navbar />
    </Box>
  )
}

export default Home
