const express = require('express');
const router = express.Router();
const controller = require('../Controllers/Twit/twitter.controller');

router.get('/', function (req, res) {
	console.warn('USUARIO TENTOU ACESSAR A API DO TWITTER\n');
	res.render('twitter');
});

router.post('/cadastrar', controller.cadastrarTweets);
//Total de tweets que o candidato ja postou
router.get('/totaltweets/:candidato', controller.totalTweets);
router.post('/buscapalavra', controller.buscaPalavra);
router.get('/tweetstotexto/:candidato', controller.tweetsToTexto);

module.exports = router;
