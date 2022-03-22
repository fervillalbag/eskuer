const { model, Schema } = require("mongoose");

const PriceSchema = new Schema({
  idProduct: {
    type: String,
    required: [true, "Product is required"],
    trim: true,
  },
  idSuper: {
    type: String,
    required: [true, "Supermarket is required"],
    trim: true,
  },
  value: {
    type: Number,
    required: [true, "Price is required"],
    trim: true,
  },
  type: {
    type: String,
    required: [true, "Type price is required"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = model("Price", PriceSchema);
