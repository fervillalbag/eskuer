import React from 'react'
import { Box, Grid, Flex, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useQuery } from '@apollo/client'

import 'dayjs/locale/es'
import { GET_SUPERMARKET } from '../graphql/queries/supermarket'
import { GET_PRODUCT } from '../graphql/queries/product'

interface ItemProductIprops {
  price: any
}

dayjs.extend(relativeTime)
dayjs.locale('es')

const ItemProduct: React.FC<ItemProductIprops> = ({ price }) => {
  const { data: dataSupermarket } = useQuery(GET_SUPERMARKET, {
    fetchPolicy: 'network-only',
    variables: {
      id: price?.idSuper
    }
  })

  const { data: dataProduct } = useQuery(GET_PRODUCT, {
    fetchPolicy: 'network-only',
    variables: {
      id: price?.idProduct
    }
  })

  const supermarket = dataSupermarket?.getSupermarket || {}
  const product = dataProduct?.getProduct || {}

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
              color="#3E3E3E"
              fontWeight="bold"
              textTransform="uppercase"
              fontSize="12px"
            >
              {supermarket?.name}
            </Text>
            <Text
              // fontWeight="semibold"
              textTransform="uppercase"
              fontSize="12px"
            >
              {dayjs(Number(price?.createdAt)).fromNow()}
            </Text>
          </Box>
        </Flex>
        <Box>
          <Text
            color="#3E3E3E"
            fontSize="14px"
            textAlign="right"
            fontWeight="bold"
          >
            Gs. {price?.value} /{' '}
            <Text as="span" textTransform="uppercase">
              {product.type}
            </Text>
          </Text>
        </Box>
      </Flex>

      <Box marginTop="5px" gridColumn="1/5">
        <Text fontSize="12px" color="#3E3E3E" textTransform="uppercase">
          {supermarket?.address}, {supermarket?.city}
        </Text>
      </Box>
    </Box>
  )
}

export default ItemProduct
