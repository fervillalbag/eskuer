import React from 'react'
import { NextPage } from 'next'
import { Box } from '@chakra-ui/react'
import Back from '../../components/Back'

const TermsPage: NextPage = () => {
  return (
    <Box padding="20px">
      <Box>
        <Back title="Términos y condiciones" />
      </Box>
    </Box>
  )
}

export default TermsPage
