import React from 'react'
import { useRouter } from 'next/router'
import { Box, Button, Flex, Grid, Heading, Image } from '@chakra-ui/react'
import { FaAngleLeft } from 'react-icons/fa'
import { useQuery } from '@apollo/client'
// import { GET_PRODUCT } from '../../graphql/queries/product'
import ItemProduct from '../../components/ItemProduct'
import { GET_SUPERMARKETS } from '../../graphql/queries/supermarket'
import { GET_PRODUCT } from '../../graphql/queries/product'

const Product: React.FC = () => {
  const router = useRouter()

  const { data: supermarketsQuery } = useQuery(GET_SUPERMARKETS, {
    fetchPolicy: 'network-only'
  })
  const { data: productQuery } = useQuery(GET_PRODUCT, {
    fetchPolicy: 'network-only',
    variables: {
      id: router?.query?.id
    }
  })

  const supermarkets = supermarketsQuery?.getSupermarkets || []
  const product = productQuery?.getProduct

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
          textTransform="uppercase"
        >
          {product?.name}
        </Heading>
      </Flex>

      <Box>
        <Image
          src={product?.image}
          alt={product?.name}
          width="120px"
          height="120px"
          objectFit="cover"
          borderRadius="4px"
        />
      </Box>

      <Grid
        gridTemplateColumns="60px 80px 1fr 90px"
        marginTop="20px"
        backgroundColor="#2D93E8"
        alignItems="center"
        padding="5px 10px"
        gap="0 10px"
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
          Subido
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
        {supermarkets.map(supermarket => (
          <ItemProduct
            key={supermarket.id}
            supermarket={supermarket}
            idProduct={router?.query?.id}
          />
        ))}
      </Box>
    </Box>
  )
}

export default Product
