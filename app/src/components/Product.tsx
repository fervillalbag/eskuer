import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import { ProductType } from '../interfaces/Product'

interface ProductIprops {
  product: ProductType
}

const Product: React.FC<ProductIprops> = ({ product }) => {
  return (
    <Box>
      <Box position="relative" height="120px" rounded="2px" overflow="hidden">
        <Box>
          <LazyLoadImage
            src={product.image}
            alt=""
            width="100%"
            height="120px"
            effect="blur"
            className="product-index"
          />
        </Box>

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
