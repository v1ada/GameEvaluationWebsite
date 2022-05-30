const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
// 导入中间件
const authMiddleware = require('../middleware/auth.js')();

// 删除文件函数
function delFile(imgPath, dirName) {
  // 图片名
  const imgName = path.basename(imgPath);
  // 根目录
  const rootDir = path.join(__dirname + '/../');
  // 删除操作
  fs.unlink(`${rootDir}public/img/${dirName}/${imgName}`, (err) => {
    if (err) throw err;
    console.log(`删除文件成功：${imgName}`);
  });
}

const router = express.Router({
  mergeParams: true,
});

// // 登录接口
// router.post('/adminLogin', async (req, res) => {
//   console.log('登录接口');
//   const { username, password } = req.body;
//   // 查找用户
//   const User = require('./models/User');
//   const user = await User.findOne({ username }).select('+password'); // 更改select获取密码
//   // 校验用户名
//   if (!user) {
//     return res.status(422).send({
//       message: '用户不存在',
//     });
//   }
//   // 校验密码, 对照用户输入明文，和数据库密文
//   const result = require('bcrypt').compareSync(password, user.password);
//   if (result) {
//     return res.status(422).send({
//       message: '密码错误',
//     });
//   }
//   // 登录管理后台时验证用户是否具有权限
//   if (req.params.login === 'adminLogin') {
//     if (!user.type) {
//       return res.status(422).send({
//         message: '没有权限',
//       });
//     }
//   }
//   // 返回token
//   const jwt = require('jsonwebtoken');
//   const token = jwt.sign({ id: user._id, username: user.username }, app.get('secret'));
//   res.send(token);
// });

// // 中间件检查登录信息，返回登录的用户信息
// router.get('/checkLogin', authMiddleware, (req, res) => {
//   console.log('用户登录：', req.user);
//   res.send(req.user);
// });

// 条件查询文档
router.get('/', async (req, res) => {
  console.log('请求参数：', req.query);
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
    case 'scoreDesc':
      sortObj.game_score = -1;
      break;
    case 'scoreAsc':
      sortObj.game_score = 1;
      break;
    case 'pubTimeDesc':
      sortObj.publishTime = -1;
      break;
    default:
      sortObj.game_score = -1;
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

// 文件上传
// diskStorage: 磁盘存储引擎可以让你控制文件的存储。
let storage = multer.diskStorage({
  // destination: 存储路径，可以使用request对象和文件对象
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/public/img/${req.params.imgType}`);
  },
});
let upload = multer({ storage: storage });

// 文件上传接口，multer会给request添加 file、files
router.post('/admin/api/upload/:imgType', authMiddleware, upload.single('file'), (req, res) => {
  const imgType = req.params.imgType;
  const file = req.file;
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
