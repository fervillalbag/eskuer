import { gql } from '@apollo/client'

export const CREATE_COMMENT_POST = gql`
  mutation createCommentPost($input: CommentPostInput!) {
    createCommentPost(input: $input) {
      message
      success
    }
  }
`
