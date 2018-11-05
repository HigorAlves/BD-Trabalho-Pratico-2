const Const = require('../Config/consts');
const fetch = require('node-fetch');
const Twitter = require('twitter');
const TWITTER_AUTH = require('../Config/env_twitter');

const saveData = (data, palavraChave) => {
	return new Promise(function (resolve, reject) {
		console.log('COMEÇANDO A SALVAR DADOS DAS PALAVRAS');
		let palavra = null;
		data.map((data, index) => {
			palavra = {
				palavraChave: palavraChave,
				id: data.id,
				full_text: data.full_text,
				entities: data.entities,
				retweet_count: data.retweet_count,
				followers_count: data.followers_count,
				localtion: data.localtion,
				name: data.user.name,
				profile_image_url: data.user.profile_image_url,
				profile_banner_url: data.user.profile_banner_url,
				screen_name: data.user.screen_name
			};

			Const.CLIENT.post('/mongodb/cadastrarpalavra', palavra, function (error, req, res) {
				if (error + '' === 'RestError: Invalid JSON in response; caused by SyntaxError: Unexpected token P in JSON at position 0') {
					console.log('TWEETS SALVOS COM: ' + Const.SUCESSO);
					resolve(Const.SUCESSO);
				} else if (error) {
					console.log('OCORREU UM ERRO AO CADASTRAR NO BANCO: ' + error);
					reject(Const.FALHOU);
				} else {
					console.log('TWEETS SALVOS COM: ' + Const.SUCESSO);
					resolve(Const.SUCESSO);
				}
			});
		});
	});
};

//PEGAR QUANTIDADE dE TWEETS DO CANDIDATO X E SALVAR OS MESMOS NO BANCO DE DADOS DO REFERENTE
verificarTweet = (palavraChave, quantidade) => {
	return new Promise((resolve, reject) => {
		const client = new Twitter(TWITTER_AUTH);

		fetch(`http://localhost:3000/mongodb/ultimotweetp/${palavraChave}`)
			.then(res => {
				if (res.status === 200) {
					return res.json();
				}
				if (res.status === 204) {
					return (res = null);
				}
			})
			.then(res => {
				if (res === null) {
					client.get('search/tweets', { q: palavraChave, count: parseInt(quantidade), tweet_mode: 'extended' }, function (err, data, response) {
						if (err) {
							console.log('NÃO FOI POSSIVEL PEGAR AS OS TWEETS BASEADO NA PALAVRA');
						} else {
							saveData(data.statuses, palavraChave)
								.then(result => {
									resolve(Const.SUCESSO)
								})
								.catch(error => {
									console.log('ERROR SALVAR PALAVRA: ', error)
									reject(Const.FALHOU);
								});
						}
					})
				} else {
					let qt = parseInt(quantidade) + 1;
					tweetsToGet = Object.assign({ q: palavraChave, max_id: res.id, tweet_mode: 'extended' }, { count: qt })
					client.get('search/tweets', tweetsToGet, function (err, data, response) {
						if (err) {
							console.log('NÃO FOI POSSIVEL PEGAR AS OS TWEETS BASEADO NA PALAVRA');
						} else {
							data.statuses.shift();
							saveData(data.statuses, palavraChave)
								.then(result => {
									resolve(Const.SUCESSO)
								})
								.catch(error => {
									console.log('ERROR SALVAR PALAVRA: ', error)
									reject(Const.FALHOU);
								});
						}
					})
				}
			})
			.catch(error =>
				console.log('\nNÃO FOI POSSIVEL PEGAR O ID DO ULTIMO TWEET, ELE NÃO DEVE EXISTIR NO BANCO OU ALGUM ERRO COM A API OCORREU: ' + error)
			);
	});
};


module.exports = verificarTweet;
