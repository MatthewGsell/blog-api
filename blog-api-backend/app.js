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
const Draft = require("../blog-api-backend/databasemodules/drafts");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const authorizeuser = require("../blog-api-backend/authorizeuser");
const authorizeauthor = require("../blog-api-backend/authorizeauthor");
const Crypto = require("crypto");

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "http://localhost:4000"],
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(
  "mongodb+srv://testuser:5gftthXvh5Wetv2z@cluster0.ncnydoa.mongodb.net/blog-api?retryWrites=true&w=majority"
);

app.get(
  "/posts",
  authorizeuser,
  asyncHandler(async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
  })
);

app.get(
  "/comments/:id",
  authorizeuser,
  asyncHandler(async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id });
    const comments = await post.comments;
    if (comments) {
      res.json({ comments: comments, user: req.user.username });
    }
  })
);

app.post(
  "/comments/:id",
  authorizeuser,
  asyncHandler(async (req, res) => {
    await Post.findByIdAndUpdate(req.params.id, {
      $push: {
        comments: {
          id: Crypto.randomUUID(),
          comment: req.body.comment,
          user: req.user.username,
        },
      },
    });

    res.json(200);
  })
);

app.delete(
  "/comments/:id",
  authorizeuser,
  asyncHandler(async (req, res) => {
    await Post.findByIdAndUpdate(req.params.id, {
      $pull: {
        comments: {
          id: req.body.item,
        },
      },
    });
    res.json(200);
  })
);

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

      res.redirect("http://localhost:3000/login");
    }
  })
);

app.post(
  "/signupauthor",
  asyncHandler(async (req, res) => {
    const isduplicate = await User.findOne({ username: req.body.username });
    if (isduplicate == null) {
      const user = new User({
        username: req.body.username,
        password: req.body.password,
        author: true,
      });
      await user.save();

      res.redirect("http://localhost:4000/login");
    }
  })
);

app.post(
  "/login",
  asyncHandler(async (req, res) => {
    console.log("ncjkldnwcjfd");
    let secret = "notauthor";
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    console.log(user);
    if (user != null) {
      console.log("GIVE TOKE");
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

app.post(
  "/loginauthor",
  asyncHandler(async (req, res) => {
    let secret = "author";

    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
      author: true,
    });
    if (user != null) {
      const token = jwt.sign(user.toObject(), secret, { expiresIn: "1h" });
      res.cookie("token", token, {
        httpOnly: true,
      });
      res.redirect("http://localhost:4000/createpost");
    } else {
      res.json("user or pass incorrect");
    }
  })
);

app.post(
  "/createpost",
  authorizeauthor,
  asyncHandler(async (req, res) => {
    const post = new Post({
      message: req.body.post,
      author: req.user.username,
      comments: [],
    });
    await post.save();
    res.json(200);
  })
);

app.post(
  "/createdraft",
  authorizeauthor,
  asyncHandler(async (req, res) => {
    const draft = new Draft({
      message: req.body.post,
      author: req.user.username,
      comments: [],
    });
    await draft.save();
    res.json(200);
  })
);

app.get(
  "/authorsposts",
  authorizeauthor,
  asyncHandler(async (req, res) => {
    const posts = await Post.find({ author: req.user.username });
    res.json(posts);
  })
);

app.delete(
  "/authorsposts",
  authorizeauthor,
  asyncHandler(async (req, res) => {
    await Post.findOneAndDelete({ _id: req.body.id });
    res.json(200);
  })
);

app.get(
  "/authorsdrafts",
  authorizeauthor,
  asyncHandler(async (req, res) => {
    const posts = await Draft.find({ author: req.user.username });
    res.json(posts);
  })
);

app.delete(
  "/authorsdrafts",
  authorizeauthor,
  asyncHandler(async (req, res) => {
    await Draft.findOneAndDelete({ _id: req.body.id });
    res.json(200);
  })
);

app.post(
  "/publishdraft",
  authorizeauthor,
  asyncHandler(async (req, res) => {
    const draft = await Draft.findOne({ _id: req.body.id });
    const post = new Post({
      message: draft.message,
      author: draft.author,
      comments: [],
    });
    await post.save();
    await Draft.findOneAndDelete({ _id: req.body.id });

    res.json(200);
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
