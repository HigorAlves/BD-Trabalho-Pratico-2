import React, { Component } from 'react';
import Navbar from '../Components/Navbar.js'
export default class ColetorHashtags extends Component {
  constructor(props) {
    super(props);
    this.state = {}
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
              <form>
                <div className='form-row'>

                  <div className="form-group col-md-8 col-sm-12">
                    <label for="basic-url">Palavra Chave</label>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon3">Uma palavra por Vez</span>
                      </div>
                      <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" />
                    </div>
                  </div>

                  <div className='form-group col-md-4 col-sm-12'>
                    <label for="basic-url">Registros no banco de dados</label>
                    <input type="text" class="form-control" disabled aria-describedby="basic-addon3" />
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