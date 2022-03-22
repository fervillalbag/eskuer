import React from 'react'
import { Box, Button, Flex, Grid, Image, Text } from '@chakra-ui/react'
import { BsFillEyeFill } from 'react-icons/bs'
import { ProductType } from '../interfaces/Product'

interface ProductIprops {
  product: ProductType
}

const Product: React.FC<ProductIprops> = ({ product }) => {
  const prices = product.price

  const pricesValue = prices.map(item => item.value)
  const pricesOrder = pricesValue.sort((a, b) => a - b)

  return (
    <Grid
      gridTemplateColumns="10rem 1fr auto"
      as="article"
      alignItems="center"
      justifyContent="space-between"
      backgroundColor="white"
      padding="5px 10px"
      rounded="md"
      marginBottom="10px"
    >
      <Flex alignItems="center">
        <Box width="35px" height="35px">
          <Image
            src={product?.image}
            alt=""
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </Box>
        <Box marginLeft="10px">
          <Text fontWeight="medium" fontSize="14px" color="#818181">
            {product?.name}
          </Text>
        </Box>
      </Flex>

      <Box>
        <Text
          fontWeight="bold"
          textTransform="uppercase"
          fontSize="14px"
          color="#2D93E8"
        >
          KG
        </Text>
      </Box>

      <Flex alignItems="center">
        <Box
          fontWeight="medium"
          color="#818181"
          marginLeft="10px"
          textAlign="right"
          fontSize="14px"
        >
          <Text>Gs. {pricesOrder[0]}</Text>
        </Box>
        <Box marginLeft="10px">
          <Button
            minWidth="initial"
            height="initial"
            padding="7px 10px"
            fontSize="14px"
            border="1px solid #F1F1F1"
            _focus={{ shadow: 0 }}
            _active={{ backgroundColor: '#FFF' }}
            _hover={{ backgroundColor: '#FFF' }}
            backgroundColor="#FFF"
            color="#818181"
          >
            <BsFillEyeFill />
          </Button>
        </Box>
      </Flex>
    </Grid>
  )
}

export default Product
