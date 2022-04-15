import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { Box, Button, Image, Input, Select } from '@chakra-ui/react'
import { useMutation } from '@apollo/client'

// import { GET_SUPERMARKETS } from '../../graphql/queries/supermarket'
import { CREATE_PRODUCT } from '../../graphql/mutations/product'
import Back from '../../components/Back'

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

  const [typeProduct, setTypeProduct] = useState<string | null>('')
  const [nameProduct, setNameProduct] = useState<string | null>(null)
  const [categoryProduct, setCategoryProduct] = useState<string | null>(null)

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget as HTMLInputElement
    const file = target.files[0]
    const image = URL.createObjectURL(file)
    setImage(image)
    setFileImage(file)
  }

  const handleCreateProduct = async () => {
    if (!nameProduct || !categoryProduct || !image)
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
            type: typeProduct
          }
        }
      })

      toast.success(response?.data?.createProduct.message)
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  // const { data, loading } = useQuery(GET_SUPERMARKETS)
  // if (loading) return null
  // const supermarkets = data?.getSupermarkets

  return (
    <Box>
      <Box padding="20px">
        <Back title="Crear producto" />

        <Box marginTop="20px">
          <Input
            _focus={{ outline: 0 }}
            borderRadius="2px"
            paddingLeft="12px"
            height="45px"
            backgroundColor="#F9F9F9"
            border="0"
            placeholder="nombre"
            marginBottom="15px"
            onChange={e => setNameProduct(e.target.value)}
          />

          <Input
            _focus={{ outline: 0 }}
            borderRadius="2px"
            paddingLeft="12px"
            height="45px"
            backgroundColor="#F9F9F9"
            border="0"
            placeholder="categoría"
            marginBottom="15px"
            onChange={e => setCategoryProduct(e.target.value)}
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

          <Button
            minWidth="initial"
            height="auto"
            borderRadius="3px 3px 0 0"
            padding="12px 32px"
            fontWeight="medium"
            fontSize="1rem"
            backgroundColor="#D5DFE5"
            border="1px solid #003049"
            borderBottom="4px solid #003049"
            color="#003049"
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
            fontWeight="semibold"
            fontSize="1rem"
            borderRadius="3px 3px 0 0"
            border="1px solid #003049"
            backgroundColor="#FFF"
            borderBottom="4px solid #003049"
            color="#003049"
            _focus={{ shadow: 0 }}
            _hover={{
              backgroundColor: '#FFF'
            }}
            width="100%"
            onClick={handleCreateProduct}
          >
            Crear Producto
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default CreateProduct
