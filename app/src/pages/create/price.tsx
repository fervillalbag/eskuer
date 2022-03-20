import React, { useState } from 'react'
import { Box, Button, Flex, Heading, Input, Select } from '@chakra-ui/react'
import Navbar from '../../components/Navbar'
import { FaAngleLeft } from 'react-icons/fa'
import { useMutation, useQuery } from '@apollo/client'
import { GET_SUPERMARKETS } from '../../graphql/queries/supermarket'
import { GET_PRODUCT, GET_PRODUCTS } from '../../graphql/queries/product'
import toast from 'react-hot-toast'
import { UPDATE_PRODUCT } from '../../graphql/mutations/product'
import { useRouter } from 'next/router'

const CreatePrice: React.FC = () => {
  const router = useRouter()

  const [supermarketId, setSupermarketId] = useState<string | null>(null)
  const [productId, setProductId] = useState<string | null>(null)
  const [price, setPrice] = useState<number>(0)
  const [typeProduct, setTypeProduct] = useState<string | null>('')

  const [updateProduct] = useMutation(UPDATE_PRODUCT)

  const { data } = useQuery(GET_SUPERMARKETS)
  const { data: dataProducts } = useQuery(GET_PRODUCTS)
  const { data: dataProduct } = useQuery(GET_PRODUCT, {
    variables: {
      id: productId
    }
  })

  const products = dataProducts?.getProducts || []
  const supermarkets = data?.getSupermarkets || []
  const product = dataProduct?.getProduct

  const currentMarket = product?.supermarket.find(
    item => item.id === supermarketId
  )

  const handleAddPrice = async () => {
    if (!currentMarket)
      return toast.error('El producto no está agregado en el supermercado')

    if (!price || !typeProduct || !supermarketId || !productId)
      return toast.error('Todos los campos son obligatorios')

    const newProduct = { ...product }
    delete newProduct.__typename

    const newSupermarket = newProduct.supermarket.map(item => {
      return {
        id: item.id,
        price: [
          ...item.price,
          {
            id: String(new Date().getTime()),
            value: price,
            type: typeProduct,
            createdAt: new Date()
          }
        ]
      }
    })

    newProduct.supermarket = newSupermarket

    try {
      const response = await updateProduct({
        variables: {
          input: {
            ...newProduct,
            supermarket: [...newProduct.supermarket]
          }
        }
      })
      toast.success(response?.data?.updateProduct.message)
      router.push('/')
    } catch (error) {
      console.log(error)
    }
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
