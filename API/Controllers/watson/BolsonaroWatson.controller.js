const fetch = require('node-fetch');
const NLU = require('../../Models/nluDataBolsonaro.model');
const { analisarSalvar } = require('../../Services/watsonNLU');
const CONST = require('../../Config/consts');

cadastrar = function(req, res) {
	console.log(
		'INICIANDO O CADASTRO DOS DADOS DA NLU DO CANDIDATO: ' + req.body.candidato
	);
	fetch(`http://localhost:3000/mongodb/tweets/${req.body.candidato}`)
		.then(res => res.json())
		.then(data => {
			analisarSalvar(data)
				.then(result => result)
				.then(result => {
					res.status(201).send(CONST.SUCESSO);
				})
				.catch(error => {
					console.log('ERROR: ' + error);
					res.status(400).send(CONST.FALHOU);
				});
		})
		.catch(error => {
			console.log('NÃO FOI POSSIVEL ANALISAR OS DADOS: ' + error);
			res.status(400).send(CONST.FALHOU);
		});
};

module.exports = {
	cadastrar
};
