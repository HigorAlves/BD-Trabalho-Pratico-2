import React, { Component } from 'react';
import Navbar from '../Components/Navbar.js'
import { pegarTweets } from '../Services/getPalavrasChaves.js';

export default class ColetorHashtags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      palavraChave: '',
      quantidade: 1,
      qtRegistros: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangePalavra = this.handleChangePalavra.bind(this);
    this.handleChangeQuantidade = this.handleChangeQuantidade.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('PROCURANDO TWEETS BASEADO NA PALAVRA: ', this.state.palavraChave)
    pegarTweets(this.state.palavraChave, this.state.quantidade);
    // fetch(`http://localhost:3000/twitter/totaltweets`, { method: 'post', headers: new Headers({ Accept: 'application/json', 'Content-Type': 'application/json', }), body: JSON.stringify({ candidato: 'jairbolsonaro' }) })
    //   .then(res => res.json())
    //   .then(json => {
    //     console.log(json.count)
    //   })
    //   .catch(error => console.log(error));
  }

  handleChangeQuantidade(event) {
    this.setState({ quantidade: event.target.value })
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
                    <label htmlFor="palavraChave">Palavra Chave</label>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon3">Uma palavra por Vez</span>
                      </div>
                      <input type="text" className="form-control" id="palavraChave" aria-describedby="palavraChave" value={this.state.palavraChave} onChange={this.handleChangePalavra} />
                    </div>
                  </div>

                  <div className='form-group col-md-2 col-sm-12'>
                    <label htmlFor="basic-url">Quantidade</label>
                    <input type="text" className="form-control" aria-describedby="basic-addon3" value={this.state.quantidade} onChange={this.handleChangeQuantidade} />
                  </div>

                  <div className='form-group col-md-2 col-sm-12'>
                    <label htmlFor="basic-url">Registros no banco</label>
                    <input type="text" className="form-control" disabled aria-describedby="basic-addon3" value={this.state.qtRegistros} />
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