const express = require('express');
const router = express.Router();
const controller = require('../Controllers/watson/Watson.controller');

router.get('/', function (req, res) {
	console.warn('USUARIO TENTOU ACESSAR A API DO WATSON\n');
	res.render('watson');
});

router.post('/analisarnlu', controller.analisarNLU);
// router.post('/criartexto', controller.traduzirTexto);
// router.post('/analisarpersonalidade', controller.analisarPersonalidade);

module.exports = router;
