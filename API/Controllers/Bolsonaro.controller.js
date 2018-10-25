const Tweet = require('../Models/Bolsonaro.model');

cadastrarTweet = function (req, res) {
  // req.assert('id', 'É obrigatorio que o ID seja preenchido').notEmpty();
  // req.assert('full_text', 'É obrigatorio que o full_text seja preenchido').notEmpty();
  // req.assert('entities', 'É obrigatorio que o entities seja preenchido').notEmpty();
  // req.assert('coordinates', 'É obrigatorio que o coordinates seja preenchido').notEmpty();
  // req.assert('retweet_count', 'É obrigatorio que o retweet_count seja preenchido').notEmpty();
  // req.assert('favorite_count', 'É obrigatorio que o favorite_count seja preenchido').notEmpty();
  // req.assert('location', 'É obrigatorio que o location seja preenchido').notEmpty();
  // req.assert('followers_count', 'É obrigatorio que o followers_count seja preenchido').notEmpty();
  // req.assert('verified', 'É obrigatorio que o verified seja preenchido').notEmpty();
  // req.assert('profile_image_url_https', 'É obrigatorio que o profile_image_url_https seja preenchido').notEmpty();
  // req.assert('profile_banner_url', 'É obrigatorio que o profile_banner_url seja preenchido').notEmpty();

  // if (req.validationErrors()) {
  //   res.status(400).send('Ocorreu o erro voce nao deve ter preenchido todos os campos');
  //   return;
  // }
  console.log('MONGODB API\n');
  console.log('MONGO_API: CADASTRANDO O TWEET NO BANCO DE DADOS');

  let tweet = new Tweet(
    {
      id: req.body.id,
      full_text: req.body.full_text,
      entities: req.body.entities,
      coordinates: req.body.coordinates,
      retweet_count: req.body.retweet_count,
      favorite_count: req.body.favorite_count,
      localtion: req.body.localtion,
      user_name: req.body.user_name,
      screen_name: req.body.screen_name,
      location: req.body.location,
      followers_count: req.body.followers_count,
      verified: req.body.verified,
      profile_image_url_https: req.body.profile_image_url_https,
      profile_banner_url: req.body.profile_banner_url
    }
  );

  tweet.save(function (err) {
    if (err) {
      res.status(400).send('NÃO FOI POSSIVEL SALVAR O TWEET: ' + err);
      return (err);
    }
    res.status(201).send('TWEET FOI CADASTRADO COM SUCESSO')
  })
}

ultimoTweet = function (req, res) {
  console.log('MONGODB API\n');
  console.log('PEGANDO O ULTIMO TWEET SALVO NO BANCO DE DADOS DO(A) CANDIDATO BOLSONARO');

  Tweet.findOne({}, {}, { sort: { '$natural': -1 } }, function (error, tweet) {
    if (error) {
      res.status(400).send('NÃO FOI POSSIVEL PEGAR O ULTIMO TWEET DO CANDIDATO: ' + error);
      return err;
    }
    res.status(200).send(tweet);
  })
};

totalTweets = function (req, res) {
  console.log('MONGODB API\n');
  console.log('PEGANDO NUMERO TOTAL DE TWEETS DO CANDIDATO');

  Tweet.countDocuments({}).count(function (error, tweet) {
    if (error) {
      res.sendStatus(400).send('NÃO FOI POSSIVEL CONTAR A QUANTIDADE DE TWEETS DO CANDIDATO: ' + error);
    }
    res.status(200).send({ tweet });
  })
}

module.exports = {
  cadastrarTweet,
  ultimoTweet,
  totalTweets
}