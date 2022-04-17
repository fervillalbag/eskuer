import React, { useState } from 'react'
import { NextPage } from 'next'
import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'
import { useMutation, useQuery } from '@apollo/client'
import toast from 'react-hot-toast'

import Back from '../../../components/Back'
import { GET_USER, GET_USERS } from '../../../graphql/queries/user'
import { FaTrash } from 'react-icons/fa'
import useAuth from '../../../hooks/useAuth'
import { DELETE_USER } from '../../../graphql/mutations/user'
import NotFound from '../../../components/NotFound'

const UserListPage: NextPage = () => {
  const { data: dataUsers, refetch } = useQuery(GET_USERS, {
    fetchPolicy: 'network-only'
  })

  const users = dataUsers?.getUsers || []
  const [userId, setUserId] = useState<string | null>(null)

  const { user: userHook } = useAuth()
  const [deleteUser] = useMutation(DELETE_USER)

  const { data: dataUser } = useQuery(GET_USER, {
    variables: {
      id: userHook?.id
    }
  })

  const userData = dataUser?.getUser || {}

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const onClose = () => setIsOpen(false)
  const onOpen = () => setIsOpen(true)

  const handleDeleteUser = async () => {
    try {
      await deleteUser({
        variables: {
          id: userId
        }
      })
      refetch()
      toast.success('Usuario eliminado correctamente!')
    } catch (error) {
      console.log(error)
      toast.success('Hubo un problema al eliminar al usuario!')
    }

    onClose()
  }

  if (userData.role !== 'ADMIN') return <NotFound />

  return (
    <Box padding="20px">
      <Box>
        <Back title="Lista de usuarios" />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xs">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader padding="15px">Eliminar</ModalHeader>
          <ModalCloseButton />
          <ModalBody padding="0 15px">¿Desea eliminar este usuario?</ModalBody>

          <ModalFooter
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            gap="15px"
            padding="15px"
            marginTop="10px"
          >
            <Button
              rounded="3px"
              width="100%"
              color="#003049"
              backgroundColor="#D5DFE5"
              onClick={onClose}
            >
              Cerrar
            </Button>
            <Button
              rounded="3px"
              width="100%"
              color="red.700"
              backgroundColor="red.100"
              _focus={{ shadow: 0 }}
              _hover={{ backgroundColor: 'red.200' }}
              onClick={handleDeleteUser}
            >
              Si, eliminar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box marginTop="20px">
        {users.map(user => (
          <Flex
            key={user.id}
            marginBottom="20px"
            justifyContent="space-between"
            alignItems="center"
          >
            <Flex alignItems="center">
              <Box>
                <Image
                  src={!user?.image ? '/profile-avatar.png' : user?.image}
                  alt=""
                  width="50px"
                  height="50px"
                  objectFit="cover"
                />
              </Box>
              <Box marginLeft="12px">
                <Text
                  fontSize="14px"
                  fontWeight="semibold"
                  textTransform="uppercase"
                >
                  {user?.name}
                </Text>
                <Text fontSize="12" textTransform="lowercase" color="gray.500">
                  {user?.email}
                </Text>
              </Box>
            </Flex>
            {userData?.role === 'ADMIN' && user?.id !== userHook?.id && (
              <Button
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="40px"
                height="40px"
                padding="0"
                minWidth="initial"
                backgroundColor="red.400"
                color="#FFF"
                fontSize="14px"
                rounded="3px"
                _hover={{ backgroundColor: 'red.500' }}
                _focus={{ shadow: 0 }}
                onClick={() => {
                  onOpen()
                  setUserId(user.id)
                }}
              >
                <FaTrash />
              </Button>
            )}
          </Flex>
        ))}
      </Box>
    </Box>
  )
}

export default UserListPage
