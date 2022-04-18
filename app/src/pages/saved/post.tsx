import React from 'react'
import { NextPage } from 'next'
import { Box, Text } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'

import Back from '../../components/Back'
import { GET_POSTS } from '../../graphql/queries/post'
import LoaderPost from '../../components/LoaderPost'
import PostComponent from '../../components/Post'
import useAuth from '../../hooks/useAuth'

const PostSaved: NextPage = () => {
  const { user } = useAuth()

  const { data: dataPosts, loading: loadingPost } = useQuery(GET_POSTS, {
    fetchPolicy: 'network-only'
  })

  const posts = dataPosts?.getPosts || []
  const postsOrder = posts.sort((a, b) => {
    return b.createdAt - a.createdAt
  })

  const postsFilter = postsOrder.filter(post => {
    return post.idUser === user?.id
  })

  return (
    <Box padding="20px">
      <Box>
        <Back title="Preguntas realizadas" />
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
        ) : postsFilter.length === 0 ? (
          <Box marginTop="-5px">
            <Text>No tienes preguntas realizadas</Text>
          </Box>
        ) : (
          postsFilter.map(post => <PostComponent key={post.id} post={post} />)
        )}
      </Box>
    </Box>
  )
}

export default PostSaved
