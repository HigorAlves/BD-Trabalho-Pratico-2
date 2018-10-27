const Const = require('../Config/consts');

const saveData = (data, palavraChave) => {
	return new Promise(function(resolve, reject) {
		console.log('COMEÇANDO A SALVAR DADOS DAS PALAVRAS');
		let palavra = null;

		data.map((data, index) => {
			palavra = {
				palavraChave: palavraChave,
				id: data.id,
				full_text: data.full_text,
				entities: data.entities,
				retweet_count: data.retweet_count,
				followers_count: data.followers_count,
				localtion: data.localtion,
				name: data.user.name,
				profile_image_url: data.user.profile_image_url,
				profile_banner_url: data.user.profile_banner_url,
				screen_name: data.user.screen_name
			};

			Const.CLIENT.post('/mongodb/cadastrarpalavra', palavra, function(
				error,
				req,
				res
			) {
				if (
					error + '' ===
					'RestError: Invalid JSON in response; caused by SyntaxError: Unexpected token P in JSON at position 0'
				) {
					console.log('TWEETS SALVOS COM: ' + Const.SUCESSO);
					resolve(Const.SUCESSO);
				} else if (error) {
					console.log('OCORREU UM ERRO AO CADASTRAR NO BANCO: ' + error);
					reject(Const.FALHOU);
				} else {
					console.log('TWEETS SALVOS COM: ' + Const.SUCESSO);
					resolve(Const.SUCESSO);
				}
			});
		});
	});
};

module.exports = saveData;
