const restify = require('restify');
const clients = require('restify-clients');
const Const = require('../Config/consts');

//TODO: Transformar em Promise
async function salvarTweet(data, candidato) {
  console.log('TENTANDO SALVAR OS TWEETS')
  var tweet = null;
  const client = clients.createJSONClient({
    url: 'http://localhost:3000',
    version: '~1.0'
  });

  data.map(data => {
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
    };

    client.post(`/api/tweet/${candidato}`, tweet, function (err, req, res, retorno) {
      if (err + '' === 'RestError: Invalid JSON in response; caused by SyntaxError: Unexpected token O in JSON at position 0') {
        console.log('TWEETS SALVOS COM: ' + Const.SUCESSO);
        return Const.SUCESSO
      } else if (err) {
        console.log('OCORREU UM ERRO AO CADASTRAR NO BANCO: ' + err);
        console.log(Const.FALHA);
        return Const.FALHA;
      } else {
        console.log('TWEETS SALVOS COM: ' + Const.SUCESSO);
        return Const.SUCESSO;
      }
    })
  });
}

module.exports = salvarTweet;