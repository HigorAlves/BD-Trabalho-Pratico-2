const Palavra = require('../Models/palavraChave.model');
const CONST = require('../Config/consts');

cadastrar = (req, res) => {
	console.log('CADASTRANDO PALAVRA CHAVE: ' + req.body.palavraChave);

	let palavra = new Palavra({
		palavra_chave: req.body.palavraChave,
		screen_name: req.body.screen_name,
		id: req.body.id,
		full_text: req.body.full_text,
		entities: req.body.entities,
		retweet_count: req.body.retweet_count,
		followers_count: req.body.followers_count,
		localtion: req.body.localtion,
		name: req.body.name,
		profile_image_url: req.body.profile_image_url,
		profile_banner_url: req.body.profile_banner_url
	});

	palavra.save(function (err) {
		if (err) {
			res.status(400).send('NÃO FOI POSSIVEL SALVAR A PALAVRA CHAVE: ' + err);
			return err;
		}
		res.status(201).send('PALAVRA CHAVE FOI CADASTRADO COM SUCESSO');
	});
};

quantidade = (req, res) => {
	let query = Palavra.find({}).count();
	query.exec(function (erro, data) {
		if (erro) {
			console.log('NÃO FOI POSSIVEL PEGAR A QUANTIDADE DE PALAVRAS: ', erro);
			res.status(400).send('FALHOU');
		} else {
			console.log('QUANTIDADE PEGA COM SUCESSO');
			res.status(200).send({ data });
		}
	});
};

//PEGA O ULTIMO TWEET CADASTRADO NO BANCO
ultimoTweet = function (req, res) {
	Palavra.aggregate([
		{ $match: { palavra_chave: `${req.params.palavra}` } },
		{ $sort: { _id: -1 } },
		{ $limit: 1 }
	])
		.then(result => {
			if (result == '') {
				res.status(204).send(CONST.FALHOU)
			} else {
				res.status(200).send({ id: result[0].id })
			}
		})
		.catch(error => console.log('ULTIMOTWEET: ', error));

};

listarTweets = function (req, res) {
	if (req.params.id > 1) {
		Palavra.aggregate([
			{ $match: { $and: [{ palavra_chave: `${req.params.palavra}` }, { id: { $lt: parseInt(req.params.id) } }] } },
			{ $limit: 5 }
		]).then(data => {
			res.status(200).send(data)
		}).catch(error => console.log(error))
	} else {
		console.log(req.params.palavra)
		Palavra.aggregate([
			{ $match: { palavra_chave: `${req.params.palavra}` } },
			{ $limit: 5 }
		]).then(data => {
			res.status(200).send(data)
		}).catch(error => console.log(error))
	}
}

pegarTextoTweets = function (req, res) {
	Palavra.aggregate([
		{ $match: { palavra_chave: `${req.params.palavra}` } },
		{ $group: { _id: '$_id', full_text: { $push: '$full_text' } } }
	])
		.then(data => {
			res.status(200).send({ text: data });
		})
		.catch(error => {
			res.status(200).send(CONST.FALHOU);
			console.log('ERROR: não foi possivel pegar os textos dos tweets: ', error)
		})
};

updateTweet = function (req, res) {
	let id = req.body.id;

	Palavra.findByIdAndUpdate(id, { $set: { sentiment: req.body.sentiment, keywords: req.body.keywords, entitiesNLU: req.body.entitiesNLU, categories: req.body.categories } }, { new: true }, function (error, model) {
		if (error) {
			res.status(400).send(CONST.FALHOU)
		} else {
			res.status(201).send(CONST.SUCESSO)
		}
	})
}

quantidadeTweets = function (req, res) {
	console.log(req.params.palavra)
	Palavra.aggregate([
		{ $match: { palavra_chave: `${req.params.palavra}` } },
		{ $group: { _id: '$palavra_chave', total: { $sum: 1 } } }
	]).then(data => {
		console.log(data)
		res.status(200).send(data[0])
	}).catch(error => console.log(error))
}

module.exports = {
	cadastrar,
	quantidade,
	ultimoTweet,
	listarTweets,
	pegarTextoTweets,
	updateTweet,
	quantidadeTweets
};
