const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1');

const CONST = require('../Config/consts');
const env_keys = require('../Config/env-keys');

analisarnlu = data => {
	return new Promise((resolve, reject) => {
		const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1(env_keys.WATSON_AUTH);

		let parametros = {
			text: data.full_text[0],
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
				let jsonModificado = {
					sentiment: response.sentiment,
					keywords: response.keywords,
					entitiesNLU: response.entities,
					categories: response.categories
				};
				resolve(jsonModificado);
			}
		});
	});
};

module.exports = {
	analisarnlu
};
