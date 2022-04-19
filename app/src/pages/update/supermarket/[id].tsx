import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  Input,
  Image,
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
import {
  DELETE_SUPERMARKET,
  UPDATE_SUPERMARKET
} from '../../../graphql/mutations/supermarket'
import { GET_SUPERMARKET } from '../../../graphql/queries/supermarket'
import useAuth from '../../../hooks/useAuth'
import { GET_USER } from '../../../graphql/queries/user'
import NotFound from '../../../components/NotFound'

export type FileType = {
  lastModified: number
  lastModifiedDate?: Date
  name: string
  size: number
  type: string
  webkitRelativePath: string
}

const SupermarketEditPage: NextPage = () => {
  const router = useRouter()
  const { user } = useAuth()

  const { data: dataSupermarket, loading } = useQuery(GET_SUPERMARKET, {
    variables: {
      id: router?.query?.id
    },
    fetchPolicy: 'network-only'
  })

  const { data: dataUser } = useQuery(GET_USER, {
    variables: {
      id: user?.id
    }
  })

  const supermarket = dataSupermarket?.getSupermarket

  const [image, setImage] = useState<string | null>(null)
  const [fileImage, setFileImage] = useState<FileType | null | Blob>(null)
  const [nameSupermarket, setNameSupermarket] = useState<string | null>(null)
  const [slugSupermarket, setSlugSupermarket] = useState<string | null>(null)
  const [titleSupermarket, setTitleSupermarket] = useState<string | null>(null)
  const [citySupermarket, setCitySupermarket] = useState<string | null>(null)
  const [addressSupermarket, setAddressSupermarket] = useState<string | null>(
    null
  )

  useEffect(() => {
    setTitleSupermarket(supermarket?.title)
    setImage(supermarket?.image)
    setNameSupermarket(supermarket?.name)
    setSlugSupermarket(supermarket?.slug)
    setCitySupermarket(supermarket?.city)
    setAddressSupermarket(supermarket?.address)
  }, [loading])

  const inputFileRef = useRef(null)

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget as HTMLInputElement
    const file = target.files[0]
    const image = URL.createObjectURL(file)
    setImage(image)
    setFileImage(file)
  }

  const [updateSupermarket] = useMutation(UPDATE_SUPERMARKET)
  const [deleteSupermarket] = useMutation(DELETE_SUPERMARKET)

  const handleCreateSupermarket = async () => {
    try {
      if (!nameSupermarket || !slugSupermarket || !image)
        return toast.error('Todos los campos son obligatorios.')

      if (!image) {
        try {
          await updateSupermarket({
            variables: {
              input: {
                id: supermarket?.id,
                name: nameSupermarket,
                image,
                slug: slugSupermarket,
                title: titleSupermarket,
                city: citySupermarket,
                address: addressSupermarket
              }
            }
          })

          return toast.success('Supermercado actualizado')
        } catch (error) {
          console.log(error)
          return toast.error('Hubo un error al actualizar. Intente de nuevo')
        }
      }

      const URL_CLOUDINARY = process.env.URL_CLOUDINARY
      const formData = new FormData()
      formData.append('file', fileImage as string | Blob)
      formData.append(
        'upload_preset',
        process.env.SUPERMARKET_CLOUDINARY_PRESET
      )
      const resImage = await fetch(URL_CLOUDINARY as string, {
        method: 'POST',
        body: formData
      })
      const imageData = await resImage.json()

      await updateSupermarket({
        variables: {
          input: {
            id: supermarket?.id,
            name: nameSupermarket,
            image: imageData?.secure_url,
            slug: slugSupermarket,
            title: titleSupermarket,
            city: citySupermarket,
            address: addressSupermarket
          }
        }
      })

      toast.success('Supermercado actualizado')
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteSupermarket = async (id: string) => {
    try {
      await deleteSupermarket({
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

  const userInfo = dataUser?.getUser || {}

  if (userInfo.role !== 'ADMIN') return <NotFound />

  return (
    <Box padding="20px">
      <Box>
        <Back title="Editar supermercado" />
      </Box>

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
              color="#3E3E3E"
              backgroundColor="#F0F0F0"
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
              onClick={() => handleDeleteSupermarket(supermarket?.id)}
            >
              Si, eliminar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box margin="20px 0">
        <Input
          _focus={{ outline: 0 }}
          paddingLeft="12px"
          height="45px"
          backgroundColor="#F9F9F9"
          borderRadius="2px"
          border="0"
          placeholder="nombre"
          marginBottom="15px"
          value={nameSupermarket || ''}
          onChange={e => setNameSupermarket(e.target.value)}
        />
        <Input
          _focus={{ outline: 0 }}
          paddingLeft="12px"
          height="45px"
          backgroundColor="#F9F9F9"
          borderRadius="2px"
          border="0"
          placeholder="slug"
          marginBottom="20px"
          value={slugSupermarket || ''}
          onChange={e => setSlugSupermarket(e.target.value)}
        />
        <Input
          _focus={{ outline: 0 }}
          paddingLeft="12px"
          height="45px"
          backgroundColor="#F9F9F9"
          borderRadius="2px"
          border="0"
          placeholder="dirección"
          marginBottom="20px"
          value={addressSupermarket || ''}
          onChange={e => setAddressSupermarket(e.target.value)}
        />
        <Input
          _focus={{ outline: 0 }}
          paddingLeft="12px"
          height="45px"
          backgroundColor="#F9F9F9"
          borderRadius="2px"
          border="0"
          placeholder="ciudad"
          marginBottom="20px"
          value={citySupermarket || ''}
          onChange={e => setCitySupermarket(e.target.value)}
        />
        <Input
          _focus={{ outline: 0 }}
          paddingLeft="12px"
          height="45px"
          backgroundColor="#F9F9F9"
          borderRadius="2px"
          border="0"
          placeholder="título"
          marginBottom="20px"
          value={titleSupermarket || ''}
          onChange={e => setTitleSupermarket(e.target.value)}
        />

        <Button
          minWidth="initial"
          height="auto"
          borderRadius="3px 3px 0 0"
          padding="12px 32px"
          fontWeight="medium"
          fontSize="1rem"
          backgroundColor="#F0F0F0"
          border="1px solid #3E3E3E"
          borderBottom="4px solid #3E3E3E"
          color="#3E3E3E"
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
          border="1px solid #3E3E3E"
          backgroundColor="#FFF"
          borderBottom="4px solid #3E3E3E"
          color="#3E3E3E"
          _focus={{ shadow: 0 }}
          _hover={{
            backgroundColor: '#FFF'
          }}
          width="100%"
          marginTop="10px"
          onClick={handleCreateSupermarket}
        >
          Actualizado super
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
          Eliminar super
        </Button>
      </Box>
    </Box>
  )
}

export default SupermarketEditPage
