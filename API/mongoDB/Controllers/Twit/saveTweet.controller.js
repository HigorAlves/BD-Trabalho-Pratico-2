const Twit = require('twit');
const fetch = require('node-fetch');
const TwitterAuth = require('../../Config/twitterAuth');
const SalvarTweets = require('../../Services/salvarTweet');
const Const = require('../../Config/consts');

const T = new Twit(TwitterAuth);

async function saveTweet(candidato, quantidade) {
  let id = null;
  let tweetsToGet;

  await fetch(`http://localhost:3000/api/lasttweet/${candidato}`)
    .then(res => res.json())
    .then(json => {
      id = json.id;
    })
    .catch(error => console.log('NÃO FOI POSSIVEL PEGAR O ID DO ULTIMO TWEET, ELE NÃO DEVE EXISTIR NO BANCO OU ALGUM ERRO COM A API OCORREU.'));

  if (id === null) {
    console.log('NÃO EXISTEM TWEETS NO BANCO');
    tweetsToGet = Object.assign({ screen_name: `${candidato}`, tweet_mode: 'extended' }, { count: quantidade });

    //COMO NÃO EXISTE TWEETS NO BANCO VAMOS PEGAR TWEETS BASEADO NA QUANTIDADE PEDIDDA
    T.get('statuses/user_timeline', tweetsToGet)
      .then(result => {
        if (result.data[0].id === undefined) {
          console.log('É PRECISO ESPERAR PARA PEGAR MAIS DADOS');
          return
        } else {
          console.log('SALVANDO DADOS NO BANCO');
          SalvarTweets(result.data, candidato);
        }
        id == null;
      })
      .catch(err => {
        console.log('ACONTECEU ALGUM ERRO: ' + err);
      })
  } else {
    //EXISTEM TWEETS ANTIGOS CADASTRADOS NO BANCO DE DADOS, IREMOS ENTÃO CADASTRAR SOMENTE OS NOVOS TWEETS APARTIR DA CONTAGEM DO ULTIMO TWEET INSERIDO DENTRO DO NOSSO BANCO
    console.log('EXISTEM TWEETS NO BANCO');

    quantidade = parseInt(quantidade) + 1;
    tweetsToGet = Object.assign({ screen_name: `${candidato}`, tweet_mode: 'extended', max_id: id }, { count: quantidade });

    T.get('statuses/user_timeline', tweetsToGet)
      .then(result => {
        if (result.data[0].id === undefined) {
          console.log('É PRECISO ESPERAR PARA PEGAR MAIS DADOS');
          return 'É PRECISO ESPERAR PARA PEGAR MAIS DADOS'
        } else {
          console.log('SALVANDO DADOS NO BANCO');
          result.data.shift();
          SalvarTweets(result.data, candidato);
          return console.log(Const.SUCESSO)
        }
        id = null
      })
      .catch(err => {
        console.log('NÃO FOI POSSIVEL PEGAR O ID DO ULTIMO TWEET, ELE NÃO DEVE EXISTIR NO BANCO OU ALGUM ERRO COM A API OCORREU.')
      });
  }

}

salvarTweets = function (req, res) {
  console.log('CADASTRANDO NOVOS TWEETS')
  saveTweet(req.body.candidato, req.body.quantidade)
  res.status(201).send('SUCESSO');
}

totalTweets = function (req, res) {
  console.log('PEGANDO A QUANTIDADE DE TWEETS DO CANDIDATO');
  T.get('users/show', { screen_name: `${req.body.candidato}` }, (err, data, response) => {
    if (err) {
      console.log('ERRO: não foi possivel pegar a quantidade de Tweets recentes' + err);
    }
    let count = data.statuses_count
    res.status(200).send({ count });
  }
  );
}

module.exports = {
  salvarTweets,
  totalTweets
}