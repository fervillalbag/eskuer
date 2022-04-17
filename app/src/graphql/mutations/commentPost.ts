import { gql } from '@apollo/client'

export const CREATE_COMMENT_POST = gql`
  mutation createCommentPost($input: CommentPostInput!) {
    createCommentPost(input: $input) {
      message
      success
    }
  }
`

export const DELETE_COMMENT_POST = gql`
  mutation deleteCommentPost($id: String!) {
    deleteCommentPost(id: $id) {
      message
      success
    }
  }
`
