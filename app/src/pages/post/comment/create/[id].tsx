import React from 'react'
import { NextPage } from 'next'
import { Box } from '@chakra-ui/react'

import Back from '../../../../components/Back'

const CommentCreate: NextPage = () => {
  return (
    <Box padding="20px">
      <Box>
        <Back title="Crear comentario" />
      </Box>
    </Box>
  )
}

export default CommentCreate
