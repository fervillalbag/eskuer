import React from 'react'
import NextLink from 'next/link'
import { Box, Text, Link, Grid } from '@chakra-ui/react'
import { BsQuestionCircleFill } from 'react-icons/bs'
import { MdLocalGroceryStore } from 'react-icons/md'
import { IoIosDocument } from 'react-icons/io'

import Navbar from '../../components/Navbar'
import Back from '../../components/Back'
import TagProfile from '../../components/TagProfile'
import useAuth from '../../hooks/useAuth'
import NotFound from '../../components/NotFound'
import { useQuery } from '@apollo/client'
import { GET_USER } from '../../graphql/queries/user'

const Settings: React.FC = () => {
  const { user } = useAuth()

  const { data: dataUser } = useQuery(GET_USER, {
    variables: {
      id: user?.id
    }
  })

  const userInfo = dataUser?.getUser || {}

  if (!userInfo?.id) return <NotFound />

  return (
    <Box padding="20px 20px 100px 20px">
      <Box>
        <Back showButton={false} title="Ajustes" />

        <Box marginTop="20px" paddingBottom="20px">
          <Text color="#003049" textTransform="uppercase">
            Cuenta
          </Text>

          <NextLink href="/settings/user">
            <Link
              display="block"
              marginTop="15px"
              _hover={{ textDecoration: 'none' }}
            >
              <TagProfile user={userInfo} />
            </Link>
          </NextLink>
        </Box>

        <Box width="100%" height="1px" backgroundColor="#D5DFE5"></Box>

        <Text color="#003049" marginTop="20px" textTransform="uppercase">
          Configuración
        </Text>

        <Box marginTop="15px">
          <NextLink href="/saved/products">
            <Link
              width="100%"
              display="flex"
              color="#003049"
              textAlign="center"
              fontWeight="semibold"
              textTransform="uppercase"
              fontSize="14px"
              _hover={{ textDecoration: 'none' }}
              marginBottom="20px"
            >
              <Grid
                gridTemplateColumns="40px 1fr"
                width="full"
                gap="0 15px"
                alignItems="center"
              >
                <Text fontSize="40px" color="#D5DFE5" marginRight="15px">
                  <MdLocalGroceryStore />
                </Text>
                <Box>
                  <Text
                    color="#003049"
                    textAlign="left"
                    fontSize="12px"
                    fontWeight="semibold"
                  >
                    Productos guardados
                  </Text>
                  <Text
                    color="#9F9F9F"
                    textAlign="left"
                    fontSize="12px"
                    fontWeight="regular"
                    textTransform="lowercase"
                  >
                    ver todos los productos
                  </Text>
                </Box>
              </Grid>
            </Link>
          </NextLink>

          <NextLink href="/saved/post">
            <Link
              width="100%"
              display="flex"
              color="#003049"
              textAlign="center"
              fontWeight="semibold"
              textTransform="uppercase"
              fontSize="14px"
              _hover={{ textDecoration: 'none' }}
              marginBottom="20px"
            >
              <Grid
                gridTemplateColumns="40px 1fr"
                width="full"
                gap="0 15px"
                alignItems="center"
              >
                <Text fontSize="40px" color="#D5DFE5" marginRight="15px">
                  <BsQuestionCircleFill />
                </Text>
                <Box>
                  <Text
                    color="#003049"
                    textAlign="left"
                    fontSize="12px"
                    fontWeight="semibold"
                  >
                    Preguntas realizadas
                  </Text>
                  <Text
                    color="#9F9F9F"
                    textAlign="left"
                    fontSize="12px"
                    fontWeight="regular"
                    textTransform="lowercase"
                  >
                    ver todos las preguntas
                  </Text>
                </Box>
              </Grid>
            </Link>
          </NextLink>

          <NextLink href="/create/price">
            <Link
              width="100%"
              display="flex"
              color="#003049"
              textAlign="center"
              fontWeight="semibold"
              textTransform="uppercase"
              fontSize="14px"
              _hover={{ textDecoration: 'none' }}
              marginBottom="20px"
            >
              <Grid
                gridTemplateColumns="40px 1fr"
                width="full"
                gap="0 15px"
                alignItems="center"
              >
                <Text fontSize="40px" color="#D5DFE5" marginRight="15px">
                  <IoIosDocument />
                </Text>
                <Box>
                  <Text
                    color="#003049"
                    textAlign="left"
                    fontSize="12px"
                    fontWeight="semibold"
                  >
                    Términos y condiciones
                  </Text>
                  <Text
                    color="#9F9F9F"
                    textAlign="left"
                    fontSize="12px"
                    fontWeight="regular"
                    textTransform="lowercase"
                  >
                    mostrar información
                  </Text>
                </Box>
              </Grid>
            </Link>
          </NextLink>
        </Box>
      </Box>

      <Navbar />
    </Box>
  )
}

export default Settings
