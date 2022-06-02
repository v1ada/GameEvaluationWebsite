// 校验用户登录状态，中间件
module.exports = (options) => async (req, res, next) => {
  const jwt = require('jsonwebtoken');
  const User = require('../models/User');
  try {
    // 校验用户是否登录，token是否存在
    const token = String(req.headers.authorization || '').split(' ')[1];
    if (!token) throw 'token 不存在';
    // 校验token是否正确
    const { id } = jwt.verify(token, req.app.get('secret'));
    // 校验用户是否存在
    req.user = await User.findById(id);
  } catch (err) {
    console.log('token 错误或用户不存在：', err);
    return res.status(401).send({
      message: '用户凭证已过期，请重新登录',
    });
  }
  await next();
};
