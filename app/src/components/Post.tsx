import React from 'react'
import toast from 'react-hot-toast'
import { Box, Grid, Image, Text, Button } from '@chakra-ui/react'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from '@apollo/client'

import { GET_USER } from '../graphql/queries/user'
import {
  CREATE_LIKE_POST,
  DELETE_LIKE_POST
} from '../graphql/mutations/likePost'
import useAuth from '../hooks/useAuth'
import { GET_LIKE_POST } from '../graphql/queries/likePost'

interface PostIprops {
  post: any
}

const Post: React.FC<PostIprops> = ({ post }) => {
  const router = useRouter()
  const { user: userLocal } = useAuth()

  const { data: dataUser } = useQuery(GET_USER, {
    variables: {
      id: post?.idUser
    }
  })

  const { data: dataLike, refetch: refetchLike } = useQuery(GET_LIKE_POST, {
    fetchPolicy: 'network-only',
    variables: {
      idPost: post?.id,
      idUser: userLocal?.id
    }
  })

  const [createLikePost] = useMutation(CREATE_LIKE_POST)
  const [deleteLikePost] = useMutation(DELETE_LIKE_POST)

  const handleAddLikePost = async () => {
    await createLikePost({
      variables: {
        idPost: post?.id,
        idUser: userLocal?.id
      }
    })
    refetchLike()
  }

  const user = dataUser?.getUser || {}
  const likePost = dataLike?.getLikePost || {}

  const handleDeleteLikePost = async () => {
    await deleteLikePost({
      variables: {
        id: likePost?.id,
        idPost: post?.id,
        idUser: userLocal?.id
      }
    })
    refetchLike()
  }

  return (
    <Grid
      gridTemplateColumns="100px 1fr auto"
      gap="10px"
      marginBottom="20px"
      borderBottom="1px solid #d9d9d9"
      paddingBottom="20px"
    >
      <Box onClick={() => router.push(`/post/${post.id}`)}>
        <Image
          width="100%"
          height="100px"
          objectFit="contain"
          verticalAlign="top"
          src={post?.image}
          alt=""
        />
      </Box>
      <Box onClick={() => router.push(`/post/${post.id}`)}>
        <Text fontSize="14px">{post?.title}</Text>
        <Text fontSize="14px" fontWeight="semibold" textTransform="capitalize">
          {user?.name}
        </Text>
      </Box>
      <Box>
        <Button
          minWidth="initial"
          height="50px"
          padding="15px"
          border="1px solid #003049"
          rounded="3px 3px 0 0"
          borderBottom="4px solid #003049"
          backgroundColor="#FFF"
          fontSize="20px"
          _hover={{ backgroundColor: '#FFF' }}
          onClick={() => {
            if (!user?.id) {
              toast.error('Necesitas tener una cuenta para guardar un producto')
            } else if (likePost?.value) {
              handleDeleteLikePost()
            } else {
              handleAddLikePost()
            }
          }}
          _focus={{ shadow: 0 }}
        >
          {likePost?.value ? <BsBookmarkFill /> : <BsBookmark />}
        </Button>
      </Box>
    </Grid>
  )
}

export default Post
