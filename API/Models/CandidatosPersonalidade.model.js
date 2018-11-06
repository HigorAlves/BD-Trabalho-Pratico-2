const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TweetSchema = new Schema({
  scren_name: { type: String, required: true },
  personality: { type: Object, required: true },
  needs: { type: Object, required: true },
  values: { type: Object, required: true },
  consumption_preferences: { type: Object, required: true }
});

module.exports = mongoose.model('candidatos_personalidade', TweetSchema);
