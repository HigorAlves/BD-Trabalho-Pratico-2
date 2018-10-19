const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const app = express();

const dbConnection = require('./DAO/dbConnection');
const apiRoute = require('./Routes/api.route');

const PORT = 3000;

dbConnection();

app.use(expressValidator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//DEFINIÇÃO DAS ROTAS
app.use('/api', apiRoute);


app.listen(PORT, () => {
  console.log('Servidor escutando na porta ' + PORT);
})