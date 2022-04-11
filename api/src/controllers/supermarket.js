const Supermarket = require("../models/supermarket");
const Price = require("../models/price");

const getSupermarkets = async () => {
  try {
    const supermarkets = await Supermarket.find({});
    if (!supermarkets) throw new Error("Supermarkets not found");
    return supermarkets;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getSupermarket = async (id) => {
  try {
    const supermarkets = await Supermarket.findOne({ _id: id });
    if (!supermarkets) throw new Error("Supermarkets not found");
    return supermarkets;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createSupermarket = async (input) => {
  try {
    const supermarket = new Supermarket(input);
    await supermarket.save();

    return {
      message: "Supermarket created!",
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

const updateSupermarket = async (input) => {
  try {
    await Supermarket.findOneAndUpdate({ _id: input.id }, input);
    return {
      message: "Supermarket updated!",
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

const deleteSupermarket = async (id) => {
  try {
    await Price.find({}).deleteMany({ idSupermarket: id });
    await Supermarket.findOneAndDelete({ _id: id });

    return {
      message: "Supermarket deleted!",
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
  getSupermarkets,
  getSupermarket,
  createSupermarket,
  updateSupermarket,
  deleteSupermarket,
};
