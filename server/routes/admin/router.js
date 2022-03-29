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

// 条件查询文档
router.get('/', async (req, res) => {
  console.log(req.Model);
  console.log(req.query);
  // 排序条件对象
  let sortObj = {};
  // 添加排序条件
  switch (req.query.sort) {
    case 'dateDesc':
      sortObj.game_date = -1;
      break;
    case 'dateAsc':
      sortObj.game_date = 1;
      break;
    case 'pubTimeDesc':
      sortObj._id = -1;
      break;
    default:
      sortObj.game_date = -1;
      break;
  }
  // 条件查询对象
  let queryObj = {};
  // 添加游戏平台条件
  if (req.query.platform) {
    const queryPlatform = req.query.platform.split(',');
    queryObj.platform = { $elemMatch: { $in: queryPlatform } };
  }
  // 添加游戏类型条件
  if (req.query.type) {
    const queryType = req.query.type.split(',');
    queryObj.game_type = { $elemMatch: { $in: queryType } };
  }
  // 查询结果数目
  req.Model.count(queryObj, async (err, count) => {
    // 分页查询
    try {
      const document = await req.Model.find(queryObj) // 条件查询
        .sort(sortObj) // 排序
        .skip(10 * (req.query.page - 1)) // 跳过10项字段，即到下一页
        .limit(10); // 一页的字段数目
      // console.log(document);
      // 发送JSON
      res.json({
        result: document,
        total: count,
      });
    } catch (err) {
      console.log(`查询失败：${err}`);
    }
  });
});
// 添加文档
router.post('/add', (req, res) => {
  if (!req.Model.modelName === 'User') req.body.publishTime = new Date().toLocaleDateString();
  req.Model.create(req.body)
    .then((result) => {
      console.log(`成功添加: ${result}`);
      res.send(result);
    })
    .catch((err) => console.log(`添加失败：${err}`));
});
// 获取评价测试
router.get('/eva', (req, res) => {
  // gameInfoModel = require('@/models/GameInfo');
  // let GameInfoModel = require('../..//models/GameInfo');
  req.Model.find()
    .populate('parent_game')
    .then((result) => {
      console.log(`成功查询: ${result}`);
      res.send(result);
    })
    .catch((err) => console.log(`查询失败：${err}`));
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
  console.log(req.body);
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
