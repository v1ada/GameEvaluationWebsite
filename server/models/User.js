const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    select: false, // 默认不获取密码
    // 数据库保存数据前，进行的操作
    set(val) {
      // 哈希加密
      return require('bcrypt').hashSync(val, 10);
    },
  },
  nickname: { type: String },
  profile_photo: {
    type: String,
    // 默认头像
    default:
      'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
  },
  type: { type: Number, default: 0 }, // 0为普通用户，1为管理员
  isBan: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', schema);
