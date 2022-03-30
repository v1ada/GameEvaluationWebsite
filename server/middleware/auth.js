module.exports = (options) => async (req, res, next) => {
  const jwt = require('jsonwebtoken');
  const User = require('../models/User');

  // 校验用户是否登录
  const token = String(req.headers.authorization || '').split(' ')[1];
  if (!token) {
    return res.status(401).send({
      message: '请先登录',
    });
  }
  const { id } = jwt.verify(token, req.app.get('secret'));
  if (!id) {
    return res.status(401).send({
      message: '无效的token',
    });
  }
  // 校验用户是否存在
  req.user = await User.findById(id);
  if (!req.user) {
    return res.status(401).send({
      message: '请先登录',
    });
  }
  await next();
};
