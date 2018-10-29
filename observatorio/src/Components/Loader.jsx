import React from 'react';
import Loader from 'react-loader-spinner';

export default function Loading(props) {
	return (
		<div className="d-flex justify-content-center">
			<Loader
				className=""
				type="ThreeDots"
				color="#E83E8C"
				height="50"
				width="50"
			/>
		</div>
	);
}
