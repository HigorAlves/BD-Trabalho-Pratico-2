import React, { Component } from 'react';
import Navbar from '../../Components/Navbar';
import Jumbotron from '../../Components/Jumbotron';
import Alert from '../../Components/Alert';
import Loading from '../../Components/Loader';

export default class NluCandidato extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidato: '',
      quantidade: null,
      carregando: false,
      alerta: null,
      error: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ candidato: e.target.value });
    fetch(`http://localhost:3000/mongodb/totaltweets/${e.target.value}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ quantidade: data.id });
      })
      .catch(error => {
        console.log(
          'NÃO FOI POSSIVEL PEGAR A QUANTIDADE DE TWEETS NO BANCO: ' + error
        );
      });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ carregando: true });
    fetch(`http://localhost:3000/watson/analisarnlu`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        candidato: this.state.candidato,
      })
    })
      .then(result => {
        if (result.status === 201) {
          this.setState({ carregando: false });
          this.setState({ alerta: true })
        }
        setTimeout(() => {
          this.setState({ alerta: null })
        }, 5000);
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Jumbotron titulo='Natural Language Understanding' texto='Palavra chave' />

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
                <h6>Tweets cadastrados: <span className="badge badge-secondary">{this.state.quantidade}</span></h6>
                <button type="submit" className="btn btn-dark mt-4">
                  Realizar a Tarefa
								</button>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}