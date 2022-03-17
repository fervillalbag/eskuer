import { gql } from '@apollo/client'

export const GET_PRODUCTS = gql`
  query getProducts {
    getProducts {
      id
      name
      category
      supermarket {
        id
        slug
        name
        image
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
