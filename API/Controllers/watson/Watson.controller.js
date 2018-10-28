const fetch = require('node-fetch');
const NLU_BOLSONARO = require('../../Models/NLU/Bolsonaro.model');
const NLU_GENERAL = require('../../Models/NLU/General.model');
const NLU_HADDAD = require('../../Models/NLU/Haddad.model');
const NLU_MANUELA = require('../../Models/NLU/Manuela.model');
const Texto = require('../../Models/BolsonaroEnglish.model');
const { analisarSalvar } = require('../../Services/watsonNLU');
const { tradutor } = require('../../Services/tradutor');
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
								let dados = new NLU_BOLSONARO(result);

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
			} else if (req.body.candidato === 'Haddad_Fernando') {
				data.map(data => {
					analisarSalvar(data)
						.then(result => result)
						.then(result => {
							if (result === CONST.FALHOU) {
								res.status(400).send(CONST.FALHOU);
							} else {
								let dados = new NLU_HADDAD(result);

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
			} else if (req.body.candidato === 'ManuelaDavila') {
				data.map(data => {
					analisarSalvar(data)
						.then(result => result)
						.then(result => {
							if (result === CONST.FALHOU) {
								res.status(400).send(CONST.FALHOU);
							} else {
								let dados = new NLU_MANUELA(result);

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
			} else if (req.body.candidato === 'GeneraIMourao') {
				data.map(data => {
					analisarSalvar(data)
						.then(result => result)
						.then(result => {
							if (result === CONST.FALHOU) {
								res.status(400).send(CONST.FALHOU);
							} else {
								let dados = new NLU_GENERAL(result);

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
			} else {
				console.log('É PRECISO ESPECIFICAR O CANDIDATO');
				res.status(400).send(CONST.FALHOU);
			}
			res.status(201).send(CONST.SUCESSO);
		})
		.catch(error => {
			console.log('NÃO FOI POSSIVEL ANALISAR OS DADOS: ' + error);
			res.status(400).send(CONST.FALHOU);
		});
};

traduzirTexto = (req, res) => {
	let texto = null;
	fetch(`http://localhost:3000/mongodb/alltweets/${req.body.candidato}`)
		.then(result => result.json())
		.then(data => {
			data.map(data => {
				texto += data.full_text + '\n';
			});
			tradutor(texto)
				.then(data => {
					texto = new Texto({ text: data.translations[0].translation });
					texto.save(function(error) {
						if (error) {
							console.log('NÃO FOI POSSIVEL SALVAR NO BANCO DE DADOS');
							res.status(400).send(CONST.FALOU);
						} else {
							console.log('DADOS SALVOS COM SUCESSO');
							res.status(200).send(CONST.SUCESSO);
						}
					});
				})
				.catch(error => {
					console.log(
						'NÃO FOI POSSIVEL REALIZAR A TRADUÇÃO DO CONTEUDO: ' + error + '\n'
					);
					res.status(400).send(CONST.FALHOU);
				});
		})
		.catch(error => {
			console.log('ERROR: ' + error);
			res.status(400).send(CONST.FALHOU);
		});
};

module.exports = {
	cadastrar,
	traduzirTexto
};
