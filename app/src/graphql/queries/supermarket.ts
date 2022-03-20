import { gql } from '@apollo/client'

export const GET_SUPERMARKETS = gql`
  query getSupermarkets {
    getSupermarkets {
      id
      slug
      name
      image
    }
  }
`
