const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  nickname: { type: String },
  profile_photo: {
    type: String,
    default:
      'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
  },
  type: { type: Number, default: 0 }, // 0为普通用户，1为管理员
  isBan: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', schema);
