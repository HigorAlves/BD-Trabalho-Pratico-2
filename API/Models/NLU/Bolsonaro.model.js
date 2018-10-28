const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let NLU_DATA = new Schema({
	id: { type: Number, required: true },
	full_text: { type: String, require: true },
	entities: { type: Object, require: true },
	coordinates: { type: String, require: true },
	retweet_count: { type: Number, require: true },
	favorite_count: { type: Number, require: true },
	localtion: { type: Number, require: true },
	user_name: { type: String, require: true },
	screen_name: { type: String, require: true },
	location: { type: String, require: true },
	followers_count: { type: Number, require: true },
	verified: { type: Boolean, require: true },
	profile_image_url_https: { type: String, require: true },
	profile_banner_url: { type: String, require: true },
	sentiment: { type: Object, require: true },
	keywords: { type: Object, require: true },
	entitiesNLU: { type: Object, require: true },
	categories: { type: Object, require: true }
});

module.exports = mongoose.model('nluBolsonaro', NLU_DATA);
