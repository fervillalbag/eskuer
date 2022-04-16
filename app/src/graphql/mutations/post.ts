import { gql } from '@apollo/client'

export const CREATE_POST = gql`
  mutation createPost($input: PostInput!) {
    createPost(input: $input) {
      message
      success
    }
  }
`

export const UPDATE_POST = gql`
  mutation updatePost($input: PostInput!) {
    updatePost(input: $input) {
      message
      success
    }
  }
`

export const DELETE_POST = gql`
  mutation deletePost($id: String!) {
    deletePost(id: $id) {
      message
      success
    }
  }
`
