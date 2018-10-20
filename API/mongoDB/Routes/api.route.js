const express = require('express');
const router = express.Router();
const tweetController = require('../Controllers/tweet.controller');

router.post('/tweet/bolsonaro', tweetController.cadastraTweet);
router.get('/lasttweet/bolsonaro', tweetController.last_tweet)

module.exports = router;