const productController = require("../controllers/product");

const resolvers = {
  Query: {
    // Product
    getProducts: () => productController.getProducts(),
    getProduct: (_, { id }) => productController.getProduct(id),
  },

  Mutation: {
    // Product
    createProduct: (_, { input }) =>
      productController.createProduct(input),
    updateProduct: (_, { input }) =>
      productController.updateProduct(input),
    deleteProduct: (_, { id }) => productController.deleteProduct(id),
  },
};

module.exports = resolvers;
