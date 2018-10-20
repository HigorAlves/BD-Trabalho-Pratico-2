import React, { Component } from 'react';
import Navbar from '../Components/Navbar';

export default class PegatTweets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidato: 'Escolha',
      quantidade: ''
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

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.quantidade)
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
                      <option value="bolsonaro">Bolsonaro</option>
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