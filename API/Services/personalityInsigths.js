const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
const CONST = require('../Config/consts');
const KEYS = require('../Config/env-keys');
const clients = require('restify-clients');

saveData = (personalidade, candidato) => {
	return new Promise((resolve, reject) => {

		let data = {
			screen_name: candidato,
			personality: personalidade.personality,
			needs: personalidade.needs,
			values: personalidade.values,
			consumption_preferences: personalidade.consumption_preferences,
		}

		CONST.CLIENT.post('/mongodb/cadastrarpersonalidade', data, function (err, req, res) {
			if (err === 'RestError: Invalid JSON in response; caused by SyntaxError: Unexpectedtoken S in JSON at position 0') {
				console.log('OCORREU UM ERRO AO CADASTRAR NO BANCO: ' + err);
				reject(CONST.FALHOU);
			} else {
				console.log('PERSONALIDADE SALVOS COM: ' + CONST.SUCESSO);
				resolve(data);
			}
		});

	})
}

personalityInsights = (texto, candidato) => {
	return new Promise((resolve, reject) => {
		console.log('ANALISANDO A PERSONALIDADE');
		const personalityInsights = new PersonalityInsightsV3(KEYS.PERSONALITY);
		let profileParams = {
			content: texto,
			content_type: 'text/plain',
			consumption_preferences: true,
			raw_scores: true,
			accept_language: 'pt-br'
		};

		personalityInsights.profile(profileParams, function (error, result) {
			if (error) {
				console.log('NÃO FOI POSSIVEL ANALISAR A PERSONALIDADE: ' + error);
				reject(CONST.FALHOU);
			} else {
				console.log('PERSONALIDADE ANALISADA COM SUCESSO.');
				saveData(result, candidato)
					.then(result => resolve(result))
					.catch(error => reject(error))
			}
		});
	});
};

module.exports = {
	personalityInsights
};
