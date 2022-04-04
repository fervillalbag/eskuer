import { gql } from '@apollo/client'

export const REGISTER_USER = gql`
  mutation createUser($input: UserInput!) {
    createUser(input: $input) {
      message
      success
    }
  }
`
