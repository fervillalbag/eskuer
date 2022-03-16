import React from 'react'
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import { BiDotsVerticalRounded } from 'react-icons/bi'

const Product: React.FC = () => {
  return (
    <Flex
      as="article"
      alignItems="center"
      justifyContent="space-between"
      backgroundColor="white"
      padding="5px 10px"
      rounded="md"
      marginBottom="10px"
    >
      <Flex alignItems="center">
        <Box width="40px" height="40px">
          <Image
            src="https://www.quironsalud.es/idcsalud-client/cm/images?locale=es_ES&idMmedia=2299323"
            alt=""
            width="100%"
            height="100%"
            objectFit="contain"
          />
        </Box>
        <Box marginLeft="10px">
          <Text fontWeight="medium" fontSize="14px" color="#818181">
            Tomate
          </Text>
        </Box>
      </Flex>

      <Flex alignItems="center">
        <Box>
          <Text
            fontWeight="bold"
            textTransform="uppercase"
            fontSize="14px"
            color="#2D93E8"
          >
            KG
          </Text>
        </Box>
        <Box
          fontWeight="medium"
          color="#818181"
          marginLeft="10px"
          textAlign="right"
        >
          <Text>Gs. 11.000</Text>
        </Box>
        <Box marginLeft="10px">
          <Button
            minWidth="initial"
            height="initial"
            padding="7px 5px"
            fontSize="20px"
            border="1px solid #F1F1F1"
            _focus={{ shadow: 0 }}
            _active={{ backgroundColor: '#FFF' }}
            _hover={{ backgroundColor: '#FFF' }}
            backgroundColor="#FFF"
            color="#818181"
          >
            <BiDotsVerticalRounded />
          </Button>
        </Box>
      </Flex>
    </Flex>
  )
}

export default Product
