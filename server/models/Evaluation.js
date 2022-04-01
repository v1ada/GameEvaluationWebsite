const mongoose = require('mongoose');
const GameInfo = require('./GameInfo.js');
const User = require('./User.js');

const schema = new mongoose.Schema({
  parent_game: { type: mongoose.Schema.Types.ObjectId, ref: GameInfo },
  author: { type: mongoose.Schema.Types.ObjectId, ref: User },
  content: { type: String },
  score: { type: String },
  publishTime: { type: String },
});

module.exports = mongoose.model('Evaluation', schema);
