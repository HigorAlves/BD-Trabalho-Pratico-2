const express = require('express');
const router = express.Router();
const controller = require('../Controllers/Twit/saveTweet.controller')

router.get('/', function (req, res) {
  console.warn('USUARIO TENTOU ACESSAR A API DO TWITTER')
  res.render('twitter')
});

router.post('/cadastrar', controller.salvarTweets);
router.post('/totaltweets', controller.totalTweets);
router.post('/buscapalavra', controller.buscaPalavra);

module.exports = router;