import React from 'react'
import { Box, Grid, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { FaStoreAlt } from 'react-icons/fa'
import { AiFillDollarCircle } from 'react-icons/ai'

import Back from '../../components/Back'
import Navbar from '../../components/Navbar'

const Admin: React.FC = () => {
  return (
    <Box padding="20px">
      <Back showButton={false} title="Administrador" />

      <Text color="#003049" marginTop="20px" textTransform="uppercase">
        Editar
      </Text>

      <Box marginTop="15px">
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
                  Añadir un nuevo precio
                </Text>
                <Text
                  color="#9F9F9F"
                  textAlign="left"
                  fontSize="12px"
                  fontWeight="regular"
                  textTransform="lowercase"
                >
                  cantidad de precios: 0
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
                <FaStoreAlt />
              </Text>
              <Box>
                <Text
                  color="#003049"
                  textAlign="left"
                  fontSize="12px"
                  fontWeight="semibold"
                >
                  Crear un nuevo producto
                </Text>
                <Text
                  color="#9F9F9F"
                  textAlign="left"
                  fontSize="12px"
                  fontWeight="regular"
                  textTransform="lowercase"
                >
                  cantidad de productos: 0
                </Text>
              </Box>
            </Grid>
          </Link>
        </NextLink>
      </Box>

      <Box width="100%" height="1px" backgroundColor="#D5DFE5"></Box>

      <Navbar />
    </Box>
  )
}

export default Admin
