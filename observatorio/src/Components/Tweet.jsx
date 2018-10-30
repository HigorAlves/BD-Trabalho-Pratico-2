import React from 'react';
import { COMMENT, RETWEET, HEART } from '../lib/Icons.js';

export default function Tweet(props) {
	return (
		<div className="card border m-4">
			<div className="card-header">
				<img
					src={props.data.profile_image_url_https}
					className="rounded-circle"
					style={{ width: '48px', height: '48px' }}
				/>
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