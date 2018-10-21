const express = require('express');
const router = express.Router();
const haddad = require('../Controllers/tweetHaddad.controller');
const manuela = require('../Controllers/tweetmanuela.controller');
const bolsonaro = require('../Controllers/tweet.controller');
const general = require('../Controllers/tweetMourao.controller');

//ROTAR FERNANDO HADDAD
router.post('/tweet/Haddad_Fernando', haddad.cadastraTweet);
router.get('/lasttweet/Haddad_Fernando', haddad.last_tweet);
router.get('/tweets/Haddad_Fernando', haddad.total_tweets);

//ROTAR MANUELA DAVILA
router.post('/tweet/ManuelaDavila', manuela.cadastraTweet);
router.get('/lasttweet/ManuelaDavila', manuela.last_tweet);
router.get('/tweets/ManuelaDavila', manuela.total_tweets);

//ROTAS JAIR MESSIAS BOLSONARO
router.post('/tweet/jairbolsonaro', bolsonaro.cadastraTweet);
router.get('/lasttweet/jairbolsonaro', bolsonaro.last_tweet);
router.get('/tweets/jairbolsonaro', bolsonaro.total_tweets);

//ROTAS GENERAL MOURÃO
router.post('/tweet/GeneraIMourao', general.cadastraTweet);
router.get('/lasttweet/GeneraIMourao', general.last_tweet);
router.get('/tweets/GeneraIMourao', general.total_tweets);

module.exports = router;