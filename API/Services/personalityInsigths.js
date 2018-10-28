const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
const CONST = require('../Config/consts');
const KEYS = require('../Config/env-keys');

personalityInsights = texto => {
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

		personalityInsights.profile(profileParams, function(error, result) {
			if (error) {
				console.log('NÃO FOI POSSIVEL ANALISAR A PERSONALIDADE: ' + error);
				reject(CONST.FALHOU);
			} else {
				console.log('PERSONALIDADE ANALISADA COM SUCESSO.');
				resolve(result);
			}
		});
	});
};

module.exports = {
	personalityInsights
};
