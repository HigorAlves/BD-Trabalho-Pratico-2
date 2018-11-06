const CONST = require('../Config/consts');
const Model = require('../Models/CandidatosPersonalidade.model');

// JUNTA TODOS OS TEXTO DENTRO DE UMA COLEÇÃO PROPRIA
cadastrarTexto = function (req, res) {
  let Personalidade = new Model({
    screen_name: req.body.screen_name,
    personality: req.body.personality,
    needs: req.body.needs,
    values: req.body.values,
    consumption_preferences: req.body.consumption_preferences,
  });

  Personalidade.save(function (error) {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(201).send(CONST.SUCESSO)
    }
  })
}

//Pega a ultima personalidade cadastrada
pegarPersonalidade = function (req, res) {
  Model.aggregate([
    { $match: { screen_name: `${req.params.candidato}` } },
    { $sort: { _id: -1 } },
    { $limit: 1 }
  ])
    .then(result => {
      if (result == '') {
        res.status(204).send(CONST.FALHOU)
      } else {
        res.status(200).send(result)
      }
    })
    .catch(error => console.log('ULTIMOTWEET: ', error));
}
module.exports = {
  cadastrarTexto,
  pegarPersonalidade
}