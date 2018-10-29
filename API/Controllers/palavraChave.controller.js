const Palavra = require('../Models/palavraChave.model');

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

	palavra.save(function(err) {
		if (err) {
			res.status(400).send('NÃO FOI POSSIVEL SALVAR A PALAVRA CHAVE: ' + err);
			return err;
		}
		res.status(201).send('PALAVRA CHAVE FOI CADASTRADO COM SUCESSO');
	});
};

quantidade = (req, res) => {
	let query = Palavra.find({}).count();
	query.exec(function(erro, data) {
		if (erro) {
			console.log('NÃO FOI POSSIVEL PEGAR A QUANTIDADE DE PALAVRAS: ', erro);
			res.status(400).send('FALHOU');
		} else {
			console.log('QUANTIDADE PEGA COM SUCESSO');
			res.status(200).send({ data });
		}
	});
};

module.exports = {
	cadastrar,
	quantidade
};
