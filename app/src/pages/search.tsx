import React, { useState } from 'react'
import NextLink from 'next/link'
import { Box, Button, Grid, Input, Text, Link } from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'
import { FaStoreAlt } from 'react-icons/fa'
import { useQuery } from '@apollo/client'

import Navbar from '../components/Navbar'
import Back from '../components/Back'
import Loader from '../components/Loader'
import Product from '../components/Product'
import { MdLocalGroceryStore } from 'react-icons/md'
import { GET_PRODUCTS } from '../graphql/queries/product'

const Search: React.FC = () => {
  const { data: dataProducts, loading: loadingProducts } =
    useQuery(GET_PRODUCTS)
  const products = dataProducts?.getProducts || []

  const [searchValue, setSearchValue] = useState<string>('')

  const productsList = products.filter(product =>
    product.name.toLowerCase().includes(searchValue.toLowerCase())
  )

  return (
    <Box padding="20px">
      <Back showButton={false} title="Buscar" />

      <Box marginTop="15px">
        <Grid as="form" gridTemplateColumns="1fr 50px" gap="15px">
          <Box>
            <Input
              type="text"
              backgroundColor="#F9F9F9"
              borderRadius="2px"
              placeholder="Tomate"
              border="1px solid #FFF"
              borderColor="transparent"
              height="45px"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              _focus={{ border: '1px solid #003049' }}
            />
          </Box>

          <Box>
            <Button
              type="submit"
              minWidth="initial"
              height="100%"
              rounded="3px 3px 0 0"
              backgroundColor="#FDF0D5"
              color="#003049"
              border="1px solid #003049"
              borderBottom="4px solid #003049"
              fontSize="24px"
              _focus={{ border: 0 }}
            >
              <FiSearch />
            </Button>
          </Box>
        </Grid>

        {searchValue ? (
          <Box as="main" marginTop="15px">
            {loadingProducts ? (
              <Loader />
            ) : (
              <Grid gridTemplateColumns="repeat(2, 1fr)" gap="10px">
                {productsList.length === 0 ? (
                  <Box gridColumn="1/4">
                    <Text>No se encontraron resultados con esta búsqueda</Text>
                  </Box>
                ) : (
                  productsList.map(product => (
                    <NextLink href={`/product/${product.id}`} key={product.id}>
                      <Link display="block" _hover={{ textDecoration: 'none' }}>
                        <Product key={product.id} product={product} />
                      </Link>
                    </NextLink>
                  ))
                )}
              </Grid>
            )}
          </Box>
        ) : (
          <Box marginTop="30px">
            <NextLink href="/supermarket">
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
                      Buscar por supermercado
                    </Text>
                    <Text
                      color="#9F9F9F"
                      textAlign="left"
                      fontSize="12px"
                      fontWeight="regular"
                      textTransform="lowercase"
                    >
                      mostrar supermercados
                    </Text>
                  </Box>
                </Grid>
              </Link>
            </NextLink>

            <NextLink href="/products">
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
                      Buscar por producto
                    </Text>
                    <Text
                      color="#9F9F9F"
                      textAlign="left"
                      fontSize="12px"
                      fontWeight="regular"
                      textTransform="lowercase"
                    >
                      mostrar productos
                    </Text>
                  </Box>
                </Grid>
              </Link>
            </NextLink>
          </Box>
        )}
      </Box>

      <Navbar />
    </Box>
  )
}

export default Search
