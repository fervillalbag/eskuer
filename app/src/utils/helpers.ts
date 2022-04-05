import jwtDecode from 'jwt-decode'
import { TOKEN } from './constants'

export const setToken = (token: string): void => {
  return localStorage.setItem(TOKEN, token)
}

export const getToken = (): string => {
  return localStorage.getItem(TOKEN)
}

export const decodeToken = (token: string): string => {
  return jwtDecode(token)
}

export const removeToken = (): void => {
  return localStorage.removeItem(TOKEN)
}
