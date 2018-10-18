const Twit = require('twit');
const twitterAuth = require('./twitterAuth');
const { bolsonaroTweets, haddadTweets } = require('./configs/params');
const T = new Twit(twitterAuth);

let tweetID = null;
let tweetsToGet = bolsonaroTweets;

erroMenssage = (mensagem) => {
  return console.error(mensagem);
}

gotData = (error, data, response) => {
  if (error) {
    throw erroMenssage('Aconteceu algum erro na hora de contatar a API \n' + error);
  }

  data.map((data) => {
    console.log(data.full_text);
    tweetID = data.id;
  });
}

if (tweetID === null) {
  tweetID = 1048389083557519400;
} else {
  tweetsToGet = Object.assign({ max_id: tweetID }, bolsonaroTweets)
}


T.get('statuses/user_timeline', tweetsToGet, gotData);