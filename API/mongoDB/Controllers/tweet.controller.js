const Product = require('../Models/tweet.model');

cadastraTweet = function (req, res) {
  req.assert('name', 'O nome da pessoa que postou é obrigatorio').notEmpty();

  if (req.validationErrors()) {
    res.status(400).send('Ocorreu o erro');
    return;
  }

  let product = new Product(
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

  product.save(function (err) {
    if (err) {
      res.status(400).send('Não foi possivel gravar os dados deste Tweet: ' + err);
      return (err);
    }
    res.status(201).send('Tweet cadastrado com sucesso')
  })
}

module.exports = {
  cadastraTweet
}