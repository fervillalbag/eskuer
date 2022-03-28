const Subsidiary = require("../models/subsidiary");

const getSubsidiaries = async (idSuper) => {
  try {
    if (idSuper) {
      const subsidiaries = await Subsidiary.find({ idSuper });
      if (!subsidiaries) throw new Error("Subsidiary not found!");
      return subsidiaries;
    }

    const subsidiaries = await Subsidiary.find({});
    if (!subsidiaries) throw new Error("Subsidiary not found!");
    return subsidiaries;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getSubsidiary = async (id) => {
  try {
    const subsidiary = await Subsidiary.findById(id);
    if (!subsidiary) throw new Error("Subsidiary not found!");
    return subsidiary;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createSubsidiary = async (input) => {
  try {
    const subsidiary = new Subsidiary({
      city: input.city,
      address: input.address,
      createdAt: new Date().toISOString(),
      idSuper: input.idSuper,
    });
    await subsidiary.save();

    return {
      message: "Subsidiary created!",
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Some error!",
      success: true,
    };
  }
};

const updateSubsidiary = async (input) => {
  try {
    await Subsidiary.findByIdAndUpdate(input.id, input);

    return {
      message: "Subsidiary updated!",
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Some error!",
      success: true,
    };
  }
};

const deleteSubsidiary = async (id) => {
  try {
    await Subsidiary.findByIdAndDelete(id);

    return {
      message: "Subsidiary deleted!",
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Some error!",
      success: true,
    };
  }
};

module.exports = {
  createSubsidiary,
  updateSubsidiary,
  deleteSubsidiary,
  getSubsidiaries,
  getSubsidiary,
};
