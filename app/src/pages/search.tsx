import React from 'react'
import NextLink from 'next/link'
import { Box, Button, Grid, Input, Text, Link } from '@chakra-ui/react'
import { HiSearch } from 'react-icons/hi'

import Navbar from '../components/Navbar'
import Back from '../components/Back'
import { MdLocalGroceryStore } from 'react-icons/md'
import { FaStoreAlt } from 'react-icons/fa'

const Search: React.FC = () => {
  return (
    <Box padding="20px">
      <Back showButton={false} title="Buscar" />

      <Box as="form" marginTop="15px">
        <Grid gridTemplateColumns="1fr 50px" gap="15px">
          <Box>
            <Input
              type="text"
              backgroundColor="#F9F9F9"
              borderRadius="2px"
              placeholder="Tomate"
              border="1px solid #FFF"
              borderColor="transparent"
              height="45px"
              _focus={{ border: '1px solid #003049' }}
            />
          </Box>

          <Box>
            <Button
              minWidth="initial"
              height="100%"
              borderRadius="2px"
              backgroundColor="#FDF0D5"
              color="#003049"
              fontSize="24px"
              _focus={{ border: 0 }}
            >
              <HiSearch />
            </Button>
          </Box>
        </Grid>

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
                    cantidad de supemercados: 2
                  </Text>
                </Box>
              </Grid>
            </Link>
          </NextLink>

          <NextLink href="/product">
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
                    cantidad de productos: 2
                  </Text>
                </Box>
              </Grid>
            </Link>
          </NextLink>
        </Box>
      </Box>

      <Navbar />
    </Box>
  )
}

export default Search
