import React from 'react'
import { Box, Grid } from '@chakra-ui/react'

const LoaderPost: React.FC = () => {
  return (
    <Grid gridTemplateColumns="100px 1fr" gap="20px" marginBottom="25px">
      <Box width="100px" height="100px" backgroundColor="#EFF3F5"></Box>

      <Box width="100%">
        <Box width="100%" height="20px" backgroundColor="#EFF3F5"></Box>
        <Box
          marginTop="8px"
          width="100%"
          height="20px"
          backgroundColor="#EFF3F5"
        ></Box>

        <Grid
          gridTemplateColumns="40px 1fr"
          marginTop="8px"
          gap="10px"
          alignItems="center"
        >
          <Box
            flexBasis="40px"
            width="40px"
            height="40px"
            rounded="full"
            backgroundColor="#EFF3F5"
          ></Box>

          <Box>
            <Box width="100px" height="12px" backgroundColor="#EFF3F5"></Box>
            <Box
              marginTop="5px"
              width="100px"
              height="12px"
              backgroundColor="#EFF3F5"
            ></Box>
          </Box>
        </Grid>
      </Box>
    </Grid>
  )
}

export default LoaderPost
