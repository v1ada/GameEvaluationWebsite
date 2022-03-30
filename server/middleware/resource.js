module.exports = (options) => (req, res, next) => {
  const inflection = require('inflection'); // 处理单词大小写首字母的转换，单数复数的转换
  // 转换成首字母大写单数的单词
  const modelName = inflection.classify(req.params.resource);
  // 获取相应的模型
  req.Model = require(`../models/${modelName}`);
  next();
};
