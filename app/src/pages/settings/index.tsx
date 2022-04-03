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

        <Box marginTop="15px">
          <Text color="#003049">Cuenta</Text>

          <NextLink href="/settings/user">
            <Link>
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
