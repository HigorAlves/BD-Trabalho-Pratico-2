const Tweet = require('../Models/General.model');
const NLU = require('../Models/NLU/General.model');
const Texto = require('../Models/GeneralTexto.model');
const CONST = require('../Config/consts');

cadastrarTweet = function(req, res) {
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
			return err;
		}
		res.status(200).send(tweet);
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
		res.status(200).send({ tweet });
	});
};

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
						'OCORREU UM ERRO AO PEGAR OS TWEETS DO CANDIDATO GENERAL MOURÃO'
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

module.exports = {
	cadastrarTweet,
	ultimoTweet,
	totalTweets,
	getTweets,
	getAllTweets,
	getText
};
