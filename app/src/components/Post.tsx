import React from 'react'
import { Box, Grid, Image, Text, Button } from '@chakra-ui/react'
import { BsBookmark } from 'react-icons/bs'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'

import { GET_USER } from '../graphql/queries/user'

interface PostIprops {
  post: any
}

const Post: React.FC<PostIprops> = ({ post }) => {
  const router = useRouter()

  const { data: dataUser } = useQuery(GET_USER, {
    variables: {
      id: post?.idUser
    }
  })

  const user = dataUser?.getUser || {}

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
          // onClick={() => {
          //   if (!user?.id) {
          //     toast.error('Necesitas tener una cuenta para guardar un producto')
          //   } else if (dataLike?.value) {
          //     handleDeleteLikeProduct()
          //   } else {
          //     handleAddLikeProduct()
          //   }
          // }}
          _focus={{ shadow: 0 }}
        >
          {/* {dataLike?.value ? <BsBookmarkFill /> : <BsBookmark />} */}
          <BsBookmark />
        </Button>
      </Box>
    </Grid>
  )
}

export default Post
