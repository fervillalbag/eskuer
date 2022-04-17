import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import { FaTrash } from 'react-icons/fa'

import { GET_USER } from '../graphql/queries/user'

import 'dayjs/locale/es'
import useAuth from '../hooks/useAuth'

dayjs.extend(relativeTime)
dayjs.locale('es')

interface CommentPostIprops {
  comment: any
}

const CommentPost: React.FC<CommentPostIprops> = ({ comment }) => {
  const { data: dataUser } = useQuery(GET_USER, {
    variables: {
      id: comment?.idUser
    }
  })

  const { user: userLocal } = useAuth()

  const user = dataUser?.getUser || {}

  return (
    <Box
      marginBottom="20px"
      border="1px solid #003049"
      borderBottom="4px solid #003049"
      padding="20px 15px"
      backgroundColor="#EFF3F5"
      rounded="3px 3px 0 0"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
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
              {dayjs(parseInt(comment?.createdAt)).fromNow()}
            </Text>
          </Box>
        </Flex>

        <Box>
          {userLocal?.id === user?.id && (
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
          )}
        </Box>
      </Flex>

      <Box marginTop="5px">
        <Flex as="article" marginBottom="2px">
          <Text display="inline-block" color="#003049" fontSize="14px">
            <Text
              as="span"
              display="inline-block"
              fontWeight="semibold"
              fontSize="14px"
              color="#003049"
              textTransform="uppercase"
            >
              SUCURSAL:
            </Text>{' '}
            {comment?.branchOffice}, {comment?.supermarket}
          </Text>
        </Flex>

        <Flex as="article" marginBottom="2px">
          <Text color="#003049" fontSize="14px" display="inline-block">
            <Text
              as="span"
              display="inline-block"
              fontWeight="semibold"
              fontSize="14px"
              color="#003049"
              textTransform="uppercase"
            >
              Dirección:
            </Text>{' '}
            {comment?.address}
          </Text>
        </Flex>

        <Flex as="article" marginBottom="2px">
          <Text display="inline-block" color="#003049" fontSize="14px">
            <Text
              as="span"
              display="inline-block"
              fontWeight="semibold"
              fontSize="14px"
              color="#003049"
              textTransform="uppercase"
            >
              REFERENCIA:
            </Text>{' '}
            a 1km del mercado de abasto
          </Text>
        </Flex>
      </Box>
    </Box>
  )
}

export default CommentPost
