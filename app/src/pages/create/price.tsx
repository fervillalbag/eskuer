import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Box, Button, Flex, Heading, Input, Select } from '@chakra-ui/react'
import { FaAngleLeft } from 'react-icons/fa'
import { useMutation, useQuery } from '@apollo/client'
// import { useRouter } from 'next/router'

import Navbar from '../../components/Navbar'
import { GET_SUPERMARKETS } from '../../graphql/queries/supermarket'
import { GET_PRODUCTS } from '../../graphql/queries/product'
import { CREATE_PRICE } from '../../graphql/mutations/price'
// import { UPDATE_PRODUCT } from '../../graphql/mutations/product'

const CreatePrice: React.FC = () => {
  // const router = useRouter()

  const [supermarketId, setSupermarketId] = useState<string | null>(null)
  const [productId, setProductId] = useState<string | null>(null)
  const [price, setPrice] = useState<number>(0)
  const [typeProduct, setTypeProduct] = useState<string | null>('')

  const [createPrice] = useMutation(CREATE_PRICE)

  const { data } = useQuery(GET_SUPERMARKETS, {
    fetchPolicy: 'network-only'
  })
  const { data: dataProducts } = useQuery(GET_PRODUCTS, {
    fetchPolicy: 'network-only'
  })

  const products = dataProducts?.getProducts || []
  const supermarkets = data?.getSupermarkets || []

  const handleAddPrice = async () => {
    if (!price || !typeProduct || !supermarketId || !productId)
      return toast.error('Todos los campos son obligatorios')

    const response = await createPrice({
      variables: {
        input: {
          idProduct: productId,
          idSuper: supermarketId,
          value: price,
          type: typeProduct
        }
      }
    })

    console.log(response)

    // return router.push('/')
  }

  return (
    <Box>
      <Box padding="20px">
        <Flex marginBottom="20px" alignItems="center">
          <Button
            minWidth="initial"
            height="auto"
            padding="15px"
            color="#333"
            backgroundColor="#f0f0f0"
            fontSize="1.2rem"
            _focus={{ shadow: 0 }}
          >
            <FaAngleLeft />
          </Button>
          <Heading
            fontSize="1.2rem"
            color="#333"
            marginLeft="10px"
            fontWeight="bold"
          >
            Añadir precio
          </Heading>
        </Flex>

        <Select
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
          height="45px"
          placeholder="precio"
          marginBottom="15px"
          onChange={e => setPrice(Number(e.target.value))}
        />

        <Select
          marginBottom="20px"
          onChange={e => setTypeProduct(e.target.value)}
        >
          <option value="">-- Seleccione tipo --</option>
          <option value="kg">KG</option>
          <option value="un">Unidad</option>
        </Select>

        <Button
          minWidth="initial"
          height="auto"
          padding="15px 32px"
          fontWeight="medium"
          fontSize="1rem"
          backgroundColor="#2D93E8"
          color="#FFF"
          _focus={{ shadow: 0 }}
          _hover={{
            backgroundColor: '#47a1eb'
          }}
          width="100%"
          onClick={handleAddPrice}
        >
          Añadir precio
        </Button>
      </Box>

      <Navbar />
    </Box>
  )
}

export default CreatePrice
