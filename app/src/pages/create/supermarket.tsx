import React, { useRef, useState } from 'react'
import { Box, Button, Flex, Heading, Image, Input } from '@chakra-ui/react'
import { FaAngleLeft } from 'react-icons/fa'

import Navbar from '../../components/Navbar'
import { useMutation } from '@apollo/client'
import { CREATE_SUPERMARKET } from '../../graphql/mutations/supermarket'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

export type FileType = {
  lastModified: number
  lastModifiedDate?: Date
  name: string
  size: number
  type: string
  webkitRelativePath: string
}

const CreateSupermarket: React.FC = () => {
  const router = useRouter()

  const [image, setImage] = useState<string | null>(null)
  const [fileImage, setFileImage] = useState<FileType | null | Blob>(null)
  const [nameSupermarket, setNameSupermarket] = useState<string | null>(null)
  const [slugSupermarket, setSlugSupermarket] = useState<string | null>(null)

  console.log(image)

  const [createSupermarket] = useMutation(CREATE_SUPERMARKET)

  const inputFileRef = useRef(null)

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget as HTMLInputElement
    const file = target.files[0]
    const image = URL.createObjectURL(file)
    setImage(image)
    setFileImage(file)
  }

  const handleCreateSupermarket = async () => {
    try {
      if (!nameSupermarket || !slugSupermarket || !image)
        return toast.error('Todos los campos son obligatorios.')

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

      const response = await createSupermarket({
        variables: {
          input: {
            name: nameSupermarket,
            image: imageData?.secure_url,
            slug: slugSupermarket
          }
        }
      })

      toast.success(response?.data?.createSupermarket.message)
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box minHeight="100vh">
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
            Crear mercado
          </Heading>
        </Flex>

        <Input
          _focus={{ outline: 0 }}
          borderRadius="4px"
          paddingLeft="12px"
          height="45px"
          placeholder="nombre"
          marginBottom="15px"
          onChange={e => setNameSupermarket(e.target.value)}
        />
        <Input
          _focus={{ outline: 0 }}
          borderRadius="4px"
          paddingLeft="12px"
          height="45px"
          placeholder="slug"
          marginBottom="20px"
          onChange={e => setSlugSupermarket(e.target.value)}
        />

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
          onClick={handleCreateSupermarket}
        >
          Crear mercado
        </Button>
      </Box>

      <Navbar />
    </Box>
  )
}

export default CreateSupermarket
