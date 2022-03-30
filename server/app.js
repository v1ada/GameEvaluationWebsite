const express = require('express');
const cors = require('cors'); //解决跨域问题
const inflection = require('inflection'); // 处理单词大小写首字母的转换，单数复数的转换
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

//挂载通用路由
app.use(
  // 路由路径
  '/admin/api/rest/:resource',
  //中间件函数，先执行这个再挂载路由
  async (req, res, next) => {
    // 校验用户是否登录
    const token = String(req.headers.authorization || '').split(' ')[1];
    if (!token) {
      return res.status(401).send({
        message: '请先登录',
      });
    }
    const { id } = jwt.verify(token, app.get('secret'));
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
  },
  // 设置模型
  (req, res, next) => {
    // 转换成首字母大写单数的单词
    const modelName = inflection.classify(req.params.resource);
    // 获取相应的模型
    req.Model = require(`./models/${modelName}`);
    next();
  },
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
// 文件上传接口，multer会给request添加 file、files
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
