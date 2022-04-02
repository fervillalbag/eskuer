import React from 'react'
import NextLink from 'next/link'
import {
  Box,
  Flex,
  Heading,
  Link,
  Text,
  Image,
  Grid,
  Button
} from '@chakra-ui/react'
import { useQuery } from '@apollo/client'

import Product from '../components/Product'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import Header from '../components/Header'
import { GET_PRODUCTS } from '../graphql/queries/product'
import { FaKey } from 'react-icons/fa'
import { useRouter } from 'next/router'

const Home: React.FC = () => {
  const router = useRouter()

  const { data: productsQuery, loading: loadingProducts } = useQuery(
    GET_PRODUCTS,
    {
      fetchPolicy: 'network-only'
    }
  )
  const products = productsQuery?.getProducts || []

  return (
    <Box minHeight="100vh">
      <Button
        minWidth="initial"
        position="fixed"
        bottom="100px"
        right="20px"
        width="50px"
        height="50px"
        rounded="full"
        zIndex="100"
        backgroundColor="#003049"
        color="white"
        onClick={() => router.push('/admin')}
      >
        <FaKey />
      </Button>

      <Header />

      <Box padding="0 20px">
        <Image
          src="/ad.jpeg"
          width="100%"
          height="170px"
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
              backgroundColor="#D5DFE5"
              padding="10px 20px"
              rounded="2px"
              marginRight="15px"
              textTransform="lowercase"
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
              backgroundColor="#D5DFE5"
              padding="10px 20px"
              rounded="2px"
              marginRight="15px"
              textTransform="lowercase"
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
              backgroundColor="#D5DFE5"
              padding="10px 20px"
              rounded="2px"
              marginRight="15px"
              textTransform="lowercase"
            >
              <Text color="#003049" fontWeight="semibold">
                Bazar
              </Text>
            </Flex>
            <Flex
              as="article"
              display="flex"
              justifyContent="center"
              alignItems="center"
              backgroundColor="#D5DFE5"
              padding="10px 20px"
              rounded="2px"
              marginRight="15px"
              textTransform="lowercase"
            >
              <Text color="#003049" fontWeight="semibold">
                Panadería
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Box>

      <Box padding="20px 20px 100px 20px" marginTop="5px">
        <Heading
          fontWeight="bold"
          textTransform="uppercase"
          fontSize="16px"
          marginBottom="10px"
          color="#003049"
        >
          Productos
        </Heading>

        <Box as="main" marginTop="15px">
          {loadingProducts ? (
            <Loader />
          ) : (
            <Grid gridTemplateColumns="repeat(2, 1fr)" gap="10px">
              {products.map(product => (
                <NextLink href={`/product/${product.id}`} key={product.id}>
                  <Link _hover={{ textDecoration: 'none' }}>
                    <Product key={product.id} product={product} />
                  </Link>
                </NextLink>
              ))}
            </Grid>
          )}
        </Box>
      </Box>

      <Navbar />
    </Box>
  )
}

export default Home
