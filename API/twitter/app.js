const Twit = require('twit');
const twitterAuth = require('./twitterAuth');
const restify = require('restify');
const clients = require('restify-clients');

const T = new Twit(twitterAuth);
const client = clients.createJSONClient({
  url: 'http://localhost:3000',
  version: '~1.0'
});

errorMenssage = (mensagem) => {
  return console.error(mensagem);
}

function gotData(err, data, response) {
  let tweet = null;
  if (err) {
    throw errorMenssage('Aconteceu algum erro na hora de contatar a API \n' + err);
  }
  console.log('Começando os cadastros no banco\n');

  data.map((data) => {
    tweet = {
      id: data.id,
      full_text: data.full_text,
      entities: data.entities,
      coordinates: data.coordinates,
      retweet_count: data.retweet_count,
      favorite_count: data.favorite_count,
      localtion: data.localtion,
      user_name: data.user.user_name,
      screen_name: data.user.screen_name,
      location: data.user.location,
      followers_count: data.user.followers_count,
      verified: data.user.verified,
      profile_image_url_https: data.user.profile_image_url_https,
      profile_banner_url: data.user.profile_banner_url
    }
    client.post('/api/tweet', tweet, function (err, req, res, retorno) {
      console.log('Consumindo o Servico do MongoDB\n');
    })
  });
}
//max_id:
T.get('statuses/user_timeline', { screen_name: 'jairbolsonaro', count: 10, tweet_mode: 'extended' }, gotData)