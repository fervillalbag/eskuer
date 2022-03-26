import React from 'react'
import { Box, Grid, Text } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { LazyLoadImage } from 'react-lazy-load-image-component'

// import { Price } from '../interfaces/Price'
import { GET_PRICES } from '../graphql/queries/price'

import 'dayjs/locale/es'
interface ItemProductIprops {
  supermarket: any
  idProduct: any
}

dayjs.extend(relativeTime)
dayjs.locale('es')

const ItemProduct: React.FC<ItemProductIprops> = ({
  supermarket,
  idProduct
}) => {
  const { data: pricesQuery } = useQuery(GET_PRICES, {
    fetchPolicy: 'network-only',
    variables: {
      idSuper: supermarket.id,
      idProduct: idProduct
    }
  })

  const price = pricesQuery?.getPrices || []
  const recentProduct = price[0]

  if (price.length === 0) return null

  return (
    <Grid
      gridTemplateColumns="60px 80px 1fr 90px"
      borderBottom="1px solid #F0F0F0"
      padding="10px"
      alignItems="center"
      gap="0 10px"
    >
      <Grid placeItems="center" className="image-supermarket">
        <LazyLoadImage
          src={supermarket?.image}
          alt={supermarket?.name}
          effect="blur"
        />
      </Grid>
      <Box
        fontSize="12px"
        textTransform="uppercase"
        textAlign="center"
        fontWeight="regular"
        color="#333"
      >
        {dayjs(Number(recentProduct.createdAt)).fromNow()}
      </Box>
      <Box
        color="#333"
        fontSize="14px"
        textTransform="uppercase"
        textAlign="center"
      >
        {recentProduct?.type}
      </Box>
      <Box
        color="#333"
        fontSize="14px"
        textTransform="uppercase"
        textAlign="right"
      >
        Gs. {recentProduct?.value}
      </Box>
      <Box marginTop="5px" gridColumn="1/5">
        <Text fontSize="12px">
          Sucursal: Blair Waldorf esquina Emily Fields
        </Text>
      </Box>
    </Grid>
  )
}

export default ItemProduct
