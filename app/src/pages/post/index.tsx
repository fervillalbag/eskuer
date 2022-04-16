import React from 'react'
import { NextPage } from 'next'
import { Box } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'

import Navbar from '../../components/Navbar'
import Back from '../../components/Back'
import PostComponent from '../../components/Post'
import { GET_POSTS } from '../../graphql/queries/post'

const Post: NextPage = () => {
  const { data: dataPosts } = useQuery(GET_POSTS)

  const posts = dataPosts?.getPosts || []
  console.log(posts)

  return (
    <Box padding="20px">
      <Box>
        <Back showButton={false} title="Preguntas" />
      </Box>

      <Box marginTop="20px">
        <PostComponent />
        <PostComponent />
      </Box>

      <Navbar />
    </Box>
  )
}

export default Post
