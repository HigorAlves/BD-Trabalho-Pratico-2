const fetch = require('node-fetch');
const { analisarnlu } = require('../../Services/analiseNlu');
const { tradutor } = require('../../Services/tradutor');
const CONST = require('../../Config/consts');

// ANALISA O TWEET DO CANDIDATO PEDIDO E RETONA JA PARA O PEDIDO DO MESMO O RESULTADO DA ANALISE DO WATSON
analisarNLU = (req, res) => {
	fetch(`http://localhost:3000/mongodb/textotweets/${req.body.candidato}`)
		.then(result => result.json())
		.then(result => {
			result.text.map(data => {
				let ID = data._id;
				analisarnlu(data)
					.then(result => {
						fetch(`http://localhost:3000/mongodb/atualizartweet`, {
							method: 'POST',
							headers: {
								Accept: 'application/json',
								'Content-Type': 'application/json'
							}, body: JSON.stringify({
								id: ID,
								sentiment: result.sentiment,
								keywords: result.keywords,
								entitiesNLU: result.entitiesNLU,
								categories: result.categories
							})
						})
							.catch(error => console.log('ERROR: ', error))
					})
					.catch(error => {
						console.log('ERROR: ', error)
						res.status(400).send(CONST.FALHOU)
					})
			})
		})
		.then(result => {
			res.status(201).send(CONST.SUCESSO)
		})
		.catch(error => {
			console.log('ERROR: ', error);
			res.status(400).send(CONST.FALHOU);
		})
}

// TRADUZIR O TEXTO PARA INGLES
traduzirTexto = (req, res) => {
	fetch(`http://localhost:3000/mongodb/pegarTexto/${req.body.candidato}`)
		.then(result => result.json())
		.then(result => {
			tradutor(result[0].texto, result[0]._id)
				.then(result => {
					res.status(201).send(result);
				})

		})
		.catch(error => console.log('error: ', error))
}

analisarPersonalidade = (req, res) => {

}

module.exports = {
	analisarNLU,
	traduzirTexto,
	analisarPersonalidade
};
