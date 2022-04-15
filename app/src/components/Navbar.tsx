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
        height="110px"
        background="linear-gradient(180deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.95) 70%)"
      ></Box>

      <Box
        height="60px"
        backgroundColor="white"
        // borderTop="1px solid #F1F1F1"
        width="calc(100% - 40px)"
        left="50%"
        transform="translate(-50%, 0)"
        position="fixed"
        bottom="20px"
        rounded="5px 5px 0 0"
        zIndex="50"
        border="1px solid #003049"
        borderBottom="4px solid #003049"
        // filter="drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.1))"
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
              color={pathname === '/' ? '"#003049"' : '#d5dfe4'}
            >
              <TiHome />
            </Link>
          </NextLink>
          <NextLink href="/search">
            <Link
              fontSize="26px"
              color={pathname === '/search' ? '"#003049"' : '#d5dfe4'}
            >
              <FiSearch />
            </Link>
          </NextLink>
          {userInfo.role === 'ADMIN' && (
            <NextLink href="/admin">
              <Link
                fontSize="26px"
                color={pathname === '/admin' ? '#003049' : '#d5dfe4'}
              >
                <IoIosKey />
              </Link>
            </NextLink>
          )}
          <NextLink href="/">
            <Link
              fontSize="26px"
              color={pathname === '/questions' ? '"#003049"' : '#d5dfe4'}
            >
              <GoCommentDiscussion />
            </Link>
          </NextLink>
          {user && (
            <NextLink href="/settings">
              <Link
                fontSize="26px"
                color={pathname === '/settings' ? '"#003049"' : '#d5dfe4'}
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
