const express = require('express');
const router = express.Router();
const tweetController = require('../Controllers/tweet.controller');

router.post('/tweet/jairbolsonaro', tweetController.cadastraTweet);
router.get('/lasttweet/jairbolsonaro', tweetController.last_tweet);
router.get('/tweets/jairbolsonaro', tweetController.total_tweets);

module.exports = router;