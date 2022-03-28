const { model, Schema } = require("mongoose");

const SubsidiarySchema = new Schema({
  idSuper: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  createdAt: {
    type: Date,
    required: [true, "Date is required"],
    trim: true,
  },
});

module.exports = model("Subsidiary", SubsidiarySchema);
