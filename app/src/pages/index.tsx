import React from 'react'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'

import Product from '../components/Product'
import Navbar from '../components/Navbar'
import { GET_PRODUCTS } from '../graphql/queries/product'

const Home: React.FC = () => {
  const { data, loading } = useQuery(GET_PRODUCTS)
  if (loading) return null

  const supermarkets = data?.getProducts

  // productsArray.forEach(item => console.log(item))
  console.log(supermarkets)

  return (
    <Box backgroundColor="#F5F5F5" minHeight="100vh">
      <Box padding="20px 20px 10px 20px">
        <Heading
          fontSize="20px"
          fontWeight="bold"
          color="#2D93E8"
          textTransform="uppercase"
        >
          Más buscados
        </Heading>
      </Box>

      <Box overflowY="hidden" className="no-scrollbar">
        <Flex
          className="no-scrollbar"
          paddingLeft="20px"
          overflowX="scroll"
          width="max-content"
        >
          <Box
            as="article"
            width="150px"
            backgroundColor="#FFF"
            padding="10px"
            rounded="md"
            marginRight="20px"
          >
            <Text color="#818181">Tomate</Text>
            <Text
              textAlign="right"
              fontWeight="bold"
              marginTop="10px"
              color="#4d4d4d"
            >
              Gs. 11.000 / KG
            </Text>
          </Box>
          <Box
            as="article"
            width="150px"
            backgroundColor="#FFF"
            padding="10px"
            rounded="md"
            marginRight="20px"
          >
            <Text color="#818181">Tomate</Text>
            <Text
              textAlign="right"
              fontWeight="bold"
              marginTop="10px"
              color="#4d4d4d"
            >
              Gs. 11.000 / KG
            </Text>
          </Box>
          <Box
            as="article"
            width="150px"
            backgroundColor="#FFF"
            padding="10px"
            rounded="md"
            marginRight="20px"
          >
            <Text color="#818181">Tomate</Text>
            <Text
              textAlign="right"
              fontWeight="bold"
              marginTop="10px"
              color="#4d4d4d"
            >
              Gs. 11.000 / KG
            </Text>
          </Box>
        </Flex>
      </Box>

      <Box padding="20px" marginTop="5px">
        <Heading
          fontSize="20px"
          color="#2D93E8"
          fontWeight="bold"
          textTransform="uppercase"
        >
          Precios
        </Heading>

        <Box as="main" marginTop="10px">
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </Box>
      </Box>

      <Navbar />
    </Box>
  )
}

export default Home
