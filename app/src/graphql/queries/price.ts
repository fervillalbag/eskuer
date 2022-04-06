import { gql } from '@apollo/client'

export const GET_PRICES = gql`
  query getPrice($idProduct: String, $idSuper: String) {
    getPrice(idProduct: $idProduct, idSuper: $idSuper) {
      id
      idProduct
      idSuper
      value
      createdAt
    }
  }
`

export const GET_PRICES_ALL = gql`
  query getPrices($idProduct: String, $idSuper: String) {
    getPrices(idProduct: $idProduct, idSuper: $idSuper) {
      id
      idProduct
      idSuper
      value
      createdAt
    }
  }
`
