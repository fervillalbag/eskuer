import React from 'react'
import { Grid, Box, Flex } from '@chakra-ui/react'

const LoaderComment: React.FC = () => {
  return (
    <Box
      padding="15px"
      rounded="2px"
      backgroundColor={`hsl(200, 23%, 98%)`}
      marginBottom="20px"
    >
      <Flex alignItems="center" justifyContent="space-between">
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
            backgroundColor="#e0e7eb"
          ></Box>

          <Box>
            <Box width="100px" height="12px" backgroundColor="#e0e7eb"></Box>
            <Box
              marginTop="5px"
              width="100px"
              height="12px"
              backgroundColor="#e0e7eb"
            ></Box>
          </Box>
        </Grid>

        <Box width="40px" height="40px" backgroundColor="#e0e7eb"></Box>
      </Flex>

      <Box marginTop="15px">
        <Box width="100%" height="15px" backgroundColor="#e0e7eb"></Box>
        <Box
          width="100%"
          height="15px"
          backgroundColor="#e0e7eb"
          marginTop="8px"
        ></Box>
        <Box
          width="100%"
          height="15px"
          backgroundColor="#e0e7eb"
          marginTop="8px"
        ></Box>
      </Box>
    </Box>
  )
}

export default LoaderComment
