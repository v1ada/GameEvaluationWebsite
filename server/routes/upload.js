const express = require('express');
const multer = require('multer');
// 导入中间件
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

// 文件上传接口，multer会给request添加 file、files
router.post('/admin/api/upload/:imgType', authMiddleware, upload.single('file'), (req, res) => {
  const imgType = req.params.imgType;
  const file = req.file;
  // 本地链接
  // file.url = `http://localhost:3000/public/img/${imgType}/${file.filename}`;
  // 线上链接
  file.url = `http://game.v1ada.com/public/img/${imgType}/${file.filename}`;
  res.send(file);
});

// 保存修改完的文档
router.put('/:id', (req, res) => {
  req.Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
      console.log(`成功修改: ${result}`);
      res.send(result);
    })
    .catch((err) => {
      console.log(`修改失败：${err}`);
      res.send(err);
    });
});

module.exports = router;
