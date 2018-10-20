const express = require('express');
const router = express.Router();
const tweetController = require('../Controllers/tweet.controller');

router.post('/tweet', tweetController.cadastraTweet);
router.get('/lasttweet', tweetController.last_tweet)

module.exports = router;