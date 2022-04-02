import { gql } from '@apollo/client'

export const GET_SUPERMARKETS = gql`
  query getSupermarkets {
    getSupermarkets {
      id
      name
      slug
      image
      createdAt
      city
      address
      title
    }
  }
`

export const GET_SUPERMARKET = gql`
  query getSupermarket($id: String!) {
    getSupermarket(id: $id) {
      id
      name
      slug
      image
      city
      address
      title
      createdAt
    }
  }
`
