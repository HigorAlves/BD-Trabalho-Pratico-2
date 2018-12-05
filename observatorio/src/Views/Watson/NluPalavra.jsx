import React, { Component } from 'react';
import Navbar from '../../Components/Navbar';
import Jumbotron from '../../Components/Jumbotron';
import Alert from '../../Components/Alert';
import Loading from '../../Components/Loader';

export default class NluCandidato extends Component {
  constructor(props) {
    super(props);
    this.state = {
      palavra: '',
      quantidade: null,
      carregando: false,
      alerta: null,
      error: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ palavra: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ carregando: true });
    fetch(`http://localhost:3000/watson/analisarnlupalavra`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        palavra: this.state.palavra,
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

  componentDidMount() {
    fetch('http://localhost:3000/mongodb/quantidadepalavras')
      .then(res => res.json())
      .then(res => {
        this.setState({ quantidade: res.data });
      })
      .catch(error => {
        console.warn('Não foi possivel pegar a quantidade de Palvras');
      });
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
                    <label htmlFor="inputCandidato">Palavra Chave:</label>
                    <select
                      id="inputCandidato"
                      className="form-control"
                      value={this.state.palavra}
                      onChange={this.handleChange}
                    >
                      <option hidden value="">Escolher</option>
                      <option value="elenao">#elenao</option>
                      <option value="elesim">#elesim</option>
                      <option value="bolsonaro">#Bolsonaro</option>
                      <option value="bolsonaropresidente">#bolsonaropresidente</option>
                      <option value="haddad">#Haddad</option>
                      <option value="haddadpresidente">#haddadpresidente</option>
                      <option value="MeuBolsominionSecreto">#MeuBolsominionSecreto</option>
                      <option value="DeusFamiliaBolsonaro">#DeusFamiliaBolsonaro</option>
                      <option value="DeusFamiliaBolsonaro17">#DeusFamiliaBolsonaro17</option>
                      <option value="HaddadÉ13">#HaddadÉ13</option>
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