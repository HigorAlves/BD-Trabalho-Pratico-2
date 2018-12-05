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
      // QUANTIDAD DE TWEETS POR PALAVRAS
      qtElenao: 0,
      qtElesim: 0,
      qtBolsonaro: 0,
      qtBolsonaroPresidente: 0,
      qtHaddad: 0,
      qtHaddadPresidente: 0,
      qtMeuBolsominionSecreto: 0,
      qtDeusFamiliaBolsonaro17: 0,
      qtDeusFamiliaBolsonaro: 0,
      qtHaddade13: 0
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
      .then(res => this.setState({ qtElenao: res.total }))
      .catch(error => console.warn(error))

    fetch('http://localhost:3000/mongodb/totaltweetspalavra/elesim')
      .then(res => res.json())
      .then(res => this.setState({ qtElesim: res.total }))
      .catch(error => console.warn(error))

    fetch('http://localhost:3000/mongodb/totaltweetspalavra/bolsonaro')
      .then(res => res.json())
      .then(res => this.setState({ qtBolsonaro: res.total }))
      .catch(error => console.warn(error))

    fetch('http://localhost:3000/mongodb/totaltweetspalavra/bolsonaropresidente')
      .then(res => res.json())
      .then(res => this.setState({ qtBolsonaroPresidente: res.total }))
      .catch(error => console.warn(error))

    fetch('http://localhost:3000/mongodb/totaltweetspalavra/haddad')
      .then(res => res.json())
      .then(res => this.setState({ qtHaddad: res.total }))
      .catch(error => console.warn(error))

    fetch('http://localhost:3000/mongodb/totaltweetspalavra/haddadpresidente')
      .then(res => res.json())
      .then(res => this.setState({ qtHaddadPresidente: res.total }))
      .catch(error => console.warn(error))

    fetch('http://localhost:3000/mongodb/totaltweetspalavra/MeuBolsominionSecreto')
      .then(res => res.json())
      .then(res => this.setState({ qtMeuBolsominionSecreto: res.total }))
      .catch(error => console.warn(error))

    fetch('http://localhost:3000/mongodb/totaltweetspalavra/DeusFamiliaBolsonaro')
      .then(res => res.json())
      .then(res => this.setState({ qtDeusFamiliaBolsonaro: res.total }))
      .catch(error => console.warn(error))

    fetch('http://localhost:3000/mongodb/totaltweetspalavra/DeusFamiliaBolsonaro17')
      .then(res => res.json())
      .then(res => this.setState({ qtDeusFamiliaBolsonaro17: res.total }))
      .catch(error => console.warn(error))

    fetch('http://localhost:3000/mongodb/totaltweetspalavra/HaddadÉ13')
      .then(res => res.json())
      .then(res => this.setState({ qtHaddade13: res.total }))
      .catch(error => console.warn(error))
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
                      data: [['Quantidade', this.state.qtElenao]]
                    },
                    {
                      label: "#elesim",
                      data: [['Quantidade', this.state.qtElesim]]
                    },
                    {
                      label: "Bolsonaro",
                      data: [['Quantidade', this.state.qtBolsonaro]]
                    },
                    {
                      label: "BolsonaroPresidente",
                      data: [['Quantidade', this.state.qtBolsonaroPresidente]]
                    },
                    {
                      label: "Haddad",
                      data: [['Quantidade', this.state.qtHaddad]]
                    },
                    {
                      label: "MeuBolsominionSecreto",
                      data: [['Quantidade', this.state.qtMeuBolsominionSecreto]]
                    },
                    {
                      label: "DeusFamiliaBolsonaro",
                      data: [['Quantidade', this.state.qtDeusFamiliaBolsonaro]]
                    },
                    {
                      label: "DeusFamiliaBolsonaro17",
                      data: [['Quantidade', this.state.qtDeusFamiliaBolsonaro17]]
                    },
                    {
                      label: "Haddadé13",
                      data: [['Quantidade', this.state.qtHaddade13]]
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