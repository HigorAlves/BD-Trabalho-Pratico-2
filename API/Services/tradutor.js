const KEYS = require('../Config/env-keys');
const CONST = require('../Config/consts');
const LanguageTranslatorV3 = require('watson-developer-cloud/language-translator/v3');

tradutor = texto => {
	return new Promise((resolve, reject) => {
		const languageTranslator = new LanguageTranslatorV3(KEYS.TRANSLATOR);

		let parametros = {
			text: texto,
			model_id: 'pt-en'
		};

		languageTranslator.translate(parametros, (error, response) => {
			if (error) {
				console.log('NÃO FOI POSSIVEL TRADUZIR: ' + error);
				reject(CONST.FALHOU);
			} else {
				console.log('TRADUÇÃO EFETUADA COM SUCESSO!\n');
				resolve(response);
			}
		});
	});
};

module.exports = {
	tradutor
};
