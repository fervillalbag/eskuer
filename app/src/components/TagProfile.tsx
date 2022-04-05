import React from 'react'
import { Box, Flex, Image, Text, Button, Grid } from '@chakra-ui/react'
import { FaAngleRight } from 'react-icons/fa'
import { User } from '../interfaces/User'

interface TagProfileIprops {
  user: User
}

const TagProfile: React.FC<TagProfileIprops> = ({ user }) => {
  return (
    <Grid
      gridTemplateColumns="50px 1fr"
      alignItems="center"
      width="full"
      gap="0 15px"
    >
      <Box width="50px">
        <Image src="/profile-avatar.png" alt="" width="50px" />
      </Box>
      <Flex width="full" justifyContent="space-between" alignItems="center">
        <Box>
          <Text fontWeight="semibold" color="#003049">
            {user?.name}
          </Text>
          <Text color="#9F9F9F" fontSize="14px">
            Info personal
          </Text>
        </Box>
        <Box>
          <Button
            minWidth="initial"
            width="45px"
            height="45px"
            backgroundColor="#FDF0D5"
            color="#003049"
            fontSize="22px"
            _focus={{ border: 0 }}
          >
            <FaAngleRight />
          </Button>
        </Box>
      </Flex>
    </Grid>
  )
}

export default TagProfile
