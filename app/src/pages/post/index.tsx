import React from 'react'
import { NextPage } from 'next'
import { Box, Button } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import Navbar from '../../components/Navbar'
import Back from '../../components/Back'
import PostComponent from '../../components/Post'
import { GET_POSTS } from '../../graphql/queries/post'
import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast'
import LoaderPost from '../../components/LoaderPost'

const Post: NextPage = () => {
  const router = useRouter()
  const { data: dataPosts, loading: loadingPost } = useQuery(GET_POSTS, {
    fetchPolicy: 'network-only'
  })

  const posts = dataPosts?.getPosts || []
  const { user } = useAuth()

  const postsOrder = posts.sort((a, b) => {
    return b.createdAt - a.createdAt
  })

  return (
    <Box padding="20px">
      <Box>
        <Back showButton={false} title="Preguntas" />
      </Box>

      <Box marginTop="15px">
        <Button
          rounded="3px 3px 0 0"
          border="1px solid"
          borderBottom="4px solid"
          borderColor="#003049"
          backgroundColor="#FFF"
          width="100%"
          height="50px"
          fontSize="16px"
          padding="0"
          _focus={{ shadow: 0 }}
          _hover={{ backgroundColor: '#FFF' }}
          onClick={() => {
            if (!user?.id) {
              toast.error('Necesitas una cuenta para publicar una pregunta')
            } else {
              router.push('/create/post')
            }
          }}
          boxShadow="0px 0px 3px 10px rgba(255,255,255,1)"
        >
          Publicar una pregunta
        </Button>
      </Box>

      <Box marginTop="25px" paddingBottom="60px">
        {!posts || loadingPost ? (
          <Box>
            <LoaderPost />
            <LoaderPost />
            <LoaderPost />
            <LoaderPost />
            <LoaderPost />
          </Box>
        ) : (
          postsOrder.map(post => <PostComponent key={post.id} post={post} />)
        )}
      </Box>

      <Navbar />
    </Box>
  )
}

export default Post
