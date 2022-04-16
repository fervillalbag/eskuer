import { gql } from '@apollo/client'

export const GET_POSTS = gql`
  query getPosts {
    getPosts {
      id
      title
      idUser
      image
      createdAt
      updateAt
    }
  }
`

export const GET_POST = gql`
  query getPost($id: String) {
    getPost(id: $id) {
      id
      title
      idUser
      image
      createdAt
      updateAt
    }
  }
`
