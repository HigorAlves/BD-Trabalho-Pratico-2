const fetch = require('node-fetch');
const NLU = require('../../Models/nluDataBolsonaro.model');
const { analisarSalvar } = require('../../Services/watsonNLU');
const CONST = require('../../Config/consts');

cadastrar = function(req, res) {
	console.log(
		'INICIANDO O CADASTRO DOS DADOS DA NLU DO CANDIDATO: ' +
			req.body.candidato +
			req.body.quantidade
	);
	fetch(
		`http://localhost:3000/mongodb/tweets/${req.body.candidato}/${
			req.body.quantidade
		}`
	)
		.then(res => res.json())
		.then(data => {
			if (req.body.candidato === 'jairbolsonaro') {
				data.map(data => {
					analisarSalvar(data)
						.then(result => result)
						.then(result => {
							if (result === CONST.FALHOU) {
								res.status(400).send(CONST.FALHOU);
							} else {
								let dados = new NLU(result);
								dados.save(function(err) {
									if (err) {
										console.log(
											'ERRO NA HORA DE SALVAR NO BANCO DE DADOS: ' + err
										);
									} else {
										console.log(
											'FOI POSSIVEL SALVAR OS DADOS DO TWEET DENTRO DO BANCO'
										);
									}
								});
							}
						})
						.catch(error => {
							res.status(400).send(CONST.FALHOU);
							console.log('ERROR: ' + error);
						});
				});
			}
			res.status(201).send(CONST.SUCESSO);
		})
		.catch(error => {
			console.log('NÃO FOI POSSIVEL ANALISAR OS DADOS: ' + error);
			res.status(400).send(CONST.FALHOU);
		});
};

module.exports = {
	cadastrar
};
