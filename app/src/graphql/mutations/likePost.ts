import { gql } from '@apollo/client'

export const CREATE_LIKE_POST = gql`
  mutation createLikePost($idUser: String, $idPost: String) {
    createLikePost(idUser: $idUser, idPost: $idPost) {
      message
      success
    }
  }
`

export const DELETE_LIKE_POST = gql`
  mutation deleteLikePost($id: String, $idPost: String, $idUser: String) {
    deleteLikePost(id: $id, idPost: $idPost, idUser: $idUser) {
      message
      success
    }
  }
`
