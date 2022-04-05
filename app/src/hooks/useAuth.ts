import { useCallback, useContext, useEffect } from 'react'

import { GET_USER } from '../graphql/queries/user'
import { useQuery } from '@apollo/client'
import { UserContext } from '../context/UserContext'
import { decodeToken, getToken, setToken } from '../utils/helpers'
import { User } from '../interfaces/User'
import { useRouter } from 'next/router'

interface UseAuthIprops {
  user: null | User
  isLogged: boolean
  login: (token: string) => void
  logout: () => void
}

const useAuth = (): UseAuthIprops => {
  const { user, setUser } = useContext(UserContext)
  const router = useRouter()

  const { data } = useQuery(GET_USER, {
    variables: {
      id: user?.id
    }
  })

  useEffect(() => {
    if (data === undefined) return null
  }, [data])

  useEffect(() => {
    const token = getToken()

    if (!token) {
      setUser(null)
    } else {
      setUser(decodeToken(token))
    }
  }, [])

  const login = useCallback(
    token => {
      setToken(token)
      setUser(decodeToken(token))
    },
    [setUser]
  )

  const logout = useCallback(() => {
    router.push('/')
    setToken('')
    setUser(null)
  }, [setUser])

  return {
    user,
    isLogged: Boolean(user),
    login,
    logout
  }
}

export default useAuth
