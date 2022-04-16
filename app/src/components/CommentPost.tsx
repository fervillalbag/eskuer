import React from 'react'
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import { FaTrash } from 'react-icons/fa'

const CommentPost: React.FC = () => {
  return (
    <Box
      marginBottom="20px"
      borderBottom="1px solid #d5dfe4"
      paddingBottom="20px"
    >
      <Flex marginTop="10px" alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Box>
            <Image
              // src={!user?.avatar ? '/profile-avatar.png' : user?.avatar}
              src="/profile-fer.png"
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
              Fernando Villalba
              {/* {user?.name} */}
            </Text>
            <Text fontSize="12px" color="#003049">
              {/* {dayjs(parseInt(post?.createdAt)).fromNow()} */}
              hace 8 horas
            </Text>
          </Box>
        </Flex>

        <Box>
          <Button
            minWidth="initial"
            height="40px"
            border="1px solid"
            rounded="3px 3px 0 0"
            backgroundColor="#FFF"
            borderBottom="4px solid"
            borderColor="red.400"
            color="red.400"
            _focus={{ shadow: 0 }}
            _hover={{ backgroundColor: '#FFF' }}
          >
            <FaTrash />
          </Button>
        </Box>
      </Flex>

      <Box marginTop="5px">
        <Flex as="article" marginBottom="2px">
          <Text
            fontWeight="semibold"
            fontSize="14px"
            color="#003049"
            textTransform="uppercase"
          >
            SUCURSAL:
          </Text>
          <Text color="#003049" fontSize="14px" marginLeft="4px">
            Fernando de la Mora
          </Text>
        </Flex>

        <Flex as="article" marginBottom="2px">
          <Text
            fontWeight="semibold"
            fontSize="14px"
            color="#003049"
            textTransform="uppercase"
          >
            Dirección:
          </Text>
          <Text color="#003049" fontSize="14px" marginLeft="4px">
            Defensores del Chaco 2230
          </Text>
        </Flex>

        <Flex as="article" marginBottom="2px">
          <Text
            fontWeight="semibold"
            fontSize="14px"
            color="#003049"
            textTransform="uppercase"
          >
            SUPERMERCADO:
          </Text>
          <Text color="#003049" fontSize="14px" marginLeft="4px">
            Casa Grutter
          </Text>
        </Flex>

        <Flex as="article" marginBottom="2px">
          <Text
            fontWeight="semibold"
            fontSize="14px"
            color="#003049"
            textTransform="uppercase"
          >
            REFERENCIA:
          </Text>
          <Text color="#003049" fontSize="14px" marginLeft="4px">
            a 1km del mercado de abasto
          </Text>
        </Flex>
      </Box>
    </Box>
  )
}

export default CommentPost
