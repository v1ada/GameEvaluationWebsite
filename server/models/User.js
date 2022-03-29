const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  nickname: { type: String },
  profile_photo: { type: String },
  type: { type: Number }, // 0为普通用户，1为管理员
  isBan: { type: Boolean },
});

module.exports = mongoose.model('User', schema);
