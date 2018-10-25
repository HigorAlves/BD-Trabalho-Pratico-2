const Twit = require('twit');
const fetch = require('node-fetch');
const Twitter = require('twitter');

const TwitterAuth = require('../../Config/twitterAuth');
const Const = require('../../Config/consts');
const SalvarPalavraChave = require('../../Services/salvarPalavraChave');
const SalvarTweet = require('../../Services/salvarTweet');

const SalvarTweets = require('../../Services/salvarTweet'); //Esta função é o saveTweet ou seja tudo deve ser passado para o arquivo de services como uma promisse

//TODO: trocar a api Twit pela do Twitter
// as apis do mongo mudaram de URL tambem mudar as mesmas aqui

async function saveTweet(candidato, quantidade) {
  let id = null;
  let tweetsToGet;
  const T = new Twit(TwitterAuth);

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
  console.log('CADASTRANDO NOVOS TWEETS');
  SalvarTweet(req.body.candidato, req.body.quantidade);
  // saveTweet(req.body.candidato, req.body.quantidade)
  res.status(201).send('SUCESSO');
}

// PEGAR TOTAL DE TWEETS QUE O CANDIDATO(A) JA POSTOU NO TWITTER
totalTweets = function (req, res) {
  console.log('PEGANDO A QUANTIDADE DE TWEETS NO TWITTER DO CANDIDATO: ' + req.body.candidato);
  const client = new Twitter(TwitterAuth);

  client.get('users/show', { screen_name: req.body.candidato }, function (err, data, response) {
    if (err) {
      console.log('TWITTER ERROR: ', err)
    }
    let count = data.statuses_count;
    res.status(200).send({ count })
  })
}


buscaPalavra = function (req, res) {
  const client = new Twitter(TwitterAuth);
  console.log('BUSCANDO PELA PALAVRA CHAVE: ' + req.body.palavra + ' COM QUANTIDADE DE RETORNOS DE: ' + req.body.quantidade);

  client.get('search/tweets', { q: req.body.palavra, count: parseInt(req.body.quantidade), tweet_mode: 'extended' }, function (err, data, response) {
    if (err) {
      console.log('NÃO FOI POSSIVEL PEGAR AS OS TWEETS BASEADO NA PALAVRA')
    }

    SalvarPalavraChave(data.statuses, req.body.palavra)
      .then(resposta => {
        console.log(resposta);
        res.status(200).send(resposta)
      })
      .catch(err => {
        res.status(400).send(err)
      })
  })
}


module.exports = {
  salvarTweets,
  totalTweets,
  buscaPalavra
}