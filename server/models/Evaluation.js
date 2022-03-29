const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  parent_game: { type: mongoose.Schema.Types.ObjectId, ref: 'GameInfo' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'GameInfo' },
  content: { type: String },
  score: { type: String },
  publishTime: { type: String },
});

module.exports = mongoose.model('Evaluation', schema);
