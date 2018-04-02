var express = require('express');
var router = express.Router();
const User = require('../app/controllers/user')
const Score = require('../app/controllers/score')

router.post('/signin', User.signIn);
router.post('/signup', User.signUp);

router.get('/score', User.authentication, Score.getScoreList);
router.post('/score', User.authentication, Score.recordNewScore);

module.exports = router;
