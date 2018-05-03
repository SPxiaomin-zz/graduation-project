var express = require('express');
var router = express.Router();
const User = require('../app/controllers/user')
const Score = require('../app/controllers/score')

router.post('/signin', User.signIn);
router.post('/signup', User.signUp);

router.get('/user', User.adminAuthentication, User.getAllUsers)
router.delete('/user/:name', User.adminAuthentication, User.deleteUserByName)
router.put('/user/:name', User.adminAuthentication, User.updateUserPassword)

router.get('/score', User.authentication, Score.getScoreList);
router.post('/score', User.authentication, Score.recordNewScore);

router.get('/auth', User.authentication, function(req, res) {
  res.json({
    error: null,
  });
});

router.get('/admin-auth', User.adminAuthentication, function(req, res) {
  res.json({
    error: null,
  });
});

module.exports = router;
