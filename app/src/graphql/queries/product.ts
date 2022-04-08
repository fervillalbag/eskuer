import { gql } from '@apollo/client'

export const GET_PRODUCTS = gql`
  query getProducts {
    getProducts {
      id
      name
      category
      createdAt
      type
      image
    }
  }
`

export const GET_PRODUCT = gql`
  query getProduct($id: String) {
    getProduct(id: $id) {
      id
      name
      category
      image
      type
      createdAt
    }
  }
`

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: String!) {
    deleteProduct(id: $id) {
      message
      success
    }
  }
`
