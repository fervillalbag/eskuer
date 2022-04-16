import React from 'react'
import { Box, Grid, Image, Text, Button } from '@chakra-ui/react'
import { BsBookmark } from 'react-icons/bs'

const Post: React.FC = () => {
  return (
    <Grid
      gridTemplateColumns="100px 1fr auto"
      gap="10px"
      marginBottom="20px"
      borderBottom="1px solid #d9d9d9"
      paddingBottom="20px"
    >
      <Box>
        <Image
          width="100%"
          height="100px"
          objectFit="cover"
          verticalAlign="top"
          src="/carrot.jpeg"
          alt=""
        />
      </Box>
      <Box>
        <Text fontSize="14px">¿Dónde puedo conseguir este producto?</Text>
        <Text fontSize="14px" fontWeight="semibold">
          Fernando Villalba
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
