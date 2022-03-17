module.exports = () => {
  const mongoose = require('mongoose');

  mongoose
    .connect('mongodb://localhost/demo')
    .then(() => console.log('mongoDB连接成功'))
    .catch((err) => console.log('mongoDB连接失败\n' + err));
};
