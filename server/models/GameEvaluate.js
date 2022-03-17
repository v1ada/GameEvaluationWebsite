const mongoose = require('mongoose');

const gameEvaluateSchema = new mongoose.Schema({
  game_name: { type: String },
  content: { type: String },
  point: { type: String },
  evaluate_date: { type: String },
});

module.exports = mongoose.model('Article', gameEvaluateSchema);
