import React from 'react'
import { Box, Grid, Flex, Text } from '@chakra-ui/react'
// import { useQuery } from '@apollo/client'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { LazyLoadImage } from 'react-lazy-load-image-component'

// import { Price } from '../interfaces/Price'
// import { GET_PRICES } from '../graphql/queries/price'

import 'dayjs/locale/es'
// interface ItemProductIprops {}

dayjs.extend(relativeTime)
dayjs.locale('es')

const ItemProduct: React.FC = () => {
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
              hace 3 diás
            </Text>
            <Text
              // fontWeight="semibold"
              textTransform="uppercase"
              fontSize="12px"
            >
              San Lorenzo
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
            Gs. 9.200 / KG
          </Text>
        </Box>
      </Flex>

      <Box marginTop="5px" gridColumn="1/5">
        <Text fontSize="12px" color="#003049" textTransform="uppercase">
          Manuel Ortíz Guerrero c/ Campo Jordán
        </Text>
      </Box>
    </Box>
  )
}

export default ItemProduct
