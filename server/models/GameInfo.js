const mongoose = require('mongoose');

const gameInfoSchema = new mongoose.Schema({
  game_id: { type: String },
  game_logo: { type: String },
  game_name: { type: String },
  origin_name: { type: String },
  platform: [{ type: String }],
  game_type: [{ type: String }],
  game_cover: { type: String },
  game_date: { type: String },
  game_developer: { type: String },
  game_publisher: { type: String },
  game_img_list: [{ type: String }],
  game_brief: { type: String },
});

module.exports = mongoose.model('GameInfo', gameInfoSchema);
