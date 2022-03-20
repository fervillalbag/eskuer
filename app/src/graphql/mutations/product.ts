import { gql } from '@apollo/client'

export const CREATE_PRODUCT = gql`
  mutation createProduct($input: ProductInput!) {
    createProduct(input: $input) {
      message
      success
    }
  }
`

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($input: ProductInput!) {
    updateProduct(input: $input) {
      message
      success
    }
  }
`
