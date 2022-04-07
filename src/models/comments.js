const { Schema, model } = require("mongoose");

const CommentsSchema = new Schema({
  name: String,
  message: String,
});

const Comments = model("Comments", CommentsSchema);

module.exports = { Comments };
