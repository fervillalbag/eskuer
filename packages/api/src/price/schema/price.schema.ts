import { Schema } from 'mongoose';

export const PriceSchema = new Schema({
  idProduct: {
    type: String,
    ref: 'Product',
    required: true,
  },
  idMarket: {
    type: String,
    ref: 'Market',
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});
