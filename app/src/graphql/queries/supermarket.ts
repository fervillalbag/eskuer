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

export const GET_SUPERMARKET = gql`
  query getSupermarket($id: String!) {
    getSupermarket(id: $id) {
      id
      slug
      name
      image
    }
  }
`
