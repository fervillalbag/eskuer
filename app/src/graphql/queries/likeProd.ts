import { gql } from '@apollo/client'

export const GET_LIKE_PRODUCT = gql`
  query getLikeProduct($input: LikeProductInput) {
    getLikeProduct(input: $input) {
      id
      value
    }
  }
`

export const GET_LIKE_PRODUCTS_USER = gql`
  query getLikesProductsUser($idUser: String) {
    getLikesProductsUser(idUser: $idUser) {
      id
      idUser
      idProduct
      createdAt
    }
  }
`
