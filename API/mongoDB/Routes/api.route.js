const express = require('express');
const router = express.Router();
const bolsonaroController = require('../Controllers/tweet.controller');
const haddadController = require('../Controllers/tweetHaddad.controller');
//ROTAS JAIR MESSIAS BOLSONARO
router.post('/tweet/jairbolsonaro', bolsonaroController.cadastraTweet);
router.get('/lasttweet/jairbolsonaro', bolsonaroController.last_tweet);
router.get('/tweets/jairbolsonaro', bolsonaroController.total_tweets);

//ROTAR FERNANDO HADDAD
router.post('/tweet/Haddad_Fernando', haddadController.cadastraTweet);
router.get('/lasttweet/Haddad_Fernando', haddadController.last_tweet);
router.get('/tweets/Haddad_Fernando', haddadController.total_tweets);

module.exports = router;