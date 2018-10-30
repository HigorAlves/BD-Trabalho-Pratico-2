const Tweet = require('../Models/Bolsonaro.model');
const NLU = require('../Models/NLU/Bolsonaro.model');
const Texto = require('../Models/BolsonaroTexto.model');
const CONST = require('../Config/consts');
const Personalidade = require('../Models/Personalidade/Bolsonaro.model');

cadastrarTweet = function(req, res) {
	// req.assert('id', 'É obrigatorio que o ID seja preenchido').notEmpty();
	// req.assert('full_text', 'É obrigatorio que o full_text seja preenchido').notEmpty();
	// req.assert('entities', 'É obrigatorio que o entities seja preenchido').notEmpty();
	// req.assert('coordinates', 'É obrigatorio que o coordinates seja preenchido').notEmpty();
	// req.assert('retweet_count', 'É obrigatorio que o retweet_count seja preenchido').notEmpty();
	// req.assert('favorite_count', 'É obrigatorio que o favorite_count seja preenchido').notEmpty();
	// req.assert('location', 'É obrigatorio que o location seja preenchido').notEmpty();
	// req.assert('followers_count', 'É obrigatorio que o followers_count seja preenchido').notEmpty();
	// req.assert('verified', 'É obrigatorio que o verified seja preenchido').notEmpty();
	// req.assert('profile_image_url_https', 'É obrigatorio que o profile_image_url_https seja preenchido').notEmpty();
	// req.assert('profile_banner_url', 'É obrigatorio que o profile_banner_url seja preenchido').notEmpty();

	// if (req.validationErrors()) {
	//   res.status(400).send('Ocorreu o erro voce nao deve ter preenchido todos os campos');
	//   return;
	// }
	console.log('MONGODB API\n');
	console.log('MONGO_API: CADASTRANDO O TWEET NO BANCO DE DADOS');

	let tweet = new Tweet({
		id: req.body.id,
		full_text: req.body.full_text,
		entities: req.body.entities,
		coordinates: req.body.coordinates,
		retweet_count: req.body.retweet_count,
		favorite_count: req.body.favorite_count,
		localtion: req.body.localtion,
		user_name: req.body.user_name,
		screen_name: req.body.screen_name,
		location: req.body.location,
		followers_count: req.body.followers_count,
		verified: req.body.verified,
		profile_image_url_https: req.body.profile_image_url_https,
		profile_banner_url: req.body.profile_banner_url
	});

	tweet.save(function(err) {
		if (err) {
			res.status(400).send('NÃO FOI POSSIVEL SALVAR O TWEET: ' + err);
			return err;
		}
		res.status(201).send('TWEET FOI CADASTRADO COM SUCESSO');
	});
};

ultimoTweet = function(req, res) {
	console.log('MONGODB API\n');
	console.log(
		'PEGANDO O ULTIMO TWEET SALVO NO BANCO DE DADOS DO(A) CANDIDATO BOLSONARO'
	);

	Tweet.findOne({}, {}, { sort: { $natural: -1 } }, function(error, tweet) {
		if (error) {
			res
				.status(400)
				.send('NÃO FOI POSSIVEL PEGAR O ULTIMO TWEET DO CANDIDATO: ' + error);
		}
		if (tweet === null) {
			res.status(204).send(CONST.FALHOU);
		} else {
			res.status(200).send({ tweet });
		}
	});
};

totalTweets = function(req, res) {
	console.log('MONGODB API\n');
	console.log('PEGANDO NUMERO TOTAL DE TWEETS DO CANDIDATO');

	Tweet.countDocuments({}).count(function(error, tweet) {
		if (error) {
			res
				.sendStatus(400)
				.send(
					'NÃO FOI POSSIVEL CONTAR A QUANTIDADE DE TWEETS DO CANDIDATO: ' +
						error
				);
		}
		res.status(200).send({ id: tweet });
	});
};

//Pega a quantidade de tweets do usuario para saber quais ja foram usados para analise de sentimento.
getTweets = function(req, res) {
	console.log('MONGODB API\n');
	console.log('PEGANDO TWEETS DO USUARIO');
	let quantidade = parseInt(req.params.quantidade);

	NLU.countDocuments({}).count(function(error, data) {
		if (error) {
			res
				.sendStatus(400)
				.send(
					'NÃO FOI POSSIVEL CONTAR A QUANTIDADE DE TWEETS DO CANDIDATO: ' +
						error
				);
		} else {
			let query = Tweet.find({})
				.skip(parseInt(data))
				.limit(quantidade);
			query.exec(function(error, data) {
				if (error) {
					console.log(
						'OCORREU UM ERRO AO PEGAR OS TWEETS DO CANDIDATO JAIR BOLSONARO'
					);
					res.status(400).send(CONST.FALHOU);
				} else {
					console.log('TWEETS PEGO COM SUCESSO');
					res.status(200).send(data);
				}
			});
		}
	});
};

// PEGA TODOS OS TEXTOS DOS TWEETS
getAllTweets = function(req, res) {
	let query = Tweet.find({}, { full_text: 1 });
	query.exec(function(error, data) {
		if (error) {
			console.log('OCORREU UM ERRO AO PEGAR TODOS OS TWEETS DE JAIR BOLSONARO');
		} else {
			res.status(200).send(data);
		}
	});
};

//PEGA o ultimo texto gravado no banco de dados
getText = function(req, res) {
	let query = Texto.find({}, {}, { sort: { natural: -1 } });
	query.exec(function(error, data) {
		if (error) {
			console.log('NÃO FOI POSSIVEL PEGAR O ULTIMO TEXTO CADASTRADO: ' + error);
			res.status(400).send(CONST.FALHOU);
		} else {
			res.status(200).send(data);
		}
	});
};

getPersonalidade = function(req, res) {
	let query = Personalidade.find({}, {}, { sort: { natural: -1 } });
	query.exec(function(error, data) {
		if (error) {
			console.log('NÃO FOI POSSIVEL PEGAR O ULTIMO TEXTO CADASTRADO: ' + error);
			res.status(400).send(CONST.FALHOU);
		} else {
			res.status(200).send(data);
		}
	});
};

getAllTweetsData = function(req, res) {
	let query = Tweet.find({}, null, {
		limit: 10,
		skip: parseInt(req.params.quantidade)
	});
	console.log(req.params.quantidade);
	query.exec(function(error, data) {
		if (error) {
			console.log('NAO FOI POSSIVEL PEGAR OS DADOS DOS TWEETS: ' + error);
			res.status(400).send(CONST.FALHOU);
		} else {
			res.status(200).send(data);
		}
	});
};

module.exports = {
	cadastrarTweet,
	ultimoTweet,
	totalTweets,
	getTweets,
	getAllTweets,
	getText,
	getPersonalidade,
	getAllTweetsData
};
