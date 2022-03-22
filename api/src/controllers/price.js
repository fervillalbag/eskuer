const Price = require("../models/price");

const getPrices = async (idProduct, idSuper) => {
  try {
    if (idProduct) {
      const prices = await Price.find({}).where({ idProduct });
      if (!prices) throw new Error("Prices not found");
      return prices;
    }

    if (idSuper) {
      const prices = await Price.find({}).where({ idSuper });
      console.log(prices);
      if (!prices) throw new Error("Prices not found");
      return prices;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createPrice = async (input) => {
  try {
    const price = new Price(input);
    await price.save();

    return {
      message: "Price created!",
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Some error!",
      success: false,
    };
  }
};

const updatePrice = async (input) => {
  try {
    await Price.findOneAndUpdate({ _id: input.id }, input);

    return {
      message: "Price updated!",
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Some error!",
      success: false,
    };
  }
};

const deletePrice = async (id) => {
  try {
    await Price.findOneAndDelete({ _id: id });

    return {
      message: "Price deleted!",
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Some error!",
      success: false,
    };
  }
};

module.exports = {
  createPrice,
  updatePrice,
  deletePrice,
  getPrices,
};
