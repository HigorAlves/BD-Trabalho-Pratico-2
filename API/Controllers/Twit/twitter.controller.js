const fetch = require('node-fetch');
const Twitter = require('twitter');

const TWITTER_AUTH = require('../../Config/env_twitter');
const Const = require('../../Config/consts');
const SalvarPalavraChave = require('../../Services/salvarPalavraChave');
const salvarTweets = require('../../Services/salvarTweet');

cadastrarTweets = function (req, res) {
	console.log('CADASTRANDO NOVOS TWEETS');
	salvarTweets(req.body.candidato, req.body.quantidade)
		.then(result => {
			console.log('TWEETS SALVOS COM SUCESSO');
			res.status(201).send('SUCESSO');
		})
		.catch(error => {
			console.log('NÃO FOI POSSIVEL SALVAR OS TWEETS: ' + error);
			res.status(400).send(Const.FALHOU);
		});
};

// PEGAR TOTAL DE TWEETS QUE O CANDIDATO(A) JA POSTOU NO TWITTER
totalTweets = function (req, res) {
	console.log(
		'PEGANDO A QUANTIDADE DE TWEETS NO TWITTER DO CANDIDATO: ' +
		req.params.candidato
	);
	const client = new Twitter(TWITTER_AUTH);

	client.get('users/show', { screen_name: req.params.candidato }, function (
		err,
		data,
		response
	) {
		if (err) {
			console.log('TWITTER ERROR: ', err);
			res.status(400).send(Const.FALHOU);
		} else {
			let count = data.statuses_count;
			res.status(200).send({ count });
		}
	});
};

buscaPalavra = function (req, res) {
	const client = new Twitter(TWITTER_AUTH);
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
		function (err, data, response) {
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
