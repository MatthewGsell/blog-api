const jwt = require("jsonwebtoken");
const { model } = require("mongoose");

function authorizeuser(req, res, next) {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, "notauthor");
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("token");
    res.json('badcookie');
  }
}

module.exports = authorizeuser;
