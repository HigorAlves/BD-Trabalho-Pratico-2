const Const = require('../Config/consts');

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

			Const.CLIENT.post('/mongodb/cadastrarpalavra', palavra, function (
				error,
				req,
				res
			) {
				if (
					error + '' ===
					'RestError: Invalid JSON in response; caused by SyntaxError: Unexpected token P in JSON at position 0'
				) {
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
verificarTweet = (candidato, quantidade) => {
	return new Promise((resolve, reject) => {
		console.log('\nSALVANDO TWEETS DO CANDIDATO(A): ' + candidato + '\n');

		const T = new Twitter(TWITTER_AUTH);
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
				if (json === null || json.id === 0) {
					console.log('NÃO EXISTEM TWEETS NO BANCO');
					tweetsToGet = Object.assign({ screen_name: `${candidato}`, tweet_mode: 'extended' }, { count: quantidade });
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
							console.log('ACONTECEU ALGUM ERRO: ', err);
						});
				} else {
					//EXISTEM TWEETS ANTIGOS CADASTRADOS NO BANCO DE DADOS, IREMOS ENTÃO CADASTRAR SOMENTE OS NOVOS TWEETS APARTIR DA CONTAGEM DO ULTIMO TWEET INSERIDO DENTRO DO NOSSO BANCO
					console.log('EXISTEM TWEETS NO BANCO');
					quantidade = parseInt(quantidade) + 1;
					tweetsToGet = Object.assign({ screen_name: `${candidato}`, tweet_mode: 'extended', max_id: json.id }, { count: quantidade });
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


module.exports = {
	saveData,
	verificarTweet
};
