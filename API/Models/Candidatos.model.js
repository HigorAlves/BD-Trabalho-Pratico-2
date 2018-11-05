const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TweetSchema = new Schema({
  id: { type: Number, required: true },
  full_text: { type: String, require: true },
  display_text_range: { type: Object, require: true },
  entities: { type: Object, require: true },
  user_name: { type: String, require: true },
  screen_name: { type: String, require: true },
  location: { type: String, require: true },
  description: { type: String, require: true },
  verified: { type: Boolean, require: true },
  followers_count: { type: Number, require: true },
  profile_image_url_https: { type: String, require: true },
  profile_banner_url: { type: String, require: true },
  retweet_count: { type: Number, require: true },
  favorite_count: { type: Number, require: true },
  sentiment: { type: Object, require: true },
  keywords: { type: Object, require: true },
  entitiesNLU: { type: Object, require: true },
  categories: { type: Object, require: true }
});

module.exports = mongoose.model('candidatos', TweetSchema);