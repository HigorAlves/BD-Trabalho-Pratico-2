import React, { Component } from 'react';
import Navbar from '../Components/Navbar';
import Jumbotron from '../Components/Jumbotron';
import Tweet from '../Components/Tweet';
import Alert from '../Components/Alert'

export default class ListarTweetsPalavrasChaves extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			palavra: '',
			alert: null
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.carregarItens(e.target.value);
		this.setState({ palavra: e.target.value });
		this.setState({ data: [] })
		this.scrollListener = window.addEventListener('scroll', e => {
			this.handleScroll(e);
		});
	}

	handleScroll = e => {
		let ultimoItem = document.querySelector('div > div.card:last-child');
		let ultimoItemOffset = ultimoItem.offsetTop + ultimoItem.clientHeight;
		let pageOffset = window.pageYOffset + window.innerHeight;
		let bottomOffset = 20;
		if (pageOffset > ultimoItemOffset + bottomOffset) {
			this.carregarItens(this.state.palavra);
		}
	};

	carregarItens(palavra) {
		fetch(`http://localhost:3000/mongodb/listartweets/${palavra}`)
			.then(res => res.json())
			.then(data => {
				this.setState({ data: [...this.state.data, ...data] });
			})
			.catch(error => {
				console.warn('error: ', error);
			});
	}

	render() {
		return (
			<React.Fragment>
				<Navbar />
				<Jumbotron
					titulo="Listar Tweets Palavras Chaves"
					texto="Aqui você pode ver todos os tweets de todas as palavras chaves registradas"
				/>
				<div className="d-flex justify-content-center">
					<div className="container">
						<div className="row">
							<div className="col-md-12 col-sm-12">
								<Alert alert={this.state.alerta} />
							</div>
						</div>
						<form>
							<div className="form-row">
								<div className="form-group col-md-12 col-sm-12">
									<label htmlFor="inputCandidato">Candidato:</label>
									<select
										id="inputCandidato"
										className="form-control"
										value={this.state.palavra}
										onChange={this.handleChange}
									>
										<option hidden value="">Escolher</option>
										<option value="elenao">#elenao</option>
									</select>
								</div>
							</div>
						</form>
						{this.state.data.map(tweet => (
							<Tweet data={tweet} key={tweet.id.toString()} />
						))}
					</div>
				</div>
			</React.Fragment>
		);
	}
}
