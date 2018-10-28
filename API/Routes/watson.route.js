const express = require('express');
const router = express.Router();
const controller = require('../Controllers/watson/Watson.controller');

router.get('/', function(req, res) {
	console.warn('USUARIO TENTOU ACESSAR A API DO WATSON\n');
	res.render('watson');
});

router.post('/nlucadastrar', controller.cadastrar);
router.post('/criartexto', controller.traduzirTexto);

module.exports = router;
