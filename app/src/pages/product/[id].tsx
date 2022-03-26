import React from 'react'
import { useRouter } from 'next/router'
import { Box, Button, Flex, Grid, Heading } from '@chakra-ui/react'
import { FaAngleLeft } from 'react-icons/fa'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useQuery } from '@apollo/client'

// import { GET_PRODUCT } from '../../graphql/queries/product'
import ItemProduct from '../../components/ItemProduct'
import { GET_SUPERMARKETS } from '../../graphql/queries/supermarket'
import { GET_PRODUCT } from '../../graphql/queries/product'
import Loader from '../../components/Loader'

const Product: React.FC = () => {
  const router = useRouter()

  const { data: supermarketsQuery } = useQuery(GET_SUPERMARKETS, {
    fetchPolicy: 'network-only'
  })
  const { data: productQuery, loading: loadingProduct } = useQuery(
    GET_PRODUCT,
    {
      fetchPolicy: 'network-only',
      variables: {
        id: router?.query?.id
      }
    }
  )

  const supermarkets = supermarketsQuery?.getSupermarkets || []
  const product = productQuery?.getProduct

  return (
    <Box padding="20px">
      <Flex marginBottom="20px" alignItems="center">
        <Button
          minWidth="initial"
          height="auto"
          padding="15px"
          color="#FFF"
          backgroundColor="hsl(207, 80%, 75%)"
          fontSize="1.2rem"
          _focus={{ shadow: 0 }}
          onClick={() => router.back()}
        >
          <FaAngleLeft />
        </Button>
        <Heading
          fontSize="1.2rem"
          color="hsl(0, 0%, 45%)"
          marginLeft="10px"
          fontWeight="bold"
          textTransform="uppercase"
        >
          {product?.name}
        </Heading>
      </Flex>

      <Box className="image-cover">
        {loadingProduct ? (
          <Box
            width="120px"
            height="120px"
            backgroundColor="#e6e6e6"
            rounded="4px"
          ></Box>
        ) : (
          <LazyLoadImage
            src={product?.image}
            alt={product?.name}
            effect="blur"
          />
        )}
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
        {loadingProduct ? (
          <Box marginTop="10px">
            <Loader />
          </Box>
        ) : (
          supermarkets.map(supermarket => (
            <ItemProduct
              key={supermarket.id}
              supermarket={supermarket}
              idProduct={router?.query?.id}
            />
          ))
        )}
      </Box>
    </Box>
  )
}

export default Product
