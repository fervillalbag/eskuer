import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { Box, Flex, Heading, Link, Text, Image, Grid } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'

import Product from '../components/Product'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import Header from '../components/Header'
import { GET_PRODUCTS } from '../graphql/queries/product'
import { getToken } from '../utils/helpers'
import { isAuth, isUserNotFound } from '../utils/actions'
import useAuth from '../hooks/useAuth'
import { GET_USER } from '../graphql/queries/user'

const Home: React.FC = () => {
  isUserNotFound()
  const router = useRouter()

  const { user } = useAuth()

  const { data: dataUser } = useQuery(GET_USER, {
    variables: {
      id: user?.id
    }
  })

  useEffect(() => {
    const token = getToken()

    if (!token) {
      return null
    } else {
      isAuth()
    }
  }, [])

  const { data: productsQuery, loading: loadingProducts } = useQuery(
    GET_PRODUCTS,
    {
      fetchPolicy: 'network-only'
    }
  )

  const products = productsQuery?.getProducts || []
  const userInfo = dataUser?.getUser || {}

  return (
    <Box minHeight="100vh">
      <Header user={userInfo} />

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
              onClick={() => router.push(`/category/food`)}
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
              onClick={() => router.push(`/category/drink`)}
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
              onClick={() => router.push(`/category/bazar`)}
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
              onClick={() => router.push(`/category/bread`)}
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
                  <Link display="block" _hover={{ textDecoration: 'none' }}>
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
