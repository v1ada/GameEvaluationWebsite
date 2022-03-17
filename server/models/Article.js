const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String },
  cover: { type: String },
  content: { type: String },
  pictureList: [{ url: String }],
});

module.exports = mongoose.model('Article', articleSchema);
