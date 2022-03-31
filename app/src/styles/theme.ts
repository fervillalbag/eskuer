import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif'
  },

  colors: {
    primary: {
      light: '#f7fafc',
      dark: '#1a202c'
    },
    secondary: 'rgb(211,75,21)'
  }
})

export default theme
