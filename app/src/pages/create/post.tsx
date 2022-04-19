import React, { useRef, useState } from 'react'
import { NextPage } from 'next'
import { Box, Button, Flex, Image, Input, Text } from '@chakra-ui/react'
import Back from '../../components/Back'
import toast from 'react-hot-toast'
import { useMutation } from '@apollo/client'
import { CREATE_POST } from '../../graphql/mutations/post'
import { useRouter } from 'next/router'
import useAuth from '../../hooks/useAuth'

export type FileType = {
  lastModified: number
  lastModifiedDate?: Date
  name: string
  size: number
  type: string
  webkitRelativePath: string
}

const Post: NextPage = () => {
  const [image, setImage] = useState('')
  const [fileImage, setFileImage] = useState<FileType | null | Blob>(null)
  const [loadingUpload, setLoadingUpload] = useState<boolean>(false)
  const inputFileRef = useRef(null)

  const { user } = useAuth()

  const router = useRouter()

  const [createPost] = useMutation(CREATE_POST)

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget as HTMLInputElement
    const file = target.files[0]
    const image = URL.createObjectURL(file)
    setImage(image)
    setFileImage(file)
  }

  const handleCreatePost = async () => {
    if (!image) return toast.error('Todos los campos son obligatorios')

    setLoadingUpload(true)

    const URL_CLOUDINARY = process.env.URL_CLOUDINARY
    const formData = new FormData()
    formData.append('file', fileImage as string | Blob)
    formData.append('upload_preset', process.env.POST_CLOUDINARY_PRESET)

    const resImage = await fetch(URL_CLOUDINARY as string, {
      method: 'POST',
      body: formData
    })

    const imageData = await resImage.json()

    try {
      await createPost({
        variables: {
          input: {
            idUser: user?.id,
            image: imageData?.secure_url
          }
        }
      })

      toast.success('Pregunta creada!')
      router.push('/post')
    } catch (error) {
      console.log(error)
    }

    setLoadingUpload(false)
  }

  if (loadingUpload)
    return (
      <Flex
        width="100%"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Text textAlign="center">Publicando..</Text>
      </Flex>
    )

  return (
    <Box padding="20px">
      <Box>
        <Back title="Crear pregunta" />
      </Box>

      <Box marginTop="20px">
        <Input
          type="text"
          _focus={{ outline: 0 }}
          borderRadius="4px"
          paddingLeft="12px"
          backgroundColor="#F9F9F9"
          border="0"
          height="45px"
          placeholder="supermercado"
          value="¿Dónde puedo conseguir este producto?"
          marginBottom="15px"
          disabled
        />

        <Input
          type="file"
          ref={inputFileRef}
          display="none"
          onChange={handleChangeImage}
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

        {image && (
          <Box marginTop="20px">
            <Image
              src={image}
              alt=""
              width="100px"
              height="100px"
              objectFit="cover"
            />
          </Box>
        )}

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
          marginTop="15px"
          width="100%"
          _hover={{
            backgroundColor: '#FFF'
          }}
          onClick={handleCreatePost}
        >
          Crear pregunta
        </Button>
      </Box>
    </Box>
  )
}

export default Post
