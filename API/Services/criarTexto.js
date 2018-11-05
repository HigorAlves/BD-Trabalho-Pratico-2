const CONST = require('../Config/consts');
const fetch = require('node-fetch');
const clients = require('restify-clients');

pegarUltimoTexto = candidato => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3000/mongodb/ultimotexto/${candidato}`)
      .then(result => resolve(result));
  })
}


criarTexto = (candidato) => {
  return new Promise((resolve, reject) => {
    let dataText = [];
    let texto = [];
    let id = null;

    const client = clients.createJSONClient({
      url: 'http://localhost:3000',
      version: '~1.0'
    });

    pegarUltimoTexto(candidato)
      .then(result => {
        if (result.status === 204) {
          return result = null;
        } else if (result.status === 200) {
          return result.json();
        }
      })
      .then(result => {

        if (result === null) {

          fetch(`http://localhost:3000/mongodb/textotweets/${candidato}`)
            .then(result => result.json())
            .then(data => {
              data.text.map(data => {
                texto.push(data.full_text[0])
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
            });

        } else {

          id = result;
          fetch(`http://localhost:3000/mongodb/textotweets/${candidato}`)
            .then(result => result.json())
            .then(data => {
              data.text.map(data => {
                texto.push(data.full_text[0])
              })
            })
            .then(result => {
              dataText = { id: id, screen_name: candidato, texto: texto };
              client.post('/mongodb/atualizartexto', dataText, (error, req, res) => {
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
        }

      })
      .then(result => {
        resolve(CONST.SUCESSO);
      })
      .catch(error => {
        console.log('Não foi possivel pegar no banco de dados');
        reject(CONST.FALHOU)
      })
  })
}

module.exports = criarTexto;