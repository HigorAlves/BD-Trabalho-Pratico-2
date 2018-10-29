import React from 'react';

export default function Jumbotron(props) {
	return (
		<div className="jumbotron jumbotron-fluid">
			<div className="container">
				<h1 className="display-4">{props.titulo}</h1>
				<p className="lead">{props.texto}</p>
			</div>
		</div>
	);
}
