1. 在 dbJson/ 文件夹中 导入数据库数据
   `mongoimport -d <数据库名> -c <集合名> --jsonArray <JSON文件路径>`
   - 文件名就是集合名称
2. 分别 admin/，server/，web/ 目录下装包
   `npm i`
3. 分别在 admin/，server/，web/ 目录下运行
   `npm run serve`
