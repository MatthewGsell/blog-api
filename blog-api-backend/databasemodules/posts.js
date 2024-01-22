const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  message: { type: String, required: true },
  author: { type: String, required: true },
  comments: {
    comment: { type: String, required: true },
    author: { type: String, required: true },
  },
});

module.exports = mongoose.model("Post", postSchema);
