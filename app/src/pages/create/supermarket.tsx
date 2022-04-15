import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Box, Button, Image, Input } from '@chakra-ui/react'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'

import { CREATE_SUPERMARKET } from '../../graphql/mutations/supermarket'
import Back from '../../components/Back'

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
  const [titleSupermarket, setTitleSupermarket] = useState<string | null>(null)
  const [citySupermarket, setCitySupermarket] = useState<string | null>(null)
  const [addressSupermarket, setAddressSupermarket] = useState<string | null>(
    null
  )

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
            slug: slugSupermarket,
            title: titleSupermarket,
            city: citySupermarket,
            address: addressSupermarket
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
        <Back title="Crear supermercado" />

        <Box marginTop="20px">
          <Input
            _focus={{ outline: 0 }}
            paddingLeft="12px"
            height="45px"
            backgroundColor="#F9F9F9"
            borderRadius="2px"
            border="0"
            placeholder="nombre"
            marginBottom="15px"
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
            onChange={e => setTitleSupermarket(e.target.value)}
          />

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
              backgroundColor: '#003049'
            }}
            width="100%"
            onClick={handleCreateSupermarket}
          >
            Crear mercado
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default CreateSupermarket
