const express = require('express');
const router = express.Router();

const haddad = require('../Controllers/Haddad.controller');
const manuela = require('../Controllers/Manuela.controller');
const bolsonaro = require('../Controllers/Bolsonaro.controller');
const general = require('../Controllers/Mourao.controller');
const palavraChave = require('../Controllers/palavraChave.controller');

const candidatos = require('../Controllers/Candidatos.controller');

router.get('/', function (req, res) {
	console.log('USARIO TENTOU ACESSAR A API DO MONGO DB\n');
	res.render('mongo');
});

//NOVAS ROTAS
router.post('/cadastrartweet', candidatos.cadastrarTweet);
router.get('/totaltweets/:candidato', candidatos.totalTweets);
router.get('/ultimotweet/:candidato', candidatos.ultimoTweet);
router.get('/textotweets/:candidato', candidatos.pegarTextoTweets);
router.get('/todostweets/:candidato/:quantidade', candidatos.getAllTweetsData);

// //ROTAS FERNANDO HADDAD
// router.post('/cadastrartweet/Haddad_Fernando', haddad.cadastrarTweet);
// router.get('/ultimotweet/Haddad_Fernando', haddad.ultimoTweet);
// router.get('/totaltweets/Haddad_Fernando', haddad.totalTweets);
// router.get('/tweets/Haddad_Fernando/:quantidade', haddad.getTweets);
// router.get('/alltweets/Haddad_Fernando', haddad.getAllTweets);
// router.get('/texto/Haddad_Fernando', haddad.getText);
// router.get('/personalidade/Haddad_Fernando', haddad.getPersonalidade);

// //ROTAS MANUELA DAVILA
// router.post('/cadastrartweet/ManuelaDavila', manuela.cadastrarTweet);
// router.get('/ultimotweet/ManuelaDavila', manuela.ultimoTweet);
// router.get('/totaltweets/ManuelaDavila', manuela.totalTweets);
// router.get('/tweets/ManuelaDavila/:quantidade', manuela.getTweets);
// router.get('/alltweets/ManuelaDavila', manuela.getAllTweets);
// router.get('/texto/ManuelaDavila', manuela.getText);
// router.get('/personalidade/ManuelaDavila', manuela.getPersonalidade);

// //ROTAS JAIR MESSIAS BOLSONARO
// router.post('/cadastrartweet/jairbolsonaro', bolsonaro.cadastrarTweet);
// router.get('/totaltweets/jairbolsonaro', bolsonaro.totalTweets);
// router.get('/ultimotweet/jairbolsonaro', bolsonaro.ultimoTweet);
// router.get('/tweets/jairbolsonaro/:quantidade', bolsonaro.getTweets);
// router.get('/alltweets/jairbolsonaro', bolsonaro.getAllTweets);
// router.get('/texto/jairbolsonaro', bolsonaro.getText);
// router.get('/personalidade/jairbolsonaro', bolsonaro.getPersonalidade);
// router.get('/todostweets/jairbolsonaro/:quantidade', bolsonaro.getAllTweetsData);

// //ROTAS GENERAL MOURÃO
// router.post('/cadastrartweet/GeneraIMourao', general.cadastrarTweet);
// router.get('/ultimotweet/GeneraIMourao', general.totalTweets);
// router.get('/totaltweets/GeneraIMourao', general.ultimoTweet);
// router.get('/tweets/GeneraIMourao/:quantidade', general.getTweets);
// router.get('/alltweets/GeneraIMourao', general.getAllTweets);
// router.get('/texto/GeneraIMourao', general.getText);
// router.get('/personalidade/GeneraIMourao', general.getPersonalidade);

router.post('/cadastrarpalavra', palavraChave.cadastrar);
router.get('/quantidadepalavras', palavraChave.quantidade);


module.exports = router;
