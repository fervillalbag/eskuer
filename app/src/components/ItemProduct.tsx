import React from 'react'
import { Box, Grid } from '@chakra-ui/react'
import { ProductType } from '../interfaces/Product'

interface ItemProductIprops {
  product: ProductType
}

const ItemProduct: React.FC<ItemProductIprops> = ({ product }) => {
  console.log(product)

  return (
    <>
      {product.supermarket.map(item => (
        <Grid
          key={item.id}
          gridTemplateColumns="1fr 2fr 1fr 100px"
          borderBottom="1px solid #F0F0F0"
          padding="10px"
          alignItems="center"
        >
          <Box
            color="#333"
            fontSize="14px"
            textTransform="uppercase"
            textAlign="center"
          >
            Precio
          </Box>
          <Box
            color="#333"
            fontSize="12px"
            textTransform="uppercase"
            textAlign="center"
          >
            Hace 1d
          </Box>
          <Box
            color="#333"
            fontSize="14px"
            textTransform="uppercase"
            textAlign="center"
          >
            KG
          </Box>
          <Box
            color="#333"
            fontSize="14px"
            textTransform="uppercase"
            textAlign="right"
          >
            Gs. 22.000
          </Box>
        </Grid>
      ))}
    </>
  )
}

export default ItemProduct
