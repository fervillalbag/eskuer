const CommentPost = require("../models/commentPost");

const getCommentPosts = async () => {
  try {
    const commentPosts = await CommentPost.find();

    if (!commentPosts) {
      throw new Error("CommentPost not found");
    }

    return commentPosts;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const getCommentPostsUser = async (idUser) => {
  try {
    const commentPosts = await CommentPost.find({ idUser });

    if (!commentPosts) {
      throw new Error("CommentPost not found");
    }

    return commentPosts;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const getCommentPostsOnPost = async (idPost) => {
  try {
    const commentPosts = await CommentPost.find({ idPost });

    if (!commentPosts) {
      throw new Error("CommentPost not found");
    }

    return commentPosts;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const getCommentPost = async (id) => {
  try {
    const commentPost = await CommentPost.findById(id);

    if (!commentPost) {
      throw new Error("CommentPost not found");
    }

    return commentPost;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const createCommentPost = async (input) => {
  try {
    const newCommentPost = new CommentPost(input);
    await newCommentPost.save();

    return {
      message: "Comment created successfully",
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Error creating comment",
      success: false,
    };
  }
};

const updateCommentPost = async (input) => {
  try {
    await CommentPost.findOneAndUpdate({ _id: input.id }, input);

    return {
      message: "Comment updated successfully",
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Error updating comment",
      success: false,
    };
  }
};

const deleteCommentPost = async (id) => {
  try {
    await CommentPost.findOneAndDelete({ _id: id });

    return {
      message: "Comment deleted successfully",
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Error deleting comment",
      success: false,
    };
  }
};

module.exports = {
  getCommentPosts,
  getCommentPostsUser,
  getCommentPostsOnPost,
  getCommentPost,

  createCommentPost,
  updateCommentPost,
  deleteCommentPost,
};
