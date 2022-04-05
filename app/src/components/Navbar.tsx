import React from 'react'
import { Box, Flex, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useQuery } from '@apollo/client'
import { HiSearch } from 'react-icons/hi'
import { TiHome } from 'react-icons/ti'
import { BsQuestionCircleFill } from 'react-icons/bs'
import { IoMdSettings } from 'react-icons/io'
import { useRouter } from 'next/router'
import { FaKey } from 'react-icons/fa'
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
        borderTop="1px solid #F1F1F1"
        width="calc(100% - 40px)"
        left="50%"
        transform="translate(-50%, 0)"
        position="fixed"
        bottom="20px"
        rounded="full"
        zIndex="50"
        filter="drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.1))"
      >
        <Flex
          alignItems="center"
          height="full"
          padding="0 30px"
          justifyContent="space-between"
        >
          <NextLink href="/">
            <Link
              fontSize="28px"
              color={pathname === '/' ? '"#003049"' : '#d9d9d9'}
            >
              <TiHome />
            </Link>
          </NextLink>
          <NextLink href="/search">
            <Link
              fontSize="28px"
              color={pathname === '/search' ? '"#003049"' : '#d9d9d9'}
            >
              <HiSearch />
            </Link>
          </NextLink>
          {userInfo.role === 'ADMIN' && (
            <NextLink href="/admin">
              <Link
                fontSize="24px"
                color={
                  pathname === '/admin'
                    ? 'hsl(358, 70%, 66%)'
                    : 'hsl(358, 70%, 85%)'
                }
              >
                <FaKey />
              </Link>
            </NextLink>
          )}
          <NextLink href="/">
            <Link
              fontSize="28px"
              color={pathname === '/questions' ? '"#003049"' : '#d9d9d9'}
            >
              <BsQuestionCircleFill />
            </Link>
          </NextLink>
          {user && (
            <NextLink href="/settings">
              <Link
                fontSize="28px"
                color={pathname === '/settings' ? '"#003049"' : '#d9d9d9'}
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
