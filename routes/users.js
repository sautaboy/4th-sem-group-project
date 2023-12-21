const mongoose = require('mongoose');

const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/fourthsemproject")

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  password: String,
  image: String,
  email: String,
  bio: String,
  profileImg: String,
})

userSchema.plugin(plm);

module.exports = mongoose.model('User', userSchema);