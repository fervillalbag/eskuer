import React from 'react'
import { Box, Image, Text } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'

import { ProductType } from '../interfaces/Product'
import { GET_PRICES } from '../graphql/queries/price'

interface ProductIprops {
  product: ProductType
}

const Product: React.FC<ProductIprops> = ({ product }) => {
  const { data: dataPrices } = useQuery(GET_PRICES, {
    variables: {
      idProduct: product?.id,
      idSuper: null
    }
  })

  const prices = dataPrices?.getPrices || []
  if (prices.length === 0) return null

  return (
    <Box>
      <Box position="relative">
        <Image
          src={product.image}
          alt=""
          width="100%"
          height="120px"
          objectFit="cover"
          borderRadius="2px"
        />

        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          background="linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.8) 90%)"
        >
          <Text
            color="white"
            position="absolute"
            bottom="7px"
            right="7px"
            zIndex="20"
            fontSize="14px"
            fontWeight="bold"
            textTransform="uppercase"
          >
            {product.name}
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

export default Product
