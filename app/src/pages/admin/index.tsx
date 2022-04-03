import React from 'react'
import { Box, Grid, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import Back from '../../components/Back'
import Navbar from '../../components/Navbar'

const Admin: React.FC = () => {
  return (
    <Box padding="20px">
      <Back showButton={false} title="Administrador" />

      <Grid gridTemplateColumns="repeat(2, 1fr)" gap="15px" marginTop="20px">
        <NextLink href="/create/price">
          <Link
            height="45px"
            width="100%"
            display="block"
            border="2px solid #003049"
            rounded="2px"
            color="#003049"
            lineHeight="45px"
            textAlign="center"
            fontWeight="semibold"
            textTransform="uppercase"
            fontSize="14px"
            _hover={{ textDecoration: 'none' }}
          >
            Nuevo precio
          </Link>
        </NextLink>
        <NextLink href="/create/product">
          <Link
            height="45px"
            width="100%"
            display="block"
            border="2px solid #003049"
            rounded="2px"
            color="#003049"
            lineHeight="45px"
            textAlign="center"
            fontWeight="semibold"
            textTransform="uppercase"
            fontSize="14px"
            _hover={{ textDecoration: 'none' }}
          >
            Crear producto
          </Link>
        </NextLink>
        <NextLink href="/create/supermarket">
          <Link
            height="45px"
            width="100%"
            display="block"
            border="2px solid #003049"
            rounded="2px"
            color="#003049"
            lineHeight="45px"
            textAlign="center"
            fontWeight="semibold"
            textTransform="uppercase"
            fontSize="14px"
            _hover={{ textDecoration: 'none' }}
          >
            Crear super
          </Link>
        </NextLink>
      </Grid>

      <Navbar />
    </Box>
  )
}

export default Admin
