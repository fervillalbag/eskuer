import { gql } from '@apollo/client'

export const GET_PRODUCTS = gql`
  query getProducts {
    getProducts {
      id
      name
      category
      createdAt
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
      createdAt
    }
  }
`
