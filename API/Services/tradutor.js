const KEYS = require('../Config/env-keys');
const CONST = require('../Config/consts');
const LanguageTranslatorV3 = require('watson-developer-cloud/language-translator/v3');

salvarData = (texto, id) => {
	return new Promise((resolve, reject) => {

		let data = { id: id, texto: texto }
		CONST.CLIENT.post('/mongodb/atualizartexto', data, (error, req, res) => {
			if (error === 'RestError: Invalid JSON in response; caused by SyntaxError: Unexpectedtoken S in JSON at position 0') {
				reject(CONST.FALHOU);
			} else {
				resolve(CONST.SUCESSO);
			}
		})
	})
}

tradutor = (texto, id) => {
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
				salvarData(response.translations[0].translation, id)
					.then(result => resolve(result))
					.catch(error => console.log('ERROR: ', error))
			}
		});
	});
};

module.exports = {
	tradutor
};