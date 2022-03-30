const express = require('express');
const cors = require('cors'); //解决跨域问题
const multer = require('multer');
const jwt = require('jsonwebtoken');

const User = require('./models/User');

//连接数据库
require('./plugins/db.js')();
//路由
const router = require('./routes/router.js');

let app = express();

app.use(cors()); // 跨域模块
app.use(express.json()); //识别json
app.use('/public', express.static(__dirname + '/public')); // 静态资源

// 导入中间件
const authMiddleware = require('./middleware/auth.js')();
const resourceMiddleware = require('./middleware/resource.js')();

//挂载通用路由
app.use(
  // 路由路径
  '/admin/api/rest/:resource',
  //中间件函数，先执行中间件再挂载路由
  resourceMiddleware,
  router
);

// 登录接口
app.set('secret', 'CB18130214');
app.post('/admin/api/:login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  // 校验用户名
  if (!user) {
    return res.status(422).send({
      message: '用户不存在',
    });
  }
  // 校验密码
  if (password !== user.password) {
    return res.status(422).send({
      message: '密码错误',
    });
  }
  // 登录管理后台时验证用户是否具有权限
  if (req.params.login === 'adminLogin') {
    if (!user.type) {
      return res.status(422).send({
        message: '没有权限',
      });
    }
  }
  // 返回token
  const token = jwt.sign({ id: user._id }, app.get('secret'));
  res.send(token);
});

// 文件上传
const articleCoverUpload = multer({ dest: __dirname + '/public/img/article_cover' }); // dest:上传的文件保存路径
const articlePictureUpload = multer({ dest: __dirname + '/public/img/article_picture' });
// let upload = multer();
// // 文件上传接口，multer会给request添加 file、files
// app.post(
//   '/admin/api/upload/:imgType',
//   authMiddleware,
//   (req, res, next) => {
//     console.log(`${__dirname}/public/img/${req.params.imgType}`);
//     upload = multer({ dest: `${__dirname}/public/img/${req.params.imgType}` });
//     log
//     next();
//   },
//   upload.single('file'),
//   (req, res) => {
//     console.log(req.file);
//     const imgType = req.params.imgType;
//     const file = req.file;
//     file.url = `http://localhost:3000/public/img/${imgType}/${file.originalname}`;
//     console.log(file);
//     res.send(file);
//   }
// );
app.post(
  '/admin/api/upload/article_cover',
  authMiddleware,
  articleCoverUpload.single('file'),
  (req, res) => {
    const file = req.file;
    file.url = `http://localhost:3000/public/img/article_cover/${file.filename}`;
    res.send(file);
  }
);

app.post(
  '/admin/api/upload/article_picture',
  authMiddleware,
  articlePictureUpload.single('file'),
  (req, res) => {
    const file = req.file;
    file.url = `http://localhost:3000/public/img/article_picture/${file.filename}`;
    res.send(file);
  }
);

app.listen(3000, () => {
  console.log('Running at http://localhost:3000');
});
