const { gql } = require("apollo-server");

const typeDefs = gql`
  type MutationResponse {
    message: String
    success: String
  }

  type Price {
    id: String
    idProduct: String
    idSuper: String
    value: Float
    type: String
    createdAt: String
  }

  type Product {
    id: String
    name: String
    category: String
    image: String
    createdAt: String
  }

  type Supermarket {
    id: String
    name: String
    slug: String
    image: String
    createdAt: String
  }

  input ProductInput {
    id: String
    name: String
    category: String
    image: String
  }

  input SupermarketInput {
    id: String
    name: String
    slug: String
    image: String
  }

  input PriceInput {
    id: String
    idProduct: String
    idSuper: String
    value: Float
    type: String
    createdAt: String
  }

  type Query {
    # Product
    getProducts: [Product]
    getProduct(id: String): Product

    # Supermarket
    getSupermarkets: [Supermarket]
    getSupermarket(id: String!): Supermarket

    # Price
    getPrices(idProduct: String, idSuper: String): [Price]
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

    # Price
    createPrice(input: PriceInput!): MutationResponse
    updatePrice(input: PriceInput!): MutationResponse
    deletePrice(id: String!): MutationResponse
  }
`;

module.exports = typeDefs;
