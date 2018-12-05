const express = require('express');
const router = express.Router();
const controller = require('../Controllers/watson/Watson.controller');

router.get('/', function (req, res) {
	console.warn('USUARIO TENTOU ACESSAR A API DO WATSON\n');
	res.render('watson');
});

router.post('/analisarnlu', controller.analisarNLU);
router.post('/analisarnlupalavra', controller.analisarNLUpalavraChave);
router.post('/traduzirtexto', controller.traduzirTexto);

//ANALISA A PERSONALIDADE DO CANDIDATO ESCOLHIDO
router.post('/analisarpersonalidade', controller.analisarPersonalidade);

module.exports = router;
