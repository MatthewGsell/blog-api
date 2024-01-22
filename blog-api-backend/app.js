var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var app = express();
const cookieparser = require("cookie-parser");
const cors = require("cors");
const asyncHandler = require("express-async-handler");
const User = require("../blog-api-backend/databasemodules/users");
const Post = require("../blog-api-backend/databasemodules/posts");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const authorizeuser = require("../blog-api-backend/authorizeuser");

app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(
  "mongodb+srv://testuser:5gftthXvh5Wetv2z@cluster0.ncnydoa.mongodb.net/blog-api?retryWrites=true&w=majority"
);

app.get("/posts", authorizeuser,asyncHandler(async (req, res) => {
  const posts = await Post.find()
  res.json(posts);
}) );

app.get('/comments/:id', authorizeuser, asyncHandler(async (req, res) => {
  const post = await Post.findOne({_id: req.params.id})
  const comments = await post.comments
  if (comments) {
    res.json(comments)
  }
}))

app.post('/comments/:id', authorizeuser, asyncHandler(async (req, res) => {
const commentobject = {
  comment: req.user.username,
  user: req.user.username
}

console.log(commentobject)
  await Post.findByIdAndUpdate(req.params.id, {$push: {comments: {comment: req.body.comment, user: req.user.username}}} ,)


  
  res.json(200)
}))



app.post(
  "/signup",
  asyncHandler(async (req, res) => {
    const isduplicate = await User.findOne({ username: req.body.username });
    if (isduplicate == null) {
      const user = new User({
        username: req.body.username,
        password: req.body.password,
      });
      await user.save();
      if (req.body.author == null) {
        res.redirect("http://localhost:5173/login");
      }
    } else {
      res.json(500);
    }
  })
);

app.post(
  "/login",
  asyncHandler(async (req, res) => {
    console.log("ncjkldnwcjfd");
    let secret = "notauthor";
    if (req.body.author) {
      secret = "author";
    }
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    console.log(user);
    if (user != null) {
      console.log('GIVE TOKE')
      const token = jwt.sign(user.toObject(), secret, { expiresIn: "1h" });
      res.cookie("token", token, {
        httpOnly: true,
      });
      res.redirect("http://localhost:5173/posts");
    } else {
      res.json("user or pass incorrect");
    }
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
