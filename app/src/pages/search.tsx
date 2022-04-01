import React from 'react'
import { Box, Button, Grid, Input, Heading } from '@chakra-ui/react'
import { HiSearch } from 'react-icons/hi'

import Navbar from '../components/Navbar'

const Search: React.FC = () => {
  return (
    <Box padding="20px">
      <Heading
        fontSize="20px"
        fontWeight="bold"
        color="#003049"
        textTransform="uppercase"
        marginBottom="15px"
      >
        Buscar
      </Heading>

      <Box as="form">
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
      </Box>

      <Navbar />
    </Box>
  )
}

export default Search