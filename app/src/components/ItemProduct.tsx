import React from 'react'
import { Box, Grid, Flex, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useQuery } from '@apollo/client'

import 'dayjs/locale/es'
import { GET_SUPERMARKET } from '../graphql/queries/supermarket'

interface ItemProductIprops {
  price: any
}

dayjs.extend(relativeTime)
dayjs.locale('es')

const ItemProduct: React.FC<ItemProductIprops> = ({ price }) => {
  const { data: dataSupermarket } = useQuery(GET_SUPERMARKET, {
    variables: {
      id: price?.idSuper
    }
  })

  const supermarket = dataSupermarket?.getSupermarket || {}

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
              src={supermarket?.image}
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
              {dayjs(Number(price?.createdAt)).fromNow()}
            </Text>
            <Text
              // fontWeight="semibold"
              textTransform="uppercase"
              fontSize="12px"
            >
              {supermarket?.city}
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
            {price?.value} / KG
          </Text>
        </Box>
      </Flex>

      <Box marginTop="5px" gridColumn="1/5">
        <Text fontSize="12px" color="#003049" textTransform="uppercase">
          {supermarket?.address}
        </Text>
      </Box>
    </Box>
  )
}

export default ItemProduct
