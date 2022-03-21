import React from 'react'
import { useRouter } from 'next/router'
import { Box, Button, Flex, Grid, Heading, Image } from '@chakra-ui/react'
import { FaAngleLeft } from 'react-icons/fa'
import { useQuery } from '@apollo/client'
import { GET_PRODUCT } from '../../graphql/queries/product'
import ItemProduct from '../../components/ItemProduct'

const Product: React.FC = () => {
  const router = useRouter()

  const { data } = useQuery(GET_PRODUCT, {
    variables: {
      id: router?.query?.id
    }
  })

  const product = data?.getProduct

  return (
    <Box padding="20px">
      <Flex marginBottom="20px" alignItems="center">
        <Button
          minWidth="initial"
          height="auto"
          padding="15px"
          color="#333"
          backgroundColor="#f0f0f0"
          fontSize="1.2rem"
          _focus={{ shadow: 0 }}
          onClick={() => router.back()}
        >
          <FaAngleLeft />
        </Button>
        <Heading
          fontSize="1.2rem"
          color="#333"
          marginLeft="10px"
          fontWeight="bold"
        >
          Tomate
        </Heading>
      </Flex>

      <Box>
        <Image
          src="https://images.pexels.com/photos/2899682/pexels-photo-2899682.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          alt=""
          width="120px"
          height="120px"
          objectFit="cover"
          borderRadius="4px"
        />
      </Box>

      <Grid
        gridTemplateColumns="1fr 2fr 1fr 100px"
        marginTop="20px"
        backgroundColor="#2D93E8"
        alignItems="center"
        padding="5px 10px"
      >
        <Box
          color="#FFF"
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
        >
          Super
        </Box>
        <Box
          color="#FFF"
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
        >
          Act
        </Box>
        <Box
          color="#FFF"
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
        >
          Tipo
        </Box>
        <Box
          color="#FFF"
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="right"
        >
          Precio
        </Box>
      </Grid>

      <Box>
        {product?.supermarket.map(item => (
          <ItemProduct key={item.id} product={product} />
        ))}
      </Box>
    </Box>
  )
}

export default Product
