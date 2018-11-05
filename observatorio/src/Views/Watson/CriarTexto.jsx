import React, { Component } from 'react';
import Navbar from '../../Components/Navbar';
import Jumbotron from '../../Components/Jumbotron';
import Alert from '../../Components/Alert';
import Loading from '../../Components/Loader';

export default class CriarTexto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidato: '',
      alerta: null,
      carregando: false,
      error: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ candidato: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ carregando: true });
    fetch(`http://localhost:3000/twitter/tweetstotexto/${this.state.candidato}`)
      .then(result => {
        if (result.status === 201) {
          this.setState({ carregando: false });
          this.setState({ alerta: true });
          setTimeout(() => {
            this.setState({ alerta: null })
          }, 5000);
        }
      })
      .catch(error => {
        this.setState({ alerta: false });
        this.setState({ error });
        setTimeout(() => {
          this.setState({ alerta: null });
        }, 5000);
      });
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Jumbotron titulo='Gerador de Texto' texto='ainda nao tem' />
        <div className='container'>
          {this.state.carregando ? <Loading /> : null}
          <Alert alert={this.state.alerta} error={this.state.error} />
          <div className='row'>
            <div className='col-sm-12 col-md-12'>
              <form onSubmit={this.handleSubmit}>
                <div className="form-row">
                  <div className="form-group col-md-12 col-sm-12">
                    <label htmlFor="inputCandidato">Candidato:</label>
                    <select
                      id="inputCandidato"
                      className="form-control"
                      value={this.state.candidato}
                      onChange={this.handleChange}
                    >
                      <option hidden value="">Escolher</option>
                      <option value="Haddad_Fernando">Fernando Haddad</option>
                      <option value="ManuelaDavila">Manuela Davila</option>
                      <option value="jairbolsonaro">Jair Bolsonaro</option>
                      <option value="GeneraIMourao">General Mourão</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn btn-dark mt-4">
                  Criar Texto
								</button>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}