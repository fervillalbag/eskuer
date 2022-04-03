import React from 'react'
import { Box, Text, Link } from '@chakra-ui/react'
import NextLink from 'next/link'

import Navbar from '../../components/Navbar'
import Back from '../../components/Back'
import TagProfile from '../../components/TagProfile'

const Settings: React.FC = () => {
  return (
    <Box padding="20px 20px 100px 20px">
      <Box>
        <Back showButton={false} title="Ajustes" />

        <Box marginTop="20px">
          <Text color="#003049" textTransform="uppercase">
            Cuenta
          </Text>

          <NextLink href="/settings/user">
            <Link
              display="block"
              marginTop="15px"
              _hover={{ textDecoration: 'none' }}
            >
              <TagProfile />
            </Link>
          </NextLink>
        </Box>
      </Box>

      <Navbar />
    </Box>
  )
}

export default Settings
