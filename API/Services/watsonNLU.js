const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1');
const NLU = require('../Models/nluDataBolsonaro.model');

const CONST = require('../Config/consts');
const env_keys = require('../Config/env-keys');

analisarSalvar = data => {
	return new Promise((resolve, reject) => {
		const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1(
			env_keys.WATSON_AUTH
		);
		data.map(data => {
			let parametros = {
				text: data.full_text,
				features: {
					sentiment: {},
					categories: {},
					entities: {
						sentiment: true,
						limit: 2
					},
					keywords: {
						limit: 10
					}
				}
			};

			naturalLanguageUnderstanding.analyze(parametros, (err, response) => {
				if (err) {
					console.log(
						'NÃO FOI POSSIVEL CONTATAR A API DO WATSON PARA REALIZAR A TRADUÇÃO: ' +
							err
					);
					reject(CONST.FALHOU);
				} else {
					console.log('FOI POSSIVEL ANALISAR O TWEET DO CANDIDATO(A)\n');
					let salvar = new NLU({
						id: data.id,
						full_text: data.full_text,
						entities: data.entities,
						coordinates: data.coordinates,
						retweet_count: data.retweet_count,
						favorite_count: data.favorite_count,
						localtion: data.localtion,
						user_name: data.user_name,
						screen_name: data.screen_name,
						followers_count: data.followers_count,
						verified: data.verified,
						profile_image_url_https: data.profile_image_url_https,
						profile_banner_url: data.profile_banner_url,
						sentiment: response.sentiment,
						keywords: response.keywords,
						entitiesNLU: response.entities,
						categories: response.categories
					});
					salvar.save(function(error) {
						if (error) {
							console.log('ERRO NA HORA DE SALVAR NO BANCO DE DADOS: ' + error);
						} else {
							console.log(
								'FOI POSSIVEL SALVAR OS DADOS DO TWEET DENTRO DO BANCO'
							);
							resolve(response);
						}
					});
				}
			});
		});
	});
};

module.exports = {
	analisarSalvar
};
