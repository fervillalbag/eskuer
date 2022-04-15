import React, { useContext } from 'react'
import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'

import { SuperContext } from '../../../context/SuperContext'
import { GET_PRICES } from '../../../graphql/queries/price'
import Back from '../../../components/Back'
import { GET_PRODUCT } from '../../../graphql/queries/product'
import ItemProduct from '../../../components/ItemProduct'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const ProductSupermarket: React.FC = () => {
  const router = useRouter()

  const { superSelected } = useContext(SuperContext)

  const { data: dataPrice } = useQuery(GET_PRICES, {
    fetchPolicy: 'network-only',
    variables: {
      idProduct: router?.query?.id,
      idSuper: superSelected
    }
  })

  const price = dataPrice?.getPrice || {}

  const { data: dataProduct } = useQuery(GET_PRODUCT, {
    fetchPolicy: 'network-only',
    variables: {
      id: price?.idProduct
    }
  })

  const product = dataProduct?.getProduct || {}

  return (
    <Box padding="20px">
      <Box>
        <Back title={product?.name} />

        <Box width="150px" className="image-cover" marginTop="20px">
          <LazyLoadImage
            src={product?.image}
            alt="Imagen del producto"
            width="100%"
            effect="blur"
          />
        </Box>

        <ItemProduct key={price.id} price={price} />
      </Box>
    </Box>
  )
}

export default ProductSupermarket
