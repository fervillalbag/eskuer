import { gql } from '@apollo/client'

export const GET_COMMENT_POST_ON_POST = gql`
  query getCommentPostsOnPost($idPost: String) {
    getCommentPostsOnPost(idPost: $idPost) {
      id
      idUser
      idPost
      branchOffice
      reference
      supermarket
      address
      updatedAt
      createdAt
    }
  }
`
