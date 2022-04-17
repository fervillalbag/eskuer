import React from 'react'
import { Box, Flex, Button, Text } from '@chakra-ui/react'
import { FaAngleLeft } from 'react-icons/fa'
import { useRouter } from 'next/router'

interface BackIprops {
  title?: string
  showButton?: boolean
}

const Back: React.FC<BackIprops> = ({ title, showButton = true }) => {
  const router = useRouter()

  return (
    <Flex alignItems="center">
      {showButton && (
        <Box>
          <Button
            minWidth="initial"
            width="50px"
            height="50px"
            backgroundColor="#FDF0D5"
            color="#003049"
            rounded="3px 3px 0 0"
            border="1px solid #003049"
            borderBottom="4px solid #003049"
            fontSize="22px"
            _focus={{ border: 0 }}
            onClick={() => {
              if (router.pathname === '/post/[id]') {
                router.push('/post')
              } else {
                router.back()
              }
            }}
          >
            <FaAngleLeft />
          </Button>
        </Box>
      )}
      <Box marginLeft={!showButton ? '0' : '15px'}>
        <Text
          fontWeight="bold"
          fontSize="18px"
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
