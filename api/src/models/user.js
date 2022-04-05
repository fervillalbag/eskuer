const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
  },
  role: {
    type: String,
    default: "USER",
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
  },
  avatar: {
    type: String || null,
    trim: true,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("User", UserSchema);
