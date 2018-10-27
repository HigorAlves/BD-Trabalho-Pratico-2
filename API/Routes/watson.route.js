const express = require('express');
const router = express.Router();
const bolsonaro = require('../Controllers/watson/BolsonaroWatson.controller');

router.get('/', function(req, res) {
	console.warn('USUARIO TENTOU ACESSAR A API DO WATSON\n');
	res.render('watson');
});

router.post('/nlucadastrar', bolsonaro.cadastrar);

module.exports = router;
