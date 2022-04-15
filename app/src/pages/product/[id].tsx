import React from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { Box, Flex, Button } from '@chakra-ui/react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useMutation, useQuery } from '@apollo/client'

import ItemProduct from '../../components/ItemProduct'
import Back from '../../components/Back'
import { GET_PRODUCT } from '../../graphql/queries/product'
import { GET_PRICES_ALL } from '../../graphql/queries/price'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import { GET_LIKE_PRODUCT } from '../../graphql/queries/likeProd'
import useAuth from '../../hooks/useAuth'
import {
  CREATE_LIKE_PRODUCT,
  DELETE_LIKE_PRODUCT
} from '../../graphql/mutations/likeProd'

const Product: React.FC = () => {
  const router = useRouter()

  const { user } = useAuth()

  const [createLikeProduct] = useMutation(CREATE_LIKE_PRODUCT)
  const [deleteLikeProduct] = useMutation(DELETE_LIKE_PRODUCT)

  const { data: dataProduct } = useQuery(GET_PRODUCT, {
    fetchPolicy: 'network-only',
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

  const { data: dataLikeProduct, refetch: refetchLikeProduct } = useQuery(
    GET_LIKE_PRODUCT,
    {
      fetchPolicy: 'network-only',
      variables: {
        input: {
          idProduct: router?.query?.id,
          idUser: user?.id
        }
      }
    }
  )

  const product = dataProduct?.getProduct || {}
  const prices = dataPrices?.getPrices || []
  const dataLike = dataLikeProduct?.getLikeProduct

  const handleAddLikeProduct = async () => {
    try {
      await createLikeProduct({
        variables: {
          idUser: user?.id,
          idProduct: router?.query?.id
        }
      })
      refetchLikeProduct()
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteLikeProduct = async () => {
    try {
      await deleteLikeProduct({
        variables: {
          id: dataLike?.id,
          idUser: user?.id,
          idProduct: router?.query?.id
        }
      })
      refetchLikeProduct()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box padding="20px">
      <Back title={product?.name} />
      <Flex
        justifyContent="space-between"
        marginTop="20px"
        alignItems="flex-start"
      >
        <Box width="150px" height="150px" className="image-cover">
          <LazyLoadImage
            src={product?.image}
            alt="Imagen del producto"
            width="100%"
            effect="blur"
          />
        </Box>
        <Box marginLeft="20px">
          <Button
            minWidth="initial"
            height="50px"
            border="1px solid #003049"
            rounded="3px 3px 0 0"
            borderBottom="4px solid #003049"
            backgroundColor="#FFF"
            fontSize="20px"
            _hover={{ backgroundColor: '#FFF' }}
            onClick={() => {
              if (!user?.id) {
                toast.error(
                  'Necesitas tener una cuenta para guardar un producto'
                )
              } else if (dataLike?.value) {
                handleDeleteLikeProduct()
              } else {
                handleAddLikeProduct()
              }
            }}
            _focus={{ shadow: 0 }}
          >
            {dataLike?.value ? <BsBookmarkFill /> : <BsBookmark />}
          </Button>
        </Box>
      </Flex>

      <Box marginTop="20px">
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
