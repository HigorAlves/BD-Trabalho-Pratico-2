const Twit = require('twit');


const T = new Twit({
  consumer_key: "vrbzk4jefg9hTHbnaFYkKwaeE",
  consumer_secret: "MnBbB2hoov9xsdRFAg9waoF5Bx9TeUipSDOPsRU4g2EV2jhOI8",
  access_token: "893323029182337024-PJWgKiftaZfhh0cBjiXyV1pWbzrnl8w",
  access_token_secret: "c6lZTZGcGwx7cv3QZLPtAA2pood12h7wrrIwHaOF0LFtH",
  timeout_ms: 60 * 1000
});

let params = { q: 'bolsonaro', count: 1, tweet_mode: 'extended' };

let tipoReq = 'search/tweets';

T.get(tipoReq, params, function (err, data, response) {
  if (err) {
    console.log('ERROR')
  }
  console.log(data.statuses);
  // data.statuses.map((data, index) => {
  //   console.log(data.full_text + '\n')
  // })
})
