import React from 'react'
// import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
// import { useQuery } from '@apollo/client'

// import { GET_PRODUCT } from '../../graphql/queries/product'
import ItemProduct from '../../components/ItemProduct'
// import Loader from '../../components/Loader'
import Back from '../../components/Back'

const Product: React.FC = () => {
  // const router = useRouter()

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
        <ItemProduct />
        <ItemProduct />
      </Box>
    </Box>
  )
}

export default Product
