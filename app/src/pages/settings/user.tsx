import React from 'react'
import NextLink from 'next/link'
import { Box, Grid, Text, Link, Button } from '@chakra-ui/react'
import { FaKey, FaRegEnvelope, FaUser } from 'react-icons/fa'

import NotFound from '../../components/NotFound'
import useAuth from '../../hooks/useAuth'
import Back from '../../components/Back'

const SettingsUser: React.FC = () => {
  const { user, logout } = useAuth()

  if (!user) return <NotFound />

  return (
    <Box padding="20px">
      <Back title="Info personal" />

      <Box marginTop="25px">
        <Text color="#003049" marginTop="20px" textTransform="uppercase">
          Modificar cuenta
        </Text>

        <Box marginTop="15px">
          <NextLink href="/settings/name">
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
                  <FaUser />
                </Text>
                <Box>
                  <Text
                    color="#003049"
                    textAlign="left"
                    fontSize="12px"
                    fontWeight="semibold"
                  >
                    Cambiar nombre
                  </Text>
                  <Text
                    color="#9F9F9F"
                    textAlign="left"
                    fontSize="12px"
                    fontWeight="regular"
                    textTransform="lowercase"
                  >
                    mostrar opción
                  </Text>
                </Box>
              </Grid>
            </Link>
          </NextLink>

          <NextLink href="/settings/email">
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
                  <FaRegEnvelope />
                </Text>
                <Box>
                  <Text
                    color="#003049"
                    textAlign="left"
                    fontSize="12px"
                    fontWeight="semibold"
                  >
                    Cambiar email
                  </Text>
                  <Text
                    color="#9F9F9F"
                    textAlign="left"
                    fontSize="12px"
                    fontWeight="regular"
                    textTransform="lowercase"
                  >
                    mostrar opción
                  </Text>
                </Box>
              </Grid>
            </Link>
          </NextLink>

          <NextLink href="/settings/password">
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
                  <FaKey />
                </Text>
                <Box>
                  <Text
                    color="#003049"
                    textAlign="left"
                    fontSize="12px"
                    fontWeight="semibold"
                  >
                    Cambiar contraseña
                  </Text>
                  <Text
                    color="#9F9F9F"
                    textAlign="left"
                    fontSize="12px"
                    fontWeight="regular"
                    textTransform="lowercase"
                  >
                    mostrar opción
                  </Text>
                </Box>
              </Grid>
            </Link>
          </NextLink>
        </Box>

        <Button
          minWidth="initial"
          display="block"
          width="full"
          height="50px"
          rounded="3px 3px 0 0"
          border="1px solid #003049"
          borderBottom="4px solid #003049"
          backgroundColor="#FFF"
          onClick={logout}
          marginTop="30px"
        >
          Cerrar sesión
        </Button>
      </Box>
    </Box>
  )
}

export default SettingsUser
