/* eslint-disable */
export async function salvar(data, candidato) {
	var tweet = null;

	data.map(data => {
		tweet = {
			id: data.id,
			full_text: data.full_text,
			entities: data.entities,
			coordinates: data.coordinates,
			retweet_count: data.retweet_count,
			favorite_count: data.favorite_count,
			localtion: data.localtion,
			user_name: data.user.user_name,
			screen_name: data.user.screen_name,
			location: data.user.location,
			followers_count: data.user.followers_count,
			verified: data.user.verified,
			profile_image_url_https: data.user.profile_image_url_https,
			profile_banner_url: data.user.profile_banner_url
		};

		const headers = new Headers();
		const options = {
			method: 'POST',
			headers,
			body: JSON.stringify(tweet)
		};

		headers.append('Content-Type', 'application/json');
		const request = new Request(
			`http://localhost:3000/api/tweet/${candidato}`,
			options
		);
		const response = fetch(request);
		const status = response.status;

		if (status === 201) {
			console.log('SUCESSO');
		}
	});
}
