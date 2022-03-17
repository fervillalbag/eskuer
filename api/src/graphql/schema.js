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

  type Supermarket {
    id: String
    slug: String
    name: String
    image: String
    price: [Price]
  }

  type Product {
    id: String
    name: String
    category: String
    supermarket: [Supermarket]
  }

  input PriceInput {
    id: String
    value: Float
    type: String
    createdAt: String
  }

  input SupermarketInput {
    id: String
    slug: String
    name: String
    image: String
    price: [PriceInput]
  }

  input ProductInput {
    id: String
    name: String
    category: String
    supermarket: [SupermarketInput]
  }

  input SupermarketUpdateInput {
    id: String
    slug: String
    name: String
    image: String
    price: [PriceInput]
  }

  type Query {
    # Product
    getProducts: [Product]
  }

  type Mutation {
    # Product
    createProduct(input: ProductInput!): MutationResponse
    updateProduct(input: ProductInput!): MutationResponse
    deleteProduct(id: String!): MutationResponse
  }
`;

module.exports = typeDefs;
