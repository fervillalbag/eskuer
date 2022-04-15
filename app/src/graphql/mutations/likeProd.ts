import { gql } from '@apollo/client'

export const CREATE_LIKE_PRODUCT = gql`
  mutation createLikeProduct($idUser: String, $idProduct: String) {
    createLikeProduct(idUser: $idUser, idProduct: $idProduct) {
      message
      success
    }
  }
`

export const DELETE_LIKE_PRODUCT = gql`
  mutation deleteLikeProduct($id: String, $idUser: String, $idProduct: String) {
    deleteLikeProduct(id: $id, idUser: $idUser, idProduct: $idProduct) {
      message
      success
    }
  }
`
