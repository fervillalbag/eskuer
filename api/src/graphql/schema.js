const { gql } = require("apollo-server");

const typeDefs = gql`
  type MutationResponse {
    message: String
    success: String
  }

  type Price {
    id: String
    value: Float
    type: String
    createdAt: String
  }

  type SupermarketProduct {
    id: String
    price: [Price]
  }

  type Supermarket {
    id: String
    slug: String
    name: String
    image: String
  }

  type Product {
    id: String
    name: String
    category: String
    image: String
    supermarket: [SupermarketProduct]
  }

  input PriceInput {
    id: String
    value: Float
    type: String
    createdAt: String
  }

  input SupermarketProductInput {
    id: String
    price: [PriceInput]
  }

  input SupermarketInput {
    id: String
    slug: String
    name: String
    image: String
  }

  input ProductInput {
    id: String
    name: String
    category: String
    image: String
    supermarket: [SupermarketProductInput]
  }

  type Query {
    # Product
    getProducts: [Product]
    getProduct(id: String): Product

    # Supermarket
    getSupermarkets: [Supermarket]
    getSupermarket(id: String!): Supermarket
  }

  type Mutation {
    # Product
    createProduct(input: ProductInput!): MutationResponse
    updateProduct(input: ProductInput!): MutationResponse
    deleteProduct(id: String!): MutationResponse

    # Supermarket
    createSupermarket(input: SupermarketInput!): MutationResponse
    updateSupermarket(input: SupermarketInput!): MutationResponse
    deleteSupermarket(id: String!): MutationResponse
  }
`;

module.exports = typeDefs;
