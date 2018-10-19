const express = require('express');
const router = express.Router();
const tweetController = require('../Controllers/tweet.controller');

router.post('/tweet', tweetController.cadastraTweet)

module.exports = router;