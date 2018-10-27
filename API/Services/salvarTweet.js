const clients = require('restify-clients');
const Twitter = require('twitter');
const fetch = require('node-fetch');

const TwitterAuth = require('../Config/twitterAuth');
const Const = require('../Config/consts');

salvarBD = (data, candidato) => {
	return new Promise((resolve, reject) => {
		console.log('TENTANDO SALVAR NO BANCO DE DADOS');
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

			client.post(`/mongodb/cadastrartweet/${candidato}`, tweet, function(
				err,
				req,
				res,
				retorno
			) {
				if (
					err + '' ===
						'RestError: Invalid JSON in response; caused by SyntaxError: Unexpected token O in JSON at position 0' ||
					err + '' ===
						'RestError: Invalid JSON in response; caused by SyntaxError: Unexpected token T in JSON at position 0'
				) {
					console.log('TWEETS SALVOS COM: ' + Const.SUCESSO);
					resolve(Const.SUCESSO);
				} else if (err) {
					console.log('OCORREU UM ERRO AO CADASTRAR NO BANCO: ' + err);
					console.log(Const.FALHA);
					reject(Const.FALHOU);
				} else {
					console.log('TWEETS SALVOS COM: ' + Const.SUCESSO);
					resolve(Const.SUCESSO);
				}
			});
		});
	});
};

//PEGAR QUANTIDADE DE TWEETS DO CANDIDATO X E SALVAR OS MESMOS NO BANCO DE DADOS DO REFERENTE
salvarTweets = (candidato, quantidade) => {
	return new Promise((resolve, reject) => {
		console.log('\nSALVANDO TWEETS DO CANDIDATO(A): ' + candidato + '\n');

		const T = new Twitter(TwitterAuth);
		let tweetsToGet = null;
		let id = null;

		fetch(`http://localhost:3000/mongodb/ultimotweet/${candidato}`)
			.then(res => {
				if (res.status === 200) {
					return res.json();
				}
				if (res.status === 204) {
					return (res = null);
				}
			})
			.then(json => {
				if (json === null) {
					console.log('NÃO EXISTEM TWEETS NO BANCO');
					tweetsToGet = Object.assign(
						{ screen_name: `${candidato}`, tweet_mode: 'extended' },
						{ count: quantidade }
					);
					//COMO NÃO EXISTE TWEETS NO BANCO VAMOS PEGAR TWEETS BASEADO NA QUANTIDADE PEDIDDA
					T.get('statuses/user_timeline', tweetsToGet)
						.then(result => {
							if (result[0].id === undefined) {
								console.log('É PRECISO ESPERAR PARA PEGAR MAIS DADOS');
								reject(Const.FALHOU);
							} else {
								console.log('SALVANDO DADOS NO BANCO');
								salvarBD(result, candidato)
									.then(res => {
										resolve(Const.SUCESSO);
									})
									.catch(error => {
										console.log('NÃO FOI POSSIVEL SALVAR NO BANCO DE DADOS');
										reject(Const.FALHOU);
									});
							}
						})
						.catch(err => {
							console.log('ACONTECEU ALGUM ERRO: ' + err);
						});
				} else {
					//EXISTEM TWEETS ANTIGOS CADASTRADOS NO BANCO DE DADOS, IREMOS ENTÃO CADASTRAR SOMENTE OS NOVOS TWEETS APARTIR DA CONTAGEM DO ULTIMO TWEET INSERIDO DENTRO DO NOSSO BANCO
					console.log('EXISTEM TWEETS NO BANCO');
					quantidade = parseInt(quantidade) + 1;
					tweetsToGet = Object.assign(
						{
							screen_name: `${candidato}`,
							tweet_mode: 'extended',
							max_id: json.tweet.id
						},
						{ count: quantidade }
					);
					T.get('statuses/user_timeline', tweetsToGet)
						.then(result => {
							if (result[0].id === undefined) {
								console.log('É PRECISO ESPERAR PARA PEGAR MAIS DADOS');
								reject(Const.FALHOU);
							} else {
								console.log('SALVANDO DADOS NO BANCO');
								result.shift();
								salvarBD(result, candidato)
									.then(res => {
										resolve(Const.SUCESSO);
									})
									.catch(error => {
										console.log('NÃO FOI POSSIVEL SALVAR NO BANCO DE DADOS');
										reject(Const.FALHOU);
									});
							}
						})
						.catch(err => {
							console.log(
								'\nNÃO FOI POSSIVEL PEGAR O ID DO ULTIMO TWEET, ELE NÃO DEVE EXISTIR NO BANCO OU ALGUM ERRO COM A API OCORREU'
							);
						});
				}
			})
			.catch(error =>
				console.log(
					'\nNÃO FOI POSSIVEL PEGAR O ID DO ULTIMO TWEET, ELE NÃO DEVE EXISTIR NO BANCO OU ALGUM ERRO COM A API OCORREU: ' +
						error
				)
			);
	});
};

module.exports = salvarTweets;
