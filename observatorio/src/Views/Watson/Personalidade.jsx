import React, { Component } from 'react';
import Navbar from '../../Components/Navbar';
import Jumbotron from '../../Components/Jumbotron';
import Loading from '../../Components/Loader';
import Alert from '../../Components/Alert';
import CardPersonalidade from '../../Components/Card';

export default class Personalidade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidato: '',
      personalidade: [],
      needs: [],
      values: [],
      consumption_preferences: []
    }
  }

  handleChange(e) {
    this.setState({ candidato: e.target.value });
    fetch(`http://localhost:3000/mongodb/pegarpersonalidade/${e.target.value}`)
      .then(result => result.json())
      .then(result => {
        console.log(result)
        this.setState({ personalidade: result[0].personality })
        this.setState({ needs: result[0].needs })
        this.setState({ values: result[0].values })
        this.setState({ consumption_preferences: result[0].consumption_preferences })
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Jumbotron titulo='Visualizar Personalidade' texto='' />

        <div className='container'>

          <div className='row'>
            <div className='col-sm-12 col-md-12'>
              <form >
                <div className="form-row">
                  <div className="form-group col-md-12 col-sm-12">
                    <label htmlFor="inputCandidato">Candidato:</label>
                    <select
                      id="inputCandidato"
                      className="form-control"
                      value={this.state.candidato}
                      onChange={this.handleChange.bind(this)}
                    >
                      <option hidden value="">Escolher</option>
                      <option value="Haddad_Fernando">Fernando Haddad</option>
                      <option value="ManuelaDavila">Manuela Davila</option>
                      <option value="jairbolsonaro">Jair Bolsonaro</option>
                      <option value="GeneraIMourao">General Mourão</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>

        <div className='container-fluid mt-4'>
          <div className='row'>
            <div className='col-sm-12 col-md-3'>
              <div className="card bg-light mb-3">
                <div className="card-header">Personalidade</div>
                <div className="card-body">
                  {this.state.personalidade.map(data => (
                    <CardPersonalidade data={data} />
                  ))}
                </div>
              </div>
            </div>
            <div className='col-sm-12 col-md-3'>
              <div className="card bg-light mb-3">
                <div className="card-header">Necessidades</div>
                <div className="card-body">
                  {this.state.needs.map(data => (
                    <CardPersonalidade data={data} />
                  ))}
                </div>
              </div>
            </div>
            <div className='col-sm-12 col-md-3'>
              <div className="card bg-light mb-3">
                <div className="card-header">Valores</div>
                <div className="card-body">
                  {this.state.values.map(data => (
                    <CardPersonalidade data={data} />
                  ))}
                </div>
              </div>
            </div>
            <div className='col-sm-12 col-md-3'>
              <div className="card bg-light mb-3">
                <div className="card-header">Preferencias de Consumo</div>
                <div className="card-body">
                  {this.state.personalidade.map(data => (
                    <CardPersonalidade data={data} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}