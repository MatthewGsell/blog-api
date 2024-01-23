const jwt = require("jsonwebtoken");
const { model } = require("mongoose");

function authorizeauthor(req, res, next) {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, "author");
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("token");
    res.json("not authorized must sign in");
  }
}

module.exports = authorizeauthor;
