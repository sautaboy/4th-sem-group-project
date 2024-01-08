const mongoose = require('mongoose');

const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost:27017/sem-four-database")

const userSchema = mongoose.Schema({
  username: { type: String, unique: true },
  name: String,
  password: String,
  image: String,
  email: String,
  bio: String,
  profileImg: String,
  bookmarks: [{
    title: String, // Title of the bookmarked subject
    url: String,   // URL of the bookmarked subject
  }],
})

userSchema.plugin(plm);

module.exports = mongoose.model('User', userSchema);