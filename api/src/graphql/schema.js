const { gql } = require("apollo-server");

const typeDefs = gql`
  type MutationResponse {
    message: String
    success: String
  }

  type Price {
    value: Float
    type: String
    createdAt: String
  }

  type Product {
    id: String
    name: String
    price: [Price]
  }

  input PriceInput {
    value: Float
    type: String
    createdAt: String
  }

  type Supermarket {
    id: String
    slug: String
    name: String
    image: String
    products: [Product]
  }

  input ProductInput {
    id: String
    name: String
    price: [PriceInput]
  }

  input SupermarketInput {
    slug: String
    name: String
    image: String
    products: [ProductInput]
  }

  input SupermarketUpdateInput {
    id: String
    slug: String
    name: String
    image: String
    products: [ProductInput]
  }

  type Query {
    # Supermarket
    getSupermarkets: [Supermarket]
  }

  type Mutation {
    # Supermarket
    createSupermarket(input: SupermarketInput!): MutationResponse
    updateSupermarket(
      input: SupermarketUpdateInput!
    ): MutationResponse
    deleteSupermarket(id: String!): MutationResponse
  }
`;

module.exports = typeDefs;
