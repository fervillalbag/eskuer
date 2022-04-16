import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { NextPage } from 'next'
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'

import 'dayjs/locale/es'

import Back from '../../components/Back'
import { GET_POST } from '../../graphql/queries/post'
import { GET_USER } from '../../graphql/queries/user'
import CommentPost from '../../components/CommentPost'

dayjs.extend(relativeTime)
dayjs.locale('es')

const PostItem: NextPage = () => {
  const router = useRouter()

  const { data: dataPost } = useQuery(GET_POST, {
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

  const user = dataUser?.getUser || {}

  return (
    <Box padding="20px">
      <Box>
        <Back title="Pregunta" />
      </Box>

      <Box marginTop="20px">
        <Text color="#003049">{post?.title}</Text>

        <Flex marginTop="10px" alignItems="center">
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

        <Box marginTop="15px">
          <Image
            src={post?.image}
            width="100%"
            objectFit="contain"
            height="200px"
            objectPosition="left center"
            alt=""
          />
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
            // onClick={handleLogin}
          >
            Comentar
          </Button>

          <Flex
            alignItems="center"
            marginTop="25px"
            // borderBottom="1px solid #d5dfe4"
          >
            <Text
              fontSize="20px"
              color="#003049"
              fontWeight="semibold"
              textTransform="uppercase"
            >
              Comentarios
            </Text>
            <Text marginLeft="5px">(2)</Text>
          </Flex>

          <Box marginTop="15px" marginBottom="20px">
            <CommentPost />
            <CommentPost />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default PostItem
