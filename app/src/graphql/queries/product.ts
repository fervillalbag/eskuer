import { gql } from '@apollo/client'

export const GET_PRODUCTS = gql`
  query getProducts {
    getProducts {
      id
      name
      category
      image
      supermarket {
        id
        price {
          id
          value
          type
          createdAt
        }
      }
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
      supermarket {
        id
        price {
          id
          value
          type
          createdAt
        }
      }
    }
  }
`
