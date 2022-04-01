import React, { useState } from 'react'
import toast from 'react-hot-toast'
import dayjs from 'dayjs'
import { Box, Button, Input, Select } from '@chakra-ui/react'
import { useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import Navbar from '../../components/Navbar'
import { GET_SUPERMARKETS } from '../../graphql/queries/supermarket'
import { GET_PRODUCTS } from '../../graphql/queries/product'
import { CREATE_PRICE } from '../../graphql/mutations/price'
import Back from '../../components/Back'
import { GET_SUBSIDIARIES } from '../../graphql/queries/subsidiaries'
// import { UPDATE_PRODUCT } from '../../graphql/mutations/product'

const CreatePrice: React.FC = () => {
  const router = useRouter()

  const [supermarketId, setSupermarketId] = useState<string | null>(null)
  const [productId, setProductId] = useState<string | null>(null)
  const [price, setPrice] = useState<number>(0)
  const [typeProduct, setTypeProduct] = useState<string | null>('')
  const [subsidiaryId, setSubsidiaryId] = useState<string | null>(null)

  const [createPrice] = useMutation(CREATE_PRICE)

  const { data } = useQuery(GET_SUPERMARKETS, {
    fetchPolicy: 'network-only'
  })

  const { data: dataProducts } = useQuery(GET_PRODUCTS, {
    fetchPolicy: 'network-only'
  })

  const { data: dataSubsidiaries } = useQuery(GET_SUBSIDIARIES, {
    fetchPolicy: 'network-only',
    variables: {
      idSuper: supermarketId
    }
  })

  const products = dataProducts?.getProducts || []
  const supermarkets = data?.getSupermarkets || []
  const subsidiaries = dataSubsidiaries?.getSubsidiaries || []

  const handleAddPrice = async () => {
    if (!price || !typeProduct || !supermarketId || !productId || !subsidiaryId)
      return toast.error('Todos los campos son obligatorios')

    const response = await createPrice({
      variables: {
        input: {
          idProduct: productId,
          idSuper: supermarketId,
          idSubsidiary: subsidiaryId,
          value: price,
          type: typeProduct,
          createdAt: dayjs().format()
        }
      }
    })

    console.log(response)
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

          <Select
            borderRadius="2px"
            marginBottom="20px"
            onChange={e => setTypeProduct(e.target.value)}
          >
            <option value="">-- Seleccione tipo --</option>
            <option value="kg">KG</option>
            <option value="un">Unidad</option>
          </Select>

          <Select
            borderRadius="2px"
            marginBottom="20px"
            onChange={e => setSubsidiaryId(e.target.value)}
          >
            <option value="">-- Seleccione sucursal --</option>
            {subsidiaries.map(item => (
              <option key={item.id} value={item.id}>
                {item.address}
              </option>
            ))}
          </Select>

          <Button
            minWidth="initial"
            height="auto"
            padding="15px 32px"
            fontWeight="semibold"
            fontSize="1rem"
            borderRadius="4px"
            backgroundColor="#003049"
            color="#FFF"
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

      <Navbar />
    </Box>
  )
}

export default CreatePrice
