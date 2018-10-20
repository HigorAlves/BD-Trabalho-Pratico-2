const Twit = require('twit');
const twitterAuth = require('./twitterAuth');
const { bolsonaroTweets, haddadTweets } = require('./configs/params');
const T = new Twit(twitterAuth);

let tweetID = null;
let tweetsToGet = bolsonaroTweets;

errorMenssage = (mensagem) => {
  return console.error(mensagem);
}

gotData = (err, data, response) => {
  if (err) {
    throw errorMenssage('Aconteceu algum erro na hora de contatar a API \n' + err);
  }

  data.map((data) => {
    tweetID = data.id;
    // console.log('tweetID: ' + tweetID);
    // console.log(data.id);
    // console.log(data.full_text);
    // console.log(data.entities);
    // console.log(data.coordinates);
    // console.log(data.retweet_count);
    // console.log(data.favorite_count);
    // console.log(data.user.name);
    // console.log(data.user.screen_name);
    // console.log(data.user.location);
    // console.log(data.user.followers_count);
    // console.log(data.user.verified);
    // console.log(data.user.profile_image_url_https);
    // console.log(data.user.profile_banner_url);
  });
  return;
}

if (tweetID === null) {
  tweetsToGet = bolsonaroTweets;
} else {
  tweetsToGet = Object.assign({ max_id: tweetID }, bolsonaroTweets)
}

var getTweets = new Promise(function (resolve, reject) {
  T.get('statuses/user_timeline', tweetsToGet, function (err, data, response) {
    if (err) {
      throw errorMenssage('Aconteceu algum erro na hora de contatar a API \n' + err);
    }
    data.map((data) => {
      tweetID = data.id;
    });
    resolve(data)
  })

});


async function pegarTweets() {
  await getTweets.then(function (value) {
    console.log('Promisse 1');
  });
}


pegarTweets();

//T.get('statuses/user_timeline', tweetsToGet, gotData)