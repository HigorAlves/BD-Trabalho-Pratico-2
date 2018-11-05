import React, { Component } from 'react';
import Navbar from '../Components/Navbar';
import Jumbotron from '../Components/Jumbotron';

export default class ListarTweetsPalavrasChaves extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			quantidade: 0
		};
	}

	componentWillMount() {
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
			this.carregarItens();
		}
	};

	carregarItens() {
		let qt = null;
		fetch(`http://localhost:3000/mongodb/todostweets/jairbolsonaro/${this.state.quantidade}`)
			.then(res => res.json())
			.then(data => {
				qt = parseInt(this.state.quantidade) + 10;
				this.setState({ quantidade: qt });
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
				<div className="container">
					<div className="row">
						<div className="col-sm-12 col-md-12">ola</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
