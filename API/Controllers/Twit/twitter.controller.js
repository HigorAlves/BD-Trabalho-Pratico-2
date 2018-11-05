const Twitter = require('twitter');
const TWITTER_AUTH = require('../../Config/env_twitter');
const Const = require('../../Config/consts');
const verificarTweet = require('../../Services/salvarPalavraChave');
const salvarTweets = require('../../Services/salvarTweet');
const criarTexto = require('../../Services/criarTexto');

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
		data, response
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
	console.log('BUSCANDO PELA PALAVRA CHAVE: ' + req.body.palavra + ' COM QUANTIDADE DE RETORNOS DE: ' + req.body.quantidade);
	verificarTweet(req.body.palavra, req.body.quantidade)
		.then(result => {
			res.status(201).send(result)
		})
		.catch(error => {
			res.status(400).send(error);
		})
};

// CRIA UM TEXTO DOE TODOS OS TWEETS DO USUARIO E SALVA NO BANCO DE DADOS
tweetsToTexto = function (req, res) {
	criarTexto(req.params.candidato)
		.then(result => {
			res.status(201).send(Const.SUCESSO);
		})
		.catch(error => {
			res.status(400).send(error);
		})
}

module.exports = {
	cadastrarTweets,
	totalTweets,
	buscaPalavra,
	tweetsToTexto
};
