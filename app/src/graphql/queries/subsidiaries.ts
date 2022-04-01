import { gql } from '@apollo/client'

export const GET_SUBSIDIARIES = gql`
  query getSubsidiaries($idSuper: String) {
    getSubsidiaries(idSuper: $idSuper) {
      id
      idSuper
      city
      address
      createdAt
    }
  }
`

export const GET_SUBSIDIARY = gql`
  query getSubsidiary($id: String) {
    getSubsidiary(id: $id) {
      id
      idSuper
      city
      address
      createdAt
    }
  }
`
