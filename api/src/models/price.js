const { model, Schema } = require("mongoose");
const dayjs = require("dayjs");

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
  createdAt: {
    type: Date,
    required: [true, "Date is required"],
    default: Date.now(),
    trim: true,
  },
});

module.exports = model("Price", PriceSchema);
