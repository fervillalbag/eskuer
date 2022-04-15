import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  Image,
  Input,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'
import { useMutation, useQuery } from '@apollo/client'

import Back from '../../../components/Back'
import { DELETE_PRODUCT, GET_PRODUCT } from '../../../graphql/queries/product'
import { UPDATE_PRODUCT } from '../../../graphql/mutations/product'
import toast from 'react-hot-toast'

export type FileType = {
  lastModified: number
  lastModifiedDate?: Date
  name: string
  size: number
  type: string
  webkitRelativePath: string
}

const ProductItemUpdate: React.FC = () => {
  const router = useRouter()

  const { data: dataProduct, loading } = useQuery(GET_PRODUCT, {
    variables: {
      id: router?.query?.id
    },
    fetchPolicy: 'network-only'
  })

  const [deleteProduct] = useMutation(DELETE_PRODUCT)

  const product = dataProduct?.getProduct || {}

  const [updateProduct] = useMutation(UPDATE_PRODUCT)

  useEffect(() => {
    setProductValue(product)
  }, [loading])

  const [productValue, setProductValue] = useState(product)
  const [fileImage, setFileImage] = useState<FileType | null | Blob>(null)
  const [image, setImage] = useState<string | null>(null)
  const inputFileRef = useRef(null)

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget as HTMLInputElement
    const file = target.files[0]
    const image = URL.createObjectURL(file)
    setImage(image)
    setFileImage(file)
  }

  const handleProductUpdate = async () => {
    if (!image) {
      try {
        await updateProduct({
          variables: {
            input: {
              id: productValue?.id,
              name: productValue?.name,
              category: productValue?.category,
              image: productValue?.image,
              type: productValue?.type
            }
          }
        })

        return toast.success('Producto actualizado')
      } catch (error) {
        console.log(error)
        return toast.error('Hubo un error al actualizar. Intente de nuevo')
      }
    }

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
      await updateProduct({
        variables: {
          input: {
            id: productValue?.id,
            name: productValue?.name,
            category: productValue?.category,
            image: imageData?.secure_url,
            type: productValue?.type
          }
        }
      })

      return toast.success('Producto actualizado')
    } catch (error) {
      console.log(error)
      return toast.error('Hubo un error al actualizar. Intente de nuevo')
    }
  }

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct({
        variables: {
          id
        }
      })

      toast.success('Producto eliminado correctamente!')
      router.push('/')
    } catch (error) {
      console.log(error)
      toast.error('Hubo un error!')
    }
  }

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const onClose = () => setIsOpen(false)
  const onOpen = () => setIsOpen(true)

  return (
    <Box padding="20px">
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xs">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader padding="15px">Eliminar</ModalHeader>
          <ModalCloseButton />
          <ModalBody padding="0 15px">¿Desea eliminar el producto?</ModalBody>

          <ModalFooter
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            gap="15px"
            padding="15px"
            marginTop="10px"
          >
            <Button
              rounded="3px"
              width="100%"
              color="#003049"
              backgroundColor="#D5DFE5"
              onClick={onClose}
            >
              Cerrar
            </Button>
            <Button
              rounded="3px"
              width="100%"
              color="red.700"
              backgroundColor="red.100"
              _focus={{ shadow: 0 }}
              _hover={{ backgroundColor: 'red.200' }}
              onClick={() => handleDeleteProduct(productValue?.id)}
            >
              Si, eliminar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box>
        <Back title={product?.name} />
      </Box>

      <Box marginTop="20px">
        <Input
          value={productValue?.name || ''}
          _focus={{ outline: 0 }}
          borderRadius="2px"
          paddingLeft="12px"
          height="45px"
          backgroundColor="#F9F9F9"
          border="0"
          placeholder="Nombre"
          marginBottom="15px"
          onChange={e =>
            setProductValue({ ...productValue, name: e.target.value })
          }
        />
        <Input
          value={productValue?.category || ''}
          _focus={{ outline: 0 }}
          borderRadius="2px"
          paddingLeft="12px"
          height="45px"
          backgroundColor="#F9F9F9"
          border="0"
          placeholder="Categoría"
          marginBottom="15px"
          onChange={e =>
            setProductValue({ ...productValue, category: e.target.value })
          }
        />

        <Select
          borderRadius="2px"
          marginBottom="20px"
          value={productValue?.type || ''}
          onChange={e =>
            setProductValue({ ...productValue, type: e.target.value })
          }
        >
          <option value="">-- Seleccione tipo --</option>
          <option value="kg">KG</option>
          <option value="un">Unidad</option>
        </Select>

        <Box margin="20px 0">
          <Image
            src={!image ? productValue?.image : image}
            alt=""
            width="100px"
            height="100px"
            objectFit="cover"
          />
        </Box>

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
          Cambiar imagen
        </Button>

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
          marginTop="25px"
          onClick={handleProductUpdate}
        >
          Actualizar producto
        </Button>

        <Button
          minWidth="initial"
          height="auto"
          padding="15px 32px"
          fontWeight="semibold"
          fontSize="1rem"
          borderRadius="3px 3px 0 0"
          border="1px solid"
          borderBottom="4px solid"
          borderColor="red.500"
          borderBottomColor="red.500"
          backgroundColor="#FFF"
          color="red.500"
          _focus={{ shadow: 0 }}
          _hover={{
            backgroundColor: '#FFF'
          }}
          width="100%"
          marginTop="15px"
          onClick={onOpen}
        >
          Eliminar producto
        </Button>
      </Box>
    </Box>
  )
}

export default ProductItemUpdate
