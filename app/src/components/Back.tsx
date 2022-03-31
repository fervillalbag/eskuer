import React from 'react'
import { Box, Flex, Button, Text } from '@chakra-ui/react'
import { FaAngleLeft } from 'react-icons/fa'
import { useRouter } from 'next/router'

interface BackIprops {
  title?: string
}

const Back: React.FC<BackIprops> = ({ title }) => {
  const router = useRouter()

  return (
    <Flex alignItems="center">
      <Box>
        <Button
          minWidth="initial"
          width="50px"
          height="50px"
          backgroundColor="#FDF0D5"
          color="#003049"
          fontSize="22px"
          _focus={{ border: 0 }}
          onClick={() => router.back()}
        >
          <FaAngleLeft />
        </Button>
      </Box>
      <Box marginLeft="15px">
        <Text
          fontWeight="bold"
          fontSize="20px"
          color="#003049"
          textTransform="uppercase"
        >
          {title || ''}
        </Text>
      </Box>
    </Flex>
  )
}

export default Back
