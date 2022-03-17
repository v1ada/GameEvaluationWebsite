const mongoose = require('mongoose');

const gameInfoSchema = new mongoose.Schema({
  game_cover: { type: String },
  game_name: { type: String },
  origin_name: { type: String },
  game_date: { type: String },
  platform: [{ type: String }],
  game_gene: [{ type: String }],
  game_developer: { type: String },
  game_publisher: { type: String },
  game_img_list: [{ url: String }],
  game_brief: { type: String },
});

module.exports = mongoose.model('Article', gameInfoSchema);
