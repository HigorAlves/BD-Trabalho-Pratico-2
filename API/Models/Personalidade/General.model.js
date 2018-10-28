const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TweetSchema = new Schema({
	data: { type: Object, require: true }
});

module.exports = mongoose.model('personalidade_generaimourao', TweetSchema);
