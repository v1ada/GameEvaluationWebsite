const express = require('express');
const fs = require('fs');
const path = require('path');

// 删除文件函数
function delFile(imgPath, dirName) {
  // 图片名
  const imgName = path.basename(imgPath);
  // 根目录
  const rootDir = path.join(__dirname + '/../');
  // 删除操作
  fs.rm(`${rootDir}public/img/${dirName}/${imgName}`, { force: true }, (err) => {
    if (err) throw err;
    console.log(`删除文件成功：${imgName}`);
  });
}

const router = express.Router({
  mergeParams: true,
});

// 条件查询文档
router.get('/', async (req, res) => {
  console.log('请求参数：', req.query);
  // 排序条件对象
  let sortObj = {};
  // 添加排序条件
  switch (req.query.sort) {
    // 发行日期降序
    case 'dateDesc':
      sortObj.game_date = -1;
      break;
    // 发行日期升序
    case 'dateAsc':
      sortObj.game_date = 1;
      break;
    // 评分降序
    case 'scoreDesc':
      sortObj.game_score = -1;
      sortObj.game_date = -1; // 相同评分的根据发行日期排序
      break;
    // 评分降序
    case 'scoreAsc':
      sortObj.game_score = 1;
      sortObj.game_date = -1;
      break;
    // 文章发布日期降序
    case 'pubTimeDesc':
      sortObj.publishTime = -1;
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
      // 发送JSON
      console.log('结果：', document);
      res.json({
        result: document,
        total: count,
      });
    } catch (err) {
      console.log(`查询失败：${err}`);
      res.send(err);
    }
  });
});

// 添加文档
router.post('/add', (req, res) => {
  if (req.Model.modelName !== 'User') req.body.publishTime = new Date().toLocaleString();
  req.Model.create(req.body)
    .then((result) => {
      console.log(`成功添加: ${result}`);
      res.send(result);
    })
    .catch((err) => {
      console.log(`添加失败：${err}`);
      res.send(err);
    });
});

// 模糊查询搜索
router.get('/search', (req, res) => {
  const keyWord = req.query.search;
  // 正则表达式，模糊查询
  const reg = new RegExp(keyWord, 'i');
  // 判断哪个模型进行查询
  queryArr = [];
  switch (req.Model.modelName) {
    case 'User':
      queryArr = [{ username: { $regex: reg } }, { nickname: { $regex: reg } }];
      break;
    case 'GameInfo':
      queryArr = [{ game_name: { $regex: reg } }, { origin_name: { $regex: reg } }];
      break;
    default:
      break;
  }
  req.Model.find({
    $or: queryArr,
  })
    .then((result) => {
      console.log(`成功查询结果数量: ${result.length}`);
      res.json({
        result: result,
        total: result.length,
      });
    })
    .catch((err) => {
      console.log(`查询失败：${err}`);
      res.send(err);
    });
});

// 获取对应ID的文档
router.get('/details/:id', (req, res) => {
  req.Model.findById(req.params.id)
    .then((result) => {
      console.log(`成功查询: ${result}`);
      res.send(result);
    })
    .catch((err) => {
      console.log(`查询失败：${err}`);
      res.send(err);
    });
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

// 获取评价
router.get('/eva', (req, res) => {
  console.log(req.query);
  gameQueryObj = {};
  if (req.query.id) gameQueryObj.parent_game = req.query.id;
  req.Model.find(gameQueryObj)
    // 关联查询
    .populate([
      { path: 'parent_game', select: ['game_logo', 'game_name'] },
      { path: 'author', select: ['nickname', 'profile_photo'] },
    ])
    .sort({ _id: -1 })
    .limit(8)
    .then((result) => {
      console.log(`成功查询: ${result}`);
      res.send(result);
    })
    .catch((err) => {
      console.log(`查询失败：${err}`);
      res.send(err);
    });
});

// 删除文档
router.delete('/delete/:id', async (req, res) => {
  try {
    const document = await req.Model.findById(req.params.id);
    if (document.cover) {
      // 删除封面文件
      delFile(document.cover, 'article_cover');
    }
    if (document.profile_photo) {
      // 删除头像文件
      delFile(document.profile_photo, 'profile_photo');
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
    console.log(`删除文档错误：${err}`);
    res.send(err);
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
    console.log(`删除图片错误：${err}`);
    res.send(err);
  }
});

module.exports = router;
