const express = require('express');
const router = express.Router();

const palavraChave = require('../Controllers/palavraChave.controller');
const candidatos = require('../Controllers/Candidatos.controller');

router.get('/', function (req, res) {
	console.log('USARIO TENTOU ACESSAR A API DO MONGO DB\n');
	res.render('mongo');
});

//NOVAS ROTAS
router.post('/cadastrartweet', candidatos.cadastrarTweet);
router.post('/atualizartweet', candidatos.updateTweet);
router.post('/cadastrarTexto/:candidato', candidatos.cadastrarTexto);
router.get('/totaltweets/:candidato', candidatos.totalTweets);
router.get('/ultimotweet/:candidato', candidatos.ultimoTweet);
router.get('/textotweets/:candidato', candidatos.pegarTextoTweets);
router.get('/todostweets/:candidato/:id', candidatos.pegarTodosTweets);
router.get('/todostweets/:candidato', candidatos.pegarTodosTweets);

router.post('/cadastrarpalavra', palavraChave.cadastrar);
router.get('/quantidadepalavras', palavraChave.quantidade);
router.get('/ultimotweetp/:palavra', palavraChave.ultimoTweet);
router.get('/listartweets/:palavra/:id', palavraChave.listarTweets);
router.get('/listartweets/:palavra', palavraChave.listarTweets);

module.exports = router;
