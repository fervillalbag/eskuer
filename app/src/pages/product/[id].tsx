import React from 'react'
import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
// import { useQuery } from '@apollo/client'

// import { GET_PRODUCT } from '../../graphql/queries/product'
import ItemProduct from '../../components/ItemProduct'
// import Loader from '../../components/Loader'
import Back from '../../components/Back'
import { useQuery } from '@apollo/client'
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
      <Back title="Nombre producto" />
      <Box className="image-cover" marginTop="20px">
        <LazyLoadImage
          src="/carrot.jpeg"
          alt="Imagen del producto"
          width="100%"
          effect="blur"
        />
      </Box>
      {/* <Box>
        {loadingProduct ? (
          <Box marginTop="10px">
            <Loader />
          </Box>
        ) : (
          supermarkets.map(supermarket => (
            <ItemProduct
              key={supermarket.id}
              supermarket={supermarket}
              idProduct={router?.query?.id}
            />
          ))
        )}
      </Box> */}

      <Box marginTop="15px">
        {supermarkets.length > 0 &&
          supermarkets.map(supermarket => (
            <ItemProduct
              key={supermarket.id}
              supermarket={supermarket}
              product={product}
            />
          ))}
      </Box>
    </Box>
  )
}

export default Product
