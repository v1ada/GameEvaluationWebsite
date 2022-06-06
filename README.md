### 使用说明
#### 数据库恢复
 在 `mongoDump/` 文件夹中 存放着mongoDB数据库备份
- 使用：`mongorestore`
   - 在当前路径中 寻找 `dump` 备份文件进行数据恢复

---

#### 安装 npm 包
分别 `admin/`，`server/`，`web/` 目录下运行
- `npm i`

---

#### 运行项目
同时分别在 `admin/`，`server/`，`web/` 目录下运行
- `npm run serve`
##### webpack 打包后
webpack打包完成的项目存放在 `server/` 目录中
- 使用 `npm run serve` 在 `localhost:3000` 访问

