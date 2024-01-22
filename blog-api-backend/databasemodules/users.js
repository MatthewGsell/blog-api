const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  author: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model("User", userSchema);
