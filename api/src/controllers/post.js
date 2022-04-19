const Post = require("../models/post");
const LikePost = require("../models/likePost");
const CommentPost = require("../models/commentPost");

const getPosts = async () => {
  try {
    const posts = await Post.find({});

    if (!posts) {
      return {
        message: "Post not found",
        success: false,
      };
    }

    return posts;
  } catch (error) {
    console.log(error);

    return {
      message: "Error!",
      success: false,
    };
  }
};

const getPost = async (id) => {
  try {
    const post = await Post.findById(id);
    if (!post) {
      return {
        message: "Post not found",
        success: false,
      };
    }

    return post;
  } catch (error) {
    console.log(error);

    return {
      message: "Error!",
      success: false,
    };
  }
};

const createPost = async (input) => {
  try {
    const post = new Post(input);
    await post.save();

    return {
      message: "Post created successfully",
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Error!",
      success: false,
    };
  }
};

const updatePost = async (input) => {
  try {
    await Post.findByIdAndUpdate(input.id, input);

    return {
      message: "Post updated successfully",
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Error!",
      success: false,
    };
  }
};

const deletePost = async (id) => {
  try {
    await LikePost.find({}).deleteMany({ idPost: id });
    await CommentPost.find({}).deleteMany({ idPost: id });
    await Post.findByIdAndDelete(id);

    return {
      message: "Post deleted successfully",
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Error!",
      success: false,
    };
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getPost,
};
