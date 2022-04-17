import React, { useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { NextPage } from 'next'
import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from '@apollo/client'
import toast from 'react-hot-toast'

import 'dayjs/locale/es'

import Back from '../../components/Back'
import { GET_POST } from '../../graphql/queries/post'
import { GET_USER } from '../../graphql/queries/user'
import CommentPost from '../../components/CommentPost'
import {
  CREATE_LIKE_POST,
  DELETE_LIKE_POST
} from '../../graphql/mutations/likePost'
import useAuth from '../../hooks/useAuth'
import { GET_LIKE_POST } from '../../graphql/queries/likePost'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import { DELETE_POST } from '../../graphql/mutations/post'
import { GET_COMMENT_POST_ON_POST } from '../../graphql/queries/commentPost'
import LoaderComment from '../../components/LoaderComment'

dayjs.extend(relativeTime)
dayjs.locale('es')

const PostItem: NextPage = () => {
  const router = useRouter()
  const { user: userLocal } = useAuth()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { data: dataPost, loading: loadingPost } = useQuery(GET_POST, {
    variables: {
      id: router?.query?.id
    }
  })

  const post = dataPost?.getPost || {}

  const { data: dataUser } = useQuery(GET_USER, {
    variables: {
      id: post?.idUser
    }
  })

  const { data: dataLike, refetch: refetchLike } = useQuery(GET_LIKE_POST, {
    fetchPolicy: 'network-only',
    variables: {
      idPost: router?.query?.id,
      idUser: userLocal?.id
    }
  })

  const {
    data: dataCommentsPosts,
    loading: loadingComments,
    refetch: refetchCommentPost
  } = useQuery(GET_COMMENT_POST_ON_POST, {
    fetchPolicy: 'network-only',
    variables: {
      idPost: router?.query?.id
    }
  })

  const [createLikePost] = useMutation(CREATE_LIKE_POST)
  const [deleteLikePost] = useMutation(DELETE_LIKE_POST)
  const [deletePost] = useMutation(DELETE_POST)

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

  const handleDeletePost = async () => {
    try {
      await deletePost({
        variables: {
          id: post?.id
        }
      })
      toast.success('Pregunta eliminada!')
      router.push('/post')
    } catch (error) {
      console.log(error)
    }
  }

  const onClose = () => setIsOpen(false)
  const onOpen = () => setIsOpen(true)

  const commentsPosts = dataCommentsPosts?.getCommentPostsOnPost || []
  const commentsPostOrder = commentsPosts.sort((a, b) =>
    a.createdAt > b.createdAt ? -1 : 1
  )

  return (
    <Box padding="20px">
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xs">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader padding="15px">Eliminar</ModalHeader>
          <ModalCloseButton />
          <ModalBody padding="0 15px">¿Desea eliminar la pregunta?</ModalBody>

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
              onClick={() => handleDeletePost()}
            >
              Si, eliminar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box>
        <Back title="Pregunta" />
      </Box>

      <Box marginTop="20px">
        <Text color="#003049">{post?.title}</Text>

        <Flex
          marginTop="15px"
          alignItems="center"
          justifyContent="space-between"
        >
          <Flex alignItems="center">
            <Box>
              <Image
                src={!user?.avatar ? '/profile-avatar.png' : user?.avatar}
                width="50px"
                height="50px"
                objectFit="cover"
                borderRadius="100%"
                overflow="hidden"
                alt=""
              />
            </Box>
            <Box marginLeft="10px">
              <Text
                fontSize="14px"
                fontWeight="semibold"
                textTransform="capitalize"
                color="#003049"
              >
                {user?.name}
              </Text>
              <Text fontSize="12px" color="#003049">
                {dayjs(parseInt(post?.createdAt)).fromNow()}
              </Text>
            </Box>
          </Flex>

          <Box>
            <Button
              minWidth="initial"
              height="45px"
              padding="15px"
              border="1px solid #003049"
              rounded="3px 3px 0 0"
              borderBottom="4px solid #003049"
              backgroundColor="#FFF"
              fontSize="20px"
              _hover={{ backgroundColor: '#FFF' }}
              onClick={() => {
                if (!userLocal?.id) {
                  return toast.error(
                    'Necesitas tener una cuenta para guardar un producto'
                  )
                } else if (likePost?.value) {
                  return handleDeleteLikePost()
                } else {
                  return handleAddLikePost()
                }
              }}
              _focus={{ shadow: 0 }}
            >
              {likePost?.value ? <BsBookmarkFill /> : <BsBookmark />}
            </Button>
          </Box>
        </Flex>

        <Box marginTop="15px">
          {loadingPost ? (
            <Box width="100%" height="200px" backgroundColor="#EFF3F5"></Box>
          ) : (
            <Image
              src={post?.image}
              width="100%"
              objectFit="contain"
              height="200px"
              objectPosition="left center"
              alt=""
            />
          )}
        </Box>

        <Box marginTop="20px">
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
            color="#003049"
            border="1px solid #003049"
            borderBottom="4px solid #003049"
            _focus={{ shadow: 0 }}
            _hover={{
              backgroundColor: '#FFF'
            }}
            width="100%"
            onClick={() => {
              if (userLocal?.id) {
                return router.push(`/post/comment/create/${post?.id}`)
              } else {
                return toast.error('Necesitas tener una cuenta para comentar')
              }
            }}
          >
            Comentar
          </Button>
          {userLocal?.id === post?.idUser && (
            <Button
              minWidth="initial"
              marginTop="10px"
              height="auto"
              padding="15px 32px"
              fontWeight="semibold"
              fontSize="1rem"
              borderRadius="4px"
              backgroundColor="#FFF"
              rounded="3px 3px 0 0"
              color="red.500"
              border="1px solid"
              borderBottom="4px solid"
              borderColor="red.500"
              _focus={{ shadow: 0 }}
              _hover={{
                backgroundColor: '#FFF'
              }}
              width="100%"
              onClick={onOpen}
            >
              Eliminar pregunta
            </Button>
          )}

          <Flex alignItems="center" marginTop="25px">
            <Text
              fontSize="20px"
              color="#003049"
              fontWeight="semibold"
              textTransform="uppercase"
            >
              Comentarios
            </Text>
            <Text marginLeft="5px">{`(${commentsPosts.length})`}</Text>
          </Flex>

          <Box marginTop="15px" marginBottom="20px">
            {loadingComments ? (
              <Box>
                <LoaderComment />
                <LoaderComment />
              </Box>
            ) : (
              commentsPostOrder?.map(comment => (
                <CommentPost
                  key={comment.id}
                  comment={comment}
                  refetchCommentPost={refetchCommentPost}
                />
              ))
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default PostItem
