const productController = require("../controllers/product");

const resolvers = {
  Query: {
    // Supermarket
    getProducts: () => productController.getProducts(),
  },

  Mutation: {
    // Supermarket
    createProduct: (_, { input }) =>
      productController.createProduct(input),
    updateProduct: (_, { input }) =>
      productController.updateProduct(input),
    deleteProduct: (_, { id }) => productController.deleteProduct(id),
  },
};

module.exports = resolvers;
