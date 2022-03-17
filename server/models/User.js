const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  nickname: { type: String },
  profile_photo: { type: String },
  isAdmin: { type: Boolean },
  isBan: { type: Boolean },
});

module.exports = mongoose.model('Article', userSchema);
