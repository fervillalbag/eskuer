import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { NextPage } from 'next'
import { Box, Button, Image, Input, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from '@apollo/client'

import Back from '../../../../components/Back'
import { CREATE_COMMENT_POST } from '../../../../graphql/mutations/commentPost'
import useAuth from '../../../../hooks/useAuth'
import { GET_POST } from '../../../../graphql/queries/post'

const CommentCreate: NextPage = () => {
  const router = useRouter()
  const { user } = useAuth()

  const { data: dataPost } = useQuery(GET_POST, {
    variables: {
      id: router?.query?.id
    }
  })

  const post = dataPost?.getPost || {}

  const [supermarketValue, setSupermarketValue] = useState<string>('')
  const [cityValue, setCityValue] = useState<string>('')
  const [addressValue, setAddressValue] = useState<string>('')
  const [referenceValue, setReferenceValue] = useState<string>('')

  const [createCommentPost] = useMutation(CREATE_COMMENT_POST)

  const handleCreateCommentPost = async () => {
    if (!supermarketValue || !cityValue || !addressValue || !referenceValue) {
      return toast.error('Todos los campos son obligatorios')
    }

    try {
      await createCommentPost({
        variables: {
          input: {
            idPost: router?.query?.id,
            idUser: user?.id,
            branchOffice: cityValue,
            address: addressValue,
            reference: referenceValue,
            supermarket: supermarketValue
          }
        }
      })
      toast.success('Comentario publicado!')
      router.push(`/post/${router?.query?.id}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box padding="20px">
      <Box>
        <Back title="Crear comentario" />
      </Box>

      <Box marginTop="20px">
        <Text marginBottom="6px">Vista previa del producto</Text>
        <Box marginBottom="20px">
          <Image
            src={post?.image}
            alt={post?.title}
            width="80px"
            height="80px"
            objectFit="cover"
          />
        </Box>

        <Input
          type="text"
          _focus={{ outline: 0 }}
          borderRadius="4px"
          paddingLeft="12px"
          backgroundColor="#F9F9F9"
          border="0"
          height="45px"
          placeholder="supermercado"
          marginBottom="15px"
          value={supermarketValue}
          onChange={e => setSupermarketValue(e.target.value)}
        />
        <Input
          type="text"
          _focus={{ outline: 0 }}
          borderRadius="4px"
          paddingLeft="12px"
          backgroundColor="#F9F9F9"
          border="0"
          height="45px"
          placeholder="ciudad"
          marginBottom="15px"
          value={cityValue}
          onChange={e => setCityValue(e.target.value)}
        />
        <Input
          type="text"
          _focus={{ outline: 0 }}
          borderRadius="4px"
          paddingLeft="12px"
          backgroundColor="#F9F9F9"
          border="0"
          height="45px"
          placeholder="dirección (opcional)"
          marginBottom="15px"
          value={addressValue}
          onChange={e => setAddressValue(e.target.value)}
        />
        <Input
          type="text"
          _focus={{ outline: 0 }}
          borderRadius="4px"
          paddingLeft="12px"
          backgroundColor="#F9F9F9"
          border="0"
          height="45px"
          placeholder="referencia"
          marginBottom="15px"
          value={referenceValue}
          onChange={e => setReferenceValue(e.target.value)}
        />

        <Button
          minWidth="initial"
          marginTop="5px"
          height="auto"
          padding="15px 32px"
          fontWeight="semibold"
          fontSize="1rem"
          borderRadius="4px"
          backgroundColor="#FFF"
          rounded="3px 3px 0 0"
          color="#3E3E3E"
          border="1px solid #3E3E3E"
          borderBottom="4px solid #3E3E3E"
          _focus={{ shadow: 0 }}
          _hover={{
            backgroundColor: '#FFF'
          }}
          width="100%"
          onClick={handleCreateCommentPost}
        >
          Comentar
        </Button>
      </Box>
    </Box>
  )
}

export default CommentCreate
