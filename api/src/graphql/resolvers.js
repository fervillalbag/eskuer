const supermarketController = require("../controllers/supermarket");

const resolvers = {
  Query: {
    // Supermarket
    getSupermarkets: () => supermarketController.getSupermarkets(),
  },

  Mutation: {
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
