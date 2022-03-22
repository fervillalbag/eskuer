import React, { useState } from 'react'
import { Box, Grid } from '@chakra-ui/react'

import { Price } from '../interfaces/Price'

interface ItemProductIprops {
  price: [Price]
}

const ItemProduct: React.FC<ItemProductIprops> = ({ price = [] }) => {
  const [priceArray, setPriceArray] = useState(price || [])

  console.log(price)

  price.forEach(currentPrice => {
    const isExist = priceArray.find(
      item => item.idSuper === currentPrice.idSuper
    )

    if (isExist) {
      // setPriceArray([...priceArray, ])
    }

    console.log(isExist)
  })

  return (
    <>
      <Grid
        // key={price.id}
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
          {/* {price.idSuper} */}
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
          {/* {price.type} */}
        </Box>
        <Box
          color="#333"
          fontSize="14px"
          textTransform="uppercase"
          textAlign="right"
        >
          {/* Gs.{price.value} */}
        </Box>
      </Grid>
    </>
  )
}

export default ItemProduct
