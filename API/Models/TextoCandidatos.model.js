const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TweetSchema = new Schema({
  screen_name: { type: String, required: true },
  texto: { type: String, require: true }
});

module.exports = mongoose.model('texto_candidatos', TweetSchema);
