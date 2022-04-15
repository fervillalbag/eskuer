import React from 'react'
import { Box, Grid, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { FaStoreAlt } from 'react-icons/fa'
import { AiFillDollarCircle } from 'react-icons/ai'
import { MdLocalGroceryStore } from 'react-icons/md'
import { FiUsers } from 'react-icons/fi'

import Back from '../../components/Back'
import Navbar from '../../components/Navbar'
import useAuth from '../../hooks/useAuth'
import { useQuery } from '@apollo/client'
import { GET_USER, GET_USERS } from '../../graphql/queries/user'
import NotFound from '../../components/NotFound'
import { GET_PRODUCTS } from '../../graphql/queries/product'
import { GET_SUPERMARKETS } from '../../graphql/queries/supermarket'

const Admin: React.FC = () => {
  const { user } = useAuth()

  const { data: dataUser } = useQuery(GET_USER, {
    variables: {
      id: user?.id
    }
  })

  const { data: dataUsers } = useQuery(GET_USERS, {
    fetchPolicy: 'network-only'
  })

  const { data: dataProducts } = useQuery(GET_PRODUCTS)

  const { data: dataSupermarkets } = useQuery(GET_SUPERMARKETS)

  const userInfo = dataUser?.getUser || {}
  const users = dataUsers?.getUsers || []
  const products = dataProducts?.getProducts || []
  const supermarkets = dataSupermarkets?.getSupermarkets || []

  if (userInfo.role !== 'ADMIN') return <NotFound />

  return (
    <Box padding="20px 20px 90px 20px">
      <Back showButton={false} title="Administrador" />
      <Text color="#003049" marginTop="20px" textTransform="uppercase">
        Añadir
      </Text>

      <Box marginTop="15px">
        <NextLink href="/create/product">
          <Link
            width="100%"
            display="flex"
            color="#003049"
            textAlign="center"
            fontWeight="semibold"
            textTransform="uppercase"
            fontSize="14px"
            _hover={{ textDecoration: 'none' }}
            marginBottom="20px"
          >
            <Grid
              gridTemplateColumns="40px 1fr"
              width="full"
              gap="0 15px"
              alignItems="center"
            >
              <Text fontSize="40px" color="#D5DFE5" marginRight="15px">
                <MdLocalGroceryStore />
              </Text>
              <Box>
                <Text
                  color="#003049"
                  textAlign="left"
                  fontSize="12px"
                  fontWeight="semibold"
                >
                  Añadir un nuevo producto
                </Text>
                <Text
                  color="#9F9F9F"
                  textAlign="left"
                  fontSize="12px"
                  fontWeight="regular"
                  textTransform="lowercase"
                >
                  mostrar opciones
                </Text>
              </Box>
            </Grid>
          </Link>
        </NextLink>

        <NextLink href="/create/supermarket">
          <Link
            width="100%"
            display="flex"
            color="#003049"
            textAlign="center"
            fontWeight="semibold"
            textTransform="uppercase"
            fontSize="14px"
            _hover={{ textDecoration: 'none' }}
            marginBottom="20px"
          >
            <Grid
              gridTemplateColumns="40px 1fr"
              width="full"
              gap="0 15px"
              alignItems="center"
            >
              <Text fontSize="40px" color="#D5DFE5" marginRight="15px">
                <FaStoreAlt />
              </Text>
              <Box>
                <Text
                  color="#003049"
                  textAlign="left"
                  fontSize="12px"
                  fontWeight="semibold"
                >
                  Añadir un nuevo supermercado
                </Text>
                <Text
                  color="#9F9F9F"
                  textAlign="left"
                  fontSize="12px"
                  fontWeight="regular"
                  textTransform="lowercase"
                >
                  mostrar opciones
                </Text>
              </Box>
            </Grid>
          </Link>
        </NextLink>

        <NextLink href="/create/price">
          <Link
            width="100%"
            display="flex"
            color="#003049"
            textAlign="center"
            fontWeight="semibold"
            textTransform="uppercase"
            fontSize="14px"
            _hover={{ textDecoration: 'none' }}
            marginBottom="20px"
          >
            <Grid
              gridTemplateColumns="40px 1fr"
              width="full"
              gap="0 15px"
              alignItems="center"
            >
              <Text fontSize="40px" color="#D5DFE5" marginRight="15px">
                <AiFillDollarCircle />
              </Text>
              <Box>
                <Text
                  color="#003049"
                  textAlign="left"
                  fontSize="12px"
                  fontWeight="semibold"
                >
                  Añadir precio a un producto
                </Text>
                <Text
                  color="#9F9F9F"
                  textAlign="left"
                  fontSize="12px"
                  fontWeight="regular"
                  textTransform="lowercase"
                >
                  mostrar opciones
                </Text>
              </Box>
            </Grid>
          </Link>
        </NextLink>
      </Box>

      <Box width="100%" height="1px" backgroundColor="#D5DFE5"></Box>

      <Text color="#003049" marginTop="20px" textTransform="uppercase">
        Lista
      </Text>

      <Box marginTop="15px">
        <NextLink href="/user">
          <Link
            width="100%"
            display="flex"
            color="#003049"
            textAlign="center"
            fontWeight="semibold"
            textTransform="uppercase"
            fontSize="14px"
            _hover={{ textDecoration: 'none' }}
            marginBottom="20px"
          >
            <Grid
              gridTemplateColumns="40px 1fr"
              width="full"
              gap="0 15px"
              alignItems="center"
            >
              <Text fontSize="40px" color="#D5DFE5" marginRight="15px">
                <FiUsers />
              </Text>
              <Box>
                <Text
                  color="#003049"
                  textAlign="left"
                  fontSize="12px"
                  fontWeight="semibold"
                >
                  Lista de usuarios
                </Text>
                <Text
                  color="#9F9F9F"
                  textAlign="left"
                  fontSize="12px"
                  fontWeight="regular"
                  textTransform="lowercase"
                >
                  cantidad de usuarios: {users.length}
                </Text>
              </Box>
            </Grid>
          </Link>
        </NextLink>

        <NextLink href="/list/product">
          <Link
            width="100%"
            display="flex"
            color="#003049"
            textAlign="center"
            fontWeight="semibold"
            textTransform="uppercase"
            fontSize="14px"
            _hover={{ textDecoration: 'none' }}
            marginBottom="20px"
          >
            <Grid
              gridTemplateColumns="40px 1fr"
              width="full"
              gap="0 15px"
              alignItems="center"
            >
              <Text fontSize="40px" color="#D5DFE5" marginRight="15px">
                <MdLocalGroceryStore />
              </Text>
              <Box>
                <Text
                  color="#003049"
                  textAlign="left"
                  fontSize="12px"
                  fontWeight="semibold"
                >
                  Lista de productos
                </Text>
                <Text
                  color="#9F9F9F"
                  textAlign="left"
                  fontSize="12px"
                  fontWeight="regular"
                  textTransform="lowercase"
                >
                  cantidad de productos: {products.length}
                </Text>
              </Box>
            </Grid>
          </Link>
        </NextLink>

        <NextLink href="/list/supermarket">
          <Link
            width="100%"
            display="flex"
            color="#003049"
            textAlign="center"
            fontWeight="semibold"
            textTransform="uppercase"
            fontSize="14px"
            _hover={{ textDecoration: 'none' }}
            marginBottom="20px"
          >
            <Grid
              gridTemplateColumns="40px 1fr"
              width="full"
              gap="0 15px"
              alignItems="center"
            >
              <Text fontSize="40px" color="#D5DFE5" marginRight="15px">
                <FaStoreAlt />
              </Text>
              <Box>
                <Text
                  color="#003049"
                  textAlign="left"
                  fontSize="12px"
                  fontWeight="semibold"
                >
                  Lista de supermercados
                </Text>
                <Text
                  color="#9F9F9F"
                  textAlign="left"
                  fontSize="12px"
                  fontWeight="regular"
                  textTransform="lowercase"
                >
                  cantidad de supermercados: {supermarkets.length}
                </Text>
              </Box>
            </Grid>
          </Link>
        </NextLink>
      </Box>

      <Box width="100%" height="1px" backgroundColor="#D5DFE5"></Box>

      <Text color="#003049" marginTop="20px" textTransform="uppercase">
        Editar
      </Text>

      <Box marginTop="15px">
        <NextLink href="/update/product">
          <Link
            width="100%"
            display="flex"
            color="#003049"
            textAlign="center"
            fontWeight="semibold"
            textTransform="uppercase"
            fontSize="14px"
            _hover={{ textDecoration: 'none' }}
            marginBottom="20px"
          >
            <Grid
              gridTemplateColumns="40px 1fr"
              width="full"
              gap="0 15px"
              alignItems="center"
            >
              <Text fontSize="40px" color="#D5DFE5" marginRight="15px">
                <MdLocalGroceryStore />
              </Text>
              <Box>
                <Text
                  color="#003049"
                  textAlign="left"
                  fontSize="12px"
                  fontWeight="semibold"
                >
                  Editar/Eliminar un producto
                </Text>
                <Text
                  color="#9F9F9F"
                  textAlign="left"
                  fontSize="12px"
                  fontWeight="regular"
                  textTransform="lowercase"
                >
                  mostrar opciones
                </Text>
              </Box>
            </Grid>
          </Link>
        </NextLink>

        <NextLink href="/update/supermarket">
          <Link
            width="100%"
            display="flex"
            color="#003049"
            textAlign="center"
            fontWeight="semibold"
            textTransform="uppercase"
            fontSize="14px"
            _hover={{ textDecoration: 'none' }}
            marginBottom="20px"
          >
            <Grid
              gridTemplateColumns="40px 1fr"
              width="full"
              gap="0 15px"
              alignItems="center"
            >
              <Text fontSize="40px" color="#D5DFE5" marginRight="15px">
                <FaStoreAlt />
              </Text>
              <Box>
                <Text
                  color="#003049"
                  textAlign="left"
                  fontSize="12px"
                  fontWeight="semibold"
                >
                  Editar/Eliminar un supermercado
                </Text>
                <Text
                  color="#9F9F9F"
                  textAlign="left"
                  fontSize="12px"
                  fontWeight="regular"
                  textTransform="lowercase"
                >
                  mostrar opciones
                </Text>
              </Box>
            </Grid>
          </Link>
        </NextLink>
      </Box>

      <Navbar />
    </Box>
  )
}

export default Admin
