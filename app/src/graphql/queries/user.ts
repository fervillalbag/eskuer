import { gql } from '@apollo/client'

export const GET_USER = gql`
  query getUser($id: String) {
    getUser(id: $id) {
      id
      name
      email
      username
      createdAt
      avatar
      role
    }
  }
`
