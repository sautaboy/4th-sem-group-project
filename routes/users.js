const mongoose = require('mongoose');

const plm = require("passport-local-mongoose");

mongoose.connect("mongodb+srv://sautaboy:sautaboy@cluster0.hbnbxtj.mongodb.net/sem4")

const userSchema = mongoose.Schema({
  username: String,
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