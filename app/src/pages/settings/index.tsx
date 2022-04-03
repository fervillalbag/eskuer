import React from 'react'
import { Box } from '@chakra-ui/react'
import Navbar from '../../components/Navbar'
import Back from '../../components/Back'

const Settings: React.FC = () => {
  return (
    <Box padding="20px 20px 100px 20px">
      <Box>
        <Back showButton={false} title="Ajustes" />
      </Box>

      <Navbar />
    </Box>
  )
}

export default Settings
