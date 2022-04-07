import React from 'react'
import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useQuery } from '@apollo/client'

import ItemProduct from '../../components/ItemProduct'
import Back from '../../components/Back'

import { GET_PRODUCT } from '../../graphql/queries/product'
import { GET_PRICES_ALL } from '../../graphql/queries/price'

const Product: React.FC = () => {
  const router = useRouter()

  const { data: dataProduct } = useQuery(GET_PRODUCT, {
    variables: {
      id: router?.query?.id
    }
  })

  const { data: dataPrices } = useQuery(GET_PRICES_ALL, {
    fetchPolicy: 'network-only',
    variables: {
      idProduct: router?.query?.id
    }
  })

  const product = dataProduct?.getProduct || {}
  const prices = dataPrices?.getPrices || []

  return (
    <Box padding="20px">
      <Back title={product?.name} />
      <Box className="image-cover" marginTop="20px">
        <LazyLoadImage
          src={product?.image}
          alt="Imagen del producto"
          width="100%"
          effect="blur"
        />
      </Box>

      <Box marginTop="15px">
        {prices.length === 0 ? (
          <Box>No hay supermercados con este producto añadido</Box>
        ) : (
          prices.length > 0 &&
          prices.map(price => <ItemProduct key={price.id} price={price} />)
        )}
      </Box>
    </Box>
  )
}

export default Product
