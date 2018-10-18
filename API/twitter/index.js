console.log('ola mundo');
const Twit = require('twit');
const twitterAuth = require('./twitterAuth');

var T = new Twit(twitterAuth);

var params = { screen_name: 'jairbolsonaro', count: 1 }

function gotData(error, data, response) {
  console.log(data)
}

T.get('statuses/user_timeline', params, gotData)