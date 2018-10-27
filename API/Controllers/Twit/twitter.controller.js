const Twit = require('twit');
const fetch = require('node-fetch');
const Twitter = require('twitter');

const TwitterAuth = require('../../Config/twitterAuth');
const Const = require('../../Config/consts');
const SalvarPalavraChave = require('../../Services/salvarPalavraChave');
const salvarTweets = require('../../Services/salvarTweet'); //Esta função é o saveTweet ou seja tudo deve ser passado para o arquivo de services como uma promisse

cadastrarTweets = function(req, res) {
	console.log('CADASTRANDO NOVOS TWEETS');
	salvarTweets(req.body.candidato, req.body.quantidade)
		.then(ressult => {
			console.log('TWEETS SALVOS COM SUCESSO');
			res.status(201).send('SUCESSO');
		})
		.catch(error => {
			console.log('NÃO FOI POSSIVEL SALVAR OS TWEETS: ' + error);
			res.status(400).send(Const.FALHOU);
		});
};

// PEGAR TOTAL DE TWEETS QUE O CANDIDATO(A) JA POSTOU NO TWITTER
totalTweets = function(req, res) {
	console.log(
		'PEGANDO A QUANTIDADE DE TWEETS NO TWITTER DO CANDIDATO: ' +
			req.body.candidato
	);
	const client = new Twitter(TwitterAuth);

	client.get('users/show', { screen_name: req.body.candidato }, function(
		err,
		data,
		response
	) {
		if (err) {
			console.log('TWITTER ERROR: ', err);
		}
		let count = data.statuses_count;
		res.status(200).send({ count });
	});
};

buscaPalavra = function(req, res) {
	const client = new Twitter(TwitterAuth);
	console.log(
		'BUSCANDO PELA PALAVRA CHAVE: ' +
			req.body.palavra +
			' COM QUANTIDADE DE RETORNOS DE: ' +
			req.body.quantidade
	);

	client.get(
		'search/tweets',
		{
			q: req.body.palavra,
			count: parseInt(req.body.quantidade),
			tweet_mode: 'extended'
		},
		function(err, data, response) {
			if (err) {
				console.log('NÃO FOI POSSIVEL PEGAR AS OS TWEETS BASEADO NA PALAVRA');
			}

			SalvarPalavraChave(data.statuses, req.body.palavra)
				.then(resposta => {
					console.log(resposta);
					res.status(200).send(resposta);
				})
				.catch(err => {
					res.status(400).send(err);
				});
		}
	);
};

module.exports = {
	cadastrarTweets,
	totalTweets,
	buscaPalavra
};
