import React from 'react'
import NextLink from 'next/link'
import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'

import Product from '../components/Product'
import Navbar from '../components/Navbar'
import { GET_PRODUCTS } from '../graphql/queries/product'
import Loader from '../components/Loader'

const Home: React.FC = () => {
  const { data: productsQuery, loading: loadingProducts } = useQuery(
    GET_PRODUCTS,
    {
      fetchPolicy: 'network-only'
    }
  )
  const products = productsQuery?.getProducts || []

  return (
    <Box backgroundColor="#F5F5F5" minHeight="100vh">
      <Box padding="20px 20px 10px 20px">
        <Heading
          fontSize="20px"
          fontWeight="bold"
          color="#2D93E8"
          textTransform="uppercase"
        >
          Categorías
        </Heading>
      </Box>

      <Box overflowY="hidden" className="no-scrollbar">
        <Flex
          className="no-scrollbar"
          paddingLeft="20px"
          overflowX="scroll"
          width="max-content"
        >
          <Flex
            as="article"
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="150px"
            backgroundColor="#FFF"
            padding="10px"
            rounded="md"
            marginRight="20px"
          >
            <Text color="#818181">Alimentos</Text>
          </Flex>
          <Flex
            as="article"
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="150px"
            backgroundColor="#FFF"
            padding="10px"
            rounded="md"
            marginRight="20px"
          >
            <Text color="#818181">Bebidas</Text>
          </Flex>
          <Flex
            as="article"
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="150px"
            backgroundColor="#FFF"
            padding="10px"
            rounded="md"
            marginRight="20px"
          >
            <Text color="#818181">Bazar</Text>
          </Flex>
        </Flex>
      </Box>

      <Box padding="20px 20px 70px 20px" marginTop="5px">
        <Heading
          fontSize="20px"
          color="#2D93E8"
          fontWeight="bold"
          textTransform="uppercase"
        >
          Productos
        </Heading>

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
