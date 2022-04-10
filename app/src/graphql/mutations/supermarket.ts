import { gql } from '@apollo/client'

export const CREATE_SUPERMARKET = gql`
  mutation createSupermarket($input: SupermarketInput!) {
    createSupermarket(input: $input) {
      message
      success
    }
  }
`

export const UPDATE_SUPERMARKET = gql`
  mutation updateSupermarket($input: SupermarketInput!) {
    updateSupermarket(input: $input) {
      message
      success
    }
  }
`

export const DELETE_SUPERMARKET = gql`
  mutation deleteSupermarket($id: String!) {
    deleteSupermarket(id: $id) {
      message
      success
    }
  }
`
