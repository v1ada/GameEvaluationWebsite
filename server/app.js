const express = require('express');
const cors = require('cors'); //解决跨域问题

//连接数据库
require('./plugins/db.js')();
//路由
const router = require('./routes/router.js');
const login = require('./routes/login');
const upload = require('./routes/upload');

let app = express();

app.use(cors()); // 跨域模块
app.use(express.json()); //识别json

// 设置前端页面 为静态资源
app.use('/gameweb/admin', express.static(__dirname + '/admin'));
app.use('/gameweb', express.static(__dirname + '/web'));

app.use('/gameweb/public', express.static(__dirname + '/public')); // 上传图片静态资源

// 导入中间件
const resourceMiddleware = require('./middleware/resource.js')();

// jwt 密钥
app.set('secret', 'CB18130214');

//挂载通用路由
app.use(
  // 路由路径
  '/gameweb/api/rest/:resource',
  //中间件函数，先执行中间件再挂载路由
  resourceMiddleware,
  router
);
// 挂载路由
app.use(login);
app.use(upload);

app.listen(3000, () => {
  console.log('Running at http://localhost:3000');
});
