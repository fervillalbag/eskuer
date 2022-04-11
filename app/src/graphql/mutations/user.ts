import { gql } from '@apollo/client'

export const REGISTER_USER = gql`
  mutation createUser($input: UserInput!) {
    createUser(input: $input) {
      message
      success
    }
  }
`

export const LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      token
    }
  }
`

export const DELETE_USER = gql`
  mutation deleteUser($id: String!) {
    deleteUser(id: $id) {
      message
      success
    }
  }
`
