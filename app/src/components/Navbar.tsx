import React from 'react'
import { Box, Flex, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { HiOutlineHome, HiSearch } from 'react-icons/hi'
import { BiLineChart } from 'react-icons/bi'
import { IoMdSettings } from 'react-icons/io'

const Navbar: React.FC = () => {
  return (
    <Box
      height="60px"
      backgroundColor="white"
      borderTop="1px solid #F1F1F1"
      position="sticky"
      bottom="0"
    >
      <Flex
        alignItems="center"
        height="full"
        padding="0 40px"
        justifyContent="space-between"
      >
        <NextLink href="/">
          <Link fontSize="28px" color="#2D93E8">
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
  )
}

export default Navbar
