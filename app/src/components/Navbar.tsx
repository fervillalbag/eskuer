import React from 'react'
import NextLink from 'next/link'
import { Box, Flex, Link } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import { TiHome } from 'react-icons/ti'
import { IoIosKey, IoMdSettings } from 'react-icons/io'
import { useRouter } from 'next/router'
import { FiSearch } from 'react-icons/fi'
import { GoCommentDiscussion } from 'react-icons/go'

import useAuth from '../hooks/useAuth'
import { GET_USER } from '../graphql/queries/user'

const Navbar: React.FC = () => {
  const { pathname } = useRouter()
  const { user } = useAuth()

  const { data: dataUser } = useQuery(GET_USER, {
    variables: {
      id: user?.id
    }
  })

  const userInfo = dataUser?.getUser || {}

  return (
    <>
      <Box
        position="fixed"
        bottom="0"
        width="100%"
        height="80px"
        background="linear-gradient(180deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.97) 75%)"
        zIndex="1"
      ></Box>

      <Box
        height="60px"
        backgroundColor="white"
        width="calc(100% - 40px)"
        left="50%"
        transform="translate(-50%, 0)"
        position="fixed"
        bottom="20px"
        rounded="5px 5px 0 0"
        zIndex="50"
        border="1px solid #F0F0F0"
        borderBottom="4px solid #F0F0F0"
      >
        <Flex
          alignItems="center"
          height="full"
          padding="0 30px"
          justifyContent="space-between"
        >
          <NextLink href="/">
            <Link
              fontSize="26px"
              color={pathname === '/' ? '#3E3E3E' : '#E5E5E5'}
            >
              <TiHome />
            </Link>
          </NextLink>
          <NextLink href="/search">
            <Link
              fontSize="26px"
              color={pathname === '/search' ? '#3E3E3E' : '#E5E5E5'}
            >
              <FiSearch />
            </Link>
          </NextLink>
          {userInfo.role === 'ADMIN' && (
            <NextLink href="/admin">
              <Link
                fontSize="26px"
                color={pathname === '/admin' ? '#3E3E3E' : '#E5E5E5'}
              >
                <IoIosKey />
              </Link>
            </NextLink>
          )}
          <NextLink href="/post">
            <Link
              fontSize="26px"
              color={pathname === '/post' ? '#3E3E3E' : '#E5E5E5'}
            >
              <GoCommentDiscussion />
            </Link>
          </NextLink>
          {user && (
            <NextLink href="/settings">
              <Link
                fontSize="26px"
                color={pathname === '/settings' ? '#3E3E3E' : '#E5E5E5'}
              >
                <IoMdSettings />
              </Link>
            </NextLink>
          )}
        </Flex>
      </Box>
    </>
  )
}

export default Navbar
