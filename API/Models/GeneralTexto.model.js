const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TweetSchema = new Schema({
	text: { type: String, require: true }
});

module.exports = mongoose.model('generaimourao_texto', TweetSchema);
