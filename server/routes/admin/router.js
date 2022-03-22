const express = require('express');
const fs = require('fs');
const path = require('path');

// 根目录
const rootDir = path.join(__dirname + '../../../');

// 删除文件函数
function delFile(imgPath, dirName) {
  const imgName = path.basename(imgPath);
  fs.unlink(`${rootDir}public/img/${dirName}/${imgName}`, (err) => {
    if (err) throw err;
    console.log(`删除文件成功：${imgName}`);
  });
}

const router = express.Router({
  mergeParams: true,
});

// 获取所有文档
router.get('/', async (req, res) => {
  try {
    console.log(req.Model);
    const document = await req.Model.find();
    console.log(`查询成功：${document}`);
    res.send(document);
  } catch (err) {
    console.log(`查询失败：${err}`);
  }
});
// 添加文档
router.post('/', (req, res) => {
  req.body.publishTime = new Date().toLocaleDateString();
  req.Model.create(req.body)
    .then((result) => {
      console.log(`成功添加: ${result}`);
      res.send(result);
    })
    .catch((err) => console.log(`添加失败：${err}`));
});
// 获取对应ID的文档
router.get('/:id', (req, res) => {
  req.Model.findById(req.params.id)
    .then((result) => {
      console.log(`成功查询: ${result}`);
      res.send(result);
    })
    .catch((err) => console.log(`查询失败：${err}`));
});
// // 获取对应游戏名的文档
// router.get('/game', (req, res) => {
//   req.Model.findOne(req.params.game_name)
//     .then((result) => {
//       console.log(`成功查询: ${result}`);
//       res.send(result);
//     })
//     .catch((err) => console.log(`查询失败：${err}`));
// });
// // 获取对应游戏平台和类型的文档
// router.get('/game', (req, res) => {
//   req.Model.find({ platform: req.params.platform, type: req.params.type })
//     .then((result) => {
//       console.log(`成功查询: ${result}`);
//       res.send(result);
//     })
//     .catch((err) => console.log(`查询失败：${err}`));
// });
// 保存修改完的文档
router.put('/:id', (req, res) => {
  req.body.publishTime = new Date().toLocaleDateString();
  req.Model.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      console.log(`成功修改: ${result}`);
      res.send(result);
    })
    .catch((err) => console.log(`修改失败：${err}`));
});
// 删除文档
router.delete('/delete/:id', async (req, res) => {
  try {
    const document = await req.Model.findById(req.params.id);
    if (document.cover) {
      // 删除封面文件
      delFile(document.cover, 'article_cover');
    }
    if (document.pictureList) {
      // 删除图片文件
      document.pictureList.forEach((element) => {
        delFile(element.url, 'article_picture');
      });
    }
    // 数据库删除文档
    const result = await req.Model.findByIdAndDelete(document._id);
    console.log(`删除文档成功：${result}`);
  } catch (err) {
    console.log(`删除错误：${err}`);
  }
  res.send({ status: true });
});
// 删除图片
router.put('/picture/delete/', async (req, res) => {
  try {
    const result = await req.Model.updateOne(
      { _id: req.body.articleId },
      { $pull: { pictureList: { _id: req.body.fileId } } }
    );
    // 判断修改数量 > 0
    if (result.modifiedCount) {
      // 删除图片文件
      delFile(req.body.fileUrl, 'article_picture');
    }
    const article = await req.Model.findById(req.body.articleId);
    console.log(`删除后：${article}`);
  } catch (err) {
    console.log(`删除错误：${err}`);
  }
});

module.exports = router;
