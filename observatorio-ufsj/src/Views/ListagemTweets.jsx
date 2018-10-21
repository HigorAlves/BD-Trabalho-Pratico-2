import React, { Component } from 'react';
import Navbar from '../Components/Navbar';

export default class ListagemTweets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: 'https://pbs.twimg.com/profile_banners/128372940/1534866551'
    }
  }
  render() {

    return (
      <section>
        <Navbar ativo='listagemtweets' />

        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">Listagem dos Tweets</h1>
            <p className="lead">Nesta seção você vai poder listar tweets do candidato que queira.</p>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-12">
              <form>
                <div className="form-row">
                  <div className="form-group col-md-6 col-sm-12">
                    <label htmlFor="inputCandidato">Candidato:</label>
                    <select id="inputCandidato" className="form-control">
                      <option hidden value="">Escolher</option>
                      <option value="Jair Bolsonaro">Jair Bolsonaro</option>
                      <option value="Fernando Haddad">Fernando Haddad</option>
                      <option value="" disabled>Fernando Haddad</option>
                    </select>
                  </div>

                  <div className="form-group col-md-6 col-sm-12">
                    <label htmlFor="inputCandidato">Candidato:</label>
                    <select id="inputCandidato" className="form-control">
                      <option hidden value="">Escolher</option>
                      <option value="Jair Bolsonaro">Jair Bolsonaro</option>
                      <option value="Fernando Haddad">Fernando Haddad</option>
                      <option value="" disabled>Fernando Haddad</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* <img src={this.state.image} alt="..." class="rounded"></img> */}

      </section>
    )
  }
}