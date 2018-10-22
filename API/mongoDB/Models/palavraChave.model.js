const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TweetSchema = new Schema({
  palavra_chave: { type: String, require: true },
  id: { type: Number, required: true },
  full_text: { type: String, require: true },
  entities: { type: Object, require: true },
  retweet_count: { type: Number, require: true },
  followers_count: { type: Number, require: true },
  localtion: { type: String, require: true },
  name: { type: String, require: true },
  profile_image_url: { type: String, require: true },
  profile_banner_url: { type: String, require: true },
  screen_name: { type: String, require: true }
});

module.exports = mongoose.model('palavrachave', TweetSchema);