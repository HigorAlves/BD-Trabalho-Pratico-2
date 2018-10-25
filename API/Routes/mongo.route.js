const express = require('express');
const router = express.Router();

const haddad = require('../Controllers/Haddad.controller');
const manuela = require('../Controllers/Manuela.controller');
const bolsonaro = require('../Controllers/Bolsonaro.controller');
const general = require('../Controllers/Mourao.controller');

router.get('/', function (req, res) {
  console.log('USARIO TENTOU ACESSAR A API DO MONGO DB\n')
  res.render('mongo');
})

//ROTAS FERNANDO HADDAD
router.post('/cadastrartweet/Haddad_Fernando', haddad.cadastrarTweet);
router.get('/ultimotweet/Haddad_Fernando', haddad.ultimoTweet);
router.get('/totaltweets/Haddad_Fernando', haddad.totalTweets);

//ROTAS MANUELA DAVILA
router.post('/cadastrartweet/ManuelaDavila', manuela.cadastrarTweet);
router.get('/ultimotweet/ManuelaDavila', manuela.ultimoTweet);
router.get('/totaltweets/ManuelaDavila', manuela.totalTweets);

//ROTAS JAIR MESSIAS BOLSONARO
router.post('/cadastrartweet/jairbolsonaro', bolsonaro.cadastrarTweet);
router.get('/totaltweets/jairbolsonaro', bolsonaro.totalTweets);
router.get('/ultimotweet/jairbolsonaro', bolsonaro.ultimoTweet);

//ROTAS GENERAL MOURÃO
router.post('/cadastrartweet/GeneraIMourao', general.cadastrarTweet);
router.get('/ultimotweet/GeneraIMourao', general.totalTweets);
router.get('/totaltweets/GeneraIMourao', general.ultimoTweet);

module.exports = router;