import React, { useState } from 'react'
import toast from 'react-hot-toast'
import dayjs from 'dayjs'
import { Box, Button, Input, Select, Text } from '@chakra-ui/react'
import { useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import {
  GET_SUPERMARKET,
  GET_SUPERMARKETS
} from '../../graphql/queries/supermarket'
import { GET_PRODUCTS } from '../../graphql/queries/product'
import { CREATE_PRICE } from '../../graphql/mutations/price'
import Back from '../../components/Back'
import { GET_PRICES } from '../../graphql/queries/price'

const CreatePrice: React.FC = () => {
  const router = useRouter()

  const [supermarketId, setSupermarketId] = useState<string | null>(null)
  const [productId, setProductId] = useState<string | null>(null)
  const [price, setPrice] = useState<number>(0)

  const [createPrice] = useMutation(CREATE_PRICE)

  const { data: dataProducts } = useQuery(GET_PRODUCTS, {
    fetchPolicy: 'network-only'
  })

  const { data: dataSupermarket } = useQuery(GET_SUPERMARKET, {
    fetchPolicy: 'network-only',
    variables: {
      id: supermarketId
    }
  })

  const { data: dataSupermarkets } = useQuery(GET_SUPERMARKETS)

  const { data: dataPrice } = useQuery(GET_PRICES, {
    fetchPolicy: 'network-only',
    variables: {
      idSuper: supermarketId,
      idProduct: productId
    }
  })

  const products = dataProducts?.getProducts || []
  const supermarket = dataSupermarket?.getSupermarket || {}
  const supermarkets = dataSupermarkets?.getSupermarkets || []

  const product = dataPrice?.getPrice || null

  const handleAddPrice = async () => {
    if (!price || !supermarketId || !productId)
      return toast.error('Todos los campos son obligatorios')

    if (product?.id)
      return toast.error('Este producto ya tiene un precio asignado')

    await createPrice({
      variables: {
        input: {
          idProduct: productId,
          idSuper: supermarketId,
          value: price,
          createdAt: dayjs().format()
        }
      }
    })

    toast.success('Precio añadido')
    return router.push('/')
  }

  return (
    <Box>
      <Box padding="20px">
        <Back title="Actualizar precio" />

        <Box marginTop="20px">
          <Select
            borderRadius="2px"
            marginBottom="20px"
            onChange={e => setProductId(e.target.value)}
          >
            <option value="">-- Seleccione producto --</option>
            {products.map(item => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>

          <Select
            marginBottom="20px"
            borderRadius="2px"
            onChange={e => setSupermarketId(e.target.value)}
          >
            <option value="">-- Seleccione supermercado --</option>
            {supermarkets.map(item => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>

          <Box height="45px" backgroundColor="#F9F9F9" marginBottom="15px">
            <Text lineHeight="45px" paddingLeft="10px" color="#999">
              {supermarket?.address || 'Dirección vacía'}
            </Text>
          </Box>

          <Input
            type="number"
            _focus={{ outline: 0 }}
            borderRadius="4px"
            paddingLeft="12px"
            backgroundColor="#F9F9F9"
            border="0"
            height="45px"
            placeholder="precio"
            marginBottom="15px"
            onChange={e => setPrice(Number(e.target.value))}
          />

          <Button
            minWidth="initial"
            height="auto"
            padding="15px 32px"
            fontWeight="semibold"
            fontSize="1rem"
            borderRadius="3px 3px 0 0"
            border="1px solid #003049"
            backgroundColor="#FFF"
            borderBottom="4px solid #003049"
            color="#003049"
            _focus={{ shadow: 0 }}
            _hover={{
              backgroundColor: '#003049'
            }}
            width="100%"
            onClick={handleAddPrice}
          >
            Añadir precio
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default CreatePrice
