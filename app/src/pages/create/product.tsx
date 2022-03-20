import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { FaAngleLeft } from 'react-icons/fa'
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Select
} from '@chakra-ui/react'
import { useMutation, useQuery } from '@apollo/client'

import Navbar from '../../components/Navbar'
import { GET_SUPERMARKETS } from '../../graphql/queries/supermarket'
import { CREATE_PRODUCT } from '../../graphql/mutations/product'

export type FileType = {
  lastModified: number
  lastModifiedDate?: Date
  name: string
  size: number
  type: string
  webkitRelativePath: string
}

const CreateProduct: React.FC = () => {
  const router = useRouter()

  const inputFileRef = useRef(null)
  const [createProduct] = useMutation(CREATE_PRODUCT)

  const [image, setImage] = useState<string | null>(null)
  const [fileImage, setFileImage] = useState<FileType | null | Blob>(null)

  const [nameProduct, setNameProduct] = useState<string | null>(null)
  const [categoryProduct, setCategoryProduct] = useState<string | null>(null)
  const [supermarketId, setSupermarketId] = useState<string | null>(null)

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget as HTMLInputElement
    const file = target.files[0]
    const image = URL.createObjectURL(file)
    setImage(image)
    setFileImage(file)
  }

  const handleCreateProduct = async () => {
    if (!nameProduct || !categoryProduct || !supermarketId || !image)
      return toast.error('Todos los campos son obligatorios')

    const URL_CLOUDINARY = process.env.URL_CLOUDINARY
    const formData = new FormData()
    formData.append('file', fileImage as string | Blob)
    formData.append('upload_preset', process.env.PRODUCT_CLOUDINARY_PRESET)

    const resImage = await fetch(URL_CLOUDINARY as string, {
      method: 'POST',
      body: formData
    })

    const imageData = await resImage.json()

    try {
      const response = await createProduct({
        variables: {
          input: {
            name: nameProduct,
            category: categoryProduct,
            image: imageData?.secure_url,
            supermarket: [
              {
                id: supermarketId,
                price: []
              }
            ]
          }
        }
      })

      toast.success(response?.data?.createProduct.message)
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  const { data, loading } = useQuery(GET_SUPERMARKETS)
  if (loading) return null
  const supermarkets = data?.getSupermarkets

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
            Crear producto
          </Heading>
        </Flex>

        <Input
          _focus={{ outline: 0 }}
          borderRadius="4px"
          paddingLeft="12px"
          height="45px"
          placeholder="nombre"
          marginBottom="15px"
          onChange={e => setNameProduct(e.target.value)}
        />

        <Input
          _focus={{ outline: 0 }}
          borderRadius="4px"
          paddingLeft="12px"
          height="45px"
          placeholder="categoría"
          marginBottom="15px"
          onChange={e => setCategoryProduct(e.target.value)}
        />

        <Select
          marginBottom="20px"
          onChange={e => setSupermarketId(e.target.value)}
        >
          <option value="">-- Seleccione supermercado --</option>
          {supermarkets.map(supermarket => (
            <option key={supermarket.id} value={supermarket.id}>
              {supermarket.name}
            </option>
          ))}
        </Select>

        <Button
          minWidth="initial"
          height="auto"
          padding="12px 32px"
          fontWeight="medium"
          fontSize="1rem"
          backgroundColor="#f0f0f0"
          color="#333"
          onClick={() => inputFileRef.current.click()}
          _focus={{ shadow: 0 }}
        >
          {image ? 'Cambiar imagen' : 'Agregar imagen'}
        </Button>

        <Box margin="20px 0">
          {image && (
            <Image
              src={image}
              alt=""
              width="100px"
              height="100px"
              objectFit="cover"
            />
          )}
        </Box>

        <Input
          type="file"
          ref={inputFileRef}
          display="none"
          onChange={handleChangeImage}
        />

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
          onClick={handleCreateProduct}
        >
          Crear Producto
        </Button>
      </Box>

      <Navbar />
    </Box>
  )
}

export default CreateProduct
