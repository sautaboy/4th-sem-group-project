const mongoose = require('mongoose');

const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost:27017/semfour")

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  password: String,
  image: String,
  email: String,
  bio: String,
  feedback: [{
    comment: String
  }],
  profileImg: String,
  bookmarks: [{
    title: String, // Title of the bookmarked subject
    url: String,   // URL of the bookmarked subject
  }],
})

userSchema.plugin(plm);

module.exports = mongoose.model('user', userSchema);