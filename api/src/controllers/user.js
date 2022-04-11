const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

const createToken = (user, SECRET_KEY_LOGIN, expiresIn) => {
  const { id, username, name, email } = user;
  const payload = { id, name, username, email };
  return jwt.sign(payload, SECRET_KEY_LOGIN, { expiresIn });
};

const getUsers = async () => {
  try {
    const users = await User.find({});
    if (!users) throw new Error("Users not found!");
    return users;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getUser = async (id) => {
  try {
    const user = await User.findOne({ _id: id });
    if (!user) throw new Error("User not found!");
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createUser = async (input) => {
  const newUser = input;
  newUser.email = newUser.email.toLowerCase();
  newUser.username = newUser.username.toLowerCase();

  const { email, username, password } = newUser;

  const foundEmail = await User.findOne({ email });
  if (foundEmail) throw new Error("Email already exists!");

  const foundUsername = await User.findOne({ username });
  if (foundUsername) throw new Error("Username already exists!");

  const salt = bcrypt.genSaltSync(10);
  newUser.password = await bcrypt.hash(password, salt);

  try {
    const user = new User(newUser);
    await user.save();

    return {
      message: "User created!",
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

const login = async (input) => {
  const { email, password } = input;
  const userFound = await User.findOne({
    email: email.toLowerCase(),
  });

  if (!userFound) throw new Error("User not found!");

  const passwordSuccess = await bcrypt.compare(
    password,
    userFound.password
  );

  if (!passwordSuccess)
    throw new Error("Email or passoword is incorrect!");

  return {
    token: createToken(
      userFound,
      process.env.SECRET_KEY_LOGIN,
      "72h"
    ),
  };
};

const updateUser = async (input) => {
  try {
    await User.findOneAndUpdate({ _id: input.id }, input);

    return {
      message: "User updated!",
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

const deleteUser = async (id) => {
  try {
    await User.findOneAndDelete({ _id: id });

    return {
      message: "User deleted!",
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
  getUser,
  createUser,
  updateUser,
  login,
  deleteUser,
  getUsers,
};
