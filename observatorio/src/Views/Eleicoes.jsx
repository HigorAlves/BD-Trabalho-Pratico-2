import React, { Component } from 'react';
import Navbar from '../Components/Navbar';
import Jumbotron from '../Components/Jumbotron';
import { Chart } from "react-charts";

//Ordem lexica
// Fernando Haddad
// General Mourão
// Jair Bolsonaro
// Manuela Davila

export default class Eleicoes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qtTweetsFernando: 0,
      qtTweetsGeneral: 0,
      qtTweetsJair: 0,
      qtTweetsManuela: 0,
      qtTweetsElenao: 0
    }
  }

  getTotalTweetsCandidatos() {
    fetch('http://localhost:3000/mongodb/totaltweets/Haddad_Fernando')
      .then(res => res.json())
      .then(res => this.setState({ qtTweetsFernando: res.id }))
    fetch('http://localhost:3000/mongodb/totaltweets/ManuelaDavila')
      .then(res => res.json())
      .then(res => this.setState({ qtTweetsManuela: res.id }))

    fetch('http://localhost:3000/mongodb/totaltweets/jairbolsonaro')
      .then(res => res.json())
      .then(res => this.setState({ qtTweetsJair: res.id }))
    fetch('http://localhost:3000/mongodb/totaltweets/GeneraIMourao')
      .then(res => res.json())
      .then(res => this.setState({ qtTweetsGeneral: res.id }))
  }

  getTotalTweetsPalavras() {
    fetch('http://localhost:3000/mongodb/totaltweetspalavra/elenao')
      .then(res => res.json())
      .then(res => this.setState({ qtTweetsElenao: res.total }))
  }

  componentWillMount() {
    this.getTotalTweetsCandidatos();
    this.getTotalTweetsPalavras();
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Jumbotron titulo='Eleições 2018' texto='Por um texto aqui' />
        <div className='container'>
          <div className='row'>
            <div className='col-md-4 col-sm-12 mb-5'>
              <div style={{ maxWidth: "400px", height: "300px" }}>
                <label htmlFor="inputCandidato">Tweets por candidato:</label>
                <Chart
                  data={[
                    {
                      label: "Fernando Haddad",
                      data: [['Quantidade', this.state.qtTweetsFernando]]
                    },
                    {
                      label: "General Mourão",
                      data: [['Quantidade', this.state.qtTweetsGeneral]]
                    },
                    {
                      label: "Jair Bolsonaro",
                      data: [['Quantidade', this.state.qtTweetsJair]]
                    },
                    {
                      label: "Manuela Davila",
                      data: [['Quantidade', this.state.qtTweetsManuela]]
                    },
                  ]}
                  series={{ type: 'bar' }}
                  axes={[
                    { primary: true, type: 'ordinal', position: 'bottom' },
                    { position: 'left', type: 'linear', stacked: false },
                  ]}
                  primaryCursor
                  secondaryCursor
                  tooltip
                />
              </div>
            </div>

            <div className='col-md-8 col-sm-12'>
              <div style={{ maxWidth: "800px", height: "300px" }}>
                <label htmlFor="inputCandidato">Tweets por palavra chave:</label>
                <Chart
                  data={[
                    {
                      label: "#elenão",
                      data: [['Quantidade', this.state.qtTweetsElenao]]
                    },
                    {
                      label: "#elesim",
                      data: [['Quantidade', this.state.qtTweetsManuela]]
                    },
                    {
                      label: "Bolsonaro",
                      data: [['Quantidade', this.state.qtTweetsElenao]]
                    },
                    {
                      label: "BolsonaroPresidente",
                      data: [['Quantidade', this.state.qtTweetsElenao]]
                    },
                    {
                      label: "Haddad",
                      data: [['Quantidade', this.state.qtTweetsManuela]]
                    },
                    {
                      label: "MeuBolsominionSecreto",
                      data: [['Quantidade', this.state.qtTweetsElenao]]
                    },
                    {
                      label: "DeusFamiliaBolsonaro",
                      data: [['Quantidade', this.state.qtTweetsElenao]]
                    },
                    {
                      label: "DeusFamiliaBolsonaro17",
                      data: [['Quantidade', this.state.qtTweetsManuela]]
                    },
                    {
                      label: "Haddadé13",
                      data: [['Quantidade', this.state.qtTweetsElenao]]
                    },
                  ]}
                  series={{ type: 'bar' }}
                  axes={[
                    { primary: true, type: 'ordinal', position: 'bottom' },
                    { position: 'left', type: 'linear', stacked: false },
                  ]}
                  primaryCursor
                  secondaryCursor
                  tooltip
                />
              </div>
            </div>
          </div>
        </div>

      </React.Fragment>
    )
  }
}