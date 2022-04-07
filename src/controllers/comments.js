const { response } = require("express");
const { Comments } = require("../models/comments");

const showComments = async (req, res = response) => {
  const comments = await Comments.find().select("name message");
  !comments.length
    ? res.status(200).json({ state: true, message: "Without comments" })
    : res.send({ status: true, data: comments });
};

const createComment = async (req, res = response, next) => {
  const { name, message } = req.body;

  const newComment = new Comments({
    name,
    message,
  });

  const commentName = await Comments.findOne({ name });
  if (commentName) {
    res.status(401);
    res.send({
      status: false,
      msg: "There is already a comment with this name",
    });
  }
  if (!name || !message) {
    return res
      .status(400)
      .json({ status: false, message: "Please, complete all fields" });
  }

  try {
    await newComment.save();
    res.status(200);
    res.send({ status: true, comment: newComment });
  } catch (e) {
    /* handle error */
    next(e);
  }
};

module.exports = {
  showComments,
  createComment,
};
