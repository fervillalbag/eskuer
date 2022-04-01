import { gql } from '@apollo/client'

export const GET_PRICES = gql`
  query getPrices($idProduct: String, $idSuper: String) {
    getPrices(idProduct: $idProduct, idSuper: $idSuper) {
      id
      idProduct
      idSuper
      value
      idSubsidiary
      createdAt
      type
    }
  }
`
