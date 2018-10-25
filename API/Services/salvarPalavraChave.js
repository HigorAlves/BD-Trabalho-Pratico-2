const Const = require('../Config/consts');

const saveData = (data, palavraChave) => {
  return new Promise(function (resolve, reject) {
    console.log('COMEÇANDO A SALVAR DADOS DAS PALAVRAS');
    let palavra = null;

    data.map((data, index) => {
      console.log(index)
      palavra = {
        palavra_chave: palavraChave,
        id: data.id,
        full_text: data.full_text,
        entities: data.entities,
        retweet_count: data.retweet_count,
        followers_count: data.followers_count,
        localtion: data.localtion,
        name: data.name,
        profile_image_url: data.profile_image_url,
        profile_banner_url: data.profile_banner_url,
        screen_name: data.screen_name
      }

      Const.CLIENT.post('api/palavrachave', palavra, function (error, req, res) {
        if (error + '' === 'RestError: Invalid JSON in response; caused by SyntaxError: Unexpected token O in JSON at position 0') {
          console.log('TWEETS SALVOS COM: ' + Const.SUCESSO);
          resolve(Const.SUCESSO)
        } else if (error) {
          console.log('OCORREU UM ERRO AO CADASTRAR NO BANCO: ' + error);
          reject(Const.FALHOU);
        } else {
          console.log('TWEETS SALVOS COM: ' + Const.SUCESSO);
          resolve(Const.SUCESSO)
        }
      })
    })
  })
}

module.exports = saveData