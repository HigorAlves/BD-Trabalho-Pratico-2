const Tweet = require('../Models/tweetBolsonaro.model');

cadastraTweet = function (req, res) {
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
      res.status(400).send('Não foi possivel gravar os dados deste Tweet: ' + err);
      return (err);
    }
    res.status(201).send('O Tweet foi cadastrado com sucesso no banco de dados')
  })
}

last_tweet = function (req, res) {
  Tweet.findOne({}, {}, { sort: { '$natural': -1 } }, function (err, tweet) {
    if (err) {
      res.status(400).send('Não foi possivel pegar o ultimo tweet');
      return err;
    }
    res.status(200).send(tweet);
  })
};

total_tweets = function (req, res) {
  Tweet.countDocuments({}).count(function (err, tweet) {
    if (err) {
      res.sendStatus(400).send('Não foi possivel contar a quantidade de Tweets');
    }
    res.status(200).send({ tweet });
  })
}

module.exports = {
  cadastraTweet,
  last_tweet,
  total_tweets
}