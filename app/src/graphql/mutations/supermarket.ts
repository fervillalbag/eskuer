import { gql } from '@apollo/client'

export const CREATE_SUPERMARKET = gql`
  mutation createSupermarket($input: SupermarketInput!) {
    createSupermarket(input: $input) {
      message
      success
    }
  }
`
