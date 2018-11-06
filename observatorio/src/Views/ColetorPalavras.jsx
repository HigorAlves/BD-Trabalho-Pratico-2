import React, { Component } from 'react';
import Navbar from '../Components/Navbar';
import Jumbotron from '../Components/Jumbotron';
import Loading from '../Components/Loader';
import Alert from '../Components/Alert';

export default class ColetorPalavras extends Component {
	constructor(props) {
		super(props);
		this.state = {
			quantidadeBanco: 0,
			palavraChave: '',
			quantidade: '',
			carregando: false,
			alert: null
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.onChangePalavraChave = this.onChangePalavraChave.bind(this);
		this.onChangeQuantidade = this.onChangeQuantidade.bind(this);
		this.getPalavrasBD = this.getPalavrasBD.bind(this);
	}

	getPalavrasBD() {
		fetch('http://localhost:3000/mongodb/quantidadepalavras')
			.then(res => res.json())
			.then(res => {
				this.setState({ quantidadeBanco: res.data });
			})
			.catch(error => {
				console.warn('Não foi possivel pegar a quantidade de Palvras');
			});
	}

	onChangePalavraChave(e) {
		this.setState({ palavraChave: e.target.value });
	}
	onChangeQuantidade(e) {
		this.setState({ quantidade: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ carregando: true });
		this.getPalavrasBD();
		fetch(`http://localhost:3000/twitter/buscapalavra`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				palavra: this.state.palavraChave,
				quantidade: this.state.quantidade
			})
		}).then(res => {
			console.log(res)
			if (parseInt(res.status) === 201) {
				this.setState({ alert: true });
				this.getPalavrasBD();
				this.setState({ carregando: false });
				setTimeout(() => {
					this.setState({ alert: null });
				}, 5000);
			} else {
				this.setState({ alert: false });
			}
		});
	}

	componentWillMount() {
		this.getPalavrasBD();
	}

	render() {
		return (
			<React.Fragment>
				<Navbar ativo="coletorpalavras" />
				<Jumbotron
					titulo="Coletor de Palavras"
					texto="Aqui você pode coletar os tweets baseados em palavras chaves de sua escolha"
				/>
				{this.state.carregando ? <Loading /> : null}
				<div className="container">
					<Alert alert={this.state.alert} />
					<div className="row">
						<div className="col-md-12">
							<form onSubmit={this.onSubmit}>
								<div className="form-row">
									<div className="col-md-4 col-sm-12 mt-2">
										<label htmlFor="palavraChave">Palavra Chave</label>
										<input
											type="text"
											className="form-control"
											placeholder="#elenao"
											id="palavraChave"
											value={this.state.palavraChave}
											onChange={this.onChangePalavraChave}
										/>
									</div>
									<div className="col-md-4 col-sm-12 mt-2">
										<label htmlFor="quantidade">Quantidade</label>
										<input
											type="text"
											className="form-control"
											placeholder="100"
											id="quantidade"
											value={this.state.quantidade}
											onChange={this.onChangeQuantidade}
										/>
									</div>
									<div className="col-md-4 col-sm-12 mt-2">
										<label htmlFor="quantidadeBanco">Quantidade no banco</label>
										<input
											disabled
											type="text"
											className="form-control"
											id="quantidadeBanco"
											value={this.state.quantidadeBanco}
										/>
									</div>
								</div>
								<button type="submit" className="btn btn-dark mt-4">
									Coletar
								</button>
							</form>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
