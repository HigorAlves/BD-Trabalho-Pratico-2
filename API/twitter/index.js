const Twit = require('twit');
const twitterAuth = require('./twitterAuth');
const { bolsonaroTweets, haddadTweets } = require('./configs/params');
const T = new Twit(twitterAuth);

let tweetID = undefined;
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
}

if (tweetID === undefined) {
  tweetsToGet = bolsonaroTweets;
} else {
  tweetsToGet = Object.assign({ max_id: tweetID }, bolsonaroTweets)
}

// var getTweets = new Promise(
//   function (resolve, reject) {
//     // console.log('Promisse iniciada!');
//     resolve(
//       tweetId = T.get('statuses/user_timeline', tweetsToGet, gotData)
//     );
//     reject();
//   }
// )

// getTweets.then(function (val) {
//   console.log('ola mundo' + val)
// })

// var promise1 = new Promise(function (resolve, reject) {
//   resolve(
//     T.get('statuses/user_timeline', tweetsToGet, gotData);
//   );
// });


// promise1.then(function (value) {
//   console.log(tweetID);
// });


var promise1 = () => new Promise(function (resolve, reject) {
  T.get('statuses/user_timeline', tweetsToGet, (err, data, response) => {
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
  })
  resolve(data)
});


promise1().then(function (value) {
  console.log(tweetID);
});

  // T.get('statuses/user_timeline', tweetsToGet, gotData);