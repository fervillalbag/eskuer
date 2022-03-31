import React from 'react'
import { Box, Flex, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { HiOutlineHome, HiSearch } from 'react-icons/hi'
import { BiLineChart } from 'react-icons/bi'
import { IoMdSettings } from 'react-icons/io'

const Navbar: React.FC = () => {
  return (
    <>
      <Box
        position="fixed"
        bottom="0"
        width="100%"
        height="80px"
        background="linear-gradient(180deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.9) 75%)"
      ></Box>

      <Box
        height="60px"
        backgroundColor="white"
        borderTop="1px solid #F1F1F1"
        width="calc(100% - 40px)"
        left="50%"
        transform="translate(-50%, 0)"
        position="fixed"
        bottom="20px"
        rounded="full"
        filter="drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.1))"
      >
        <Flex
          alignItems="center"
          height="full"
          padding="0 30px"
          justifyContent="space-between"
        >
          <NextLink href="/">
            <Link fontSize="28px" color="#003049">
              <HiOutlineHome />
            </Link>
          </NextLink>
          <NextLink href="/">
            <Link fontSize="28px" color="#999">
              <HiSearch />
            </Link>
          </NextLink>
          <NextLink href="/">
            <Link fontSize="28px" color="#999">
              <BiLineChart />
            </Link>
          </NextLink>
          <NextLink href="/">
            <Link fontSize="28px" color="#999">
              <IoMdSettings />
            </Link>
          </NextLink>
        </Flex>
      </Box>
    </>
  )
}

export default Navbar
