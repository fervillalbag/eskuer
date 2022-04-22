import React from 'react'
import { Box, Flex, Grid } from '@chakra-ui/react'

const LoaderPrice: React.FC = () => {
  return (
    <Box marginBottom="20px">
      <Flex alignItems="center" width="100%">
        <Grid
          gridTemplateColumns="40px 1fr"
          alignItems="center"
          width="100%"
          gap="0 10px"
        >
          <Box width="100%" height="40px" backgroundColor="#EFF3F5"></Box>
          <Box width="100%">
            <Box width="40%" height="10px" backgroundColor="#EFF3F5"></Box>
            <Box
              marginTop="8px"
              width="40%"
              height="10px"
              backgroundColor="#EFF3F5"
            ></Box>
          </Box>
        </Grid>
        <Box>
          <Box width="80px" height="15px" backgroundColor="#EFF3F5"></Box>
        </Box>
      </Flex>

      <Box marginTop="8px">
        <Box width="100%" height="10px" backgroundColor="#EFF3F5"></Box>
      </Box>
    </Box>
  )
}

export default LoaderPrice
