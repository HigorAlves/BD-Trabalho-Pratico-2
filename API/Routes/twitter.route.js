const express = require('express');
const router = express.Router();
const controller = require('../Controllers/Twit/twitter.controller');

router.get('/', function(req, res) {
	console.warn('USUARIO TENTOU ACESSAR A API DO TWITTER\n');
	res.render('twitter');
});

router.post('/cadastrar', controller.cadastrarTweets);
router.post('/totaltweets', controller.totalTweets);
router.post('/buscapalavra', controller.buscaPalavra);

module.exports = router;
