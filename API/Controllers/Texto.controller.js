const CONST = require('../Config/consts');
const Model = require('../Models/TextoCandidatos.model');

// JUNTA TODOS OS TEXTO DENTRO DE UMA COLEÇÃO PROPRIA
cadastrarTexto = function (req, res) {

  let Texto = new Model({
    screen_name: req.body.screen_name,
    texto: req.body.texto
  });

  Texto.save(function (error) {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(201).send(CONST.SUCESSO)
    }
  })
}

// RETORNA O ULTIMO TEXTO CADASTRADO DO CANDIDATO EM QUESTÃO
ultimoTexto = function (req, res) {
  Model.aggregate([
    { $match: { screen_name: `${req.params.candidato}` } },
    { $sort: { _id: -1 } },
    { $limit: 1 }
  ])
    .then(result => {
      if (result == '') {
        res.status(204).send(CONST.FALHOU)
      } else {
        res.status(200).send(result[0]._id)
      }
    })
    .catch(error => console.log('ULTIMOTWEET: ', error));
}

// ATUALIZA O TEXTO DO CANDIDATO
atualizarTexto = function (req, res) {
  let id = req.body.id;

  Model.findByIdAndUpdate(id, { $set: { texto: req.body.texto } }, { new: true }, function (error, model) {
    if (error) {
      res.status(400).send(CONST.FALHOU)
    } else {
      res.status(201).send(CONST.SUCESSO)
    }
  })
}

//  PEGAR O TEXTO DO CANDIDATO
pegarTexto = function (req, res) {
  Model.aggregate([
    { $match: { screen_name: `${req.params.candidato}` } }
  ])
    .then(result => {
      res.status(200).send(result)
    })
}

module.exports = {
  cadastrarTexto,
  ultimoTexto,
  atualizarTexto,
  pegarTexto
}