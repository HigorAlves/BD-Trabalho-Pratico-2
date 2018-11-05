const Model = require('../Models/Candidatos.model');
const CONST = require('../Config/consts');

cadastrarTweet = function (req, res) {
  let Tweet = new Model({
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
  });

  Tweet.save(function (err) {
    if (err === ' RestError: Invalid JSON in response; caused by SyntaxError: Unexpected token S in JSON at position 0') {
      res.status(201).send(CONST.SUCESSO);
    } else if (err) {
      res.status(400).send('NÃO FOI POSSIVEL SALVAR O TWEET: ' + err);
      return err;
    } else {
      res.status(201).send(CONST.SUCESSO);
    }
  });
};

//PEGA O TOTAL DE TWEETS DO CANDIDATO PASSADO POR PARAMETRO DENTRO DA BASE DE DADOS MODEL
totalTweets = function (req, res) {
  Model.aggregate([
    { $match: { screen_name: `${req.params.candidato}` } },
    { $group: { _id: '$screen_name', total: { $sum: 1 } } }
  ])
    .then(data => {
      res.status(200).send({ id: data[0].total })
    })
    .catch(error => {
      res.status(400).send(error)
    })
}

//PEGA O ULTIMO TWEET CADASTRADO NO BANCO
ultimoTweet = function (req, res) {
  Model.aggregate([
    { $match: { screen_name: `${req.params.candidato}` } },
    { $sort: { _id: -1 } },
    { $limit: 1 }
  ])
    .then(result => {
      if (result == '') {
        res.status(204).send(CONST.FALHOU)
      } else {
        res.status(200).send({ id: result[0].id })
      }
    })
    .catch(error => console.log('ULTIMOTWEET: ', error));
};

// PEGA TODOS OS TEXTOS DOS TWEETS
pegarTextoTweets = function (req, res) {
  Model.aggregate([
    { $match: { screen_name: `${req.params.candidato}` } },
    { $group: { _id: '$full_text' } }
  ])
    .then(data => {
      res.status(200).send({ text: data });
    })
    .catch(error => {
      res.status(200).send(CONST.FALHOU);
      console.log('ERROR: não foi possivel pegar os textos dos tweets: ', error)
    })
};

// RETORNA O DADO DE TODOS OS TWEETS DENTRO DE UM LIMITE INSERIDO PELO USUARIO
pegarTodosTweets = function (req, res) {
  if (req.params.id > 1) {
    Model.aggregate([
      { $match: { $and: [{ screen_name: `${req.params.candidato}` }, { id: { $lt: parseInt(req.params.id) } }] } },
      { $limit: 5 }
    ]).then(data => {
      res.status(200).send(data)
    }).catch(error => console.log(error))
  } else {
    console.log(req.params.candidato)
    Model.aggregate([
      { $match: { screen_name: `${req.params.candidato}` } },
      { $limit: 5 }
    ]).then(data => {
      res.status(200).send(data)
    }).catch(error => console.log(error))
  }
}

module.exports = {
  totalTweets,
  ultimoTweet,
  cadastrarTweet,
  pegarTextoTweets,
  pegarTodosTweets
}