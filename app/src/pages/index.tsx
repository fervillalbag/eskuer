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
          color="#3E3E3E"
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
              backgroundColor="#FFF"
              padding="10px 20px"
              rounded="3px 3px 0 0"
              marginRight="15px"
              textTransform="capitalize"
              border="1px solid #3E3E3E"
              borderBottom="4px solid #3E3E3E"
              onClick={() => router.push(`/category/verdura`)}
            >
              <Text color="#3E3E3E" fontWeight="semibold">
                Verduras
              </Text>
            </Flex>
            <Flex
              as="article"
              display="flex"
              justifyContent="center"
              alignItems="center"
              backgroundColor="#FFF"
              padding="10px 20px"
              rounded="3px 3px 0 0"
              marginRight="15px"
              textTransform="capitalize"
              border="1px solid #3E3E3E"
              borderBottom="4px solid #3E3E3E"
              onClick={() => router.push(`/category/bebida`)}
            >
              <Text color="#3E3E3E" fontWeight="semibold">
                Bebidas
              </Text>
            </Flex>
            <Flex
              as="article"
              display="flex"
              justifyContent="center"
              alignItems="center"
              backgroundColor="#FFF"
              padding="10px 20px"
              rounded="3px 3px 0 0"
              marginRight="15px"
              textTransform="capitalize"
              border="1px solid #3E3E3E"
              borderBottom="4px solid #3E3E3E"
              onClick={() => router.push(`/category/aseo`)}
            >
              <Text color="#3E3E3E" fontWeight="semibold">
                Aseo
              </Text>
            </Flex>
            <Flex
              as="article"
              display="flex"
              justifyContent="center"
              alignItems="center"
              backgroundColor="#FFF"
              padding="10px 20px"
              rounded="3px 3px 0 0"
              marginRight="15px"
              textTransform="capitalize"
              border="1px solid #3E3E3E"
              borderBottom="4px solid #3E3E3E"
              onClick={() => router.push(`/category/lacteo`)}
            >
              <Text color="#3E3E3E" fontWeight="semibold">
                Lácteos
              </Text>
            </Flex>

            <Flex
              as="article"
              display="flex"
              justifyContent="center"
              alignItems="center"
              backgroundColor="#FFF"
              padding="10px 20px"
              rounded="3px 3px 0 0"
              marginRight="15px"
              textTransform="capitalize"
              border="1px solid #3E3E3E"
              borderBottom="4px solid #3E3E3E"
              onClick={() => router.push(`/category/dulce`)}
            >
              <Text color="#3E3E3E" fontWeight="semibold">
                Dulces
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
          color="#3E3E3E"
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
