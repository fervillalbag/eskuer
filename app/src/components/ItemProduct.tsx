import React from 'react'
import { Box, Grid, Flex, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useQuery } from '@apollo/client'

// import { Price } from '../interfaces/Price'

import { Supermarket } from '../interfaces/Supermarket'
import { ProductType } from '../interfaces/Product'
import { GET_PRICES } from '../graphql/queries/price'
import { GET_SUBSIDIARY } from '../graphql/queries/subsidiaries'

import 'dayjs/locale/es'

interface ItemProductIprops {
  supermarket: Supermarket
  product: ProductType
}

dayjs.extend(relativeTime)
dayjs.locale('es')

const ItemProduct: React.FC<ItemProductIprops> = ({ supermarket, product }) => {
  const { data: dataPrices } = useQuery(GET_PRICES, {
    variables: {
      idSuper: supermarket.id,
      idProduct: product.id
    }
  })

  const prices = dataPrices?.getPrices || []
  const recentProduct = prices[0]

  const { data: dataSubsidiary } = useQuery(GET_SUBSIDIARY, {
    variables: {
      id: recentProduct?.idSubsidiary
    }
  })

  const subsidiary = dataSubsidiary?.getSubsidiary || {}

  return (
    <Box borderBottom="1px solid #F0F0F0" marginTop="15px" paddingBottom="15px">
      <Flex
        gridTemplateColumns="50px 80px 1fr"
        alignItems="center"
        justifyContent="space-between"
        width="full"
      >
        <Flex>
          <Grid alignItems="center" className="image-supermarket" width="40px">
            <LazyLoadImage
              src="https://www.gruporiquelme.com/storage/app/uploads/public/5b2/437/68a/5b243768a0ca4866054042.png"
              alt="Logo del supermercado"
              effect="blur"
            />
          </Grid>
          <Box marginLeft="10px">
            <Text
              color="#003049"
              fontWeight="bold"
              textTransform="uppercase"
              fontSize="12px"
            >
              {dayjs(Number(recentProduct?.createdAt)).fromNow()}
            </Text>
            <Text
              // fontWeight="semibold"
              textTransform="uppercase"
              fontSize="12px"
            >
              {subsidiary?.city}
            </Text>
          </Box>
        </Flex>
        <Box>
          <Text
            color="#003049"
            fontSize="14px"
            textTransform="uppercase"
            textAlign="right"
            fontWeight="bold"
          >
            {recentProduct?.value} / KG
          </Text>
        </Box>
      </Flex>

      <Box marginTop="5px" gridColumn="1/5">
        <Text fontSize="12px" color="#003049" textTransform="uppercase">
          {subsidiary?.address}
        </Text>
      </Box>
    </Box>
  )
}

export default ItemProduct
