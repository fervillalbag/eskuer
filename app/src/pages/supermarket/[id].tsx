import React from 'react'
import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const Supermarket: React.FC = () => {
  const router = useRouter()
  console.log(router)

  return (
    <Box>
      <Box></Box>
    </Box>
  )
}

export default Supermarket
