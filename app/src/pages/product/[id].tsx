import React from 'react'
import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useQuery } from '@apollo/client'

import ItemProduct from '../../components/ItemProduct'
import Back from '../../components/Back'
import { GET_SUPERMARKETS } from '../../graphql/queries/supermarket'
import { GET_PRODUCT } from '../../graphql/queries/product'

const Product: React.FC = () => {
  const router = useRouter()
  const { data: dataSupermarkets } = useQuery(GET_SUPERMARKETS)
  const { data: dataProduct } = useQuery(GET_PRODUCT, {
    variables: {
      id: router?.query?.id
    }
  })

  const supermarkets = dataSupermarkets?.getSupermarkets || []
  const product = dataProduct?.getProduct || {}

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
        {supermarkets.length < 0 ? (
          <Box>No hay supermercados con este producto añadido</Box>
        ) : (
          supermarkets.length > 0 &&
          supermarkets.map(supermarket => (
            <ItemProduct
              key={supermarket.id}
              supermarket={supermarket}
              product={product}
            />
          ))
        )}
      </Box>
    </Box>
  )
}

export default Product
