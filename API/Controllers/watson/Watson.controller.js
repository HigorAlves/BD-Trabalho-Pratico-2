const fetch = require('node-fetch');
const NLU_BOLSONARO = require('../../Models/NLU/Bolsonaro.model');
const NLU_GENERAL = require('../../Models/NLU/General.model');
const NLU_HADDAD = require('../../Models/NLU/Haddad.model');
const NLU_MANUELA = require('../../Models/NLU/Manuela.model');

const PersonalidadeBolsonaro = require('../../Models/Personalidade/Bolsonaro.model');
const PersonalidadeHaddad = require('../../Models/Personalidade/Haddad.model');
const PersonalidadeManuela = require('../../Models/Personalidade/Manuela.model');
const PersonalidadeGeneral = require('../../Models/Personalidade/General.model');

const TextoBolsonaro = require('../../Models/BolsonaroTexto.model');
const TextoHaddad = require('../../Models/HaddadTexto.model');
const TextoManuela = require('../../Models/ManuelaTexto.model');
const TextoGeneral = require('../../Models/GeneralTexto.model');

const { analisarSalvar } = require('../../Services/watsonNLU');
const { tradutor } = require('../../Services/tradutor');
const { personalityInsights } = require('../../Services/personalityInsigths');
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

//Ainda tem q ser inserido para os outros candidatos
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
					if (req.body.candidato === 'jairbolsonaro') {
						texto = new TextoBolsonaro({
							text: data.translations[0].translation
						});
						texto.save(function(error) {
							if (error) {
								console.log('NÃO FOI POSSIVEL SALVAR NO BANCO DE DADOS');
								res.status(400).send(CONST.FALOU);
							} else {
								console.log('DADOS SALVOS COM SUCESSO');
								res.status(200).send(CONST.SUCESSO);
							}
						});
					} else if (req.body.candidato === 'Haddad_Fernando') {
						texto = new TextoHaddad({
							text: data.translations[0].translation
						});
						texto.save(function(error) {
							if (error) {
								console.log('NÃO FOI POSSIVEL SALVAR NO BANCO DE DADOS');
								res.status(400).send(CONST.FALOU);
							} else {
								console.log('DADOS SALVOS COM SUCESSO');
								res.status(200).send(CONST.SUCESSO);
							}
						});
					} else if (req.body.candidato === 'ManuelaDavila') {
						texto = new TextoManuela({
							text: data.translations[0].translation
						});
						texto.save(function(error) {
							if (error) {
								console.log('NÃO FOI POSSIVEL SALVAR NO BANCO DE DADOS');
								res.status(400).send(CONST.FALOU);
							} else {
								console.log('DADOS SALVOS COM SUCESSO');
								res.status(200).send(CONST.SUCESSO);
							}
						});
					} else if (req.body.candidato === 'GeneraIMourao') {
						texto = new TextoGeneral({
							text: data.translations[0].translation
						});
						texto.save(function(error) {
							if (error) {
								console.log('NÃO FOI POSSIVEL SALVAR NO BANCO DE DADOS');
								res.status(400).send(CONST.FALOU);
							} else {
								console.log('DADOS SALVOS COM SUCESSO');
								res.status(200).send(CONST.SUCESSO);
							}
						});
					} else {
						console.log('É PRECISO INSERIR UM CANDIDATO VALIDO');
						res.status(400).send(CONST.FALHOU);
					}
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

analisarPersonalidade = (req, res) => {
	console.log('PERSONALIDADE INICIANDO ANALISE');
	fetch(`http://localhost:3000/mongodb/texto/${req.body.candidato}`)
		.then(result => result.json())
		.then(result => {
			data = result[0].text;
			personalityInsights(data)
				.then(data => {
					if (req.body.candidato === 'jairbolsonaro') {
						let personalidade = new PersonalidadeBolsonaro({ data: data });
						personalidade.save(function(error) {
							if (error) {
								console.log(
									'NÃO FOI POSSIVEL SALVAR NO BANCO DE DADOS A PERSONALIDADE: ' +
										error
								);
								res.status(400).send(CONST.FALHOU);
							} else {
								console.log('PERSONALIDADE SALVA COM SUCESSO');
								res.status(201).send(CONST.SUCESSO);
							}
						});
					} else if (req.body.candidato === 'Haddad_Fernando') {
						let personalidade = new PersonalidadeHaddad({ data: data });
						personalidade.save(function(error) {
							if (error) {
								console.log(
									'NÃO FOI POSSIVEL SALVAR NO BANCO DE DADOS A PERSONALIDADE: ' +
										error
								);
								res.status(400).send(CONST.FALHOU);
							} else {
								console.log('PERSONALIDADE SALVA COM SUCESSO');
								res.status(201).send(CONST.SUCESSO);
							}
						});
					} else if (req.body.candidato === 'ManuelaDavila') {
						let personalidade = new PersonalidadeManuela({ data: data });
						personalidade.save(function(error) {
							if (error) {
								console.log(
									'NÃO FOI POSSIVEL SALVAR NO BANCO DE DADOS A PERSONALIDADE: ' +
										error
								);
								res.status(400).send(CONST.FALHOU);
							} else {
								console.log('PERSONALIDADE SALVA COM SUCESSO');
								res.status(201).send(CONST.SUCESSO);
							}
						});
					} else if (req.body.candidato === 'GeneraIMourao') {
						let personalidade = new PersonalidadeGeneral({ data: data });
						personalidade.save(function(error) {
							if (error) {
								console.log(
									'NÃO FOI POSSIVEL SALVAR NO BANCO DE DADOS A PERSONALIDADE: ' +
										error
								);
								res.status(400).send(CONST.FALHOU);
							} else {
								console.log('PERSONALIDADE SALVA COM SUCESSO');
								res.status(201).send(CONST.SUCESSO);
							}
						});
					}
				})
				.catch(error => {
					console.log('NÃO FOI POSSIVEL ANALISAR A PERSONALIDADE: ' + error);
					res.status(400).send(CONST.FALHOU);
				});
		})
		.catch(error => {
			console.log(
				'NÃO FOI POSSIVEL PEGAR O ULTIMO TEXTO NO BANCO DE DADOS: ' + error
			);
			res.status(400).send(CONST.FALHOU);
		});
};

module.exports = {
	cadastrar,
	traduzirTexto,
	analisarPersonalidade
};
