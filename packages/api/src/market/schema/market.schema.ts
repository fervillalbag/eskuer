import { Schema } from 'mongoose';

export const MarketSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  branch_office: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    default: null,
  },
  longitude: {
    type: Number,
    default: null,
  },
  phone: {
    type: String,
    default: null,
  },
  idUser: {
    type: String,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});
