import { gql } from '@apollo/client'

export const GET_LIKE_POST = gql`
  query getLikePost($idUser: String, $idPost: String) {
    getLikePost(idUser: $idUser, idPost: $idPost) {
      id
      value
    }
  }
`
