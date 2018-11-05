import React from 'react';
import { RETWEET, HEART } from '../lib/Icons.js';

export default function Tweet(props) {
	return (
		<div className="card border m-4">
			<div className="card-header">
				<img
					src={props.data.profile_image_url_https || props.data.profile_image_url}
					className="rounded-circle"
					style={{ width: '48px', height: '48px' }}
					alt="Foto de perfil"
				/>
				<span className="ml-2">{props.data.user_name || props.data.name}</span>
				<code className="ml-2">{props.data.screen_name}</code>
			</div>
			<div className="card-body">
				<p className="card-text">{props.data.full_text}</p>
			</div>
			<div className="row">
				<div className="ml-4 mb-2 text-muted">
					<RETWEET />
					<span className="ml-2">{props.data.retweet_count}</span>
				</div>
				<div className="ml-3 mb-2 text-muted">
					<HEART />
					<span className="ml-2">{props.data.favorite_count}</span>
				</div>
			</div>
			<ul />
		</div>
	);
}
