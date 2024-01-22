const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  message: { type: String, required: true },
  author: { type: String, required: true },
  comments: {type: Array, required: true}
});

module.exports = mongoose.model("Post", postSchema);
