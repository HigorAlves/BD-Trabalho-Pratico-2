const Twit = require('twit');


const T = new Twit({

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
