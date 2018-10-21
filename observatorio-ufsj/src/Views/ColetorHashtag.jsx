import React, { Component } from 'react';
import Navbar from '../Components/Navbar.js'
import { pegarTweets } from '../Services/getPalavrasChaves.js';

export default class ColetorHashtags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      palavraChave: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangePalavra = this.handleChangePalavra.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('ola mundo')
    pegarTweets('bolsonaro', 1);
  }

  handleChangePalavra(event) {
    this.setState({ palavraChave: event.target.value });
  }

  render() {
    return (
      <section>
        <Navbar />
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">Coletor de HashTag's</h1>
            <p className="lead">
              Nesta pagina você pode escolher entre as hashtags ou palavras chaves que dos candidatos para coletar dados no twitter e ver o que as pessoas estão falando sobre o candidato escolhido.
						</p>
          </div>
        </div>

        <div className='container'>
          <div className='row'>
            <div className='col-sm-12 col-md-12'>
              <form onSubmit={this.handleSubmit}>
                <div className='form-row'>

                  <div className="form-group col-md-8 col-sm-12">
                    <label htmlFor="basic-url">Palavra Chave</label>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon3">Uma palavra por Vez</span>
                      </div>
                      <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" value={this.state.palavraChave} onChange={this.handleChangePalavra} />
                    </div>
                  </div>

                  <div className='form-group col-md-4 col-sm-12'>
                    <label htmlFor="basic-url">Registros no banco de dados</label>
                    <input type="text" className="form-control" disabled aria-describedby="basic-addon3" />
                  </div>

                  <button type="submit" className="btn btn-dark mt-2">
                    Coletar
								  </button>

                </div>
              </form>
            </div>
          </div>
        </div>

      </section>
    )
  }
}