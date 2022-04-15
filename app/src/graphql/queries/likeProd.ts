import { gql } from '@apollo/client'

export const GET_LIKE_PRODUCT = gql`
  query getLikeProduct($input: LikeProductInput) {
    getLikeProduct(input: $input) {
      id
      value
    }
  }
`
