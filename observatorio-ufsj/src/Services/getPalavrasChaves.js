import Twit from 'twit';
import { AUTH } from '../Config/AUTH';

export async function pegarTweets(palavraChave, quantidade) {
  const T = new Twit(AUTH);

  T.get('search/tweets', { q: palavraChave, count: quantidade, tweet_mode: 'extended' }, function (err, data, response) {
    console.log(data);
  })

}