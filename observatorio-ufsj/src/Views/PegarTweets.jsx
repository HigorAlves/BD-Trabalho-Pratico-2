import React, { Component } from 'react';
import Navbar from '../Components/Navbar';
import Twit from 'twit';

export default class PegatTweets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidato: '',
      quantidade: '',
      alerta: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleQuantidadeChange = this.handleQuantidadeChange.bind(this);
  }

  handleChange(event) {
    this.setState({ candidato: event.target.value });
  }

  handleQuantidadeChange(event) {
    if (event.target.value > 200) {
      this.setState({ quantidade: 200 })
    } else {
      this.setState({ quantidade: event.target.value })
    }
  }
  //chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security
  handleSubmit(event) {
    event.preventDefault();

    let sucesso = (
      <div className="alert alert-success col col-sm-12" role="alert">
        Os tweets do candidato {this.state.candidato}, foram pegos com sucesso! Total de {this.state.quantidade} tweets.
      </div>
    )
    let deuRuim = (
      <div className="alert alert-danger col col-sm-12" role="alert">
        Não foi possivel procurar os tweets do {this.state.candidato}.
      </div>
    )
    let auth = {
      consumer_key: "ta48mVMyQ3R4ai98VHBhhMJDg",
      consumer_secret: "3Xj69GvoLNqRVhRuXFVCZNJ0pVceJ7eTFYusSYlcatjtxQMEK2",
      access_token: "535826909-nxUNEcKHmY1Xcv18npYzMLkrgZOrSuriJfQpcHCJ",
      access_token_secret: "PYgnmt0Cfy65Bgu3kk4u5dZvbNjvweCeKwkWnRbT2onm0",
      timeout_ms: 60 * 1000
    }
    const T = new Twit(auth);
    let error = null;
    let quantidade = this.state.quantidade;
    let tweetsToGet = Object.assign({ screen_name: 'jairbolsonaro', tweet_mode: 'extended' }, { count: quantidade })

    T.get('statuses/user_timeline', tweetsToGet)
      .then((data) => {
        this.setState({ alerta: sucesso })
      })
      .catch((err) => {
        error = err;
        this.setState({ alerta: deuRuim });
      })
  }

  render() {
    return (
      <section>
        <Navbar ativo="pegartweets" />

        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">Coletor de Tweets</h1>
            <p className="lead">Nesta pagina você pode escolher entre os candidatos pre-cadastrados, o escolhido vai ter seus dados do twitter pegos via a API.</p>
          </div>
        </div>
        <div className="container">
          {this.state.alerta}
          <div className="row">
            <div className="col-sm-12 col-md-12">
              <h2 className="font-weight-light">Escolha um candidato</h2>
            </div>
            <div className="col-sm-12 col-md-12 mt-3">
              <form onSubmit={this.handleSubmit}>
                <div className="form-row">
                  <div className="form-group col-md-6 col-sm-12">
                    <label htmlFor="inputCandidato">Candidato:</label>
                    <select id="inputCandidato" className="form-control" value={this.state.candidato} onChange={this.handleChange}>
                      <option hidden value="">Escolher</option>
                      <option value="Jair Bolsonaro">Bolsonaro</option>
                      <option value="haddad" disabled>Haddada</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6 col-sm-12">
                    <label htmlFor="inputQuantidadeTweets">Quantidade de Tweets para cadastrar (Quantidade maxima de 200)</label>
                    <input type="text" className="form-control" id="inputQuantidadeTweets" value={this.state.quantidade} onChange={this.handleQuantidadeChange} />
                  </div>
                </div>
                <button type="submit" className="btn btn-dark">Coletar Tweets</button>
              </form>
            </div>
          </div>
        </div>

      </section>
    )
  }
}