const express = require('express');
const router = express.Router();

const palavraChave = require('../Controllers/palavraChave.controller');
const candidatos = require('../Controllers/Candidatos.controller');
const texto = require('../Controllers/Texto.controller');
const personalidade = require('../Controllers/Personalidade.controller');

router.get('/', function (req, res) {
	console.log('USARIO TENTOU ACESSAR A API DO MONGO DB\n');
	res.render('mongo');
});

// ROTAS PARA CONTROLE DOS CANDIDATOS
router.post('/cadastrartweet', candidatos.cadastrarTweet);
router.post('/atualizartweet', candidatos.updateTweet);
router.get('/totaltweets/:candidato', candidatos.totalTweets);
router.get('/ultimotweet/:candidato', candidatos.ultimoTweet);
router.get('/textotweets/:candidato', candidatos.pegarTextoTweets);
router.get('/todostweets/:candidato/:id', candidatos.pegarTodosTweets);
router.get('/todostweets/:candidato', candidatos.pegarTodosTweets);
router.post('/qtsentimento', candidatos.qtSentimento);
router.get('/qtretweets/:candidato', candidatos.qtRetweets);

// ROTAS PARA CONTROLE DAS PALAVRAS CHAVES
router.post('/cadastrarpalavra', palavraChave.cadastrar);
router.get('/quantidadepalavras', palavraChave.quantidade);
router.get('/ultimotweetp/:palavra', palavraChave.ultimoTweet);
router.get('/listartweets/:palavra/:id', palavraChave.listarTweets);
router.get('/listartweets/:palavra', palavraChave.listarTweets);
router.get('/textopalavrachave/:palavra', palavraChave.pegarTextoTweets);
router.post('/atualizarpalavra', palavraChave.updateTweet);
router.get('/totaltweetspalavra/:palavra', palavraChave.quantidadeTweets);

// ROTAS PARA OS TEXTOS
router.post('/cadastrartexto', texto.cadastrarTexto); //REGISTRA O TEXTO NO BANCO DE DADOS
router.get('/ultimotexto/:candidato', texto.ultimoTexto);
router.post('/atualizartexto', texto.atualizarTexto);
router.get('/pegarTexto/:candidato', texto.pegarTexto);

// ROTAS PARA PERSONALIDADE
router.post('/cadastrarpersonalidade', personalidade.cadastrarTexto);
router.get('/pegarpersonalidade/:candidato', personalidade.pegarPersonalidade);

module.exports = router;
