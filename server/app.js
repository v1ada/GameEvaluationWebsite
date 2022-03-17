const express = require('express');
const cors = require('cors');
const inflection = require('inflection');
const multer = require('multer');
const jwt = require('jsonwebtoken');

//连接数据库
require('./plugins/db.js')();
//路由
const router = require('./routes/admin/router.js');

let app = express();

app.use(cors()); // 跨域模块
app.use(express.json()); //识别json
app.use('/public', express.static(__dirname + '/public'));

//挂载通用路由
app.use(
  '/admin/api/rest/:resource',
  (req, res, next) => {
    //中间件函数，先执行这个再挂载路由
    const modelName = inflection.classify(req.params.resource);
    req.Model = require(`./models/${modelName}`);
    next();
  },
  router
);

app.set('secret', '2dj12h3hu4234');

app.post('/admin/api/login', async (req, res) => {
  // res.send('ok');
  const { username, password } = req.body;
  const AdminUser = require('./models/AdminUser');
  const user = await AdminUser.findOne({ username });
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
  // 返回token
  const token = jwt.sign({ id: user._id }, app.get('secret'));
  res.send(token);
});

const articleCoverUpload = multer({ dest: __dirname + '/public/img/article_cover' });
app.post('/admin/api/upload/article_cover', articleCoverUpload.single('file'), (req, res) => {
  const file = req.file;
  file.url = `http://localhost:3000/public/img/article_cover/${file.filename}`;
  res.send(file);
});

const articlePictureUpload = multer({ dest: __dirname + '/public/img/article_picture' });
app.post('/admin/api/upload/article_picture', articlePictureUpload.single('file'), (req, res) => {
  const file = req.file;
  file.url = `http://localhost:3000/public/img/article_picture/${file.filename}`;
  res.send(file);
});

app.listen(3000, () => {
  console.log('Running at http://localhost:3000');
});
