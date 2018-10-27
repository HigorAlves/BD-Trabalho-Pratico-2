const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
	console.warn('USUARIO TENTOU ACESSAR A API DO WATSON\n');
	res.render('watson');
});

// router.post('/cadastrar', controller.cadastrarTweets);

module.exports = router;
