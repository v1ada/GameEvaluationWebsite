const express = require('express');
const multer = require('multer');
// 导入登录验证中间件
const authMiddleware = require('../middleware/auth.js')();

const router = express.Router({
  mergeParams: true,
});

// 文件上传
// diskStorage: 磁盘存储引擎可以让你控制文件的存储。
let storage = multer.diskStorage({
  // destination: 存储路径，可以使用request对象和文件对象
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/..//public/img/${req.params.imgType}`);
  },
});
let upload = multer({ storage: storage });

// 文件上传接口，multer会给request添加 file、files  （经过登录验证中间件才可以上传）
router.post('/gameweb/api/upload/:imgType', authMiddleware, upload.single('file'), (req, res) => {
  const imgType = req.params.imgType;
  const file = req.file;
  // 根据 host 存储文件路径
  file.url = `http://${req.headers.host}/gameweb/public/img/${imgType}/${file.filename}`;
  // 本地链接
  // file.url = `http://localhost:3000/public/img/${imgType}/${file.filename}`;
  // 线上链接
  // file.url = `http://game.v1ada.com/public/img/${imgType}/${file.filename}`;
  res.send(file);
});

module.exports = router;
