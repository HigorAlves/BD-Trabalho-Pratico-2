const CONST = require('../Config/consts');
const fetch = require('node-fetch');
const clients = require('restify-clients');

criarTexto = (candidato) => {
  return new Promise((resolve, reject) => {
    let dataText = [];
    let texto = [];

    const client = clients.createJSONClient({
      url: 'http://localhost:3000',
      version: '~1.0'
    });

    fetch(`http://localhost:3000/mongodb/textotweets/${candidato}`)
      .then(result => result.json())
      .then(data => {
        data.text.map(data => {
          texto.push(data.full_text[0].replace('"', ''))
        })
      })
      .then(result => {
        dataText = { screen_name: candidato, texto: texto };
        client.post('/mongodb/cadastrartexto', dataText, (error, req, res) => {
          if (error === 'RestError: Invalid JSON in response; caused by SyntaxError: Unexpectedtoken S in JSON at position 0') {
            reject(CONST.FALHOU);
          } else {
            resolve(CONST.SUCESSO);
          }
        })
      })
      .catch(error => {
        console.log('ERROR: ', error);
        reject(CONST.FALHOU);
      })
  })
}

module.exports = criarTexto;