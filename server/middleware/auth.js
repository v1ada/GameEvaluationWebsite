module.exports = (options) => async (req, res, next) => {
  const jwt = require('jsonwebtoken');
  const User = require('../models/User');

  // 校验用户是否登录
  const token = String(req.headers.authorization || '').split(' ')[1];
  if (!token) {
    return res.status(401).send({
      message: '请重新登录',
    });
  }

  try {
    // 校验token是否正确
    const { id } = jwt.verify(token, req.app.get('secret'));
    // 校验用户是否存在
    req.user = await User.findById(id);
    if (!req.user) throw new Error('用户不存在');
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      message: '请重新登录',
    });
  }

  await next();
};
