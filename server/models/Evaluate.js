const mongoose = require('mongoose');

const EvaluateSchema = new mongoose.Schema({
  parent_game: { type: mongoose.SchemaType.ObjectId, ref: 'GameInfo' },
  content: { type: String },
  score: { type: String },
  evaluate_date: { type: String },
});

module.exports = mongoose.model('Evaluate', gameEvaluateSchema);
