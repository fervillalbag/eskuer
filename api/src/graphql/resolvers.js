const productController = require("../controllers/product");
const supermarketController = require("../controllers/supermarket");

const resolvers = {
  Query: {
    // Product
    getProducts: () => productController.getProducts(),

    // Supermarket
    getSupermarkets: () => supermarketController.getSupermarkets(),
    getSupermarket: (_, { id }) =>
      supermarketController.getSupermarket(id),
  },

  Mutation: {
    // Product
    createProduct: (_, { input }) =>
      productController.createProduct(input),
    updateProduct: (_, { input }) =>
      productController.updateProduct(input),
    deleteProduct: (_, { id }) => productController.deleteProduct(id),

    // Supermarket
    createSupermarket: (_, { input }) =>
      supermarketController.createSupermarket(input),
    updateSupermarket: (_, { input }) =>
      supermarketController.updateSupermarket(input),
    deleteSupermarket: (_, { id }) =>
      supermarketController.deleteSupermarket(id),
  },
};

module.exports = resolvers;
