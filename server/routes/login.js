const express = require('express');
// 导入中间件
const authMiddleware = require('../middleware/auth.js')();

const router = express.Router({
  mergeParams: true,
});

// 登录接口
router.post('/gameweb/api/:login', async (req, res) => {
  console.log('登录接口');
  const { username, password } = req.body;
  const User = require('../models/User');
  // 查找用户
  const user = await User.findOne({ username }).select('+password'); // 更改select获取密码
  // 校验用户名
  if (!user) {
    return res.status(422).send({
      message: '用户不存在',
    });
  }
  // 校验密码, 对照用户输入明文，和数据库密文
  const result = require('bcrypt').compareSync(password, user.password);
  if (!result) {
    return res.status(422).send({
      message: '密码错误',
    });
  }
  // 登录管理后台时验证用户是否具有权限
  if (req.params.login === 'adminLogin') {
    if (!user.type) {
      return res.status(422).send({
        message: '没有权限',
      });
    }
  }
  // 返回token
  const jwt = require('jsonwebtoken');
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    req.app.get('secret'), // 设置密钥
    {
      expiresIn: 24 * 60 * 60, // 设置过期时间 单位：秒
    }
  );
  res.send(token);
});

// 中间件检查登录信息，返回登录的用户信息
router.get('/gameweb/api/checkLogin', authMiddleware, (req, res) => {
  console.log('用户登录：', req.user);
  res.send(req.user);
});

module.exports = router;
